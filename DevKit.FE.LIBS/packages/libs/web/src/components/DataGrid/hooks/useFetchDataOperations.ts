import cloneDeep from 'lodash/cloneDeep';
import { useReducer } from 'react';
import {
	IDataGridProps,
	IDataGridStateActions,
	IFetchedDataState,
	IOnDataFetchClientHandlingCallBack,
	IOnDataFetchServerHandlingCallBack,
	IPagingAndSorting,
} from '../types';

const useFetchDataOperations = <TData, TAction extends string, TKey extends keyof TData>(
	props: IDataGridProps<TData, TKey, TAction>
) => {
	const {
		onFetchData = undefined,
		onClientDataFilter = undefined,
		serverSideHandling = undefined,
		noFetchOnPageLoad = false,
	} = props.ssr ? {} : props;
	const { data = [] } = (props.serverSideHandling !== true || props.ssr) && props.data ? props : {};

	const [fetchedDataState, dispatchServerSideData] = useReducer(
		(
			_currentState: IFetchedDataState<TData>,
			action: {
				type: 'setServerSideData';
				payload: IFetchedDataState<TData>;
			}
		) => {
			return action.payload;
		},
		{
			isError: false,
			isLoading: false,
			data: [],
			totalItemsCount: 0,
			serverDataIsFetched: !noFetchOnPageLoad,
			filteredData: [],
		}
	);

	const fetchData = async (sortingAndPaging: IPagingAndSorting, newSearch?: boolean) => {
		if (!onFetchData) {
			return;
		}

		dispatchServerSideData({
			type: 'setServerSideData',
			payload: {
				data: [],
				totalItemsCount: 0,
				isLoading: true,
				isError: false,
				serverDataIsFetched: true,
				filteredData: [],
			},
		});

		const onFetchDataFn = onFetchData as (
			paging?: IPagingAndSorting,
			newSearch?: boolean
		) => ReturnType<IOnDataFetchServerHandlingCallBack<TData> | IOnDataFetchClientHandlingCallBack<TData>>;

		const sorting = serverSideHandling ? sortingAndPaging : undefined;

		onFetchDataFn?.(sorting, newSearch)
			.then(async (res) => {
				let serverData: TData[] = [];
				let filteredData: TData[] = [];
				let serverDataCount = 0;

				if (serverSideHandling) {
					const { data, totalItemsCount } = res as {
						data: TData[];
						totalItemsCount: number;
					};

					serverData = [];
					filteredData = data;
					serverDataCount = totalItemsCount;
				} else {
					serverData = res as TData[];
					filteredData = onClientDataFilter ? await onClientDataFilter(serverData) : serverData;
					serverDataCount = filteredData.length;
				}
				dispatchServerSideData({
					type: 'setServerSideData',
					payload: {
						data: serverData,
						filteredData,
						totalItemsCount: serverDataCount,
						isLoading: false,
						isError: false,
						serverDataIsFetched: true,
					},
				});
			})
			.catch(() => {
				dispatchServerSideData({
					type: 'setServerSideData',
					payload: {
						data: [],
						filteredData: [],
						totalItemsCount: 0,
						isLoading: false,
						isError: true,
						serverDataIsFetched: true,
					},
				});
			});
	};

	const actions: IDataGridStateActions = {
		refreshServerSideData: async ({ paging, sorting, clientHandlingDataServerRefetch, newSearch }) => {
			if (!serverSideHandling && !clientHandlingDataServerRefetch) {
				const filteredData = (await onClientDataFilter?.(fetchedDataState.data, newSearch)) ?? fetchedDataState.data;

				dispatchServerSideData({
					type: 'setServerSideData',
					payload: {
						data: fetchedDataState.data,
						totalItemsCount: fetchedDataState.totalItemsCount,
						isLoading: false,
						isError: false,
						serverDataIsFetched: true,
						filteredData,
					},
				});
			} else {
				const nextState = cloneDeep({
					paging: paging,
					sorting: sorting,
				});

				await fetchData(nextState, newSearch);
			}
		},
		resetServerSideData: async ({ paging, sorting, clientHandlingDataServerRefetch }) => {
			if (!serverSideHandling && !clientHandlingDataServerRefetch) {
				const filteredData = (await onClientDataFilter?.(fetchedDataState.data, true)) ?? fetchedDataState.data;

				dispatchServerSideData({
					type: 'setServerSideData',
					payload: {
						data: fetchedDataState.data,
						totalItemsCount: fetchedDataState.totalItemsCount,
						isLoading: false,
						isError: false,
						serverDataIsFetched: true,
						filteredData,
					},
				});
			} else if (!noFetchOnPageLoad) {
				await fetchData(
					{
						paging: paging,
						sorting: sorting,
					},
					true
				);
			} else {
				dispatchServerSideData({
					type: 'setServerSideData',
					payload: {
						isError: false,
						isLoading: false,
						data: [],
						filteredData: [],
						totalItemsCount: 0,
						serverDataIsFetched: false,
					},
				});
			}
		},
	};

	return {
		actions,
		fetchedDataState: onFetchData
			? fetchedDataState
			: {
					isError: false,
					isLoading: false,
					data: data,
					totalItemsCount: props.ssr ? props.totalCount : data.length,
					serverDataIsFetched: !noFetchOnPageLoad,
					filteredData: data,
			  },
	};
};

export default useFetchDataOperations;
