export const devkitWebConstants = {
	formIdAttribute: 'data-nj-form',
	errorAttribute: 'data-nj-errors',
};

export const getdevkitComponentAttributes = (formId: string | undefined, hasErrors: boolean | undefined) => ({
	...(formId ? { [devkitWebConstants.formIdAttribute]: formId, [devkitWebConstants.errorAttribute]: hasErrors } : {}),
});
