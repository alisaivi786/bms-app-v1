---
tags: [tailwindcss]
---

# Avoid Dynamic Values

Tailwind css allowing you to specify any value that is not exist in the tailwind css configuration by specify the value
in brackets. However, that is recommended as it is give the developer the choice over use it and diverge from the
original design system that is set in the tailwindcss configuration.

## ✅ Correct

```jsx
const MyComponent = () => {
	return <div className="py-10 px-6">Hello World</div>;
};
```

## ❌ Incorrect

```jsx
const MyComponent = () => {
	return <div className="py-[40px] px-[24px]">Hello World</div>;
};
```

:::note

In some cases that some custom values are required. We recommend in that cases to be added to the tailwind.config.js
file for some reasons as following:

- To not allow developers to over use custom values as first solution for such cases
- To have a visibility on the custom values that the system use and how many of them
- Having many custom values means more diverge from a consistent design language system

:::
