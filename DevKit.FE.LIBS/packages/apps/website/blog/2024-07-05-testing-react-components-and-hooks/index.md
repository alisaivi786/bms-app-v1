---
authors: [jghaly]
tags: [typescript, testing, vitest, jest, react]
title: Testing React Components And Hooks
---

In our previous blog post, we discussed getting started with unit testing in JavaScript/TypeScript. check it if you
missed it [here](/blog/2023/10/25/getting-started-with-unit-testing-in-js-ts-and-react) Now that we
have a testing environment set up, let's explore how to test React hooks and components.

## Testing React Components

Imagine a simple `Button` component that accepts two props: `children` and `onClick`.

```tsx
const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return <button onClick={onClick}>{children}</button>;
};
```

We want to ensure this button renders correctly and the onClick function gets called when clicked.

### Testing Rendering

```tsx
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('<Button/>', () => {
  it('should render properly', () => {
    const testText = 'test text';
    
    render(<Button onClick={() => console.log('clicked')}>{testText}</Button>);
    
    expect(screen.getByText(testText)).toBeInTheDocument();
		
  });
});
```

- `describe` is used here to define the `<Button/>` test suite
- a test suite is a group of related tests
- `it` is used to define a test
- we render the `<Button/>` and expect it to be in the document <br/>

the test should run successfully ! congrats the button component renders properly. <br/> now let's test the onClick

### Testing the click functionality

in order to test a user behavior, we have to simulate the user action. luckily `@testing-library/user-event` provides
exactly this

```tsx
import userEvent from '@testing-library/user-event';

it('should respond to an onClick', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  const testText = 'test text';
  
  render(<Button onClick={onClick}>{testText}</Button>);
  
  await user.click(screen.getByText(testText));
  
  expect(onClick).toHaveBeenCalled();
});
```

- we setup the user via `userEvent.setup()`
- we mock an onClick function using `vi.fn()`. why ? mocking the function allows us to test it and check whether it got
  called or not and a bunch of other tests
- we render the `<Button/>` and pass the onClick handler to it
- we get the `<Button/>` via the screen and click it (note that user events in `@testing-library/user-event` are async
  calls so we must wait it)
- then we expect the mocked `onClicked` to have been called<br/>

the test should run successfully! <br/>
<br/>

:::tip
<h3>Skip redundant tests: </h3>
We can skip checking things that are implied by other tests.<br/>
In our example, we had separate tests for rendering and button click functionality. 
However, testing interactions like clicks inherently verifies that the component is rendered correctly. 
When a button is clicked, it must be present in the DOM to be interactive.<br/>
We can now remove the render test and be confident that it's tested in the click functionality.
:::

## Testing React Hooks

Imagine a simple `useCounter` hook that manages a counter state and provides functions to increment and decrement it:

```tsx
import { useState } from 'react';

export function useCounter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return { count, increment, decrement };
}
```

We want to ensure that
- the hook works correctly and that count value is initialized with zero
- the value increments correctly
- the value decrements correctly
  <br/>
let's test that it initializes correctly and that count value is initialized with zero
```tsx
import { expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCounter } from './useCounter';

it("should initialize with count 0", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
});
```
- we use the `renderHook` from `@testing-library/react` to render the hook and test it in isolation without a component.
- `renderHook` returns an object containing the property `result` to test the result of the render.
- `result` contains an object with the property `current` which we use to test the current value in the render
  (note that it's preferred to test `result.current` immediately not assigning it to another variable to avoid stale closures)

<br/>
Testing that it increments correctly
```tsx
import { act } from '@testing-library/react';

it("should increment the count", () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```
we must use the `act` method to wrap actions that cause a state update/s when using `react-testing-library`.<br/>

<br/>
Testing that it decrements correctly
```tsx
it("should decrement the count", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(-1);
});
```
the tests should run successfully! <br/>
## Testing React Hooks with browser events

Imagine a hook `useIsOnline` hook that detects if the browser is online or offline based on the browser events `online` & `offline`
and also takes an optional props `onOnline` & `onOffile` that run when `online` & `offline` happens respectively.

```tsx
import { useEffect, useState } from 'react';

const useIsOnline = (props?: { onOnline?: () => void; onOffline?: () => void }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const onIsOnline = () => {
      setIsOnline(true);
      props?.onOnline?.();
    };
    const onIsOffline = () => {
      setIsOnline(false);
      props?.onOffline?.();
    };

    window.addEventListener('online', onIsOnline);
    window.addEventListener('offline', onIsOffline);

    return () => {
      window.removeEventListener('online', onIsOnline);
      window.removeEventListener('offline', onIsOffline);
    };
  }, []);

  return isOnline;
};
```

We want to ensure that the hook works correctly so we want to test

- it initializes with the state set to `true` (when first running the js in the browser, it must be online)
- it should update the state to `false` when `offline` and call the `onOffline` prop
- it should update the state to `true` when `online` and call the `onOffline` prop
- it should remove the two event listeners when unmounted (to avoid leaky subscriptions)

so let's test that it initializes with `true`
```tsx
import { expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsOnline } from './useIsOnline';

it('should return initial online state', () => {
  const { result } = renderHook(() => useIsOnline());
  
  expect(result.current).toBe(true);
});
```

now let's test the offline functionality
```tsx
import { expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useIsOnline } from './useIsOnline';

it('should update state and call onOffline when "offline" event occurs', () => {
  const onOffline = vi.fn();
  const { result } = renderHook(() => useIsOnline({ onOffline }));

  act(() => {
    window.dispatchEvent(new Event('offline'));
  });

  expect(onOffline).toHaveBeenCalledTimes(1);
  expect(result.current).toBe(false);
});
```
- we dispatch the `offline` event manually to test it

now let's test the online functionality
```tsx
  it('should update state and call onOnline when "online" event occurs', () => {
    const onOnline = vi.fn();
    const { result } = renderHook(() => useIsOnline({ onOnline }));
    // first we dispatch the offline to make sure that the value is not the initial one
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
  
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
  
    expect(onOnline).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(true);
});
```
now let's test that it removes the event listeners
```tsx
  it('should clean up event listeners on unmount', () => {
    const removerListener = vi.spyOn(global, 'removeEventListener').mockImplementation(vi.fn());
    const { unmount } = renderHook(() => useIsOnline());
  
    unmount();
  
    expect(removerListener).toHaveBeenCalledTimes(2); // 2 events, each added and removed
});
```
- we spy on the `removeEventListener` method via `vi.spyOn` and mock it's implementation via `vi.fn` to test it
- `renderHook` returns an object containing the property `unmount` which we can use to test the un-mouting of the hooks
- we call the `unmount` and `expect` the `removeEventListener` to be called twice one for the `online` and one for the `offline` event-listeners

you can now test most of the components and hooks

Congrats !
