---
tags: [react]
---

# Avoid Left and Right Props

For any prop that require position to be on left or right, use start and end instead

## ✅ Correct

```jsx
const MyComponent = (props: { iconPosition: 'start' | 'end' }) => {
	return (
		<div className={`flex  ${iconPosition === 'start' ? 'flex-row' : 'flex-row-reverse'}`}>
			<UserIcon />
			<span>Hello World</span>
		</div>
	);
};
```

## ❌ Incorrect

```jsx
const MyComponent = (props: { iconPosition: 'left' | 'right' }) => {
	return (
		<div className={`flex  ${iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
			<UserIcon />
			<span>Hello World</span>
		</div>
	);
};
```

## ℹ️ Explanation

It is common way to use position name to be left or right in some use cases, that should be fine as long as you are
working one language ltr or rtl.

The main problem will happen when switch from ltr to rtl languages. All code will not be readable as left will mean
right and right will mean left.
