---
tags: [typescript]
---

# Type Alias Instead of Interface

In Typescript, you can either use type aliases or interface to define a new type. Although both of them almost act the
same but **_type aliases are preferred when it come to define new type_**.

## ✅ Correct

```ts
type User = {
	firstName: string;
	lastName: string;
};

const currentUser: User = {
	firstName: 'John',
	lastName: 'Doe',
};
```

## ❌ Incorrect

```ts
interface User {
	firstName: string;
	lastName: string;
}

const currentUser: User = {
	firstName: 'John',
	lastName: 'Doe',
};
```

## ℹ️ Explanation

:::info

Two main reasons:

- Type alias main purpose is to define type but not the interfaces
- Interfaces has type declaration merge feature that can lead to global errors

:::

JavaScript objects are dynamic and can be defined directly using JSON without class definition like OOP languages.
Because of that nature of JavaScript objects, type alias primarily is used by TypeScript to describe object schema
directly without the need of defining a class.

On other hand TypeScript is using interfaces because it is convenient for developer with OOP background. Also it has
some its own use cases similar to OOP languages usages, however in TypeScript it can be used as a type of object
directly because of JavaScript objects nature.

As result of that interfaces and type aliases can be used interchangeably with exactly same capabilities. For example
get implemented by classes and type union. **_But interfaces has extra functionality over type alias which is
[type declarations merge](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)_**. That feature might
lead to global error that is not easy to find if it is not used carefully and that is the reasons of type alias is being
preferred than interface.

Following is an example for type declaration merge.

```ts
interface User {
	name: string;
}

/** @ts-expect-error as grade is required after the second interface get defined */
const currentUser1: User = {
	name: 'Jon Doe',
};

interface User {
	grade: number;
}

const currentUser2: User = {
	name: 'Jon Doe',
	grade: 4,
};
```

:::tip

- Check that article:
  [https://www.totaltypescript.com/type-vs-interface-which-should-you-use](https://www.totaltypescript.com/type-vs-interface-which-should-you-use)

- Check that video for know how to achieve all interfaces capabilities with type aliases
  <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" frameborder="0" height="315" src="https://www.youtube.com/embed/Idf0zh9f3qQ?si=JeruDH3iWOaECXDR" title="YouTube video player" width="560"></iframe>

:::
