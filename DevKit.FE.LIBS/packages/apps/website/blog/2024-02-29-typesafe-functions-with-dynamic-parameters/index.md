---
authors: [jghaly]
tags: [typescript]
title: Typesafe Functions With Dynamic Parameters
---

Imagine a function signIn that takes two parameters and returns nothing, for example:

```ts
const signIn = (provider, values): void => {
 // do something
}
```

*   `provider`: A string representing the authentication method (for example, "credentials" or "phone")
*   `values`: An object containing relevant information for the chosen provider

We want to ensure that values align with the chosen provider. For example:

*   If `provider` is "credentials", `values` should have `email` (string) and `password` (string).
*   If `provider` is "phone", `values` should have `mobile` (number) and `otp` (number)

## Let's Try Union

We might initially write:

```ts
const signIn = (
  provider: "credentials" | "phone",
  values: { email: string; password: string } | { mobile: number; otp: number }
): void => {
  // do something
};
```

This approach has a significant limitation: **It doesn't prevent mismatched values**. You can pass `phone` values to the `credentials` provider or vice versa, without TypeScript raising any errors like this:

```ts
signIn("credentials",{phone:978987, otp:8888})

signIn("phone",{email:"jghaly@shory.com", password:"password"})
```

## Better Union: Discriminated Union

We can restructure the function signature using a discriminated union like this:

```ts
type SignInTypes =
  | { provider: "credentials"; values: { email: string; password: string } }
  | { provider: "phone"; values: { mobile: number; otp: number } };

const signIn = ({ provider, values }: SignInTypes): void => {
  // do something
};
```

This approach defines a single type `SignInTypes` that includes both possibilities. 
This ensures consistency between provider and values. <br/>
However, **it requires modifying the function signature, which might not always be possible in existing libraries or frameworks.**

## Generics For The Rescue!

This is where generics come in handy. Generics allow us to define a function template that can work with various types. Here's how we can implement it

### 1\. Define possible types.

```ts
type SignInTypes = {
  credentials: { email: string; password: string };
  phone: { mobile: number; otp: number };
};
```

This defines `SignInTypes` as key-value pairs where the key is the provider type and the value is the type of the provider's values.

### 2\. Create a Generic Function Type:

```ts
type SignInFunction = <T extends keyof SignInTypes>(
  type: T,
  values: SignInTypes[T]
) => void;
```

This defines a generic function type SignInFunction. It takes two parameters:

*   `type`: A generic type parameter `T` that extends the `keyof SignInTypes` (ensuring it's one of the provider types).
*   `values`: The second parameter leverages `SignInTypes` and the type of provider `T` to get the type of the values. This ensures values match the structure expected for the chosen provider.

### 3\. Use the type

```ts
const signIn:SignInFunction = (type, values) => {
// do something
}
```

Now it's working perfectly without changing the function signature.  
We can override the third-party package types, but that's a topic for another post.


## Conclusion

By leveraging generics and TypeScript’s powerful type system, we’ve successfully ensured the type safety of our `signIn` function without altering the function’s signature.
