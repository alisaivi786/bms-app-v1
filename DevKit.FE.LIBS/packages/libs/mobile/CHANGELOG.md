# @devkit/mobile

## 12.6.99

### Patch Changes

- e6e9bd9d0: [CollapsibleChildren] - rewrite animation in react-native-reanimated

## 12.6.98

### Patch Changes

- e0e93ebfa: Fix TextField errors alignment for Yahala

## 12.6.97

### Patch Changes

- 561779c63: [FullScreenLayout]: Red color issue for back arrow
- fbb40e12a: [Badge] Fix RTL layout

## 12.6.96

### Patch Changes

- ee0411684: Force ltr direction for placeholders if rtl is not explicitly requested
- 2a9ad3e97: update OverlayButton text style according to new requirements

## 12.6.95

### Patch Changes

- 04ae34b68: [useScrollToFirstError] create context and hooks for scrolling to first error [FullScreenLayout] passed
  refs from useScroll hook to KeyboardAwareScrollView and main content View

## 12.6.94

### Patch Changes

- 7d51086ca: Add focus method to OTPField component via useImperativeHandle to expose focus through ref
- 4ded796fb: Add scrollEnabled prop to CardPaymentBaseProps to make CardPaymentTelrForm scrollable

## 12.6.93

### Patch Changes

- 89fe8a5d8: Update Counter value font style according to new design
- d31997d40: [UseSrcoll] Remove custom offset for android

## 12.6.92

### Patch Changes

- 2b3c055bd: update upload file bottom sheet design

## 12.6.91

### Patch Changes

- 5a47e697d: Added onPaste handling to InputComponent (base text input); Allowed passing string expressions to onPaste
  in mapTextField

## 12.6.90

### Patch Changes

- e50728ded: [CapsuleButton]: Add minimun width
- 6400a18c4: Fix dropdown shifting on android and clicking on option if the keyboard was opened

## 12.6.89

### Patch Changes

- 09260a3e7: [FullScreenLayout]: Layout issues related to child scroll position

## 12.6.88

### Patch Changes

- 04d26c383: Fix toasts alignment for YAHALA

## 12.6.87

### Patch Changes

- 0990fe8e5: footer made sticky in Modal

## 12.6.86

### Patch Changes

- 4db40d91c: feat(OTP): convert ar to eng
- ee2f18994: fix(MKSA-1740): popover background color

## 12.6.85

### Patch Changes

- 8bf883be6: Update FullScreenLayout Header and support rightComponents

## 12.6.84

### Patch Changes

- e04500b17: Fix font issues in arabic for Yahala theme
- 293ba0836: modify font for bottom tab bar

## 12.6.83

### Patch Changes

- ce474ae5f: fix font and use animation from react native instead of "reanimated" in BottomTabBar

## 12.6.82

### Patch Changes

- fd9e5dd69: [TextInput] Add keyboard handling props

## 12.6.81

### Patch Changes

- 010df1e32: Make full BenefitItem pressable
- b3e1d2f0f: Add disableBorder parameter to Disclosures

## 12.6.80

### Patch Changes

- 6b49f554a: Update font for bottom tab bar

## 12.6.79

### Patch Changes

- 644411673: feat(MKSA-1584): add support to convert arabic digits to english
- 5d61a88ae: [CollapsibleChildren]: Delay height animation until onLayout provides valid contentHeight

## 12.6.78

### Patch Changes

- f6ffcb48e: Support FlashList for bottom sheet

## 12.6.77

### Patch Changes

- e118414ef: Update bottom tab bar styles

## 12.6.76

### Patch Changes

- bcdbf2f08: Support keyboard avoiding for text and number fields

## 12.6.75

### Patch Changes

- a2ca2fa1e: [FullScreenLayout] - added keyboardShouldPersistTaps prop for better keyboard handling

## 12.6.74

### Patch Changes

- 579fc4411: fixing alignment issue with a prop

## 12.6.73

### Patch Changes

- 8a521dd54: [Collapsible]: Collapsible item animation issue
- a854529a2: text align fix in arabic

## 12.6.72

### Patch Changes

- 513a7e9d0: [Dropdown] Fix bottom padding when a list has only one item

## 12.6.71

### Patch Changes

- 41f3c41b9: [FormFieldErrors]: text line-height issue fixes

## 12.6.70

### Patch Changes

- 448d3dd6f: [UploadFileInput]: remove error border while pending state
- 93e295525: [CardPaymentTelrForm] Improves the readability of the webview

## 12.6.69

### Patch Changes

- ae4e3b1ec: Fix LottieView import for upload file input
- 3102062c5: [MultiSelectDropdown]: Use native FlatList instead of bottomSheetFlatlist for improved scrolling
  performance

## 12.6.68

### Patch Changes

- f8114c0fe: feat(S1PRO): [UploadFile] impl image processing utilities

## 12.6.67

### Patch Changes

- d6c904619: font change
- ae28744f8: [Disclosures] Toggle behaviour (signle OR multiple)

## 12.6.66

### Patch Changes

- 5be9d705e: Support RTL for Upload Input
- fd57ac3d8: [CapsuleButton] Implement new design for error case

## 12.6.65

### Patch Changes

- c31e400d3: [UploadFileInput] Update animation

## 12.6.64

### Patch Changes

- 6fae854b6: [JourneyStepper] fix RTL layout
- 65be22041: Fix Support RTL for Dropdown
- b9ee27106: [MultiSelectDropdownBottomSheet] Remove extra bottom padding
- 8d3781703: [TextField] Flush debounced onChange before onBlur validation

## 12.6.63

### Patch Changes

- 7032be934: [CardPayment]: handle card payment component, to accept multiple redirection domains like

## 12.6.62

### Patch Changes

- fa60e3df4: [MultiSelectDropdown] Fix double padding for a footer [Dropdown] Remove keyboard padding for non searchable
  dropdown

## 12.6.61

### Patch Changes

- 93a294ce1: Fix bottom tab on arabic

## 12.6.60

### Patch Changes

- 36bab5602: Added a new "collapsedOffset" prop for Collapsible component

## 12.6.59

### Patch Changes

- 37b014728: - Add disabled state & styles to CapsuleButton
  - Fix spacing between buttons

## 12.6.58

### Patch Changes

- 4d6bb96c5: Fix camera access denied for iOS

## 12.6.57

### Patch Changes

- 98fe01834: Refactor menu buttons

## 12.6.56

### Patch Changes

- d23821c11: Fix BottomSheetFlatList layout padding override

## 12.6.55

### Patch Changes

- 803937629: [Popover]: handle popover to accept html
- 144c06df9: [DatePicker] - fix DaysViewHeader alignment for RTL

## 12.6.54

### Patch Changes

- e38eaea98: Map MIMI types with document picker types

## 12.6.53

### Patch Changes

- 725f56561: Expose uploadButtonPress from UploadFileInput using ref
- 23d1868b0: [FullScreenLayout] Fix padding for Full Screen Layout
- 58e4e21f7: Add ellipsizeMode for dropdown text
- a110f6b23: Support document picker for UploadFileInput
- a110f6b23: Support accept file types for upload file input

## 12.6.52

### Patch Changes

- 1c8e2a8c9: [DropdownMultiSelect]: change font-style to regular
- fafd96c44: Fixed stepper positioning on android
- 31f8852e0: [DatePicker] Fix stuck when user selects a date

## 12.6.51

### Patch Changes

- 14179fb9a: Resolved an issue where the Calendar component’s onChange callback was not firing when using
  `mode="interval"` together with the `staticCalendar` variant. The event handler now correctly triggers in all interval
  selections.

## 12.6.50

### Patch Changes

- d4746f66e: [TextField] Fix textfield alignment

## 12.6.49

### Patch Changes

- 46982faf3: Update tab bar styles and add center component to header
- fac48345e: [TextField] Pass direction prop to fix wrong cursor position on android
- 962a3c91b: Fix text input field padding on android
- 2e46bb529: Apply mask to initial value in textfield

## 12.6.48

### Patch Changes

- b7096b83a: touchable changed to pressable
- 32fc1439c: Mask input alignment fix

## 12.6.47

### Patch Changes

- 25ed14a53: Fix showing error on uploadFileInput

## 12.6.46

### Patch Changes

- 55601b334: [CardPayment] Memo onNavigationStateChange of Tap pay webview

## 12.6.45

### Patch Changes

- 56e4afe27: Added force direction for DropDown

## 12.6.44

### Patch Changes

- 633e0eeaa: Adapt CapsuleButton for DynamicForm

## 12.6.43

### Patch Changes

- 34baab714: [MultiSelectDropdown] Fix stuck when user applies selected items
- f23e10962: Refactor animation for bottom tab bar (no logic or functionality change)

## 12.6.42

### Patch Changes

- 625f5306b: Dropdown border and background highlight when empty data
- 769f4e6e2: Fix display of loader icon when the isLoading prop is updated by pressing another element, not the button
  itself

## 12.6.41

### Patch Changes

- 426322759: [DropdownBottomSheet]: set search input clearable and clear input on dismiss

## 12.6.40

### Patch Changes

- c3271f704: Capped max text width in badges

## 12.6.39

### Patch Changes

- f808dbf6d: [Postfix]: increase touch area

## 12.6.38

### Patch Changes

- cbf72a75f: [Dropdown] [MultiSelectDropdown] Add an option to wrap with react native modal
- 624c4abd7: Fix: remove margin from UploadFileCard

## 12.6.37

### Patch Changes

- a1aaaa058: Use pressable instead of touchableopacity in radiocard; if value is already selected, don't call setter
  again
- 40d0c4fe2: [Popover]: fix white background for android

## 12.6.36

### Patch Changes

- e137ff5fa: Redesigned UploadFileInput to match DLS design with card-based layout, multiple states (default, loading,
  success, error), and upload options bottom sheet
- a77c0827e: [Switch]: fix styles for RTL

## 12.6.35

### Patch Changes

- ace713722: [Bottomsheet]: Footer height made dynamic

## 12.6.34

### Patch Changes

- bb28a6733: [UploadFileInput] Fix Camera full screen issue

## 12.6.33

### Patch Changes

- a414dc86f: [BottomSheet] - Export BottomSheetFlatlist

## 12.6.32

### Patch Changes

- c0fddc451: edited GroupMenuButtons component
- 0b74114c3: [OTPField]: force ltr and add autofocus + hide caret
- cc03bccba: [Switch]: change switch styles
- e6263c568: [Dropdown]: impl disabled item

## 12.6.31

### Patch Changes

- f01dc6f6d: [MultiSelectDropdown] Fix buttons translations
- aa2b8f6d9: [RadioCard]: fix onClick
- 6b0ad7af2: [DatePicker] Fix gestures handling on android

## 12.6.30

### Patch Changes

- 820d26e1d: [Badge]: handle react node as title prop

## 12.6.29

### Patch Changes

- d6de1b779: [NumberField] Handle maxLength for Arabic Android to consider LTR invisible mark

## 12.6.28

### Patch Changes

- 7773330ae: Fix RadioCard checkmarks variant style
- 0b38e7ace: Fix capsule button label type

## 12.6.27

### Patch Changes

- fff3ec9cd: [CardPaymentTapForm] Fix unresponsiveness

## 12.6.26

### Patch Changes

- da3eeca35: fix gradient button styles on ios for yahala

## 12.6.25

### Patch Changes

- b526cd70c: Made horizontal paddings = 0 in primary RadioCard style. Rearranged order of style application to allow
  full override

## 12.6.24

### Patch Changes

- 9ab7c6b74: [RadioCard] Update small size to match figma design

## 12.6.23

### Patch Changes

- ea16c776b: [Dropdown] Fix scrolling issues

## 12.6.22

### Patch Changes

- 9f5be0d4a: updated switch for yahala

## 12.6.21

### Patch Changes

- f1d91fbec: Added isRtlLocale to toggle style logic

## 12.6.20

### Patch Changes

- 41bb3427c: fixed text-area styles
- 964d5d30f: [UploadInput]: impl isRequired UI + fix some styles

## 12.6.19

### Patch Changes

- 8bba8d1fd: Fix: OverlayButton bottom position

## 12.6.18

### Patch Changes

- c096be9f8: Fix: dropdown not able to scroll list

## 12.6.17

### Patch Changes

- cdd590408: Fix rtl positioning in toasts

## 12.6.16

### Patch Changes

- c0f73e1d5: Enhance capsule button to render the buttons inside wrap view or scroll view

## 12.6.15

### Patch Changes

- 284c695ea: [Calendar]: increase touch area

## 12.6.14

### Patch Changes

- 424e49e32: add support for autoswitch font families based on locale

## 12.6.13

### Patch Changes

- ac0ab2bd6: [BottomSheet] Add a prop to prevent closing on outside press

## 12.6.12

### Patch Changes

- 3d2d2b531: Changed default state of tap payment submit button to be inactive (ie 'make payment' button is inactive
  until valid card details are submitted)

## 12.6.11

### Patch Changes

- 03f79b41a: Modify radio card layout reverse in arabic

## 12.6.10

### Patch Changes

- c99c3a395: [OTPField]: Add green status for OTP
- 2deaa203d: Modify radio card layout reverse in arabic

## 12.6.9

### Patch Changes

- 5f233ed0a: set as optional stepper progress bar

## 12.6.8

### Patch Changes

- a655e2cb3: [Badge]: Style updates as per latest DLS
- b94be18bc: Modify RadioCard rtl layout

## 12.6.7

### Patch Changes

- ceb36a968: changed LinearGradiebt import

## 12.6.6

### Patch Changes

- 12d26aa1e: [Bottomsheet] Close Keyboard when bottomsheet is opened
- 4990e2140: Enabled dynamic sizing in multiselect dropown
- b3604829c: [TextField] Replaced fixed height with vertical padding for scaling support

## 12.6.5

### Patch Changes

- a3d2588ed: Enhance Capsule Button to match DLS & adding multi select funcionality

## 12.6.4

### Patch Changes

- 5fb65ff05: added moreMenuItemButton, moreMenuItemButtonGroup and progressBar components with stories

## 12.6.3

### Patch Changes

- c00b09b15: Resolve dropdown border color issue

## 12.6.2

### Patch Changes

- aa72529a1: Disable layout animation in image upload component
- ecc4f7db9: Make background color white and icon color black for tile disclosures

## 12.6.1

### Patch Changes

- 28c6f1c4a: update disclosures component for yahala theme
- c04b5ea67: updated dropdown bottom sheet

## 12.6.0

### Minor Changes

- 247236b43: impl show/hide upload and take photo buttons

## 12.5.13

### Patch Changes

- 11bdca938: Rework multiple select dropdown footer button styles
- 9151a253d: Updated error text font size from text-sm to text-caption1

## 12.5.12

### Patch Changes

- af6f44099: Add Overlay button takes array of buttons
- 8c0d66186: added moreMenuItemButton, moreMenuItemButtonGroup and progressBar components with stories
- c23d268de: [NumberField] Fix number field
- d26874374: added header component

## 12.5.11

### Patch Changes

- 0149aa612: Fix Button disabled styling for full width

## 12.5.10

### Patch Changes

- 35d9aef80: [NumberField]: Fix NumberField

## 12.5.9

### Patch Changes

- 4c34c5c05: updated text area for yahala theme

## 12.5.8

### Patch Changes

- 9cba04491: [Dropdown] - Fix typo in bg color class name

## 12.5.7

### Patch Changes

- 1d9184089: [Mobile] Toast component ui update
- 909bea8d8: - Fix keyboard handling on FulLScreenLayout
- 2037abdeb: [Datepicker] Use backdrop component instead of pressable

## 12.5.6

### Patch Changes

- 3a3b95e74: Fix alert bg color

## 12.5.5

### Patch Changes

- 3466beac2: update yahala theme error and main gradient colors
- 0669e370d: [Dropdown] Added background color
- 4f5cbe030: updated text field large for yahala theme

## 12.5.4

### Patch Changes

- cb55df3a9: [NumberField] Fix reset issue

## 12.5.3

### Patch Changes

- 6b0e6580a: Added HtmlRenderer component
- 317d5ecf6: update yahala theme error and main gradient colors
- 831c35cb5: updated components to yahala design

## 12.5.2

### Patch Changes

- e0dfe1905: Define alert colors in theme

## 12.5.1

### Patch Changes

- d26060a3c: [TextField] Propagate events from Input callbacks on mobile

## 12.5.0

### Minor Changes

- 29cf9a234: Updated Counter label color

## 12.4.60

### Patch Changes

- a9ce60416: Add fontSize to checkbox label
- ab5f50d82: Support scale InputComponent
- d21b707a7: FullScreenLayout spacing adjustment for statusbar

## 12.4.59

### Patch Changes

- ffa994395: [Dropdown] Fix RTL layout
- 610346300: [Datepicker] Use RN Modal wrapper

## 12.4.58

### Patch Changes

- a03c84e01: Fix: Dropdown keyboard listeners removing logic

## 12.4.57

### Patch Changes

- 9a6ce9bdd: [TextField]: Change bg color to bg-gray-50

## 12.4.56

### Patch Changes

- 270638ad8: Add new gradient configs
- 1fd9dd6e0: added KeyboardAwareScrollView to FullScreenLayout

## 12.4.55

### Patch Changes

- b49429d47: Change sizing in bottom sheet in dropdown
- c000a6943: Enhance counter to match Shory UI Styleguide
- 3fe99bc3b: Fix padding and scroll in AutoSuggestionDropdown

## 12.4.54

### Patch Changes

- 56cda4b3e: [CardPayment] Fix Tap import

## 12.4.53

### Patch Changes

- d7fd3e272: Fixed style for Liquid Glass

## 12.4.52

### Patch Changes

- 321bb41fa: Update Calendar UI For Yahala Theme
- a0778d05b: Added Liquid Glass component
- 6c2f8303f: update disclosures component, add chip gradient for yahala theme

## 12.4.51

### Patch Changes

- 5f44cb7f1: Add Yahala 2.0: Add secondary style
- 2dd4c1fd7: Enhance checkbox to match Shory UI Styleguide

## 12.4.50

### Patch Changes

- 69051125b: FullScreenlayout bg color change

## 12.4.49

### Patch Changes

- 07c64adb0: [CardPayment] Add Tap payment support

## 12.4.48

### Patch Changes

- 3dc463313: Add Yahala 2.0: Add secondary style

## 12.4.47

### Patch Changes

- 668605840: Add Yahala 2.0: Fix padding and gradient for buttons

## 12.4.46

### Patch Changes

- 5c2eb6fed: Add Yahala 2.0 Theme including the button styling

## 12.4.45

### Patch Changes

- bca17218d: [RadioCard] Adjust padding for filled variant

## 12.4.44

### Patch Changes

- b1ac9f65c: [RadioCard] Add filled, filled-gray and filled-dark variants

## 12.4.43

### Patch Changes

- 764fb842b: [Mobile][Popover] Handle popover width to fit content
- 94e5df126: [RadioButton] Fix header overlapping in RTL layout

## 12.4.42

### Patch Changes

- f9798245b: [Badge] Add NeutralLightGray status and DefaultRounded variant

## 12.4.41

### Patch Changes

- 942a5fd36: [Mobile][Disclosures] Fix Arabic text alignment
- 7253af16c: Fix type issue for Dropdown and MultiDropdown

## 12.4.40

### Patch Changes

- 08ba46115: [Mobile][Popover] Fix alignment in Arabic UI
- 54cb514ca: enhance web and native for dropdwon and multidropdown to support forwardRef and imperative handle for
  better control
- 415f8a3e1: [Dropdown] Pass search input placeholder

## 12.4.39

### Patch Changes

- e3e9d23dc: [RadioCard] add new variants styles for RadioCard components

## 12.4.38

### Patch Changes

- 63395d22e: Add onFocus param to AutoSuggestionDropdown + fix overflow
- a8e09a59f: [AutoSuggestionsDropdown] Fix app unresponsiveness after address selection

## 12.4.37

### Patch Changes

- fd3434146: Fix alignment of error messages for text field.
- 0ef4aea96: Hide keyboard when user pressed icon in date picker

## 12.4.36

### Patch Changes

- e9512e8b4: Hide keyboard when user pressed icon in date picker

## 12.4.35

### Patch Changes

- bcd6e0d62: [TextField] Fix placeholder misalignment and layout direction override on android
- 006ca30c4: Fix modal rounding radius and label font weight

## 12.4.34

### Patch Changes

- 3575b8011: Fix TextLink font

## 12.4.33

### Patch Changes

- fc2adf54e: [FormLabel] Fix RTL layout on mobile

## 12.4.32

### Patch Changes

- f51689816: Add BottomSheet component

## 12.4.31

### Patch Changes

- cd1ca2837: Added hideDivider param to Collapsible

## 12.4.30

### Patch Changes

- 959144a83: [Badge] Fix title style according to a styleguide
- 81f16c85b: Fix font for default theme

## 12.4.29

### Patch Changes

- ab623e9d3: [DynamicForm]:Add radiocard component for mobile

## 12.4.28

### Patch Changes

- 759208003: updating Disclosure item header title width for tile variant
- 636ca2c41: [Mobile]: resolve Android build compilation errors
- aa8c3a735: [TextField] Apply direction for input property
- bdb359029: [FormLabel] unify style for ios and android

## 12.4.27

### Patch Changes

- 38906d1ae: [Button] Fix spinner background in default theme
- 9b9709cb6: Fix interop between components that use Portal and BottomSheet (various modals + dropdown)

## 12.4.26

### Patch Changes

- 0958e29bf: Brought back portal provider for dropdown
- 71109c8e7: Fixed Popover and Dropdown styling

## 12.4.25

### Patch Changes

- 4476b4046: New bottom tabbar
- 450c4339c: Added font variant for header in Disclosures component

## 12.4.24

### Patch Changes

- d9cc01bdf: Add option to apply input mask from the end of the input string (needed for price formatting)

## 12.4.23

### Patch Changes

- b4eae603f: [Mobile][GroupButtons] Handle Html

## 12.4.22

### Patch Changes

- e683fca92: Prevent font scaling on Android for default theme

## 12.4.21

### Patch Changes

- 43ee7d775: Add new variant to Radio Card

## 12.4.20

### Patch Changes

- 41667e513: Add option to apply input mask from the end of the input string (needed for price formatting)

## 12.4.19

### Patch Changes

- 21d82bf41: Added AED symbol for Yahala

## 12.4.18

### Patch Changes

- 92b861e00: Fixed collapsible styling
- 74fad1f96: [Button] Adjust button height for a base theme
- 4d49d8b7f: Improved AutoSuggestionDropdown behavior
- 31e9aa8b0: Add header and footer capabilities to Modal

## 12.4.17

### Patch Changes

- c8edf1659: Add highlighting today's date for all themes
- c49d5afbf: Fix: 6713 [Datepicker] safe bottom padding
- 8509b9d9e: Fix calendar UI for moloYahala theme
- c324932de: Highlight today's day in next month if it is visible

## 12.4.16

### Patch Changes

- 3c817e8d7: Add tile variant style for Disclosures component
- 5118ab32c: [Modal] Fix resazable content scrolling

## 12.4.15

### Patch Changes

- 0319e3d7b: [CardPayment] Telr loader alignment

## 12.4.14

### Patch Changes

- 6ba7d983b: [Mobile]: Button Font Height Issue

## 12.4.13

### Patch Changes

- abd07372c: Add highlighting today's date for all themes

## 12.4.12

### Patch Changes

- 71ce086e4: Fix custom fonts on Android

## 12.4.11

### Patch Changes

- 71ee03984: [Text Field] Fixed prefix component alignment.

## 12.4.10

### Patch Changes

- 399cd5223: [RadioCard] Support size property
- 1a6044ee7: [Text Area]: Added variables for height and alignment

## 12.4.9

### Patch Changes

- 4fa3aaa5e: [Mobile]: Add ColumnCount Functionality for Dynamic form
- 6b4f8a574: Fix selected date or interval ui for IOS

## 12.4.8

### Patch Changes

- f38cfc246: Add mobile Counter component

## 12.4.7

### Patch Changes

- 0de1dca5b: Mobile, Font scale, remove custom android scaling
- f8b8d2296: Fix issues in AutoSuggestionDropdown on mobile

## 12.4.6

### Patch Changes

- d0c534538: reworked mobile modal component

## 12.4.5

### Patch Changes

- 066f543e2: [Mobile]: Fix padding for Radiobutton
- 91226001e: [Mobile][GroupButtons] add group buttons component to mobile

## 12.4.4

### Patch Changes

- ff8b01978: Fix locale handling in date formatter on mobile
- 73889c753: Fix animation issues in spinner

## 12.4.3

### Patch Changes

- 3bd48db91: Fix: 6163 Add size property to preffix
- a83787c04: [Mobile]: Fix Checbox Click on Label

## 12.4.2

### Patch Changes

- 4c2e02b8a: Enhanced popover tooltip behavior on mobile
- 32fcdeaed: Add auto suggestions dropdown on mobile
- 8ac48fee1: Changed mobile datepicker error styles to match web
- 345c31ee8: Add web-like spinner to mobile
- 4c5f14fe9: [Mobile]: Fix Dynamic Form Gap error incase of empty validation message
- 46a9bf98e: [OTPField] Fix race condition on android

## 12.4.1

### Patch Changes

- 18b0cfe31: [Mobile][TextField]: Fix TextField Initial Values

## 12.4.0

### Minor Changes

- ef4d6d870: [Dialog]: Add Safe Area Padding for BottomSheet Footer

### Patch Changes

- 03a6035e5: [Mobile]:Add FieldErrors for Dropdown and Multiselect Dropdown'

## 12.3.84

### Patch Changes

- f9e9a68e3: Fixed Disabled dropdown behaviour
- 7f0b38d58: Added checkbox in dynamic form
- 6af04d092: [Dropdown]: remove the hitslop from dropdown and multiselect dropdown

## 12.3.83

### Patch Changes

- 370d3f19b: added RTL support for disclosures

## 12.3.82

### Patch Changes

- 27f568aa4: [Mobile]: Add New Multi Select Dropdown Component

## 12.3.81

### Patch Changes

- 1936d3c9f: updated disclosure component for yahala

## 12.3.80

### Patch Changes

- 2b9a27d26: [TextInput] Fix vertical text offset on android for default theme

## 12.3.79

### Patch Changes

- b17fbaab6: [Button] Customize primary buttons spinner background
- d4454b72a: [RadioCard] fix text alignment for default theme
- 161f60f5b: [CardPayment] Mobile, change Telr webview redirection process

## 12.3.78

### Patch Changes

- 0703ab36d: [Mobile]: Add New FullScreen Layout
- f50e60c2c: [Badge] apply main font to Badge's title
- bc22b0685: [CardPayment] Move payment types from both web and mobile to utilities, and handle Telr in Mobile

## 12.3.77

### Patch Changes

- 0dae240d1: [Mobile]: Add new Radio button component with dynamic form compatibility

## 12.3.76

### Patch Changes

- 20c7a69e4: [Mobile]: [RadioCard]: Update Border Radios for RadioCard to Match with Figma

## 12.3.75

### Patch Changes

- fba4ee862: Fix 5751 twice call onComplite

## 12.3.74

### Patch Changes

- f4468a842: Fix: OTP code is not cleared
- b21cd4360: [Mobile]:[DynamicForm]: Update dynamic form gaps and styles to match with figma
- e9fb47063: ActionMenu: Adding check action menu component in devkit mobile

## 12.3.73

### Patch Changes

- 05bebb6e8: Add secondary colors to yahala theme

## 12.3.72

### Patch Changes

- 4b60e3180: [DatePicker] fix flickering when calendar modal shows on real devices

## 12.3.71

### Patch Changes

- 50e90dcc6: Add placeholder and fix align for Dropdown component

## 12.3.70

### Patch Changes

- aec0196e9: Added modal title position parameter on web and mobile
- 1dfaa41d1: [Mobile]: Fix Journey Stepper Header Overlapping Issue because of zIndex

## 12.3.69

### Patch Changes

- e632d8549: Added disabled property to RadioCardItem on mobile
- d183fb632: [CardPayment] Remove excessive bottom margin from Payment Form

## 12.3.68

### Patch Changes

- 05347e562: [Mobile]: Add New Journey Stepper Component

## 12.3.67

### Patch Changes

- a3b40d393: Enh: 5270 Add spacing to label Dropdown
- cbb4ed500: Add layoutClassNameTextField to DatePicker
- 540ff582a: Apply "size" prop to TextField properly and remove extra usage of FormInputGroup from DatePicker

## 12.3.66

### Patch Changes

- 637442be: [Button] Fix styling of Button component in default theme

## 12.3.65

### Patch Changes

- 75fcc412: [FormField,DatePicker] add DatePicker to FormField mapper
- 0991d86f: Fixed date picker UI on mobile and added new "staticCalendar" option
- 6eca7c4b: Set a maximum height for the input container.

## 12.3.64

### Patch Changes

- 9f50baec: [DatePicker] Improve calendar layout consistency and fix navigation/selection issues

## 12.3.63

### Patch Changes

- 38b644e4: Set a maximum height for the input container.

## 12.3.62

### Patch Changes

- 51861564: [TextField] Remove fixed line heigh and set it to be equal to its font size in default theme

## 12.3.61

### Patch Changes

- 69926483: Increase the hide/show icon pressable area

## 12.3.60

### Patch Changes

- baf41243: Fixed Password field show/hide icons

## 12.3.59

### Patch Changes

- 478122e4: Added proper handling for currency fonts
- 49c7ce60: Added Disclosures component on mobile

## 12.3.58

### Patch Changes

- 4e94f85d: Added centering for RadioCard label on mobile; changed default toggle colors

## 12.3.57

### Patch Changes

- 1780c5f4: Added debounce to otp input

## 12.3.56

### Patch Changes

- 54335337: New secondary color for yahala theme

## 12.3.55

### Patch Changes

- 739488a2: Apply default font to FormLabel and TextInput

## 12.3.54

### Patch Changes

- f617cb11: [Modal] Add maxDynamicContentSize parameter

## 12.3.53

### Patch Changes

- c31f6a00: update colors for yahala

## 12.3.52

### Patch Changes

- d819f252: [DatePicker] Fix infinite reopening

## 12.3.51

### Patch Changes

- 1c3fcad7: Updated TextField props

## 12.3.50

### Patch Changes

- 8af5a8e7: Fixed input focus when it is disabled
- 6ef724c7: Update Yahala theme

## 12.3.49

### Patch Changes

- 128a6614: [Dropdown] Fix item layout

## 12.3.48

### Patch Changes

- ebab41a9: Fixed RadioCard width when direction is set to row

## 12.3.47

### Patch Changes

- 5b2c98f4: Fixed input focus when it is disabled

## 12.3.46

### Patch Changes

- ea8ec435: Update input properties for improved autofill support on iOS and Android

## 12.3.45

### Patch Changes

- 48bf1afb: Enabled controlling type and action of keyboard action button in TextField
- 7d69c484: Fix secondary button colors in moloYahala theme

## 12.3.44

### Patch Changes

- bc5f0e1b: fixed ref for text field

## 12.3.43

### Patch Changes

- aecc8897: [UploadFileInput] Fix default import issue

## 12.3.42

### Patch Changes

- cbf45a38: [UploadFileInput] Fix component export
- d06b0345: Fixed Text padding in devkit primary button
- d191ec32: Disabled autoCorrect in TextField

## 12.3.41

### Patch Changes

- 2438c9c6: [UploadFileInput] Add UploadFileInput Component with Camera and Gallery Support

## 12.3.40

### Patch Changes

- 603490c1: update textfield search for molo yahala

## 12.3.39

### Patch Changes

- c1580bc0: updated text field and dropdown for molo yahala theme
- 1a218e9b: Added keyboard avoidance logic to DialogModal. KbHandler uses hook from bottom sheet library to make all the
  needed adjustments

## 12.3.38

### Patch Changes

- f34021ac: Edited Yahala them

## 12.3.37

### Patch Changes

- dd7905ec: Add moloYahala theme

## 12.3.36

### Patch Changes

- 037c3b3d: update alert message error style

## 12.3.35

### Patch Changes

- a662288a: Fix close animation in Modal

## 12.3.34

### Patch Changes

- fad076fc: [DatePicker] Changed calendar selection (gregorian/hijri) buttons, added story for multiple calendar version

## 12.3.33

### Patch Changes

- 4128c6b1: Add Toast component in devkit/mobile

## 12.3.32

### Patch Changes

- 0850bc3d: [Dropdown] Add title to DropdownBottomSheet

## 12.3.31

### Patch Changes

- 90c317c4: Added LinkButton component to devkit mobile

## 12.3.30

### Patch Changes

- 013f7aa7: Added fonts to defaultTheme

## 12.3.29

### Patch Changes

- 1a6c533e: Add option to validate a dropbox via form / field. Make selectedItem customizable

## 12.3.28

### Patch Changes

- 53dc9923: updated toggle switch component, applied fix for text field

## 12.3.27

### Patch Changes

- 57073d72: [Collapsible] Fix collapsible list scrolling

## 12.3.26

### Patch Changes

- 1166b76c: Added Modal Backdrop

## 12.3.25

### Patch Changes

- 2bb0d9c0: Added wrapper for OTP input

## 12.3.24

### Patch Changes

- 565881ef: Added Divider component for devkit mobile

## 12.3.23

### Patch Changes

- 88d46776: fixed RTL for radio card

## 12.3.22

### Patch Changes

- 362a13e4: Fix field error style

## 12.3.21

### Patch Changes

- 96514937: fixed error for radio button, added RTL support for dropdown and textField

## 12.3.20

### Patch Changes

- 5bb41f0c: Fixed OTP clear and edit

## 12.3.19

### Patch Changes

- 5c63fe02: Dropdown: add hitSlop

## 12.3.18

### Patch Changes

- 92b3d491: Enhanced the Collapsible component to enable being controlled from outside

## 12.3.17

### Patch Changes

- 0045d570: Fixed toggle thumb color

## 12.3.16

### Patch Changes

- c3983268: Created Cappsule Button for mobile

## 12.3.15

### Patch Changes

- fdefa243: Fixed OTP paste

## 12.3.14

### Patch Changes

- 26078e47: Fixed OTP last box
- 26078e47: implemented renderSelectedItem property for Dropdown

## 12.3.13

### Patch Changes

- fe39f674: Created Checkbox for devkit mobile

## 12.3.12

### Patch Changes

- cb7c04a4: Added Card Component

## 12.3.11

### Patch Changes

- 3f82a7d3: implemented renderSelectedItem property for Dropdown

## 12.3.10

### Patch Changes

- 591a0ae9: fix font for button
- d4854cdc: Fixed OTP field length.

## 12.3.9

### Patch Changes

- 2277efcd: Fixed onCompleteOTP callback
- 964fd60d: Fixed the build

## 12.3.8

### Patch Changes

- 89787ea5: Added molo style for text field and dropdown, fixed text field for android

## 12.3.7

### Patch Changes

- 141523df: Created Collapsible component for devkit mobile
- d92f9f67: Created Toggle Switch for devkit mobile

## 12.3.6

### Patch Changes

- 3af45558: [Mobile]: Fix storybook build

## 12.3.5

### Patch Changes

- afd42497: Updated OTP and RadioCard styles

## 12.3.4

### Patch Changes

- 8c59e798: Removed border width scaling.

## 12.3.3

### Patch Changes

- 70cc2498: Seconday button text fix

## 12.3.2

### Patch Changes

- dd67ee4f: Brought back the tailwind default values.

## 12.3.1

### Patch Changes

- 30d1da17: Global tw for devkit mobile.

## 12.3.0

### Minor Changes

- 193438ec: Dynamic sizing for tailwind

## 12.2.16

### Patch Changes

- 3ab0c4d9: Add Alert component

## 12.2.15

### Patch Changes

- bd13885e: Added urbanist fonts for mobile
- c7077946: Adjust dropdown spacing and update stories

## 12.2.14

### Patch Changes

- 8ef97bc0: Added urbanist fonts for mobile

## 12.2.13

### Patch Changes

- cf596554: [Mobile] Update Card Payment to fix issue on projects
- 78a3cf1b: Adding Date Picker for devkit mobile and fixing typescript errors for web components

## 12.2.12

### Patch Changes

- f7c7b5b0: fix otp field spacing
- 3c14e08d: Add Popover Component

## 12.2.11

### Patch Changes

- a3c27a21: Fix mobile package dependencies

## 12.2.10

### Patch Changes

- c4eb779c: Exported mobile tailwind-config file.
- 59a0189b: Added molo-theme, updated tailwind-config and Button component

## 12.2.9

### Patch Changes

- 40939e33: [CardPayment] Add CardPayment component to Mobile lib

## 12.2.8

### Patch Changes

- 09e0c588: changing otp value from array to string

## 12.2.7

### Patch Changes

- 208686b9: [Mobile] add RadioCard component

## 12.2.6

### Patch Changes

- 47d46d9b: BottomSheet fix

## 12.2.5

### Patch Changes

- 490957aa: Added Another variant to Modal and fixed export of Modal

## 12.2.4

### Patch Changes

- 271e5104: remove gesture handler package

## 12.2.3

### Patch Changes

- a2d0d0d2: Fix native packages peer dependencies

## 12.2.2

### Patch Changes

- 67433dd5: Removed gesture handler root view from modal component as it is provided at the root

## 12.2.1

### Patch Changes

- f6858fc9: Added Dynamic Form and fixed bottomsheet
- bea2a11b: Added OTP Field component for devkit/mobile package
- 6319e8e5: dropdown focus fix for mobile

## 12.2.0

### Minor Changes

- bf952c72: Minor fix to options in dropdown to accept a generic type

## 12.1.0

### Minor Changes

- 8ae69024: Added BottomSheet dropdown component for mobile
- 71ebbaa6: Added Dialog Modal for Mobile

## 12.0.26

### Patch Changes

- 16debf7f: Add RN Textfield component
