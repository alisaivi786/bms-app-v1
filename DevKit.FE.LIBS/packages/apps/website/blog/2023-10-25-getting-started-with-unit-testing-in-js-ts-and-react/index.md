---
authors: [jghaly]
tags: [typescript,testing,vitest,jest,react]
title: Getting Started With Unit Testing In JS/TS And React
---

Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently tested. The goal is to verify that each unit of code meets its design and behaves as expected.
In simpler terms unit testing is isolating the smallest sets of code and testing them to verify that they behave as expected.

## What do you need to get started?

1.  a testing framework like Vitest or Jest (personally I prefer Vitest).
2.  a project to test. I provided a repo to get started with [here](https://github.com/JanKaram2020/vitest-tutorial) ( start with main and compare your branch at every step with the "steps" branch) but you can start with any project

## Why Vitest, not Jest?

1.  It's significantly faster than Jest.
2.  Out-of-box ESM, TypeScript, and JSX support powered by esbuild.
3.  In watch mode, it's smart and only reruns the related changes, just like HMR for tests!
4.  If you know Jest you already know Vitest, it provides a Jest-compatible API that allows you to use it as a drop-in replacement in most projects.
    you only have to change a few things, and you're good to go. check the migration guide [here](https://vitest.dev/guide/migration.html#migrating-from-jest)

## Installing Vitest in your project

``` shell
yarn add -D vitest vite jsdom
```

to test react components and/or hooks run

``` shell
yarn add -D @vitejs/plugin-react @testing-library/user-event @testing-library/react @testing-library/jest-dom
```

if you have typescript paths (absolute imports) configured in your project run

``` shell
yarn add -D vite-tsconfig-paths
```

## Configuring Vitest

### Make a file in the root of the project called `vitest.config.ts` with the following code

``` ts showLineNumbers
// to only use absolute imports defined in TS

import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()]
});

// to test react use the following

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
   environment: 'jsdom',
   setupFiles: ['./tests/setupTests.ts'],
  },
});
```

`@vitejs/plugin-react` enables HMR to react in development.
`vite-tsconfig-paths` makes vite use the paths defined in your tsconfig.
`environment: 'jsdom'` by default the environment is `node` which means that any code meant for the browser can't run in the test, so we use jsdom which provides a browser-like environment to run the test in it.

### Make file called `tests/setupTests.ts` with the following code (in case of React testing)

``` ts showLineNumbers
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

The `@testing-library/jest-dom/vitest` library provides a set of custom jest/vitest matchers that you can use to extend jest/vitest. These will make your tests more declarative, clear to read, and maintain. Check the docs [here](https://www.npmjs.com/package/@testing-library/jest-dom) to see the added matchers

the after each cleanup configures Vitest and @testing-library/react to clean up after running every test so that each test can run on a clean slate

### Add the following script to your `package.json`

``` json
"test": "vitest run",
```

## Writing our first test

let's start with something simple create a file called `tests/add.ts` with the following code

```ts showLineNumbers
export const add = (a:number, b:number) => a + b;
```

to test a unit is to check whether it matches something<br/>
eg: you expect 1 + 2 = 3\. this is human language<br/>
in TS/JS you write `expect(1+2).toEqual(3)`<br/>
there are a lot of matchers for different types<br/>
eg: `expect(function).toHaveBeenCalled()`<br/>
eg: `expect(object).toHaveProperty(property)`<br/>
eg: `expect(array).toContain(element)`<br/>
eg: `expect(boolean).not.toBe(false)`<br/>

to create a test file you must use the extension `.spec.(ts/tsx/js/jsx)` or `.test.(ts/tsx/js/jsx)` A spec comes from "specification" where you specify how code should behave, the extension doesn't change anything in how we write the tests it's just a preference. so create a file in the same folder you created the add file called `add.test.ts` with the following code

```ts showLineNumbers
import {add} from  './add';
import { expect, test } from  'vitest'

test("add()" , () => {
    expect(add(1,2)).toBe(3);
})
```

then fire up the terminal and run `yarn test`

congratulations! you just ran your first test successfully.
