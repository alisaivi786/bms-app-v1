---
tags: [typescript]
---

# Use Prefix 'T' With Generics

Generics are powerful way to define a generic type that will be known only when using that type definition. That means
it is very important to differentiate between a type and a generic type by using the prefix 'T' for the generic types.
That will make the code more readable.

## ✅ Correct

```ts
type FormData<TFieldKey, TFieldValue> = {
	fieldKey: TFieldKey;
	fieldValue: TFieldValue;
};

const myForm: FormData<string, number> = {
	fieldKey: 'Age',
	field2: 4,
};
```

## ❌ Incorrect

```ts
type FormData<FieldKey, FieldValue> = {
	fieldKey: FieldKey;
	fieldValue: FieldValue;
};

const myForm: FormData<string, number> = {
	fieldKey: 'Age',
	field2: 4,
};
```
