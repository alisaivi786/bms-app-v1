# @devkit/utilities

## 12.4.12

### Patch Changes

- 52b2d21f7: changed isAllSelected from the property to local computation inside of a component to fix rerender issue

## 12.4.11

### Patch Changes

- 4ded796fb: Add scrollEnabled prop to CardPaymentBaseProps to make CardPaymentTelrForm scrollable

## 12.4.10

### Patch Changes

- 5a47e697d: Added onPaste handling to InputComponent (base text input); Allowed passing string expressions to onPaste
  in mapTextField

## 12.4.9

### Patch Changes

- 9ed4eb27e: exporting subMilliseconds from date-fns

## 12.4.8

### Patch Changes

- e50728ded: [CapsuleButton]: Add minimun width

## 12.4.7

### Patch Changes

- 644411673: feat(MKSA-1584): add support to convert arabic digits to english

## 12.4.6

### Patch Changes

- 0b1d7e3b8: create function to convert arabic digits to english

## 12.4.5

### Patch Changes

- cb4734fe4: status: status 'edited' added for Text, Dropdown and Datepicker

## 12.4.4

### Patch Changes

- 151ab14c3: Add nextField prop for autofocus

## 12.4.3

### Patch Changes

- 7032be934: [CardPayment]: handle card payment component, to accept multiple redirection domains like

## 12.4.2

### Patch Changes

- 633e0eeaa: Adapt CapsuleButton for DynamicForm

## 12.4.1

### Patch Changes

- 1cc50860b: Incorrect 12hr time format with seconds showing 24hr + AM/PM

## 12.4.0

### Minor Changes

- 247236b43: impl show/hide upload and take photo buttons

## 12.3.28

### Patch Changes

- 949d31fb5: [Web] Add decimal points to NumberRange

## 12.3.27

### Patch Changes

- d26060a3c: [TextField] Propagate events from Input callbacks on mobile

## 12.3.26

### Patch Changes

- 2f4055cb3: Added payment vendor values for Mis and surplus

## 12.3.25

### Patch Changes

- e3e9d23dc: [RadioCard] add new variants styles for RadioCard components

## 12.3.24

### Patch Changes

- 25bddda51: Add optional showCardHolder and displayPaymentBrands props to CardPaymentTap component

## 12.3.23

### Patch Changes

- 20233cba9: Add Tap Payment

## 12.3.22

### Patch Changes

- ab623e9d3: [DynamicForm]:Add radiocard component for mobile

## 12.3.21

### Patch Changes

- 4bb8f6280: [RadioCard]: Update RadioCard to Support multiple Columns

## 12.3.20

### Patch Changes

- edacabc21: Support prefix inside input

## 12.3.19

### Patch Changes

- 41667e513: Add option to apply input mask from the end of the input string (needed for price formatting)

## 12.3.18

### Patch Changes

- ff8b01978: Fix locale handling in date formatter on mobile

## 12.3.17

### Patch Changes

- bc22b0685: [CardPayment] Move payment types from both web and mobile to utilities, and handle Telr in Mobile

## 12.3.16

### Patch Changes

- e632d8549: Added disabled property to RadioCardItem

## 12.3.15

### Patch Changes

- 0991d86f: Fixed date picker UI on mobile and added new "staticCalendar" option

## 12.3.14

### Patch Changes

- 5a27c505: [TextFieldAutoFillTypes]: extend TextFieldAutoFillTypes

## 12.3.13

### Patch Changes

- 93938dc1: Dropdown: Add custom render for multiselect dropdown.

## 12.3.12

### Patch Changes

- 8eb8967a: [Utilities]: Update Email Regex to sync up with backend regex
- 77a052f1: Added disabled property to RadioCardItem

## 12.3.11

### Patch Changes

- 1c3fcad7: Updated TextField props

## 12.3.10

### Patch Changes

- 0d27e57d: [Form] Fix crash on fields editing

## 12.3.9

### Patch Changes

- a9d53d8c: Adding testIds in component to support automation testing.

## 12.3.8

### Patch Changes

- 48bf1afb: Enabled controlling type and action of keyboard action button in TextField

## 12.3.7

### Patch Changes

- c1580bc0: updated text field and dropdown for molo yahala theme

## 12.3.6

### Patch Changes

- 140469b2: [CommonRegex]: Update Email Validation Regex

## 12.3.5

### Patch Changes

- 2e793b19: [useCountDownTimer]: Improve initial state

## 12.3.4

### Patch Changes

- 1a6c533e: Add option to validate a dropbox via form / field. Make selectedItem customizable

## 12.3.3

### Patch Changes

- d5e8844c: [getTzEndOfWeek, getTzStartOfWeek] updated start and end of week to be Mo-Su instead of Su-Sa

## 12.3.2

### Patch Changes

- 835ec64a: [useReactForm]: add onSubmitThrowErrors prop to throw an error if the validation fails and will rethrow the
  onSubmit exceptions if any

## 12.3.1

### Patch Changes

- 89787ea5: Added molo style for text field and dropdown, fixed text field for android

## 12.3.0

### Minor Changes

- 9bb911fa: [DatePickerRange]: Fix errors

## 12.1.8

### Patch Changes

- da819aad9: add use client to client side files in utilities lib
- 13cb7a741: preserve module level directive for utilities lib
- 8e1304b8a: Merge Master to Develop

## 12.1.17

### Patch Changes

- cc4b65d0: DatePicker: daylight saving issue, Fix month selection in Months View

## 12.1.16

### Patch Changes

- 0df6a7d6: [Date Picker and Utils] Fix daylight saving issue

## 12.1.15

### Patch Changes

- 93ea5033: Move date-fns and date-fns-tz for utilities package dependencies instead of devDependencies

## 12.1.14

### Patch Changes

- cc395841: Fix commonJS build

## 12.1.13

### Patch Changes

- b730a64b: Add commonJS build to support React Native

## 12.1.12

### Patch Changes

- 61775a85: Revert add main property to package.json

## 12.1.11

### Patch Changes

- 389ca7f7: Add main property in package.json

## 12.1.10

### Patch Changes

- 8e1304b8: Merge Master to Develop

## 12.1.9

### Patch Changes

- 3ddeeb47: DropDown: Added Direction prop for DropDown

## 12.1.8

### Patch Changes

- e07d3c9d: TextField: pass inputMode, to enable user to customize virtual keyboard

## 12.1.7

### Patch Changes

- e7e402b4: revert adding src to utilities

## 12.1.6

### Patch Changes

- 005dbb715: Add "./src" to exported files

## 12.1.5

### Patch Changes

- 15399852: Change @types/react version to be consistent

## 12.1.4

### Patch Changes

- ca32004a: DatePicker: Added feature with prop mode for Interval selection

## 12.1.3

### Patch Changes

- 0168fcb5: Date Utilities: change addSelectedTimeToDay to setTimeToDay

## 12.1.2

### Patch Changes

- 9d8b0f4b: DatePicker: Custom parse function for hijri dates

## 12.1.1

### Patch Changes

- 4ac94495: Enhanced-Logger: Add Enhanced Logger with Pino.js for enhanced server side logging

## 12.1.0

### Minor Changes

- 32f7b003: Added support for on blur for dynamic form fields

## 12.0.1

### Patch Changes

- 7336bb60: Utilities DateUtils: export hijri conversion functions, and consider hijri in parse functions. Web
  DatePicker: handle
- 7336bb60: Utilities DateUtils: export hijri conversion functions, and consider hijri in parse functions. Web
  DatePicker: handle selected calendar as internal state

## 12.0.0

### Major Changes

- b0d709bb: Major version 12.0.0 for all packages

## 11.0.0

### Major Changes

- 92bd750cc: [FormSchema/useReactForm]: update schema to accept zod with yup and rename `validations` to `validation`

### Minor Changes

- 3f3ab4122: [DropDown]: Apply DLS styles to Single Dropdown
- 9365cf84d: Adding string type support for value of radio card options
- 99a5905cc: fixed deciaml places in NumberField component
- 22036bc7f: Input Components And Buttons: Enhancements and Restructure
- f337cc535: Enhance types
- e0c1d9462: Enhance matchStringSearch function - addingt the ability to search for the exact string

### Patch Changes

- f5d9811ea: [General] Update peer dependencies
- 28d98ed6d: Merge develop branch to beta branch
- d3c63d83f: [DropDownInputComponent, MultiSelectDropdown]: Add hideValueLabel prop to DropDownInputComponent to hide
  selected items on MultiDropDown and on Dropdown Input
- 91207a847: [DateUtils]: Fix unit tests
- 327cfd626: DatePicker: Added readOnly prop to prevent entering date manually
- 2cb2192cc: update react form validation behavior to have two modes 'on-blur' or 'on-submit' and the default is
  'on-blur'. Also allow empty validation messages to show the input fields red background and border
- e2b8ea176: [Dropdown] components refactor
- df9effeb3: [useReactForm: reset field Error onSetFieldValue]
- 0bc04114b: [DateUtils]: add unit tests for DateUtils and prevent general errors.
- 379df14cb: [IBaseTextFieldProps]: publish latest type
- 313d084fe: [useReactForm] enhance validate field function to return the field errors
- cf1fd078b: [devkit/config]: Added new package for date and logger config
- bc95ba40c: DatePicker: added feature autoSelectTime
- 9185b907d: [getDuration]: Fixed month calculation
- 4514ca16f: Merge Develop Branch to Beta
- 317c58022: utitlites:shared-types:add all tailwind text fontSize classes according to the devkit config
- 2cec0f300: [Input Fields] Enhance Show Error Border [FullPage Layout] Fix User Menu if not login
- 555447e4a: export ECalendars type and Calendars object from utilities package
- 284ac9185: [DatePicker] Fix the iso timezone format, [DateGrid] Fix z-index with dropdown and date picker
- 0f8115ca7: Logger: use globalThis to set the debug setting globally for the application
- 362cf0ee3: Radio Button : Creating single radio button component.
- 64abaa39c: - ReactForm: fix validateField type
  - InputFields: Apply new Design
- 59cdc70c5: [RadioCard]: changed to accept array of cards objects with the new prop 'cards', added new
  mapRadioCardsField to the dynamic form to render RadioCards
- e376ac794: [Dropdown] fix width for non custom render dropdown
- b416eeb9f: [parseIsoDateTime] remove error in case of undefined param
- e95a8caf6: DateTimeUtils: set the configuration at globalThis instead of const to avoid missing configuration at
  monorepo packages
- 4be913850: exclude the src folder from the published package
- 905927164: adding new props "highlighted" to text-field, drop-down, date-picker, check-box, text-area, and upload file
  input
- da7eabe28: [useReactForm]: clear fieldsErrors if property is empty object
- 045cd7d78: [UseReactForm]: update validation prop to also be a function that get form values as parameter and return
  validation schema.
- 5a8171e40: useReactForm: fix validation on submit to depend on the HandleSubmit instead of form state
- 4dc316cbf: Add multi calendar feature to Date Picker component, including Hijri tabular calendar
- 18977ca8d: [Datepicker]: Added view mode support for dynamic form
- b0a92483a: [Form] Fix scrolling to the error on submit
- 5528a3976: [useReactForm] add use-form-persist hook
- 65d0241b3: translate error if a translation key is provided
- f100ac991: useReactForm: Fix validation localization when switch languge
- dceefc4c1: DatePicker: Refactor with Date Utils refactoring
- 45cb26a03: [CheckBox]: Added map CheckBox field for dynamic form
- 0b204e315: [ReactForm] Fix the validationBehavior and change interfaces names as following:

  - IReactForm -> ReactForm
  - IReactFormOptions -> ReactFormOptions
  - TFormFieldsSchema -> FormFieldsSchema
  - IDynamicForm -> DynamicForm

- 91e41b4f9: useReactForm: modify setFieldError parameter type to accept object of {type:string,message:string} along
  with string
- 0bca4a0d9: useReactFormController: add onChange to run with form and field properties
- 2f45a8f7d: ReactForm: enhance the form controller and fix submit async issue with form touch
- 091ddb2bd: [DateUtils] formatDateTime, formatDate to accept iso string or number
- 2b3aac51a: logger: stop production logging for log function, only keep warning and errors
- 825f810d8: Textfield: Adding onPaste callback
- 5047ad172: [FormFields]: Export ICommonSchema
- b305b9191: [RadioCard]: added new prop ( direction ) pass flex direction, default is flex-row
- ce9af3b4d: Adding time to a date
- 134ef0ec3: [layoutClassName]: Allow min-w, max-w and w-fit
- 1dedb4514: getIsoDateTime: consider timezone in case dateOnly is provided
- c09340155: Handle Form-Field to accept Custom Components
- 65d2fcc79: [DateUtils] add parseNumberDate util
- 790ebb414: [Fixes] Added isBeforeNow dateUtil, rename the TFormFieldSchema to FormFieldSchema
- 1ea4ad413: Radio&checkbox Buttons: updating size for both
- 03357cbc7: [DatePicker]: Fix age calculation
- 15d04a861: [RadioButton]: added new component RadioButton. [DynamicForm]: added mapRadioButtonField to dynamic form
  and it's story
- 93e97f1c8: NavigationFactory: add type safe link "devkitNextLink" to the factory
- 9800ae4dc: [shared-types][TwLinkClassName] add rtl and ltr modifiers to allowed classes
- e4471b505: CheckboxGroup: renaming prop (changedValues to highlightedOptions)
- dd346dfb0: [DateUtils]: Add getSystemDate to covert date from TZ date to system date
- ab6468878: [Form] Allow scroll to the first field has validation error
- 816c9ea7d: ConfirmDialog: center the content in desktop,tablet view only Dropdown: add boolean type to primitive keys
  AdminPageLayout: added overflow hidden to the layout content
- 5677dc955: [RadioCard]: added center prop to card object, fix style when error and custom className
- cf0da1888: DynamicForm: Allowed FormFields to be remapped and return a new schema based on another (parent) field
- 2c461f6f6: [reactform]: Fixed validation on locale change
- 7e006bbcb: MultiSelectDropdown: Added feature to select all items
- 5c30cbdf6: DropDown utilities: adding a new prop onClearValue function
- 9f234c56a: [RadioButtonGroup]: Add columnsCount prop to control the number of columns the radio buttons will span
- c2218e2e4: AppContextFactory: fix export types for isolatedModule typescript
- f1ab36f3f: [DateUtils] Fix parseTzFormattedDate utility

## 2.0.0-next.75

### Patch Changes

- cf0da188: DynamicForm: Allowed FormFields to be remapped and return a new schema based on another (parent) field

## 2.0.0-next.74

### Patch Changes

- b416eeb9: [parseIsoDateTime] remove error in case of undefined param
- c0934015: Handle Form-Field to accept Custom Components
- 7e006bbc: MultiSelectDropdown: Added feature to select all items

## 2.0.0-next.73

### Patch Changes

- 555447e4: export ECalendars type and Calendars object from utilities package

## 2.0.0-next.72

### Patch Changes

- 4dc316cb: Add multi calendar feature to Date Picker component, including Hijri tabular calendar

## 2.0.0-next.71

### Patch Changes

- cf1fd078: [devkit/config]: Added new package for date and logger config

## 2.0.0-next.70

### Minor Changes

- 9365cf84: Adding string type support for value of radio card options

## 2.0.0-next.69

### Patch Changes

- 4be91385: exclude the src folder from the published package

## 2.0.0-next.67

### Patch Changes

- 1ea4ad41: Radio&checkbox Buttons: updating size for both

## 2.0.0-next.66

### Patch Changes

- 9800ae4d: [shared-types][TwLinkClassName] add rtl and ltr modifiers to allowed classes

## 2.0.0-next.65

### Patch Changes

- 379df14c: [IBaseTextFieldProps]: publish latest type

## 2.0.0-next.64

### Patch Changes

- bc95ba40: DatePicker: added feature autoSelectTime

## 2.0.0-next.63

### Patch Changes

- 91207a84: [DateUtils]: Fix unit tests
- dd346dfb: [DateUtils]: Add getSystemDate to covert date from TZ date to system date

## 2.0.0-next.62

### Patch Changes

- 825f810d: Textfield: Adding onPaste callback

## 2.0.0-next.61

### Patch Changes

- 18977ca8: [Datepicker]: Added view mode support for dynamic form
- 45cb26a0: [CheckBox]: Added map CheckBox field for dynamic form

## 2.0.0-next.60

### Patch Changes

- 2b3aac51: logger: stop production logging for log function, only keep warning and errors

## 2.0.0-next.59

### Patch Changes

- 0f8115ca: Logger: use globalThis to set the debug setting globally for the application

## 2.0.0-next.58

### Patch Changes

- 5528a397: [useReactForm] add use-form-persist hook

## 2.0.0-next.57

### Patch Changes

- 65d0241b: translate error if a translation key is provided

## 2.0.0-next.56

### Patch Changes

- 9185b907: [getDuration]: Fixed month calculation

## 2.0.0-next.55

### Patch Changes

- e95a8caf: DateTimeUtils: set the configuration at globalThis instead of const to avoid missing configuration at
  monorepo packages

## 2.0.0-next.54

### Patch Changes

- 93e97f1c: NavigationFactory: add type safe link "devkitNextLink" to the factory

## 2.0.0-next.53

### Patch Changes

- 317c5802: utitlites:shared-types:add all tailwind text fontSize classes according to the devkit config

## 2.0.0-next.52

### Patch Changes

- 5a8171e4: useReactForm: fix validation on submit to depend on the HandleSubmit instead of form state

## 2.0.0-next.51

### Patch Changes

- da7eabe2: [useReactForm]: clear fieldsErrors if property is empty object

## 2.0.0-next.50

### Patch Changes

- 0bc04114: [DateUtils]: add unit tests for DateUtils and prevent general errors.

## 2.0.0-next.49

### Patch Changes

- 03357cbc: [DatePicker]: Fix age calculation

## 2.0.0-next.48

### Patch Changes

- ce9af3b4: Adding time to a date

## 2.0.0-next.47

### Patch Changes

- 5047ad17: [FormFields]: Export ICommonSchema

## 2.0.0-next.46

### Patch Changes

- c2218e2e: AppContextFactory: fix export types for isolatedModule typescript

## 2.0.0-next.45

### Patch Changes

- 327cfd62: DatePicker: Added readOnly prop to prevent entering date manually

## 2.0.0-next.44

### Patch Changes

- 134ef0ec: [layoutClassName]: Allow min-w, max-w and w-fit

## 2.0.0-next.43

### Patch Changes

- 2c461f6f: [reactform]: Fixed validation on locale change

## 2.0.0-next.42

### Patch Changes

- 9f234c56: [RadioButtonGroup]: Add columnsCount prop to control the number of columns the radio buttons will span

## 2.0.0-next.41

### Patch Changes

- 362cf0ee: Radio Button : Creating single radio button component.

## 2.0.0-next.40

### Patch Changes

- 15d04a86: [RadioButton]: added new component RadioButton. [DynamicForm]: added mapRadioButtonField to dynamic form and
  it's story

## 2.0.0-next.39

### Patch Changes

- f100ac99: useReactForm: Fix validation localization when switch languge

## 2.0.0-next.38

### Patch Changes

- d3c63d83: [DropDownInputComponent, MultiSelectDropdown]: Add hideValueLabel prop to DropDownInputComponent to hide
  selected items on MultiDropDown and on Dropdown Input

## 2.0.0-next.37

### Minor Changes

- e0c1d946: Enhance matchStringSearch function - addingt the ability to search for the exact string

## 2.0.0-next.36

### Minor Changes

- f337cc53: Enhance types

## 2.0.0-next.35

### Patch Changes

- e4471b50: CheckboxGroup: renaming prop (changedValues to highlightedOptions)

## 2.0.0-next.34

### Patch Changes

- 90592716: adding new props "highlighted" to text-field, drop-down, date-picker, check-box, text-area, and upload file
  input

## 2.0.0-next.33

### Patch Changes

- 1dedb451: getIsoDateTime: consider timezone in case dateOnly is provided

## 2.0.0-next.32

### Patch Changes

- f5d9811e: [General] Update peer dependencies

## 2.0.0-next.31

### Patch Changes

- 816c9ea7: ConfirmDialog: center the content in desktop,tablet view only Dropdown: add boolean type to primitive keys
  AdminPageLayout: added overflow hidden to the layout content

## 2.0.0-next.30

### Patch Changes

- e376ac79: [Dropdown] fix width for non custom render dropdown

## 2.0.0-next.29

### Patch Changes

- f1ab36f3: [DateUtils] Fix parseTzFormattedDate utility

## 2.0.0-next.28

### Patch Changes

- 790ebb41: [Fixes] Added isBeforeNow dateUtil, rename the TFormFieldSchema to FormFieldSchema

## 2.0.0-next.27

### Patch Changes

- b0a92483: [Form] Fix scrolling to the error on submit

## 2.0.0-next.26

### Patch Changes

- 65d2fcc7: [DateUtils] add parseNumberDate util

## 2.0.0-next.25

### Patch Changes

- 091ddb2b: [DateUtils] formatDateTime, formatDate to accept iso string or number

## 2.0.0-next.24

### Patch Changes

- ab646887: [Form] Allow scroll to the first field has validation error

## 2.0.0-next.23

### Patch Changes

- 284ac918: [DatePicker] Fix the iso timezone format, [DateGrid] Fix z-index with dropdown and date picker

## 2.0.0-next.22

### Patch Changes

- dceefc4c: DatePicker: Refactor with Date Utils refactoring

## 2.0.0-next.21

### Patch Changes

- b305b919: [RadioCard]: added new prop ( direction ) pass flex direction, default is flex-row

## 2.0.0-next.20

### Patch Changes

- 0bca4a0d: useReactFormController: add onChange to run with form and field properties

## 2.0.0-next.19

### Patch Changes

- 5c30cbdf: DropDown utilities: adding a new prop onClearValue function

## 2.0.0-next.18

## 1.6.0

### Minor Changes

- bcfc7a61: updated formatDateTime to return 12 hours or 24 hours format

## 2.0.0-next.17

### Minor Changes

- 22036bc7: Input Components And Buttons: Enhancements and Restructure

## 2.0.0-next.16

### Patch Changes

- 91e41b4f: useReactForm: modify setFieldError parameter type to accept object of {type:string,message:string} along
  with string

## 2.0.0-next.15

### Patch Changes

- 28d98ed6: Merge develop branch to beta branch

## 2.0.0-next.14

### Patch Changes

- e2b8ea17: [Dropdown] components refactor

## 2.0.0-next.13

### Patch Changes

- 2f45a8f7: ReactForm: enhance the form controller and fix submit async issue with form touch

## 2.0.0-next.12

### Patch Changes

- 5677dc95: [RadioCard]: added center prop to card object, fix style when error and custom className

## 2.0.0-next.11

### Patch Changes

- df9effeb: [useReactForm: reset field Error onSetFieldValue]

## 2.0.0-next.10

### Minor Changes

- 99a5905: fixed deciaml places in NumberField component

## 2.0.0-next.9

### Patch Changes

- 2cec0f3: [Input Fields] Enhance Show Error Border [FullPage Layout] Fix User Menu if not login

## 2.0.0-next.8

### Patch Changes

- 64abaa3: - ReactForm: fix validateField type
  - InputFields: Apply new Design

## 2.0.0-next.7

### Patch Changes

- 0b204e3: [ReactForm] Fix the validationBehavior and change interfaces names as following:

  - IReactForm -> ReactForm
  - IReactFormOptions -> ReactFormOptions
  - TFormFieldsSchema -> FormFieldsSchema
  - IDynamicForm -> DynamicForm

## 2.0.0-next.6

### Minor Changes

- 3f3ab41: [Dropdown]: Apply DLS styles to Single Dropdown

## 2.0.0-next.5

### Patch Changes

- 2cb2192: update react form validation behavior to have two modes 'on-blur' or 'on-submit' and the default is
  'on-blur'. Also allow empty validation messages to show the input fields red background and border

## 2.0.0-next.4

### Patch Changes

- 313d084: [useReactForm] enhance validate field function to return the field errors

## 2.0.0-next.3

### Patch Changes

- 045cd7d: [UseReactForm]: update validation prop to also be a function that get form values as parameter and return
  validation schema.

## 2.0.0-next.2

### Patch Changes

- 4514ca1: Merge Develop Branch to Beta

## 2.0.0-next.1

### Patch Changes

- 59cdc70: [RadioCard]: changed to accept array of cards objects with the new prop 'cards', added new mapRadioCardsField
  to the dynamic form to render RadioCards

## 2.0.0-next.0

### Major Changes

- 92bd750c: [FormSchema/useReactForm]: update schema to accept zod with yup and rename `validations` to `validation`

## 1.5.31

### Patch Changes

- 20293d3: CommonRegex: Added new regex called alphaNumericEnglishWithSpecialCharacter

## 1.5.30

### Patch Changes

- 3f1060a: NumberRangeField: Added twoColumns prop

## 1.5.29

### Patch Changes

- 977a5af: [CommonRegex]: Add alphaNumericArabicAndEnglish regex

## 1.5.28

### Patch Changes

- bde6547: [DynamicForm]: optimize condition for FormNonEditableField

## 1.5.27

### Patch Changes

- eb50101: [DynamicForm]: changed return type

## 1.5.26

### Patch Changes

- c3e625d: Multi Select Dropdown type addition

## 1.5.25

### Patch Changes

- 6a76db1: ICommonFieldProps: Adding variant for tooltip in form fields.

## 1.5.24

### Patch Changes

- 5e155f6: [DatePicker]: validate time 00/00/0000

## 1.5.23

### Patch Changes

- f359644: [DateUtils]: formatDateTime added showSecondes parameter

## 1.5.22

### Patch Changes

- a98b9db: [Dynamic form] add support for custom field render

## 1.5.21

### Patch Changes

- 186ec3c: [DynamicForm, all field components]: added description prop

## 1.5.20

### Patch Changes

- 388dc17: useReactForm: giving setFieldsValue for setting multiple fields at once

## 1.5.19

### Patch Changes

- 55dc14d: Package.json: updated exported files for use in Mobile-App

## 1.5.18

### Patch Changes

- c76f766: NumberFieldRange: Added new component to dynamic form to map between two numbers

## 1.5.17

### Patch Changes

- fd0ba56: [Dropdown]: added hideSelectedOptions prop

## 1.5.16

### Patch Changes

- 13938c0: [MultiTextField.tsx]: exposed regex, and mask props for dynamic form use

## 1.5.15

### Patch Changes

- e1d16ee: @hookform/resolver:update package

## 1.5.14

### Patch Changes

- fad6b0f: MultiTextField: Added new component that contains two text fields

  DynamicForm: Added new type (multi-text) to render MultiTextField component

## 1.5.13

### Patch Changes

- 937e7ac: FormFieldSchema: Added new function called mapTextAreaField to the form field schema

  DynamicForm: Added new check to render the text area

## 1.5.12

### Patch Changes

- 5a0dff8: JSON Card: added JSON Card to neatly display JSON, Added related utils.

## 1.5.11

### Patch Changes

- 98cad5a: CommonRegex: Add uaeMobileNumber regex

## 1.5.10

### Patch Changes

- 7adc477: react-hook-form version upgraded

## 1.5.9

### Patch Changes

- bb45df4: ICommonSchema: Added new optional prop called onRenderNoneEditable

## 1.5.8

### Patch Changes

- b2ff3fa: fix typescript issues and linting

## 1.5.7

### Patch Changes

- 3e12199: isBefore: Fix function logic

## 1.5.6

### Patch Changes

- 0ddd6ed: Dropdown & multiSelectDropdown: Refactor Dropdown and multiSelectDropdown
- 0ddd6ed: Dropdown & multiSelectDropdown: Add Mobile Responsiveness

## 1.5.5

### Patch Changes

- 7825675: Mask: fix mask cursor position & input values

## 1.5.4

### Patch Changes

- a47c5d1: useReactForm: Fixing reset form field error.

## 1.5.3

### Patch Changes

- 0a24e56: CommonRegex Email Regex: Update email regex to match BE's

## 1.5.2

### Patch Changes

- CommonRegex: update email regex

## 1.5.1

### Patch Changes

- 8680d9d: DatePickerRange: added new prop 'twoColumns' to make the field take two colums wide, DynamicForm.stories:
  added example for DateTimePickerRange with the twoColumns prop

## 1.5.0

### Minor Changes

- a7cce71: All: Update dependencies to latest version

## 1.4.1

### Patch Changes

- 1ac7dbe: CommonRegex: email regex to have max 4 characters for commercial part, DynamicForm.stories.tsx: added email
  field with the updated regex validation

## 1.4.0

### Minor Changes

- 63d5a3f: [DatePickerRange]: Replace old props(fromDate/toDate) with new props: minStartDate, maxStartDate, minEndDate,
  maxEndDate + add new stories

## 1.3.0

### Minor Changes

- 51bf9f4: Logger: Bind logs to console & update environments configs

## 1.2.2

### Patch Changes

- a155cb5: useMask: add the new hook useMask to be used for formatting purpose. it can two functions one to apply mask
  and other to extract value from mask

## 1.2.1

### Patch Changes

- 9c5ab89: useReactForm: Fix set field error to undefined to remove the field error and fix reset form to remove the
  custom errors

## 1.2.0

### Minor Changes

- 0b29ad1: useReactForm: Fix set field additional error to be persisted and be removed only on value change

## 1.1.3

### Patch Changes

- e65e65b: useReactForm: Add default values param to resetForm

## 1.1.2

### Patch Changes

- 794da0a: CommonRegex: Update email regex

## 1.1.1

### Patch Changes

- cb89f94: Fix alphabetEnglish Regex
