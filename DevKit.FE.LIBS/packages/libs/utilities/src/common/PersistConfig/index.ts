import { PersistConfig, Storage, WebStorage, persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { Action, AnyAction, Reducer } from '@reduxjs/toolkit';

export type PersistSliceConfig<S> = Omit<PersistConfig<S>, 'storage'> & {
	storageType: 'Session' | 'Local';
	baseReducer: Reducer<S, AnyAction>;
};

export interface IPersistStorage {
	local?: Storage | WebStorage;
	session?: Storage | WebStorage;
}

type EnhancedReducer<S, C extends { storage: undefined } | unknown, A extends Action = Action> = C extends {
	storage: undefined;
}
	? Reducer<S, A>
	: Reducer<S & PersistPartial, A>;

export const persistReducerConfig = <S, C extends PersistSliceConfig<S>>(
	storage: IPersistStorage,
	{ storageType, baseReducer, ...config }: PersistSliceConfig<S>
): EnhancedReducer<S, C> => {
	const requiredStorage = storageType === 'Local' ? storage.local : storage.session;

	if (!requiredStorage) return baseReducer as EnhancedReducer<S, C, AnyAction>;

	return persistReducer(
		{
			...config,
			storage: requiredStorage,
		},
		baseReducer
	) as EnhancedReducer<S, C, AnyAction>;
};
