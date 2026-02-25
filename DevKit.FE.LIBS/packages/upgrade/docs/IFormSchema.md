How to update IFormSchema:

1. `validations` properties was renamed to `validation`. You can use either [Zod](https://zod.dev/) or
   [yup](https://github.com/jquense/yup) to validate form
2. `validationMode` was added. It could be either:
   - zod: to validate using [Zod](https://zod.dev/).
   - yup: to validate using [yup](https://github.com/jquense/yup).
