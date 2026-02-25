---
tags: [typescript]
---

# Avoid 'I' or 'T' Prefixes

In Typescript, types and interfaces are used to define type directly without defining a class implementing them. That is
because of the JavaScript objects nature that can be defined directly using JSON without defining a class. That means
having a prefix 'I' for interfaces and 'T' for type alias make the code hard to read by developers.

## ✅ Correct

```ts
interface User {
	username: string;
}
const currentUser: User = { username: 'John Doe' };
```

```ts
type User = {
	username: string;
};
const currentUser: User = { username: 'John Doe' };
```

## ❌ Incorrect

```ts
interface IUser {
	username: string;
}
const currentUser: IUser = { username: 'John Doe' };
```

```ts
type TUser = {
	username: string;
};
const currentUser: TUser = { username: 'John Doe' };
```

## ℹ️ Explanation

In OOP languages interfaces are used only to describe a data structure but can't be used to define a new object. As a
result class definition is always required in OOP languages to implement the interface first to be used to define an
object. That make sense in OOP languages to have a prefix 'I' for interface to differentiate between interface and class
definitions. In TypeScript interface can be used directly to define a new object that means using 'I' prefix to
differentiate between interface and classes will cause more confusion.

Also for type alias it has no equivalent in OOP languages, however it can be compared with the class definition usage to
define a new object. It means having 'T' prefix will cause a confusion for other developers.

:::tip

Check out that video for more details:

<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/qA65QjWCl60?si=I-OC8m8qPSQyHWwW" title="YouTube video player" width="560"></iframe>

:::
