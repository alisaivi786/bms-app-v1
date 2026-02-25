import { ReactNode, RefObject, createContext, useCallback, useContext, useRef } from 'react';
import { View } from 'react-native';

type FieldRefsMap = Map<string, RefObject<View>>;

interface FormFieldsRefsContextValue {
	registerFieldRef: (fieldName: string, ref: RefObject<View>) => void;
	unregisterFieldRef: (fieldName: string) => void;
	getFieldRef: (fieldName: string) => RefObject<View> | undefined;
	getFieldsInOrder: (fieldsOrder: string[]) => { fieldName: string; ref: RefObject<View> }[];
}

const FormFieldsRefsContext = createContext<FormFieldsRefsContextValue | null>(null);

export const FormFieldsRefsProvider = ({ children }: { children: ReactNode }) => {
	const fieldRefsRef = useRef<FieldRefsMap>(new Map());

	const registerFieldRef = useCallback((fieldName: string, ref: RefObject<View>) => {
		fieldRefsRef.current.set(fieldName, ref);
	}, []);

	const unregisterFieldRef = useCallback((fieldName: string) => {
		fieldRefsRef.current.delete(fieldName);
	}, []);

	const getFieldRef = useCallback((fieldName: string) => {
		return fieldRefsRef.current.get(fieldName);
	}, []);

	const getFieldsInOrder = useCallback((fieldsOrder: string[]) => {
		return fieldsOrder
			.map((fieldName) => ({
				fieldName,
				ref: fieldRefsRef.current.get(fieldName),
			}))
			.filter((item): item is { fieldName: string; ref: RefObject<View> } => item.ref !== undefined);
	}, []);

	return (
		<FormFieldsRefsContext.Provider value={{ registerFieldRef, unregisterFieldRef, getFieldRef, getFieldsInOrder }}>
			{children}
		</FormFieldsRefsContext.Provider>
	);
};

export const useFormFieldsRefs = () => useContext(FormFieldsRefsContext);
