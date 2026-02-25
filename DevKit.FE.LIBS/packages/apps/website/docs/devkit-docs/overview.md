---
sidebar_position: 1
---

# Overview

devkit packages are set of npm packages that are developed and maintained by Shory front end team to achieve the
following objectives:

- Boost the development for different products by using a well tested reusable components
- Following a common a Design Language System aligned with Shory UX team guidelines
- Provide common business use cases through a set of utilities
- Allow Shory front end developers to easily switch between different
- Ensure Shory front end products quality
- Help front end developers to share their knowledge and experience by contributing more in devkit packages

## Hosting

devkit packages are hosted in a
[private npm registry](https://dev.azure.com/shory-com/devkit/_artifacts/feed/devkit-frontend) as it is allowed only to be
used for Shory products and not authorized to be used publicly with non-shory products.

As it is a private packages, it is requiring authentication configuration steps to allow the package manager to pull
install these packages into nodejs projects.

## Development

All devkit packages' source code is hosted in a once
[private git repo](https://dev.azure.com/shory-com/devkit/_git/devkit.Frontend.Libs) and structured as monorepo. The
packages are separated based on its need and all of them start with npm package scope `@devkit`.
