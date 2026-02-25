---
tags: [tailwindcss, css]
---

# Preferred Flex or Grid Gap

While implementing a component structure, using gap with flex or grid is preferred than using top, bottom start, end
padding or margin.

## ✅ Correct

```jsx
const MyComponent = () => {
	return (
		<div className="flex flex-col gap-5">
			<div>Child component 1</div>
			<div>Child component 2</div>
			<div>Child component 3</div>
		</div>
	);
};
```

## ❌ Incorrect

```jsx
const MyComponent = () => {
	return (
		<div>
			<div className="mb-5">Child component 1</div>
			<div className="mb-5">Child component 2</div>
			<div>Child component 3</div>
		</div>
	);
};
```

## ℹ️ Explanation

Using flex or grid gaps will make the style structure more readable and enforce consistency when some the gap need to be
changed between child components
