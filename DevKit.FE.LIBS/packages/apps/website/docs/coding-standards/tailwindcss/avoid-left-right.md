---
tags: [tailwindcss]
---

# Avoid Using Left and Right

For any styling related to any left or right properties, use start and end instead

## ✅ Correct

```jsx
const MyComponent = () => {
	return <div className="ps-4 pe-2 border-s-1">Hello World</div>;
};
```

## ❌ Incorrect

```jsx
const MyComponent = () => {
	return <div className="pl-4 pr-2 border-l-1">Hello World</div>;
};
```

## ℹ️ Explanation

It is common to structure a component style which has different left and right padding, margin, border or offset. That
makes sense as long as you develop one language rtl or rtl.

The main problem will happen when switch from ltr to rtl languages. All styles will not working as the directions will
be opposite of what is expected. Using start and end instead will help in that and are supported already in CSS for all
related left and right properties.

:::tip

Check tailwind start and end supported classes that you can use instead of left and right:

- [Padding start and end](https://tailwindcss.com/docs/padding#using-logical-properties)
- [Margin start and end](https://tailwindcss.com/docs/margin#using-logical-properties)
- [Border start and end](https://tailwindcss.com/docs/border-width#using-logical-properties)

:::
