# @devkit/web

## 12.9.38

### Patch Changes

- 4f52a2892: ButtonDropdown: horizontal Overflow handled through floating portal

## 12.9.37

### Patch Changes

- eb9063e49: GroupButton:variables updated
- 8b446b5c3: Adjust RTL styles for ToggleSwitch
- 37125b30e: Button: Theme variable for font size

## 12.9.36

### Patch Changes

- 876148599: ButtonDropdown: Fix issue - Sync with values from parent
- 52b2d21f7: changed isAllSelected from the property to local computation inside of a component to fix rerender issue

## 12.9.35

### Patch Changes

- 2b3d997f0: ButtonDropdown: Fix issue of Group not ticked when disabled
- 87114fc57: theme variables added to Stepper & Breadcrumbs

## 12.9.34

### Patch Changes

- 27e218d5d: added "_N_ selected" based on the amount of selected items

## 12.9.33

### Patch Changes

- 46eb86a4e: ButtonDropdown : Add new component
- b66a75d3a: Updated theme variables, added stories for group button and tab navigation
- 46eb86a4e: Datagrid: Actions space updated, added column selector property
- dfcd4b97d: ButtonDropdown: added feature for disabled option
- 46eb86a4e: TabNavigation: variant - Gradient added

## 12.9.32

### Patch Changes

- 9ed4eb27e: TabNavigation: variant - Gradient added

## 12.9.31

### Patch Changes

- 64331be02: Normalize Arabic digits before masking/validation to handle undefined input safely, preventing the first
  change from emitting undefined when auto converting.

## 12.9.30

### Patch Changes

- f9e260fc0: [TextField] Fix convertArabicDigitsToEnglish

## 12.9.29

### Patch Changes

- e66abbd85: Added close icon support to BottomSheet component. The BottomSheet now displays a close button in the
  header when `hasCloseICon` prop is set to true
- 7c7338fdb: Semibold Font added for Mulem
- # 208735770: lowered font weight for sidebar menu items
- e66abbd85: Added close icon support to BottomSheet component. The BottomSheet now displays a close button in the
  header when `hasCloseICon` prop is set to true

## 12.9.28

### Patch Changes

- 644411673: feat(MKSA-1584): add support to convert arabic digits to english
- # b53f51234: add small icon for reduced sidebar in partners header
- 644411673: feat(MKSA-1584): add support to convert arabic digits to english

## 12.9.27

### Patch Changes

- 08a598a9c: [OTPField]: Auto convert Arabic digits to English
- # f70023d7c: update button primary shadow
- 08a598a9c: [OTPField]: Auto convert Arabic digits to English

## 12.9.26

### Patch Changes

- 0b1d7e3b8: feat: replace using local func for web to use from package
- # 875c3a67d: Datagrid: Design update
- 0b1d7e3b8: feat: replace using local func for web to use from package

## 12.9.25

### Patch Changes

- 81e7db92a: [TextField]: NumberField accepts arabic numarics
- 9fa81dc17: Add badge prop for drawer's item

- # 737f78c04: Disclosure: Design updated, added more variables, added tooltip to header
- 81e7db92a: [TextField]: NumberField accepts arabic numarics
- 9fa81dc17: Add badge prop for drawer's item

## 12.9.24

### Patch Changes

- 4f62566a0: handle language switch with one market

## 12.9.23

### Patch Changes

- cb4734fe4: status: status 'edited' added for Text, Dropdown and Datepicker

## 12.9.22

### Patch Changes

- aa18dbcdb: DatePicker Interval: Auto select end date & Ui improvement

## 12.9.21

### Patch Changes

- 8e2237489: PartnerPageLayout component added
- c17f3348f: Fixed an issue where Dropdown items were randomly auto-selecting on iOS devices by removing incorrect hover
  detection logic.
- Updated dependencies [8e2237489]
  - @devkit/icons@12.0.15

## 12.9.20

### Patch Changes

- 1925da6f2: Update PCFC secondary button color

## 12.9.19

### Patch Changes

- b008b5122: [Badge] Make title prop accept ReactNode

## 12.9.18

### Patch Changes

- 85743abfe: Input Label size variable
- 194f17f71: [DataGrid]: add arabic translation for PageSizeOptions component text

## 12.9.17

### Patch Changes

- 40892b69e: integrate MarketSwitcher into DashboardLayout and enhance fullPageLayout with marketSwitch

## 12.9.16

### Patch Changes

- 52570b8c6: Add marketSwitch feature in full page layout
- Updated dependencies [52570b8c6]
  - @devkit/icons@12.0.14

## 12.9.15

### Patch Changes

- 3a1398c29: Fix nested BottomSheet infinite scroll for Dropdown on mobile and add regression Storybook story

## 12.9.14

### Patch Changes

- Datagrid: Variable for Header broder Top and Bottom, fontsize, color, bg color and weight

## 12.9.13

### Patch Changes

- 3e55c5b89: Mulem1:Added new Theme for Mulem1, Mulem side menu update, GroupButton: Mulem design variables, Datagrid:
  Paging size options added

## 12.9.12

### Patch Changes

- 8f6e9c675: Preserve default Tailwind background image utilities by spreading `defaultTheme.backgroundImage` in the
  config.

## 12.9.11

### Patch Changes

- e6af86092: [stepper.styles] Fixed an issue where the stepper component's styles were not being applied correctly in
  arabic locale.

## 12.9.10

### Patch Changes

- 86fd6fab6: [stepper.styles] Adjusted styles for stepper component to enhance visual consistency and clarity.

## 12.9.9

### Patch Changes

- cb8991ff3: [Camera] Add iOS 26 Safari workaround to fix gap appear on fullScreen modal issue

## 12.9.8

### Patch Changes

- 7798308cb: [SimpleStepper] Support new props to customize stepper appearance direction: 'horizontal' | 'vertical'
  (default: 'horizontal') showNumbers: boolean (default: true) circleStyle: 'border' | 'filled' (default: 'border')
  variant: 'brand' | 'black' (default: 'brand')

## 12.9.7

### Patch Changes

- cd0041678: [RadioCard] Update font size and padding for label and placeholder based on size prop, and update gap
  between elements.

## 12.9.6

### Patch Changes

- 0bd7af795: [UploadFile] add conditional border styling for error state in CurrentStageComponent and fix alignment
  logic in Upload component

## 12.9.5

### Patch Changes

- fc1e7e46c: [scroll-bar]: Fix lazy-load scroll end detection in Dropdown component

  Replace strict equality checks with tolerant epsilon-based detection for end-of-scroll in both devkitSimpleBar
  (desktop) and BottomSheet (mobile) components. This fixes an intermittent issue where the dropdown would get stuck at
  the bottom without fetching more options, especially on mobile devices (iOS/Safari) due to fractional pixel values and
  momentum scrolling behavior.

## 12.9.4

### Patch Changes

- 19c94cc3f: [Modal]: Update onClose prop type to be optional

## 12.9.3

### Patch Changes

- a6bcb3949: [FullPageLayout] Fix Safari26 bottom gap issue

## 12.9.2

### Patch Changes

- 58d537236: [TextField]: Fix initial mask not applied

## 12.9.1

### Patch Changes

- b3cb84d5e: [TextField]: Fix font size for Suffix and Prefix

## 12.9.0

### Minor Changes

- 247236b43: impl show/hide upload and take photo buttons

## 12.8.21

### Patch Changes

- 440d33a88: [RadioCard]: Update style (border, rounded) for Aldar Theme

## 12.8.20

### Patch Changes

- 949d31fb5: [Web] Add decimal points to NumberRange
- Updated dependencies [949d31fb5]
  - @devkit/utilities@12.3.28

## 12.8.19

### Patch Changes

- 6def85f11: [Web]: Update Classname to maintain consistency and fix border styles for radiocard

## 12.8.18

### Patch Changes

- 48348d457: revert export cjs

## 12.8.17

### Patch Changes

- 464396ecd: [Web]: Resolves module resolution error when importing @devkit/web/dist/tailwind/main.css

## 12.8.16

### Patch Changes

- Updated dependencies [d26060a3c]
  - @devkit/utilities@12.3.27

## 12.8.15

### Patch Changes

- Updated dependencies [2f4055cb3]
  - @devkit/utilities@12.3.26

## 12.8.14

### Patch Changes

- f14f4b0d2: Export web package as commonjs on dist/cjs

## 12.8.13

### Patch Changes

- e37c10b1e: [UploadFileInput]: Enhanced `showFileUpload` and `showTakePicture` props to properly control action
  visibility, with improved handling of the `disabled` state.

## 12.8.12

### Patch Changes

- c23ec52a3: [Secondary Button]: Updated secondary button style to use transparent background instead of white

## 12.8.11

### Patch Changes

- b1ac9f65c: [RadioCard] Add filled, filled-gray and filled-dark variants

## 12.8.10

### Patch Changes

- 54cb514ca: enhance web and native for dropdwon and multidropdown to support forwardRef and imperative handle for
  better control
- 6d8b09d5f: [Badge] add new NeutralLightGray status option

## 12.8.9

### Patch Changes

- e3e9d23dc: [RadioCard] add new variants styles for RadioCard components
- Updated dependencies [e3e9d23dc]
  - @devkit/utilities@12.3.25

## 12.8.8

### Patch Changes

- 25bddda51: Add optional showCardHolder and displayPaymentBrands props to CardPaymentTap component
- Updated dependencies [25bddda51]
  - @devkit/utilities@12.3.24

## 12.8.7

### Patch Changes

- 20233cba9: Add Tap Payment
- Updated dependencies [20233cba9]
  - @devkit/utilities@12.3.23

## 12.8.6

### Patch Changes

- aa30d69f0: [TextEllipsisTooltip]: add customizable tooltip direction prop

## 12.8.5

### Patch Changes

- 30a5d3b87: [MobileLayoutTabNavigation]: remove hover effect
- 09f96462b: [BottomSheet]: prevent background content click until it closed
- 8303b1abb: [Dropdown]: Add bodylock scroll when focussed

## 12.8.4

### Patch Changes

- ea163a844: (shory-one) enhancement (74222): fix input handling when mask is applied

## 12.8.3

### Patch Changes

- Updated dependencies [ab623e9d3]
  - @devkit/utilities@12.3.22

## 12.8.2

### Patch Changes

- 4bb8f6280: [RadioCard]: Update RadioCard to Support multiple Columns
- Updated dependencies [4bb8f6280]
  - @devkit/utilities@12.3.21

## 12.8.1

### Patch Changes

- a4c45b79d: [DialogModal]: Update styles for tiny variant to match with styleguides

## 12.8.0

### Minor Changes

- 195f14b78: [DataGrid]: change "without-border" to "flat" and add new table variant "flat-striped"

### Patch Changes

- c9f11ec64: show subrows for mobile inside data grid

## 12.7.24

### Patch Changes

- 8707b7e91: [DataGrid]: Add container prop that accepts children and returns them wrapped in a custom container

## 12.7.23

### Patch Changes

- 2389d9684: [UploadFileInput] Fix double border case

## 12.7.22

### Patch Changes

- edacabc21: Support prefix inside input
- Updated dependencies [edacabc21]
  - @devkit/utilities@12.3.20

## 12.7.21

### Patch Changes

- 98dd45927: [UploadFileInput]: Align bg and border with brand design

## 12.7.20

### Patch Changes

- 41667e513: Add option to apply input mask from the end of the input string (needed for price formatting)
- Updated dependencies [41667e513]
  - @devkit/utilities@12.3.19

## 12.7.19

### Patch Changes

- af29877bb: [TextField] - Fix decimal point input issues in TextField component
- fae553923: [DatePicker] Fix disabled state for age

## 12.7.18

### Patch Changes

- 8b29a7f4d: [Tailwind Colors]: Add new purple color palette

## 12.7.17

### Patch Changes

- 172659a40: [DataGrid]: add the ability to hide expand columns arrow and show paging Disclaimer

## 12.7.16

### Patch Changes

- 724585e74: Add on value change custom function to the dynamic report component form fields

## 12.7.15

### Patch Changes

- 75c9b075b: [UploadFile]: Adjust layout

## 12.7.14

### Patch Changes

- 053adc7dd: Add pcfc theme

## 12.7.13

### Patch Changes

- 7f36ad0dc: [PdfPreview] Downgrade react-pdf version due to lack of nodejs 20 runtime support of new one

## 12.7.12

### Patch Changes

- 9e09be738: [DataGrid]: improve action visibility when pageSizePosition is not top
- 44ae16ded: [PdfPreview] Update react-pdf version

## 12.7.11

### Patch Changes

- b12f4382b: [DataGrid]: resolve the issue with react hook ordering.
- 13c194ec5: [DataGrid]: fix onPagingAndSortingStateChanged multiple calls

## 12.7.10

### Patch Changes

- Updated dependencies [ff8b01978]
  - @devkit/utilities@12.3.18

## 12.7.9

### Patch Changes

- 4dbb81878: option to hide popover when target is covered

## 12.7.8

### Patch Changes

- 240d995aa: Add counter component

## 12.7.7

### Patch Changes

- ccff9d065: [ActionMenu]: Add optional iconStart, iconEnd and hideIconEnd props

## 12.7.6

### Patch Changes

- 59bd7a2cd: fix grid responsive card width to include gap width

## 12.7.5

### Patch Changes

- 8189f51f7: Add ejar theme to rollup config

## 12.7.4

### Patch Changes

- eecc174c1: Add Ejar theme

## 12.7.3

### Patch Changes

- 0c2e45f75: fix grid mobile responsive card width

## 12.7.2

### Patch Changes

- 1a23cb61a: Add live-aldar theme

## 12.7.1

### Patch Changes

- 47d1328e7: fix table mobile responsive cards layout

## 12.7.0

### Minor Changes

- bc22b0685: [CardPayment] Move payment types from both web and mobile to utilities, and handle Telr in Mobile

### Patch Changes

- Updated dependencies [bc22b0685]
  - @devkit/utilities@12.3.17

## 12.6.11

### Patch Changes

- 2ecb15f69: [BottomSheet, Modal]: add hideBottomSheetContentScroll props, to hide BottomSheet scroll bar in content

## 12.6.10

### Patch Changes

- e3babeaf4: grid add mobile responsive header render

## 12.6.9

### Patch Changes

- c0dbf0615: WIO theme - Color code update

## 12.6.8

### Patch Changes

- c5cb706d3: grid add page size control position

## 12.6.7

### Patch Changes

- aec0196e9: Added modal title position parameter on web and mobile

## 12.6.6

### Patch Changes

- 662e9f84d: [DataTable]: Add z-index to frozen column to fix overflow
- e632d8549: Added disabled property to RadioCardItem
- Updated dependencies [e632d8549]
  - @devkit/utilities@12.3.16

## 12.6.5

### Patch Changes

- 4097798a2: fix popover losing shadow on clicking non focus elements

## 12.6.4

### Patch Changes

- 78731ffea: fix invalid row bg color when frozen

## 12.6.3

### Patch Changes

- f77e3773: add table invalid row validator to show error background for invalid rows
- e97d45bb: add table outlined border variant

## 12.6.2

### Patch Changes

- Updated dependencies [0991d86f]
  - @devkit/utilities@12.3.15

## 12.6.1

### Patch Changes

- 644f5944: [Breadcrumb] add support for isDisabled

## 12.6.0

### Minor Changes

- bd7b31d1: [DataGrid]: Add new table prop "headerColor"

## 12.5.11

### Patch Changes

- 117ad082: [BottomSheet] Support onScrollEndReach property for infinite scroll on Mobile

## 12.5.10

### Patch Changes

- d9270e67: [TextField]: Show password icon on iPhone Safari

## 12.5.9

### Patch Changes

- 46d36be1: Wio Bank Theme changes

## 12.5.8

### Patch Changes

- Updated dependencies [5a27c505]
  - @devkit/utilities@12.3.14

## 12.5.7

### Patch Changes

- ac7b5224: [Web]: Hide Password Toggle icon for iOS Safari in TextField

## 12.5.6

### Patch Changes

- d9e50e34: Update file upload styles

## 12.5.5

### Patch Changes

- 42aebd35: [UploadFilesInput]: Fix showing uploaded file name
- 42aebd35: [UploadFilesInput]: Fix upload file input padding issue

## 12.5.4

### Patch Changes

- 4fdc1bc2: GroupButtons: Make label of groupButton to accept html as string

## 12.5.3

### Patch Changes

- be3d463b: TextField: fix cursor location with show and hide password

## 12.5.2

### Patch Changes

- 93938dc1: Dropdown: Add custom render for multiselect dropdown.
- Updated dependencies [93938dc1]
  - @devkit/utilities@12.3.13

## 12.5.1

### Patch Changes

- 4ccca0d7: CollapsibleForm: Fix collapse flicking

## 12.5.0

### Minor Changes

- b8141f18: [CardPayment] Make responsive 3DS bottomsheet fullscreen

## 12.4.6

### Patch Changes

- 861bf484: [UploadFilesInput] Move label and error inside the upload container

## 12.4.5

### Patch Changes

- a21d86bb: [UploadFilesInput][Image-card-variant]

  - Fix showTakePicture
  - Fix file name overflow
  - Update design

## 12.4.4

### Patch Changes

- af81d459: TextField: fix show password icon functionality with focus/blur with SSR

## 12.4.3

### Patch Changes

- 9a190dd0: Dynamic Report - Add new option to pass custom functions to form reset

## 12.4.2

### Patch Changes

- 77a052f1: Added disabled property to RadioCardItem
- Updated dependencies [8eb8967a]
- Updated dependencies [77a052f1]
  - @devkit/utilities@12.3.12

## 12.4.1

### Patch Changes

- b4495a4d: DataGrid: desktop view hidden when mobile responsive view is used
- Updated dependencies [1c3fcad7]
  - @devkit/utilities@12.3.11

## 12.4.0

### Minor Changes

- 54380596: Fix losing focus issue in AutoSuggestDropdown and change type of value to be an object

## 12.3.69

### Patch Changes

- e4a94d8a: [Badge] Add DefaultRounded variant and size property
- 43e268ae: UploadFile: Fixing flashlight on take photo.

## 12.3.68

### Patch Changes

- Updated dependencies [0d27e57d]
  - @devkit/utilities@12.3.10

## 12.3.67

### Patch Changes

- c7ccb9ed: Fix DataGrid width in mobile view

## 12.3.66

### Patch Changes

- b6dd364c: DateTime: fix time selection in case of the browser rem is set to value different than 16px

## 12.3.65

### Patch Changes

- 87fc707e: Fix Datagrid mobile view

## 12.3.64

### Patch Changes

- 0813ad0d: Modified the styles of `without-border` table variant

## 12.3.63

### Patch Changes

- 13c3bbe8: [tailwind]: Add spaceValues to minHeight

## 12.3.62

### Patch Changes

- 9932278e: DateTimePicker: fix am-pm selection in case of fromDate or toDate have values

## 12.3.61

### Patch Changes

- a9d53d8c: Adding testIds in component to support automation testing.
- Updated dependencies [a9d53d8c]
  - @devkit/utilities@12.3.9

## 12.3.60

### Patch Changes

- Updated dependencies [48bf1afb]
  - @devkit/utilities@12.3.8

## 12.3.59

### Patch Changes

- 6176fe9f: [Web]: Fix Hydration Error on React-Device-Detect

## 12.3.58

### Patch Changes

- 21c03e5d: TabNavigation - Updated to accept title as a jsx

## 12.3.57

### Patch Changes

- 9e19c16c: Add image-card variant to uploadInput component

## 12.3.56

### Patch Changes

- 50e5dc4e: [UploadFileInput]: change type of supportedFileTypes to accept React.ReactNode

## 12.3.55

### Patch Changes

- 2c4d5903: [DynamicReport] Add initialValues and onFormValuesChange callback

## 12.3.54

### Patch Changes

- Updated dependencies [c1580bc0]
  - @devkit/utilities@12.3.7

## 12.3.53

### Patch Changes

- Updated dependencies [140469b2]
  - @devkit/utilities@12.3.6

## 12.3.52

### Patch Changes

- ca8c2d1c: Add spaceValues to maxWidth in tailwind config
- Updated dependencies [2e793b19]
  - @devkit/utilities@12.3.5

## 12.3.51

### Patch Changes

- 1cc97dc3: [BottomSheet] support screen size overlay

## 12.3.50

### Patch Changes

- 02357fc1: [TabNavigation] Fix tabs background

## 12.3.49

### Patch Changes

- c86cf11d: [OTPField] Red bg when disabled and hasErrors

## 12.3.48

### Patch Changes

- Updated dependencies [1a6c533e]
  - @devkit/utilities@12.3.4

## 12.3.47

### Patch Changes

- 342bf492: [Modal] Fix width

## 12.3.46

### Patch Changes

- 250843b4: [BottomSheet] support min height by default

## 12.3.45

### Patch Changes

- 0e29b30f: [BottomSheet] Use react spring bottom sheet scroll instead devkit
- 47f7f8e9: [ActionMenu] show check icon on outside click

## 12.3.44

### Patch Changes

- ce17446b: bugfix in dropdown component

## 12.3.43

### Patch Changes

- 96f2d3e6: updated aber brand color

## 12.3.42

### Patch Changes

- f939bc30: [DataGrid] update to include expandRow when using ref for DataGrid

## 12.3.41

### Patch Changes

- e81d3475: [UploadFile]: Fix Safari SVG scaling issue

## 12.3.40

### Patch Changes

- 6469ee0f: DataGrid: Add support for SSR

## 12.3.39

### Patch Changes

- b063cead: [ActionMenu]: Show arrow on mobile view

## 12.3.38

### Patch Changes

- 2edb3150: [Tooltip]: Remove scroll on mobile view

## 12.3.37

### Patch Changes

- 8cca4a66: [DataGrid] fix datagrid not collapsing

## 12.3.36

### Patch Changes

- 5f842155: [DataGrid] fix expand column width

## 12.3.35

### Patch Changes

- 892bce45: [devkitSimpleBar] dont display scrollbars by default

## 12.3.34

### Patch Changes

- cc212853: [DataGrid] fix DataGrid auto collapse sub-rows

## 12.3.33

### Patch Changes

- 8873b993: [TabNavigation] support no panels state

## 12.3.32

### Patch Changes

- 9d96d45a: [TabNavigation] support optional transition

## 12.3.31

### Patch Changes

- 7113d555: [DataGrid] Support pinned column width

## 12.3.30

### Patch Changes

- 8705d698: [SlideSheet] width adjustment

## 12.3.29

### Patch Changes

- 6ed19cea: Telr: Fixing locale re render form

## 12.3.28

### Patch Changes

- 6820b817: [DataGrid]: Remove useResponsiveView to fix layout shifting
- 1f58a97e: added props datagridOptions.defaultPagingAndSortingState in DynamicReport

## 12.3.27

### Patch Changes

- d47b1465: added props datagridOptions.defaultPagingAndSortingState in DynamicReport

## 12.3.26

### Patch Changes

- 6b5339e8: [DataGrid][MobileResponsiveCell] apply error style if hasError

## 12.3.25

### Patch Changes

- Updated dependencies [d5e8844c]
  - @devkit/utilities@12.3.3

## 12.3.24

### Patch Changes

- fb05dab4: change font size for radio cards

## 12.3.23

### Patch Changes

- ab1c040b: RadioButton: update radio button as per DLS
- Updated dependencies [835ec64a]
  - @devkit/utilities@12.3.2

## 12.3.22

### Patch Changes

- 1fc86b60: CardPayment: Exporting CardPaymentCheckoutProps and CardPaymentTelrProps

## 12.3.21

### Patch Changes

- e3b50c66: [FullPageLayoutHeader] use max viewport width

## 12.3.20

### Patch Changes

- 7b701053: [CardPayment] Telr, clean event listener

## 12.3.19

### Patch Changes

- c7615357: fix radio card sizes
- 9fe55f07: [OTPField] align border with design

## 12.3.18

### Patch Changes

- b19a7f00: [DataGrid]: Set Default Expanded rows to Collapsed

## 12.3.17

### Patch Changes

- a0a36710: bottom sheet diable scroll lock ignore on ios

## 12.3.16

### Patch Changes

- 48d90866: [Button] support success state

## 12.3.15

### Patch Changes

- 650aad96: [Card Payment] Integrate Telr

## 12.3.14

### Patch Changes

- 3b461373: fix separator extra gaps on mobile

## 12.3.13

### Patch Changes

- 25a251b0: [TextLink]: Prevent Event Propogation when disabled

## 12.3.12

### Patch Changes

- d0bfc4dd: [OTPField]: updated width to match height, background color always red on error

## 12.3.11

### Patch Changes

- d8b86282: fix popover width on mobile to avoid horizantal scroll

## 12.3.10

### Patch Changes

- bb884708: [SlideSheet]: minor styles update

## 12.3.9

### Patch Changes

- 2774a923: [DataGrid]: add client data prop

## 12.3.8

### Patch Changes

- Updated dependencies [03798e66]
  - @devkit/icons@12.0.7

## 12.3.7

### Patch Changes

- 47495df2: confirm dialog hide text containers for missing text

## 12.3.6

### Patch Changes

- d16ca80f: change color for header and hover of button in molo theme

## 12.3.5

### Patch Changes

- Updated dependencies [89787ea5]
  - @devkit/utilities@12.3.1

## 12.3.4

### Patch Changes

- c4be5f61: slide sheet sticky footer

## 12.3.3

### Patch Changes

- 4b16a1dc: [SlideSheet]: update width to 582px

## 12.3.2

### Patch Changes

- 6257efdf: [Dropdown] update small variant and fix width bug
- 6257efdf: [TextField] fix text field padding with dropdown
- 6257efdf: [textField] fontsize adjustment

## 12.3.1

### Patch Changes

- 6f1cf4b2: [Web]: Add new SlideSheet Component

## 12.3.0

### Minor Changes

- 9bb911fa: [DatePickerRange]: Fix errors

### Patch Changes

- Updated dependencies [9bb911fa]
  - @devkit/utilities@12.3.0

## 12.2.3

### Patch Changes

- 143540d5: fix backspace search in dropdown

## 12.2.2

### Patch Changes

- 5103105b: Fixed styles of some components after @headlessui/react update

## 12.2.1

### Patch Changes

- d8eca5b9: [Layout] add server side support to all layouts
- 6258226b: [Button] include use-client for nextjs server side support
- a815807b: [Forms and Inputs] add server side support
- b9a712f6: [LayoutHeaderMenu] add server side support
- ce669a15: [FullPageLayout] update layout style in sm to include h-full

## 12.1.0

### Minor Changes

- e320dd104: [ImagePreview] fix image resize mode contain issue

### Patch Changes

- e836ab1f2: DropDownInput: Update min width for the dropdown input.
- bb3b25f37: [Dropdown]: Resolve issue where the selected item is rendered twice
- 63a6ae572: [FullPageLayout]: Add prop for conditional header
- 1987c2e17: TextField: Adding default value for input component.
- 8e1304b8a: Merge Master to Develop
- 78a3cf1bc: Adding Date Picker for devkit mobile and fixing typescript errors for web components
- Updated dependencies [da819aad9]
- Updated dependencies [bba85e831]
- Updated dependencies [13cb7a741]
- Updated dependencies [8e1304b8a]
  - @devkit/utilities@12.1.8
  - @devkit/icons@12.0.6

## 12.1.7

### Patch Changes

- 78a3cf1b: Adding Date Picker for devkit mobile and fixing typescript errors for web components

## 12.1.6

### Patch Changes

- d7528e93: add theme style for secondary button

## 12.1.5

### Patch Changes

- 3ac92bdf: Molo theme publish

## 12.1.4

### Patch Changes

- 4521796d: Added the molo theme

## 12.1.3

### Patch Changes

- ccf25c7b: [inputs]: fix invalid and disabled styles

## 12.1.2

### Patch Changes

- 0df6a7d6: [Date Picker and Utils] Fix daylight saving issue

## 12.1.1

### Patch Changes

- 5dcbfb17: add adib theme export in rollup.config.js

## 12.1.0

### Minor Changes

- 19eb38a9: ADIB theme support

## 12.0.38

### Patch Changes

- 08b17676: GroupButton: add brand variant to selected group button

## 12.0.37

### Patch Changes

- d01d4d31: [ImagePreview] fix image resize mode contain issue

## 12.0.36

### Patch Changes

- 136c7f7e: DatePicker: increase date picker calendar arrows spacing and size

## 12.0.35

### Patch Changes

- 17d693eb: make textlink button polymorphic

## 12.0.34

### Patch Changes

- bb3b25f3: [Dropdown]: Resolve issue where the selected item is rendered twice

## 12.0.28

### Patch Changes

- ecd09027: TextLink: Remove default value of href from link

## 12.0.27

### Patch Changes

- ba042671: DropDownInput: Update min width for the dropdown input.

## 12.0.26

### Patch Changes

- 95b16d3e: Dropdown: fix ios click

## 12.0.25

### Patch Changes

- 2c2680ee: LayoutHeaderMenu: Fixing disabled of menuitems.

## 12.0.24

### Patch Changes

- d4243917: [GroupButtons]: Added Variant and Directions

## 12.0.23

### Patch Changes

- 0fdd32b1: UploadFileInput: Making extension of uploaded files case in-sensitive
- 04d1d24b: DatePicker:secondary time issue

## 12.0.22

### Patch Changes

- 5aac8ea2: [DataGrid]: pagination arrows on click event boundary

## 12.0.21

### Patch Changes

- eb96f33b: [stepper]: update mb value to fix alignment at browser large font sittings
- 5c9b0801: Stepper: Using rem instead of px in css to fix the impact of font size change of browser.

## 12.0.20

### Patch Changes

- 3ddeeb47: DropDown: Added Direction prop to DropDown Component

## 12.0.19

### Patch Changes

- d3b3604d: DatePicker: default date when selecting time for End Date in mode=interval

## 12.0.18

### Patch Changes

- e07d3c9d: TextField: pass inputMode, to enable user to customize virtual keyboard

## 12.0.17

### Patch Changes

- 2577d720: DataGrid: Added Expandable Sub Category feature

## 12.0.16

### Patch Changes

- 760c79e5: [njThemeContext] only initialize the context if not initialized and store it on globalThis

## 12.0.15

### Patch Changes

- 812ae59f: DatePicker Interval Hover feedback from design

## 12.0.14

### Patch Changes

- 15399852: devkitThemeContext: Move Theme context from web to config

## 12.0.13

### Patch Changes

- d7dc4e0c: Datepicker: Time picker issue for opacity

## 12.0.12

### Patch Changes

- ca32004a: DatePicker: Added feature with prop mode for Interval selection

## 12.0.11

### Patch Changes

- 949cf5d4: fix scroll issue on firefox when content height change

## 12.0.10

### Patch Changes

- b4dc013e: [CardPayment]: Disable pay button on unsupported card types

## 12.0.9

### Patch Changes

- 0e5bdb30: [ImagePreview]: support rendering all dpf pages

## 12.0.8

### Patch Changes

- 66f12371: DatePicker: TimeView -> changed logic to calculate time difference

## 12.0.7

### Patch Changes

- 952ee85d: Web: DatePicker: Changed setTimeToDay function for DatePicker

## 12.0.6

### Patch Changes

- 95bbe9e5: [dropdown]: Fix border on zoom

## 12.0.5

### Patch Changes

- 6b35c3d3: make an option to enable add additional component before or after grid

## 12.0.4

### Patch Changes

- 06c5251f: DynamicReport: Added datagrid ref optional prop to datagridOptions
- 5a99868b: Showing a required symbol on file input component
- 9945d62b: Slider: disable the transition of slider item when clicked

## 12.0.3

### Patch Changes

- a59b9ffc: DynamicReport: Added loader to search filters

## 12.0.2

### Patch Changes

- 7336bb60: Utilities DateUtils: export hijri conversion functions, and consider hijri in parse functions. Web
  DatePicker: handle

## 12.0.1

### Patch Changes

- 9f45c2d0: DatePicker: Consider Gregorian dates in header navigation calculations in case of Hijri calendar

## 12.0.0

### Major Changes

- b0d709bb: Major version 12.0.0 for all packages

## 11.0.0

### Major Changes

- 8cf23956e: TextFiled : Disabled style fix for IOS
- 92bd750cc: [Colors]: update colors to follow the new dls
- a0a06f176: loginlayout: header color for secureData
- 92bd750cc: [Buttons]: Update button styles and variants to follow the dls
- a93d445f9: Fix DropDown at Safari
- f4d945b7b: RadioCard: configure tab from index
- 92bd750cc: [Fonts]: update font sizes to follow the new dls
- 79d6e970b: TextFields: Updating the styles and adding a new props (size, startIcon and endICon)
- 8e0e1a39d: Checkbox: fix component alignment with sizes
- 58fe93500: ActionMenu: updating layout for mobile
- 55feadbfc: ActionMenu: updating layout header style and action menu
- c0cfa4c25: Button: revert the default button size to middle

### Minor Changes

- ffee600c1: [Modal]: Added responsive bottomsheet for mobile view
- 1f2bec84f: cardPayment: Add cardTypeNotSupported error message
- 3f3ab4122: [DropDown]: Apply DLS styles to Single Dropdown
- dc65b53dd: Support Themes for Default and Aber Theme
- 9365cf84d: Adding string type support for value of radio card options
- 99a5905cc: fixed deciaml places in NumberField component
- 22036bc7f: Input Components And Buttons: Enhancements and Restructure
- 120d99d16: web:ProgressLog - Added new component ProgressLog
- 90cb8b8c3: Export timeline component and props
- 978fb1cf6: Adding async loading for button

### Patch Changes

- 66cc985e8: Replaced div with React.Fragment for hidden field
- b7b9ee7a2: DynamicForm: Fix unique key warning in dynamic form in case of hidden fields
- f5d9811ea: [General] Update peer dependencies
- b7267df0e: Changed APIs in DynamicReport so that filters API returns search fields and data API returns rows and
  columns for DataGrid
- 5c30cbdf6: DropDown: adding onClearValue function
- 7379d1fee: CheckboxGroup:Update Start padding in checkboxGroup in Accordion View
- 785f7e98c: DynamicReport: Created the DynamicReport Component to make the DataGrid and SearchForm dynamic and handled
  from backend
- 982c9c6c8: OTPField: add bypassReset prop to the OTPField component so it doesn't reset the value when
  bypassReset=true
- 28d98ed6d: Merge develop branch to beta branch
- 3ce9067f8: Data table: change disabled cursor style for disabled
- d3c63d83f: [DropDownInputComponent, MultiSelectDropdown]: Add hideValueLabel prop to DropDownInputComponent to hide
  selected items on MultiDropDown and on Dropdown Input
- 774566673: [Input]: Fixed input focus for safari browser
- db10ad2f2: Button: Fix spinner absolute and checkout loading
- ca3d343d4: [Modal]: removed initial focus for inputs
- 327cfd626: DatePicker: Added readOnly prop to prevent entering date manually
- 82fa37f0f: TextField: Fix readOnly prop configuartion in TextField Component
- bcf33afa5: TextArea: Aligning the char counter to the right as per the design. Password: Updating the eye icon color
  to be black for active/idle and gray for disabled.
- d9dba0902: Badge: Update styles according to Styleguide
- d5d435d69: DataGrid: change client side sorting to be case insensitive
- 738533839: LayoutHeaderMenu: Allowed menu item to be disabled through isDisabled property.
- 64f81c0f8: [Dropdown]: Fix for dropdown flip issue
- d5d435d69: DataGrid: return custom line if the format function return empty string
- 04210781e: TextField and Buttons: updating the styles
- 7747e5b0c: updating otp
- 0311649a6: Disclosure: Fixing while filter out disclosure items
- 9ad2f0da2: [CardPayment]: Allow only alphabet & space for card holder name
- 995014d14: [DashboardLayout]: currentUser.noDrawerForUserMenu changed type to boolean | 'responsiveHide', for only
  showing burger menu on responsive view
- 2cb2192cc: update react form validation behavior to have two modes 'on-blur' or 'on-submit' and the default is
  'on-blur'. Also allow empty validation messages to show the input fields red background and border
- 34b103c00: Stepper control : style issue for the before and after line style
- e2b8ea176: [Dropdown] components refactor
- 788f436b0: [UploadFile]: Fixed drag and drop
- 00a15288e: CapsuleButton: reviewing component and follow Dls plus creating sizes small-medium-large
- e61a24c64: [RadiButton Group]: Adjusted column gap to 12px
- 772b08af0: [RadioCard]: fix radio card direction prop not working correctly
- d8bd816c5: [CardPayment]: fixed ios validation issue
- f8431b43d: [Dynamic form]: Added columnsCountForMobile for mobile view
- 7128ef424: Refactor auto suggest dropdown component
- 4e49761b1: DatePicker: Fixed Date Picker Age Calculation
- b242ea699: CapsuleButton: Updating styles of capsule button.
- 110d8ad18: [Action Menu]: Close menue after selecting an item
- a571db3c2: Timeline: Updating the design
- 3d96ac7e1: DynamicReport form resets when tab changes
- 6590c9a95: UploadFile: updating selectFileDropArea type
- 73fa9d7e1: RadioButton: Fixing click on radio button.
- 7641fe118: [FullPageLayout] fix sticky header z index
- bc95ba40c: DatePicker: added feature autoSelectTime
- 9d26ec62b: CSS: define a new variable for fonts
- 4514ca16f: Merge Develop Branch to Beta
- 83f3e5873: [DataGrid]: fixed header selection message when all records are unselectable
- 9cdcdeb22: [NumberField] Revert Number input follow the default dir
- 2b01e12ea: RadioButton: Adding a new prop "highlighted"
- 044113b91: BottomSheet: updating the title size
- 8a6d8b04a: [Disclosures]: Fix outline overflow issue for input
- 1ec2836df: DateRangePicker: end Date seconds
- 409677312: LayoutHeaderMenu: Updating the component
- 9514b6516: [FullPageLayout]: display subHeader correctly
- 32e549bb1: [useResponsiveView]: fixed hydration for dashboard layout
- eaa6d3520: textField: PrefixArea style change from button to span
- c06efde79: [ThemeProvider] revert theme provider usermenu type
- 06748d39d: create style file for stepper
- 75e7c0714: HeaderUserMenu: Fixing parent scoll when drawer opens/close
- 2cec0f300: [Input Fields] Enhance Show Error Border [FullPage Layout] Fix User Menu if not login
- 5757e53cb: PaymentFormInputGroup: Make payment inputs ltr to fix issue with card number on Arabic
- 61b7050e3: updating X small size for buttons as per dsl
- 555447e4a: export ECalendars type and Calendars object from utilities package
- edc09462b: [Colors]: Rename neutral to gray
- 99aabcdde: [Dashboardlayout]: Fixed hydration issue for mobile view
- 3f84f8663: checkbox: fixing font size issue
- e342eebf3: DataGrid: Updating font size of cells to 12 px.
- cfc97e172: CSSVariables: adding variables for ar and en font
- 842ac4eb4: [DataGrid]: added new prop mobileResponsiveOnClick
- 13d38112b: Toast component: style fix
- 284ac9185: [DatePicker] Fix the iso timezone format, [DateGrid] Fix z-index with dropdown and date picker
- 8e775594d: Dropdown: Add getIsItemDisabled callback prop
- c08be349a: Checkbox: add new optional prop (errorVariant) to apply the error color for box only or the box with label
- 8727ecef3: CheckBoxGroup: Update the expansion of each childGroup as the expand state of main groupId expand state
- f3941bf32: [Layout] Fix initial loading content shift
- 4b451ed86: [Bottomsheet]: Fixed scroll issue
- 1a2e28e05: useReactForm: fix form submit validation issue
- 362cf0ee3: Radio Button : Creating single radio button component.
- 64abaa39c: - ReactForm: fix validateField type
  - InputFields: Apply new Design
- 10a995add: Tooltip: Update z-index Datepicker: update direction
- 59cdc70c5: [RadioCard]: changed to accept array of cards objects with the new prop 'cards', added new
  mapRadioCardsField to the dynamic form to render RadioCards
- e376ac794: [Dropdown] fix width for non custom render dropdown
- e76ce802a: [Group button]: fixed container styles added cursor pointer
- 96efbf3d5: DataGrid: Add React Element to mobileResponsiveModalTitle prop type
- 23d038308: Web: Export ImageFeatures component
- 61569b3ef: SimpleStepper: Removing z-index style
- f33d2ed50: TextField: Trim bypassed for number field
- 886a4edac: NumberRangeField: remove to and fix gap between inputs
- e3e7d4158: datatable: update by applying new theme variables and themeing
- 843efed21: devkitSimpleBar: fix scrolling show and hide while content scroll change
- ff6f5faee: [TextField]: Fix placeholder alignment
- 1531fe099: [RadioCard]: new component - toggleable card with label and optional placeholder/icon
- 5bfe4e7fa: --GroupButton:update new variant sizes and new colors variables pending on theme --Theme:update new theme
  for secureData --StoryBook:update new theme for secureData at theme provider
- e043a0522: Fix peer dependencies
- 296157393: DropDown: fixing rendering the menu while disabling
- eb859e3dd: DataGrid: fix pagination styling
- 0ccc627b8: CheckBoxGroup: Edit Expand All button functionality to check the expanded items if any of them collapsed to
  change the state felixable
- d44baf7e8: [DatePicker]: Keep validation error when no date are filled
- ca0f1707c: [Layouts] add data-testid to user menu items for non prod env
- 740239b6b: Modal:fixing description issue on the modal bottom-sheet DataGrid: updating the style for the Export button
  and enableRefresh in the mobile view TabNavigation: adding a new prop (actionComponent)
- 6434dc9aa: [Formlabel]: Changed label text-size
- 8d47985d3: AlertComponent: Info alert icon restyle
- 6511a8b72: RadioCard : fixing selected issue flickering
- b0a0380f8: [Collapsible]: use useEffect instead of useLayoutEffect
- 4dc316cbf: Add multi calendar feature to Date Picker component, including Hijri tabular calendar
- e48b73f06: - TextLink: new component added to replace the LinkButton and follow DLS design
  - edit-pencil icon: remove unused elements
  - LinkButton: Deprecated to start replacing it with TextLink
- 18977ca8d: [Datepicker]: Added view mode support for dynamic form
- d1468a71a: [DataGrid]: fix single page server side handling selection when some rows are disabled
- 99096c233: TabNavigation: adding scrolling for tabs container
- 60e714cc9: [Button]: default size to medium
- eac4361d0: [FormLabel]: fixed issue when label wraps( perant gets extra gap )
- 8290333b9: RadioButtonGroup: add disabled prop to radio button group
- a92726ae8: TextFields: updating the placeholder color DatePicker: updating the placeholder value
- b8b1072fa: Date picker range view mode selection
- 6e2ae26ad: useHTMLElementObserver: Adding timeout to resizeObserver.
- d953cd044: [Disclosures]: update toggle behavior
- bf67d2632: [FullPageLayout] Fix Floating Portal
- 905d66e36: [Disclosures]: Added key to fragment
- 32090ca6e: Date picker calendar view mode selection and new time style
- 471ac7917: SimpleStepper: Update stepper text size mobile
- f015bb403: ImageFeature: Enhance Image Features component, EditUpload: fixed column view
- ce79e8eb4: [Disclosure]: Add secondary variant
- 7ac33acd4: updateing Tab navigation component tto follow dls
- a83f86e13: FullPageLayout, DashboardLayout fix children unmount if the page orientation get changed
- 72f06666c: Date ranage picker time to remain same when changing month and year
- cde19dbe8: [ConfirmDialog]: Fixed Title alignment and added buttonsize 'Large' for button group
- fc04268a3: DropDown: fix error messages
- b39843599: [Badge]: Added Neutral Grey variant
- 433fb0c8a: HeaderUserMenu: Fix issue with iOS needing double tap to click in drawer
- 55c7c47b9: MultiSelectDropdownItem: Make the whole item clickable for check/uncheck checkbox
- 238fb17f6: [Action menu]: Added downarrow icon
- b4de80d72: [FormFieldWithEdit]: added responsive view for mobile
- 856395e90: [CardPayment]: Add CancelledByUser error code onTokenizeError
- b0a92483a: [Form] Fix scrolling to the error on submit
- d17f701a0: Date Picker: replace the RenderInput with the TextField
- 881ae3ab7: Fix nj-style bundle issue
- 7340193e4: Styles for components: Updating all brand-600 color to devkit variable
- 6e7d13d00: removed onKeyDown from the reference props in order to make the space key work while searching
- 6be40e0bc: Data-grid: updating enableRefresh functionality
- f2a124522: datatable: updating pagination style
- 65d0241b3: translate error if a translation key is provided
- 80dcfadc0: [FullPageLayout]: Update left and right paddings for body and footer
- 9cdcdeb22: NumberField: Fix direction
- 4ddbd4e71: capsule button: issue of line height fix
- 1b4e7f9cc: [Disclosures]: Refactor Disclosures
- b2e4a4182: [Layout]: Added disabled state to drawer menu
- 538e50937: ToggleSwitch: Updating toggle switch as per DLS and add size props
- 15a8a3300: [CardPaymentForm]: Add allow3dsModalClose optional prop to close the 3DS payment modal
- 69892c4ad: [DataGrid]: Fix tooltip for long word
- dceefc4c1: DatePicker: Refactor with Date Utils refactoring
- 1b156b4ef: [Datepicker]: Added Drag Scroll for timeview
- 45cb26a03: [CheckBox]: Added map CheckBox field for dynamic form
- 29d2cc6c8: [DatePicker]: Consider timezone when time is selected on TImeView
- 0b204e315: [ReactForm] Fix the validationBehavior and change interfaces names as following:

  - IReactForm -> ReactForm
  - IReactFormOptions -> ReactFormOptions
  - TFormFieldsSchema -> FormFieldsSchema
  - IDynamicForm -> DynamicForm

- 2406e5f63: ImagePreview: fix rotation of the image
- e4471b505: CheckboxGroup: renaming prop (changedValues to highlightedOptions)
- 2aa74642d: DropDown:fixing search with enter click behavior
- 84e7a4056: TextField: Fix Trim for Text field
- d2b991d48: [Datagrid]: Added hideMobileResponsiveDetailsArrow for Mobile responsive render
- 7c140bced: FullPageLayout: fix the full page height for the tablet and mobile
- a3f9ed7da: useHTMLElementObserver: Adding unobserve on Unmount.
- 5d2f6343a: CardPayment: added callback function to provide if the form is valid or not (onFormValidationChange)
- a0d7d79ff: [Disclosures]: Added Expand all and collapse all
- 5a9a66084: fix input id for RadioButton
- 2890983c2: Checkbox & Radio Button : updating tab Usage in form
- 90a46fcd7: [TextField]: fixed dir for number field ( mapNumberField not affected by dir issue ) , [DashboardLayout]:
  aligned tabs labels
- cad072c4a: RadioButton: fix the input style at Firefox
- f337cc535: Adding Timeline component for showing tree history items.
- e21c7b26b: Date Picker: Updating the styles and adding a new prop (size)
- 9cb671d83: Text Field: fixing the on-clear function while the input not focused on date-picker, text-field, and
  drop-down
- 563187d40: Button:Added variant 'social'
- 1334269eb: Styling Alert component to follow the DLS
- ac3ff8989: [CheckoutFrames]: Fix CVV popover padding
- b88fb00e6: Enhance design for DatePickerRange Component
- 2d578a194: [Datepicker]: fixed Calendar close issue on mobileview
- 6dbbd37e2: [OTPField]: lose focus when field is disabled
- 83fe854f8: Popover: Updating the style and adding a new prop variant (light and dark) and content Date-picker: making
  the text field disabled on the mobile view
- 72b973648: Drop Down: fixing arrow issue while clicking
- 9c7548276: Theme files refactoring to keep the 'theme' function that is used by the variables to be reflected by
  tailwindcss color scheme changes
- 2a579be43: [DropDown]: Fix validation border
- 2ba3b3ff9: [DatePicker]: Fix age calculation
- cad072c4a: CheckBox: fix the input style at Firefox
- 4d5c7f2ac: AdminPageLayout: Update theme and variables for secureData design
- df388af10: [Toast] fix z-index for Toast
- 24b81be9b: BottomSheet: fix maximum height
- 02aa1f0a7: DashboardLayout: Add label support for the tab navigation
- f3835529b: DashboardLayout: Fix SubHeader Padding issue
- e1ab4fbd6: RadioButton : generate new variant for the full width radio button
- e95b4936f: HeaderUserMenu: Provide direction prop to drawer items
- 50b107d8b: DataGrid: updating CSS to tailwindcss
- 825f810d8: Textfield: Adding onPaste callback
- a9934ed43: Toast: fix width for the toast
- 5d5011017: [HeaderUserMenu]: add test ids
- b305b9191: [RadioCard]: added new prop ( direction ) pass flex direction, default is flex-row
- 1d3681480: [LayoutHeaderMenu]: Add "target" Prop To Link Configs as a optional prop.
- de7c20f66: [BottomSheet]: Added divider for bottomsheet
- 3282bae51: RadioButton: give the ability for label prop to have full width in case we are passing the label as
  component
- 1ea4ad413: TextField: updating the assitive text color as per DLS
- 5684436e3: Button: Adjust Button Colors for Secondary and Other Variants
- bd3648bda: [CheckBoxGroup] Fix changesbox group after the checkbox state has been fixed
- 1e7cc81b9: [Dropdown]: Arabic content alignment for selected value
- a5dc8ac6b: Creating a new component Divider LinkButton: updating the style
- f8dbb4839: Checkbox:

  - apply styles from DLS for the checkbox
  - 4 sizes for checkbox x-small , small, medium, large

- 523de2591: [RadioCard]: Update padding
- e912885e6: DashboardLayout: Fix sidebar padding with SSR
- 7d1499c13: Alert & Group Button: css separation
- c09340155: Handle Form-Field to accept Custom Components
- 0722c4d5a: [Layouts] Fix floating ui elements was causing body scrolling
- a05665a57: DatePicker: Fix Day Navigation to previous months is displayed when setting fromDate
- 332bcc86f: [devkitSimpleBar] fix scrolling with mouse drag
- 14f88c716: update style for disclosure
- 790ebb414: [Fixes] Added isBeforeNow dateUtil, rename the TFormFieldSchema to FormFieldSchema
- 99c14cf0a: ActionMenu: Using layout header menu in action menu.
- eccffdc9d: ActionMenu: adding css layout
- 585e1adb5: CheckBox Group:Update the checkbox Group Design to make all top levels data seperated
- 275ae8056: [FloatingPortal] Added to Layout scroll areas to avoid duplicated scrolling
- 1ea4ad413: Radio&checkbox Buttons: updating size for both
- 20c313084: ConfirmDialog: Updating button styles
- 6f599d88d: UserAvatar: Fixing avatar in case of empty user name.
- 1558d5a82: DatePicker: Fixed days and months calculation
- 05c546bef: [Checkbox]: added clsx file, added new boolean prop (hasError):border and background color is red when it's
  true
- f886908f0: Badge: Making showIcon prop as optional.
- 9653de82c: [RadioCard]: changed card border to always be 2px at all statuses
- ab0ff531f: adding new props "highlighted" to text-field, drop-down, date-picker, check-box, text-area, and upload file
  input
- 007ad7b28: SideBar: Tooltip for Long label fixed
- ede164364: [DashboardLayout]: Fixed height styles for children
- 97d675c1e: [DatePicker]: fix age calculation
- cac563474: [LayoutHeaderMenu] Add auto update to make the floating item attached with the parent item while scrolling
- 03357cbc7: [DatePicker]: Fix age calculation
- bd3648bda: [FullPageLayout] fix sticky header
- 778f4745a: [LayoutHeaderMenu] Fix floating with scrolling
- 15d04a861: [RadioButton]: added new component RadioButton. [DynamicForm]: added mapRadioButtonField to dynamic form
  and it's story
- 4530c8e14: theme, nj classes & sidebar component: grouping css and enhance sidebar component
- 9a21b4c98: ResponsiveRenderViewContainer: fixed date picker issue , calendar not showing in modal
- 26a906672: MultiSelectDropdownItem: fixing checkbox onClick issue
- 3ce5c095f: Fixed an issue where the search form would render "0" if no search fields were passed
- d67153bb9: [GroupButtons]: implemented new GroupButtons component and story
- e1e73ce65: Modal: add extraLarge variant to modal
- 0d65d640a: Buttons: fixing the flickering issue while loading Spinner: adding a new prop "className"
- 249d2b2ef: Badge: change varients as per dls
- 82c709992: [DatePicker]: Round up age
- 9d041468e: [Dropdown]: Fixed multiselect dropdown footer styles
- 954b4762e: [DashboardLayout]: fixed responsive styles issue
- 93b4c38c9: CheckBoxGroup: Show side arrows in default view for firstLevel items
- 1c70c9080: [DatePicker]: Increase space between date and age
- ab6468878: [Form] Allow scroll to the first field has validation error
- d2257d7cf: [Radio Card]: Apply Design Style
- 9c9766065: [ConfirmDialog]: remove extra X button from confirm dialog
- ce9af3b4d: Date picker range maintaining the end of the day time selection consistent when changing the months.
- 3ce5c095f: Made datagridOptions mandatory since the keyfield prop is required for datagrid
- 56d47dd92: HeaderUserMenu: Render burger menu only if the user not logged in and there is userMenuItems
- fe28d3643: textfield : updating disabled style
- 893629615: Made dynamic report call filters api on tab change
- 6b2aaab4f: [ImagePreview]: Add title
- e82e26d49: textlink: update href and download feature
- 8e8344be4: UploadFileInput: Update onChange function to support async validation
- 816c9ea7d: ConfirmDialog: center the content in desktop,tablet view only Dropdown: add boolean type to primitive keys
  AdminPageLayout: added overflow hidden to the layout content
- 5677dc955: [RadioCard]: added center prop to card object, fix style when error and custom className
- cf0da1888: DynamicForm: Allowed FormFields to be remapped and return a new schema based on another (parent) field
- bed3f9e8c: Slider-Carousel: update selected dot style
- 6183c4443: [Form] Scroll to the first field that has error
- 086425ad4: [Bottomsheet]: Fixed outline truncate issue
- a7bb67f3e: Date-picker: updating calendar icon fixing the age issue when adding a description prop
- 74a4d9abb: TextField: border style for disabled
- fb5b8d0f7: DatePicker: fix age caculation to consider system timezone
- e0f5b70ea: ConfirmDialog: Change icon for success variant
- fddc30e07: [InputComponent]: Keep same id on server and client rendering
- 7e006bbcb: MultiSelectDropdown: Added feature to select all items
- a67e3ad6f: [DashboardLayout]: fixed text align on mobile view with long tab name
- 4708b5a70: [CapsuleButtons]: added new CapsuleButtons component
- b82cb48f3: ['@devkit/web'] add useIsOnline hook ['@shory/auth']['ShorySessionProvider'] use the useIsOnline hook
- 9f234c56a: [RadioButtonGroup]: Add columnsCount prop to control the number of columns the radio buttons will span
- 840074445: UploadFile: updating the design
- 8d0dd7699: FullPageLayout: fix z-index for modal, bottomsheet, drawer, and scrollbar tracks
- 667b943de: TimeLine: arabic review css
- cb792bb1b: - [devkitSimpleBar] Reimplement
  - [FullPageLayout] Fix for mobile responsive while scrolling
- 3e6e9b146: Alert:Updating the style
- Updated dependencies [f5d9811ea]
- Updated dependencies [28d98ed6d]
- Updated dependencies [d3c63d83f]
- Updated dependencies [91207a847]
- Updated dependencies [327cfd626]
- Updated dependencies [2cb2192cc]
- Updated dependencies [e2b8ea176]
- Updated dependencies [df9effeb3]
- Updated dependencies [567d5553e]
- Updated dependencies [0bc04114b]
- Updated dependencies [379df14cb]
- Updated dependencies [313d084fe]
- Updated dependencies [cf1fd078b]
- Updated dependencies [bc95ba40c]
- Updated dependencies [9185b907d]
- Updated dependencies [4514ca16f]
- Updated dependencies [317c58022]
- Updated dependencies [2cec0f300]
- Updated dependencies [555447e4a]
- Updated dependencies [ba866902c]
- Updated dependencies [284ac9185]
- Updated dependencies [0f8115ca7]
- Updated dependencies [3f3ab4122]
- Updated dependencies [362cf0ee3]
- Updated dependencies [64abaa39c]
- Updated dependencies [59cdc70c5]
- Updated dependencies [e376ac794]
- Updated dependencies [b416eeb9f]
- Updated dependencies [9365cf84d]
- Updated dependencies [39b0a157f]
- Updated dependencies [e95a8caf6]
- Updated dependencies [4be913850]
- Updated dependencies [905927164]
- Updated dependencies [da7eabe28]
- Updated dependencies [045cd7d78]
- Updated dependencies [5a8171e40]
- Updated dependencies [4dc316cbf]
- Updated dependencies [e48b73f06]
- Updated dependencies [18977ca8d]
- Updated dependencies [3e6e9b146]
- Updated dependencies [b0a92483a]
- Updated dependencies [99a5905cc]
- Updated dependencies [5528a3976]
- Updated dependencies [65d0241b3]
- Updated dependencies [22036bc7f]
- Updated dependencies [f337cc535]
- Updated dependencies [f100ac991]
- Updated dependencies [dceefc4c1]
- Updated dependencies [45cb26a03]
- Updated dependencies [0b204e315]
- Updated dependencies [91e41b4f9]
- Updated dependencies [0bca4a0d9]
- Updated dependencies [2f45a8f7d]
- Updated dependencies [091ddb2bd]
- Updated dependencies [2b3aac51a]
- Updated dependencies [825f810d8]
- Updated dependencies [92bd750cc]
- Updated dependencies [5047ad172]
- Updated dependencies [b305b9191]
- Updated dependencies [22036bc7f]
- Updated dependencies [ce9af3b4d]
- Updated dependencies [c2a2a532c]
- Updated dependencies [134ef0ec3]
- Updated dependencies [1dedb4514]
- Updated dependencies [c09340155]
- Updated dependencies [33ad353c9]
- Updated dependencies [65d2fcc79]
- Updated dependencies [790ebb414]
- Updated dependencies [bcf33afa5]
- Updated dependencies [1ea4ad413]
- Updated dependencies [93b2c022a]
- Updated dependencies [03357cbc7]
- Updated dependencies [16bac2b93]
- Updated dependencies [15d04a861]
- Updated dependencies [93e97f1c8]
- Updated dependencies [9800ae4dc]
- Updated dependencies [e4471b505]
- Updated dependencies [dd346dfb0]
- Updated dependencies [249d2b2ef]
- Updated dependencies [e0cf5ab04]
- Updated dependencies [ab6468878]
- Updated dependencies [e0c1d9462]
- Updated dependencies [6e5affe16]
- Updated dependencies [fea9061ca]
- Updated dependencies [71bb8fd39]
- Updated dependencies [816c9ea7d]
- Updated dependencies [5677dc955]
- Updated dependencies [cf0da1888]
- Updated dependencies [a7bb67f3e]
- Updated dependencies [2c461f6f6]
- Updated dependencies [7e006bbcb]
- Updated dependencies [5c30cbdf6]
- Updated dependencies [9f234c56a]
- Updated dependencies [c2218e2e4]
- Updated dependencies [f1ab36f3f]
  - @devkit/utilities@2.0.0
  - @devkit/icons@1.1.17

## 2.0.0-next.243

### Patch Changes

- cf0da188: DynamicForm: Allowed FormFields to be remapped and return a new schema based on another (parent) field
- Updated dependencies [cf0da188]
  - @devkit/utilities@2.0.0-next.75

## 2.0.0-next.242

### Patch Changes

- 6dbbd37e: [OTPField]: lose focus when field is disabled

## 2.0.0-next.241

### Patch Changes

- cde19dbe: [ConfirmDialog]: Fixed Title alignment and added buttonsize 'Large' for button group

## 2.0.0-next.240

### Patch Changes

- 3d96ac7e: DynamicReport form resets when tab changes
- c0934015: Handle Form-Field to accept Custom Components
- 7e006bbc: MultiSelectDropdown: Added feature to select all items
- Updated dependencies [b416eeb9]
- Updated dependencies [c0934015]
- Updated dependencies [7e006bbc]
  - @devkit/utilities@2.0.0-next.74

## 2.0.0-next.239

### Patch Changes

- 8727ecef: CheckBoxGroup: Update the expansion of each childGroup as the expand state of main groupId expand state

## 2.0.0-next.238

### Patch Changes

- b0a0380f: [Collapsible]: use useEffect instead of useLayoutEffect

## 2.0.0-next.237

### Patch Changes

- 3ce5c095: Fixed an issue where the search form would render "0" if no search fields were passed
- 3ce5c095: Made datagridOptions mandatory since the keyfield prop is required for datagrid
- fddc30e0: [InputComponent]: Keep same id on server and client rendering

## 2.0.0-next.236

### Patch Changes

- e1ab4fbd: RadioButton : generate new variant for the full width radio button
- a9934ed4: Toast: fix width for the toast

## 2.0.0-next.235

### Patch Changes

- f3941bf3: [Layout] Fix initial loading content shift

## 2.0.0-next.234

### Patch Changes

- 555447e4: export ECalendars type and Calendars object from utilities package
- Updated dependencies [555447e4]
  - @devkit/utilities@2.0.0-next.73

## 2.0.0-next.233

### Patch Changes

- 13d38112: Toast component: style fix
- 4dc316cb: Add multi calendar feature to Date Picker component, including Hijri tabular calendar
- Updated dependencies [4dc316cb]
  - @devkit/utilities@2.0.0-next.72

## 2.0.0-next.232

### Patch Changes

- 6590c9a9: UploadFile: updating selectFileDropArea type

## 2.0.0-next.231

### Patch Changes

- 995014d1: [DashboardLayout]: currentUser.noDrawerForUserMenu changed type to boolean | 'responsiveHide', for only
  showing burger menu on responsive view

## 2.0.0-next.230

### Patch Changes

- Updated dependencies [cf1fd078]
  - @devkit/utilities@2.0.0-next.71

## 2.0.0-next.229

### Patch Changes

- 1b156b4e: [Datepicker]: Added Drag Scroll for timeview
- e1e73ce6: Modal: add extraLarge variant to modal

## 2.0.0-next.228

### Patch Changes

- 007ad7b2: SideBar: Tooltip for Long label fixed
- 89362961: Made dynamic report call filters api on tab change

## 2.0.0-next.227

### Patch Changes

- b7267df0: Changed APIs in DynamicReport so that filters API returns search fields and data API returns rows and
  columns for DataGrid
- ca0f1707: [Layouts] add data-testid to user menu items for non prod env

## 2.0.0-next.226

### Patch Changes

- 84007444: UploadFile: updating the design

## 2.0.0-next.225

### Minor Changes

- 9365cf84: Adding string type support for value of radio card options

### Patch Changes

- Updated dependencies [9365cf84]
  - @devkit/utilities@2.0.0-next.70

## 2.0.0-next.224

### Patch Changes

- 2b01e12e: RadioButton: Adding a new prop "highlighted"

## 2.0.0-next.223

### Patch Changes

- 1ec2836d: DateRangePicker: end Date seconds

## 2.0.0-next.222

### Patch Changes

- a67e3ad6: [DashboardLayout]: fixed text align on mobile view with long tab name

## 2.0.0-next.221

### Patch Changes

- 6e2ae26a: useHTMLElementObserver: Adding timeout to resizeObserver.
- 1ea4ad41: TextField: updating the assitive text color as per DLS
- 1ea4ad41: Radio&checkbox Buttons: updating size for both
- Updated dependencies [1ea4ad41]
  - @devkit/utilities@2.0.0-next.67

## 2.0.0-next.220

### Patch Changes

- d8bd816c: [CardPayment]: fixed ios validation issue
- Updated dependencies [9800ae4d]
  - @devkit/utilities@2.0.0-next.66

## 2.0.0-next.219

### Patch Changes

- Updated dependencies [379df14c]
  - @devkit/utilities@2.0.0-next.65

## 2.0.0-next.218

### Patch Changes

- ff6f5fae: [TextField]: Fix placeholder alignment
- 667b943d: TimeLine: arabic review css

## 2.0.0-next.217

### Patch Changes

- a571db3c: Timeline: Updating the design
- 7d1499c1: Alert & Group Button: css separation
- 4530c8e1: theme, nj classes & sidebar component: grouping css and enhance sidebar component

## 2.0.0-next.216

### Major Changes

- 8e0e1a39: Checkbox: fix component alignment with sizes

### Patch Changes

- 3ce9067f: Data table: change disabled cursor style for disabled
- bc95ba40: DatePicker: added feature autoSelectTime
- Updated dependencies [bc95ba40]
  - @devkit/utilities@2.0.0-next.64

## 2.0.0-next.215

### Patch Changes

- 8d47985d: AlertComponent: Info alert icon restyle

## 2.0.0-next.214

### Patch Changes

- 4d5c7f2a: AdminPageLayout: Update theme and variables for secureData design

## 2.0.0-next.213

### Patch Changes

- 785f7e98: DynamicReport: Created the DynamicReport Component to make the DataGrid and SearchForm dynamic and handled
  from backend

## 2.0.0-next.212

### Patch Changes

- 5d501101: [HeaderUserMenu]: add test ids

## 2.0.0-next.211

### Patch Changes

- 2406e5f6: ImagePreview: fix rotation of the image

## 2.0.0-next.210

### Patch Changes

- a3f9ed7d: useHTMLElementObserver: Adding unobserve on Unmount.

## 2.0.0-next.209

### Patch Changes

- 433fb0c8: HeaderUserMenu: Fix issue with iOS needing double tap to click in drawer

## 2.0.0-next.208

### Patch Changes

- e3e7d415: datatable: update by applying new theme variables and themeing
- bed3f9e8: Slider-Carousel: update selected dot style

## 2.0.0-next.207

### Patch Changes

- d1468a71: [DataGrid]: fix single page server side handling selection when some rows are disabled

## 2.0.0-next.206

### Major Changes

- a0a06f17: loginlayout: header color for secureData

### Patch Changes

- 66cc985e: Replaced div with React.Fragment for hidden field

## 2.0.0-next.205

### Patch Changes

- e82e26d4: textlink: update href and download feature
- Updated dependencies [91207a84]
- Updated dependencies [dd346dfb]
  - @devkit/utilities@2.0.0-next.63

## 2.0.0-next.204

### Patch Changes

- 29d2cc6c: [DatePicker]: Consider timezone when time is selected on TImeView

## 2.0.0-next.203

### Patch Changes

- 825f810d: Textfield: Adding onPaste callback
- Updated dependencies [825f810d]
  - @devkit/utilities@2.0.0-next.62

## 2.0.0-next.202

### Patch Changes

- 18977ca8: [Datepicker]: Added view mode support for dynamic form
- 45cb26a0: [CheckBox]: Added map CheckBox field for dynamic form
- Updated dependencies [18977ca8]
- Updated dependencies [45cb26a0]
  - @devkit/utilities@2.0.0-next.61

## 2.0.0-next.201

### Patch Changes

- 83f3e587: [DataGrid]: fixed header selection message when all records are unselectable

## 2.0.0-next.200

### Patch Changes

- Updated dependencies [2b3aac51]
  - @devkit/utilities@2.0.0-next.60

## 2.0.0-next.199

### Patch Changes

- e61a24c6: [RadiButton Group]: Adjusted column gap to 12px
- 75e7c071: HeaderUserMenu: Fixing parent scoll when drawer opens/close

## 2.0.0-next.198

### Patch Changes

- b8b1072f: Date picker range view mode selection

## 2.0.0-next.197

### Patch Changes

- 5bfe4e7f: --GroupButton:update new variant sizes and new colors variables pending on theme --Theme:update new theme
  for secureData --StoryBook:update new theme for secureData at theme provider

## 2.0.0-next.196

### Patch Changes

- 32090ca6: Date picker calendar view mode selection and new time style

## 2.0.0-next.195

### Patch Changes

- 96efbf3d: DataGrid: Add React Element to mobileResponsiveModalTitle prop type

## 2.0.0-next.194

### Patch Changes

- Updated dependencies [0f8115ca]
  - @devkit/utilities@2.0.0-next.59

## 2.0.0-next.193

### Patch Changes

- 82fa37f0: TextField: Fix readOnly prop configuartion in TextField Component
- ede16436: [DashboardLayout]: Fixed height styles for children

## 2.0.0-next.192

### Patch Changes

- 7379d1fe: CheckboxGroup:Update Start padding in checkboxGroup in Accordion View

## 2.0.0-next.191

### Patch Changes

- Updated dependencies [5528a397]
  - @devkit/utilities@2.0.0-next.58

## 2.0.0-next.190

### Minor Changes

- 120d99d1: web:ProgressLog - Added new component ProgressLog

## 2.0.0-next.189

### Patch Changes

- 886a4eda: NumberRangeField: remove to and fix gap between inputs
- 69892c4a: [DataGrid]: Fix tooltip for long word

## 2.0.0-next.188

### Patch Changes

- 26a90667: MultiSelectDropdownItem: fixing checkbox onClick issue

## 2.0.0-next.187

### Patch Changes

- b7b9ee7a: DynamicForm: Fix unique key warning in dynamic form in case of hidden fields
- eaa6d352: textField: PrefixArea style change from button to span
- cfc97e17: CSSVariables: adding variables for ar and en font
- f2a12452: datatable: updating pagination style

## 2.0.0-next.186

### Patch Changes

- 563187d4: Button:Added variant 'social'

## 2.0.0-next.185

### Patch Changes

- 044113b9: BottomSheet: updating the title size

## 2.0.0-next.184

### Patch Changes

- f015bb40: ImageFeature: Enhance Image Features component, EditUpload: fixed column view

## 2.0.0-next.183

### Patch Changes

- 8290333b: RadioButtonGroup: add disabled prop to radio button group

## 2.0.0-next.182

### Patch Changes

- 65d0241b: translate error if a translation key is provided
- 93b4c38c: CheckBoxGroup: Show side arrows in default view for firstLevel items
- 74a4d9ab: TextField: border style for disabled
- Updated dependencies [65d0241b]
  - @devkit/utilities@2.0.0-next.57

## 2.0.0-next.181

### Major Changes

- 8cf23956: TextFiled : Disabled style fix for IOS

## 2.0.0-next.180

### Major Changes

- f4d945b7: RadioCard: configure tab from index

## 2.0.0-next.179

### Major Changes

- 58fe9350: ActionMenu: updating layout for mobile

## 2.0.0-next.178

### Major Changes

- 55feadbf: ActionMenu: updating layout header style and action menu

### Patch Changes

- 6b2aaab4: [ImagePreview]: Add title

## 2.0.0-next.177

### Patch Changes

- 0ccc627b: CheckBoxGroup: Edit Expand All button functionality to check the expanded items if any of them collapsed to
  change the state felixable
- cad072c4: RadioButton: fix the input style at Firefox
- cad072c4: CheckBox: fix the input style at Firefox

## 2.0.0-next.176

### Patch Changes

- 6511a8b7: RadioCard : fixing selected issue flickering
- 2890983c: Checkbox & Radio Button : updating tab Usage in form
- eccffdc9: ActionMenu: adding css layout
- 6f599d88: UserAvatar: Fixing avatar in case of empty user name.

## 2.0.0-next.175

### Patch Changes

- 23d03830: Web: Export ImageFeatures component

## 2.0.0-next.174

### Patch Changes

- 99096c23: TabNavigation: adding scrolling for tabs container

## 2.0.0-next.173

### Patch Changes

- 5a9a6608: fix input id for RadioButton

## 2.0.0-next.172

### Patch Changes

- 740239b6: Modal:fixing description issue on the modal bottom-sheet DataGrid: updating the style for the Export button
  and enableRefresh in the mobile view TabNavigation: adding a new prop (actionComponent)

## 2.0.0-next.171

### Patch Changes

- eb859e3d: DataGrid: fix pagination styling

## 2.0.0-next.170

### Major Changes

- a93d445f: Fix DropDown at Safari

### Patch Changes

- 50b107d8: DataGrid: updating CSS to tailwindcss

## 2.0.0-next.169

### Patch Changes

- 84e7a405: TextField: Fix Trim for Text field

## 2.0.0-next.168

### Patch Changes

- f33d2ed5: TextField: Trim bypassed for number field

## 2.0.0-next.167

### Patch Changes

- b88fb00e: Enhance design for DatePickerRange Component

## 2.0.0-next.166

### Patch Changes

- 32e549bb: [useResponsiveView]: fixed hydration for dashboard layout

## 2.0.0-next.165

### Patch Changes

- 585e1adb: CheckBox Group:Update the checkbox Group Design to make all top levels data seperated

## 2.0.0-next.164

### Patch Changes

- b82cb48f: ['@devkit/web'] add useIsOnline hook ['@shory/auth']['ShorySessionProvider'] use the useIsOnline hook

## 2.0.0-next.163

### Patch Changes

- 4ddbd4e7: capsule button: issue of line height fix
- 9653de82: [RadioCard]: changed card border to always be 2px at all statuses

## 2.0.0-next.162

### Patch Changes

- 9d26ec62: CSS: define a new variable for fonts
- Updated dependencies [9185b907]
  - @devkit/utilities@2.0.0-next.56

## 2.0.0-next.161

### Patch Changes

- 9ad2f0da: [CardPayment]: Allow only alphabet & space for card holder name

## 2.0.0-next.160

### Patch Changes

- 34b103c0: Stepper control : style issue for the before and after line style

## 2.0.0-next.159

### Patch Changes

- 9c754827: Theme files refactoring to keep the 'theme' function that is used by the variables to be reflected by
  tailwindcss color scheme changes

## 2.0.0-next.158

### Patch Changes

- b3984359: [Badge]: Added Neutral Grey variant

## 2.0.0-next.157

### Patch Changes

- 881ae3ab: Fix nj-style bundle issue

## 2.0.0-next.156

### Patch Changes

- 7340193e: Styles for components: Updating all brand-600 color to devkit variable
- Updated dependencies [fea9061c]
  - @devkit/icons@1.1.17-next.19

## 2.0.0-next.155

### Patch Changes

- fe28d364: textfield : updating disabled style
- Updated dependencies [e95a8caf]
  - @devkit/utilities@2.0.0-next.55

## 2.0.0-next.154

### Patch Changes

- 99aabcdd: [Dashboardlayout]: Fixed hydration issue for mobile view

## 2.0.0-next.153

### Patch Changes

- Updated dependencies [93e97f1c]
  - @devkit/utilities@2.0.0-next.54

## 2.0.0-next.152

### Patch Changes

- e342eebf: DataGrid: Updating font size of cells to 12 px.

## 2.0.0-next.151

### Patch Changes

- Updated dependencies [317c5802]
  - @devkit/utilities@2.0.0-next.53

## 2.0.0-next.150

### Patch Changes

- Updated dependencies [5a8171e4]
  - @devkit/utilities@2.0.0-next.52

## 2.0.0-next.149

### Patch Changes

- ac3ff898: [CheckoutFrames]: Fix CVV popover padding

## 2.0.0-next.148

### Patch Changes

- 1a2e28e0: useReactForm: fix form submit validation issue

## 2.0.0-next.147

### Patch Changes

- 3f84f866: checkbox: fixing font size issue
- Updated dependencies [71bb8fd3]
  - @devkit/icons@1.1.17-next.18

## 2.0.0-next.146

### Patch Changes

- 72f06666: Date ranage picker time to remain same when changing month and year

## 2.0.0-next.145

### Patch Changes

- Updated dependencies [da7eabe2]
  - @devkit/utilities@2.0.0-next.51

## 2.0.0-next.144

### Patch Changes

- 8e8344be: UploadFileInput: Update onChange function to support async validation

## 2.0.0-next.143

### Patch Changes

- e912885e: DashboardLayout: Fix sidebar padding with SSR

## 2.0.0-next.142

### Patch Changes

- 73fa9d7e: RadioButton: Fixing click on radio button.

## 2.0.0-next.141

### Patch Changes

- 00a15288: CapsuleButton: reviewing component and follow Dls plus creating sizes small-medium-large
- f8dbb483: Checkbox:

  - apply styles from DLS for the checkbox
  - 4 sizes for checkbox x-small , small, medium, large

- Updated dependencies [39b0a157]
  - @devkit/icons@1.1.17-next.17

## 2.0.0-next.140

### Patch Changes

- f3835529: DashboardLayout: Fix SubHeader Padding issue

## 2.0.0-next.139

### Patch Changes

- bcf33afa: TextArea: Aligning the char counter to the right as per the design. Password: Updating the eye icon color to
  be black for active/idle and gray for disabled.
- 02aa1f0a: DashboardLayout: Add label support for the tab navigation
- Updated dependencies [bcf33afa]
  - @devkit/icons@1.1.17-next.16

## 2.0.0-next.138

### Patch Changes

- 7128ef42: Refactor auto suggest dropdown component
- Updated dependencies [0bc04114]
  - @devkit/utilities@2.0.0-next.50

## 2.0.0-next.137

### Patch Changes

- 03357cbc: [DatePicker]: Fix age calculation
- Updated dependencies [03357cbc]
  - @devkit/utilities@2.0.0-next.49

## 2.0.0-next.136

### Patch Changes

- 788f436b: [UploadFile]: Fixed drag and drop

## 2.0.0-next.135

### Patch Changes

- 9c976606: [ConfirmDialog]: remove extra X button from confirm dialog

## 2.0.0-next.134

### Patch Changes

- 5d2f6343: CardPayment: added callback function to provide if the form is valid or not (onFormValidationChange)

## 2.0.0-next.133

### Patch Changes

- 856395e9: [CardPayment]: Add CancelledByUser error code onTokenizeError

## 2.0.0-next.132

### Patch Changes

- 15a8a330: [CardPaymentForm]: Add allow3dsModalClose optional prop to close the 3DS payment modal
- ce9af3b4: Date picker range maintaining the end of the day time selection consistent when changing the months.
- Updated dependencies [ce9af3b4]
  - @devkit/utilities@2.0.0-next.48

## 2.0.0-next.131

### Patch Changes

- Updated dependencies [5047ad17]
  - @devkit/utilities@2.0.0-next.47

## 2.0.0-next.130

### Patch Changes

- Updated dependencies [c2218e2e]
  - @devkit/utilities@2.0.0-next.46

## 2.0.0-next.129

### Patch Changes

- 73853383: LayoutHeaderMenu: Allowed menu item to be disabled through isDisabled property.

## 2.0.0-next.128

### Patch Changes

- 982c9c6c: OTPField: add bypassReset prop to the OTPField component so it doesn't reset the value when bypassReset=true

## 2.0.0-next.127

### Patch Changes

- 327cfd62: DatePicker: Added readOnly prop to prevent entering date manually
- Updated dependencies [327cfd62]
  - @devkit/utilities@2.0.0-next.45

## 2.0.0-next.126

### Patch Changes

- Updated dependencies [134ef0ec]
- Updated dependencies [e0cf5ab0]
  - @devkit/utilities@2.0.0-next.44
  - @devkit/icons@1.1.17-next.15

## 2.0.0-next.125

### Patch Changes

- Updated dependencies [c2a2a532]
  - @devkit/icons@1.1.17-next.14

## 2.0.0-next.124

### Patch Changes

- 1558d5a8: DatePicker: Fixed days and months calculation

## 2.0.0-next.123

### Patch Changes

- 538e5093: ToggleSwitch: Updating toggle switch as per DLS and add size props
- 1334269e: Styling Alert component to follow the DLS
- Updated dependencies [2c461f6f]
  - @devkit/utilities@2.0.0-next.43

## 2.0.0-next.122

### Patch Changes

- 4e49761b: DatePicker: Fixed Date Picker Age Calculation

## 2.0.0-next.121

### Patch Changes

- fb5b8d0f: DatePicker: fix age caculation to consider system timezone

## 2.0.0-next.120

### Patch Changes

- 3282bae5: RadioButton: give the ability for label prop to have full width in case we are passing the label as
  component

## 2.0.0-next.119

### Patch Changes

- e48b73f0: - TextLink: new component added to replace the LinkButton and follow DLS design
  - edit-pencil icon: remove unused elements
  - LinkButton: Deprecated to start replacing it with TextLink
- Updated dependencies [567d5553]
- Updated dependencies [e48b73f0]
  - @devkit/icons@1.1.17-next.13

## 2.0.0-next.118

### Patch Changes

- ca3d343d: [Modal]: removed initial focus for inputs
- 9f234c56: [RadioButtonGroup]: Add columnsCount prop to control the number of columns the radio buttons will span
- Updated dependencies [9f234c56]
  - @devkit/utilities@2.0.0-next.42

## 2.0.0-next.117

### Major Changes

- c0cfa4c2: Button: revert the default button size to middle

### Patch Changes

- 77456667: [Input]: Fixed input focus for safari browser

## 2.0.0-next.116

### Patch Changes

- 61b7050e: updating X small size for buttons as per dsl
- 362cf0ee: Radio Button : Creating single radio button component.
- Updated dependencies [362cf0ee]
  - @devkit/utilities@2.0.0-next.41

## 2.0.0-next.115

### Patch Changes

- Updated dependencies [ba866902]
  - @devkit/icons@1.1.17-next.12

## 2.0.0-next.114

### Patch Changes

- b242ea69: CapsuleButton: Updating styles of capsule button.
- 7ac33acd: updateing Tab navigation component tto follow dls
- 15d04a86: [RadioButton]: added new component RadioButton. [DynamicForm]: added mapRadioButtonField to dynamic form and
  it's story
- Updated dependencies [15d04a86]
  - @devkit/utilities@2.0.0-next.40

## 2.0.0-next.113

### Patch Changes

- 9cb671d8: Text Field: fixing the on-clear function while the input not focused on date-picker, text-field, and
  drop-down

## 2.0.0-next.112

### Patch Changes

- 6e7d13d0: removed onKeyDown from the reference props in order to make the space key work while searching

## 2.0.0-next.111

### Patch Changes

- 9cdcdeb2: [NumberField] Revert Number input follow the default dir
- 9cdcdeb2: NumberField: Fix direction

## 2.0.0-next.110

### Patch Changes

- 2ba3b3ff: [DatePicker]: Fix age calculation
- 9d041468: [Dropdown]: Fixed multiselect dropdown footer styles

## 2.0.0-next.109

### Patch Changes

- 7fde767e: InputComponent: Number input follow the default dir

## 2.0.0-next.108

### Patch Changes

- 97d675c1: [DatePicker]: fix age calculation

## 2.0.0-next.107

### Patch Changes

- Updated dependencies [f100ac99]
  - @devkit/utilities@2.0.0-next.39

## 2.0.0-next.106

### Patch Changes

- eac4361d: [FormLabel]: fixed issue when label wraps( perant gets extra gap )
- 55c7c47b: MultiSelectDropdownItem: Make the whole item clickable for check/uncheck checkbox
- 90a46fcd: [TextField]: fixed dir for number field ( mapNumberField not affected by dir issue ) , [DashboardLayout]:
  aligned tabs labels

## 2.0.0-next.105

### Patch Changes

- d953cd04: [Disclosures]: update toggle behavior

## 2.0.0-next.104

### Patch Changes

- 1b4e7f9c: [Disclosures]: Refactor Disclosures
- b2e4a418: [Layout]: Added disabled state to drawer menu
- 2d578a19: [Datepicker]: fixed Calendar close issue on mobileview

## 2.0.0-next.103

### Patch Changes

- 5757e53c: PaymentFormInputGroup: Make payment inputs ltr to fix issue with card number on Arabic

## 2.0.0-next.102

### Patch Changes

- 4b451ed8: [Bottomsheet]: Fixed scroll issue
- 238fb17f: [Action menu]: Added downarrow icon
- 086425ad: [Bottomsheet]: Fixed outline truncate issue

## 2.0.0-next.101

### Patch Changes

- b4de80d7: [FormFieldWithEdit]: added responsive view for mobile

## 2.0.0-next.100

### Patch Changes

- 0311649a: Disclosure: Fixing while filter out disclosure items

## 2.0.0-next.99

### Patch Changes

- a0d7d79f: [Disclosures]: Added Expand all and collapse all

## 2.0.0-next.98

### Patch Changes

- c08be349: Checkbox: add new optional prop (errorVariant) to apply the error color for box only or the box with label

## 2.0.0-next.97

### Patch Changes

- 954b4762: [DashboardLayout]: fixed responsive styles issue

## 2.0.0-next.96

### Patch Changes

- a05665a5: DatePicker: Fix Day Navigation to previous months is displayed when setting fromDate

## 2.0.0-next.95

### Patch Changes

- d3c63d83: [DropDownInputComponent, MultiSelectDropdown]: Add hideValueLabel prop to DropDownInputComponent to hide
  selected items on MultiDropDown and on Dropdown Input
- 1e7cc81b: [Dropdown]: Arabic content alignment for selected value
- Updated dependencies [d3c63d83]
  - @devkit/utilities@2.0.0-next.38

## 2.0.0-next.94

### Patch Changes

- Updated dependencies [e0c1d946]
  - @devkit/utilities@2.0.0-next.37

## 2.0.0-next.93

### Patch Changes

- a83f86e1: FullPageLayout, DashboardLayout fix children unmount if the page orientation get changed

## 2.0.0-next.92

### Patch Changes

- 842ac4eb: [DataGrid]: added new prop mobileResponsiveOnClick
- 1d368148: [LayoutHeaderMenu]: Add "target" Prop To Link Configs as a optional prop.

## 2.0.0-next.91

### Minor Changes

- 90cb8b8c: Export timeline component and props
- 978fb1cf: Adding async loading for button

### Patch Changes

- 110d8ad1: [Action Menu]: Close menue after selecting an item
- 06748d39: create style file for stepper

## 2.0.0-next.90

### Patch Changes

- f337cc53: Adding Timeline component for showing tree history items.
- 2a579be4: [DropDown]: Fix validation border
- Updated dependencies [f337cc53]
  - @devkit/utilities@2.0.0-next.36

## 2.0.0-next.89

### Minor Changes

- 1f2bec84: cardPayment: Add cardTypeNotSupported error message

## 2.0.0-next.88

### Patch Changes

- e95b4936: HeaderUserMenu: Provide direction prop to drawer items

## 2.0.0-next.87

### Patch Changes

- e76ce802: [Group button]: fixed container styles added cursor pointer
- 99c14cf0: ActionMenu: Using layout header menu in action menu.

## 2.0.0-next.86

### Patch Changes

- 56d47dd9: HeaderUserMenu: Render burger menu only if the user not logged in and there is userMenuItems

## 2.0.0-next.85

### Patch Changes

- 6434dc9a: [Formlabel]: Changed label text-size
- de7c20f6: [BottomSheet]: Added divider for bottomsheet

## 2.0.0-next.84

### Patch Changes

- d67153bb: [GroupButtons]: implemented new GroupButtons component and story

## 2.0.0-next.83

### Patch Changes

- e4471b50: CheckboxGroup: renaming prop (changedValues to highlightedOptions)
- Updated dependencies [e4471b50]
  - @devkit/utilities@2.0.0-next.35

## 2.0.0-next.82

### Patch Changes

- 14f88c71: update style for disclosure
- e0f5b70e: ConfirmDialog: Change icon for success variant

## 2.0.0-next.81

### Patch Changes

- Updated dependencies [90592716]
  - @devkit/utilities@2.0.0-next.34

## 2.0.0-next.80

### Patch Changes

- ab0ff531: adding new props "highlighted" to text-field, drop-down, date-picker, check-box, text-area, and upload file
  input

## 2.0.0-next.79

### Patch Changes

- 10a995ad: Tooltip: Update z-index Datepicker: update direction

## 2.0.0-next.78

### Patch Changes

- 20c31308: ConfirmDialog: Updating button styles

## 2.0.0-next.77

### Patch Changes

- db10ad2f: Button: Fix spinner absolute and checkout loading

## 2.0.0-next.76

### Patch Changes

- f8431b43: [Dynamic form]: Added columnsCountForMobile for mobile view
- 4708b5a7: [CapsuleButtons]: added new CapsuleButtons component

## 2.0.0-next.75

### Patch Changes

- Updated dependencies [1dedb451]
  - @devkit/utilities@2.0.0-next.33

## 2.0.0-next.74

### Patch Changes

- d9dba090: Badge: Update styles according to Styleguide

## 2.0.0-next.73

### Patch Changes

- f5d9811e: [General] Update peer dependencies
- Updated dependencies [f5d9811e]
  - @devkit/utilities@2.0.0-next.32
  - @devkit/icons@1.1.17-next.11

## 2.0.0-next.72

### Patch Changes

- 9a21b4c9: ResponsiveRenderViewContainer: fixed date picker issue , calendar not showing in modal
- 816c9ea7: ConfirmDialog: center the content in desktop,tablet view only Dropdown: add boolean type to primitive keys
  AdminPageLayout: added overflow hidden to the layout content
- Updated dependencies [816c9ea7]
  - @devkit/utilities@2.0.0-next.31

## 2.0.0-next.71

### Patch Changes

- cac56347: [LayoutHeaderMenu] Add auto update to make the floating item attached with the parent item while scrolling

## 2.0.0-next.70

### Patch Changes

- 778f4745: [LayoutHeaderMenu] Fix floating with scrolling

## 2.0.0-next.69

### Patch Changes

- 0722c4d5: [Layouts] Fix floating ui elements was causing body scrolling

## 2.0.0-next.68

### Patch Changes

- bf67d263: [FullPageLayout] Fix Floating Portal

## 2.0.0-next.67

### Patch Changes

- 275ae805: [FloatingPortal] Added to Layout scroll areas to avoid duplicated scrolling

## 2.0.0-next.66

### Patch Changes

- e376ac79: [Dropdown] fix width for non custom render dropdown
- Updated dependencies [e376ac79]
  - @devkit/utilities@2.0.0-next.30

## 2.0.0-next.65

### Patch Changes

- Updated dependencies [f1ab36f3]
  - @devkit/utilities@2.0.0-next.29

## 2.0.0-next.64

### Patch Changes

- 64f81c0f: [Dropdown]: Fix for dropdown flip issue

## 2.0.0-next.63

### Patch Changes

- 790ebb41: [Fixes] Added isBeforeNow dateUtil, rename the TFormFieldSchema to FormFieldSchema
- Updated dependencies [790ebb41]
  - @devkit/utilities@2.0.0-next.28

## 2.0.0-next.62

### Patch Changes

- d44baf7e: [DatePicker]: Keep validation error when no date are filled
- 905d66e3: [Disclosures]: Added key to fragment

## 2.0.0-next.61

### Patch Changes

- b0a92483: [Form] Fix scrolling to the error on submit
- Updated dependencies [b0a92483]
  - @devkit/utilities@2.0.0-next.27

## 2.0.0-next.60

### Patch Changes

- 61569b3e: SimpleStepper: Removing z-index style

## 2.0.0-next.59

### Patch Changes

- Updated dependencies [65d2fcc7]
  - @devkit/utilities@2.0.0-next.26

## 2.0.0-next.58

### Patch Changes

- Updated dependencies [091ddb2b]
  - @devkit/utilities@2.0.0-next.25

## 2.0.0-next.57

### Patch Changes

- 471ac791: SimpleStepper: Update stepper text size mobile

## 2.0.0-next.56

### Patch Changes

- 8a6d8b04: [Disclosures]: Fix outline overflow issue for input

## 2.0.0-next.55

### Patch Changes

- 6183c444: [Form] Scroll to the first field that has error

## 2.0.0-next.54

### Patch Changes

- 7747e5b0: updating otp
- ab646887: [Form] Allow scroll to the first field has validation error
- Updated dependencies [ab646887]
  - @devkit/utilities@2.0.0-next.24

## 2.0.0-next.53

### Patch Changes

- 1c70c908: [DatePicker]: Increase space between date and age

## 2.0.0-next.52

### Patch Changes

- 843efed2: devkitSimpleBar: fix scrolling show and hide while content scroll change

## 2.0.0-next.51

### Patch Changes

- 332bcc86: [devkitSimpleBar] fix scrolling with mouse drag

## 2.0.0-next.50

### Patch Changes

- 772b08af: [RadioCard]: fix radio card direction prop not working correctly

## 2.0.0-next.49

### Patch Changes

- 284ac918: [DatePicker] Fix the iso timezone format, [DateGrid] Fix z-index with dropdown and date picker
- Updated dependencies [284ac918]
- Updated dependencies [33ad353c]
  - @devkit/utilities@2.0.0-next.23
  - @devkit/icons@1.1.17-next.10

## 2.0.0-next.48

### Patch Changes

- 82c70999: [DatePicker]: Round up age

## 2.0.0-next.47

### Patch Changes

- dceefc4c: DatePicker: Refactor with Date Utils refactoring
- Updated dependencies [dceefc4c]
  - @devkit/utilities@2.0.0-next.22
  - @devkit/icons@1.1.17-next.9

## 2.0.0-next.46

### Patch Changes

- 68a73b4f: Checkbox Group nested single option and multiple children groups behavior

## 2.0.0-next.45

### Patch Changes

- b305b919: [RadioCard]: added new prop ( direction ) pass flex direction, default is flex-row
- Updated dependencies [b305b919]
  - @devkit/utilities@2.0.0-next.21

## 2.0.0-next.44

### Patch Changes

- 2aa74642: DropDown:fixing search with enter click behavior

## 2.0.0-next.43

### Patch Changes

- d2b991d4: [Datagrid]: Added hideMobileResponsiveDetailsArrow for Mobile responsive render
- 05c546be: [Checkbox]: added clsx file, added new boolean prop (hasError):border and background color is red when it's
  true

## 2.0.0-next.42

### Patch Changes

- Updated dependencies [6e5affe1]
  - @devkit/icons@1.1.17-next.8

## 2.0.0-next.41

### Patch Changes

- Updated dependencies [0bca4a0d]
  - @devkit/utilities@2.0.0-next.20

## 2.0.0-next.40

### Patch Changes

- 5c30cbdf: DropDown: adding onClearValue function
- 8e775594: Dropdown: Add getIsItemDisabled callback prop
- Updated dependencies [5c30cbdf]
  - @devkit/utilities@2.0.0-next.19

## 2.0.0-next.39

### Patch Changes

- d5d435d6: DataGrid: change client side sorting to be case insensitive
- d5d435d6: DataGrid: return custom line if the format function return empty string

## 2.0.0-next.38

### Minor Changes

- dc65b53d: Support Themes for Default and Aber Theme

## 2.0.0-next.37

### Patch Changes

- Updated dependencies [bcfc7a61]
  - @devkit/utilities@2.0.0-next.18

## 2.0.0-next.36

### Minor Changes

- 22036bc7: Input Components And Buttons: Enhancements and Restructure

### Patch Changes

- Updated dependencies [22036bc7]
- Updated dependencies [22036bc7]
  - @devkit/utilities@2.0.0-next.17
  - @devkit/icons@1.1.17-next.7

## 2.0.0-next.35

### Patch Changes

- Updated dependencies [93b2c022]
  - @devkit/icons@1.1.17-next.6

## 2.0.0-next.34

### Patch Changes

- e043a052: Fix peer dependencies

## 2.0.0-next.33

### Patch Changes

- 28d98ed6: Merge develop branch to beta branch
- Updated dependencies [28d98ed6]
  - @devkit/utilities@2.0.0-next.15
  - @devkit/icons@1.1.17-next.5

## 2.0.0-next.32

### Patch Changes

- 9514b651: [FullPageLayout]: display subHeader correctly
- f886908f: Badge: Making showIcon prop as optional.

## 2.0.0-next.31

### Patch Changes

- 249d2b2e: Badge: change varients as per dls
- Updated dependencies [249d2b2e]
  - @devkit/icons@1.1.17-next.4

## 2.0.0-next.30

### Patch Changes

- bd3648bd: [CheckBoxGroup] Fix changesbox group after the checkbox state has been fixed
- bd3648bd: [FullPageLayout] fix sticky header

## 2.0.0-next.29

### Patch Changes

- e2b8ea17: [Dropdown] components refactor
- Updated dependencies [e2b8ea17]
  - @devkit/utilities@2.0.0-next.14

## 2.0.0-next.28

### Patch Changes

- fc04268a: Dropdown: fix error messages

## 2.0.0-next.27

### Patch Changes

- 5677dc95: [RadioCard]: added center prop to card object, fix style when error and custom className
- Updated dependencies [5677dc95]
  - @devkit/utilities@2.0.0-next.12

## 2.0.0-next.26

### Patch Changes

- 80dcfadc: [FullPageLayout]: Update left and right paddings for body and footer

## 2.0.0-next.25

### Patch Changes

- c06efde7: [ThemeProvider] revert theme provider usermenu type

## 2.0.0-next.24

### Patch Changes

- 40967731: LayoutHeaderMenu: Updating the component

## 2.0.0-next.23

### Patch Changes

- 6be40e0b: Data-grid: updating enableRefresh functionality
- 7c140bce: FullPageLayout: fix the full page height for the tablet and mobile

## 2.0.0-next.22

### Minor Changes

- 99a5905: fixed deciaml places in NumberField component

### Patch Changes

- Updated dependencies [99a5905]
  - @devkit/utilities@2.0.0-next.10

## 2.0.0-next.21

### Patch Changes

- 2961573: Dropdown: fixing rendering the menu while disabling
- 83fe854: Popover: Updating the style and adding a new prop variant (light and dark) and content Date-picker: making
  the text field disabled on the mobile view
- 72b9736: Drop Down: fixing arrow issue while clicking
- a5dc8ac: Creating a new component Divider LinkButton: updating the style
- 0d65d64: Buttons: fixing the flickering issue while loading Spinner: adding a new prop "className"

## 2.0.0-next.20

### Patch Changes

- 5684436: Button: Adjust Button Colors for Secondary and Other Variants

## 2.0.0-next.19

### Patch Changes

- 0421078: TextField and Buttons: updating the styles

## 2.0.0-next.18

### Patch Changes

- 24b81be: BottomSheet: fix maximum height
- 3e6e9b1: Alert:Updating the style
- Updated dependencies [3e6e9b1]
  - @devkit/icons@1.1.17-next.3

## 2.0.0-next.17

### Patch Changes

- 2cec0f3: [Input Fields] Enhance Show Error Border [FullPage Layout] Fix User Menu if not login
- Updated dependencies [2cec0f3]
  - @devkit/utilities@2.0.0-next.9

## 2.0.0-next.16

## 4.0.14

### Patch Changes

- 871c869e: Year range fix when initital viewmode is selected

## 4.0.13

### Patch Changes

- 067e7434: Month and year view selection fix

## 4.0.12

### Patch Changes

- ba3b0ba7: Months and Year only view selection in date picker

## 4.0.11

### Patch Changes

- f977648d: TextField: Fix Trim for Text field

## 4.0.10

### Patch Changes

- 9ed907cc: Datepicker invalid date fix

## 4.0.9

### Patch Changes

- 549a76e5: TextFiled: onBlur trim to trigger form change

## 4.0.8

### Patch Changes

- b955b1f0: TextField: Trim value on Blur

## 4.0.7

### Patch Changes

- c3185d2a: Removing font from tab navigation classname

## 4.0.6

### Patch Changes

- a24b8293: Modal:for variant=fullScreen update height to window.innerHeight

## 4.0.5

### Patch Changes

- 0c5647aa: Datepicker: added fix for timezone issue

## 4.0.4

### Patch Changes

- 701427dc: FullPageLayout:Added prop headerClassName to override styles

## 4.0.3

### Patch Changes

- ae70f4da: DatePickerRange : Added fix for default time selection in case of DatePickerRange

## 4.0.2

### Patch Changes

- 0485392b: Upload button styles fix

## 4.0.1

### Patch Changes

- 10d7ed05: UploadFile Button alignment fix

## 4.0.0

### Major Changes

- 6c1fde21: Card icon alignment

## 3.0.6

### Patch Changes

- cefdc6de: SimpleStepper: make the array of items accept string (revert the change)

## 3.0.5

### Patch Changes

- eb3f90c2: SimpleStepper: make the array of items accept ReactNode
- 68a73b4f: Checkbox Group nested single option and multiple children groups behavior

## 3.0.4

### Patch Changes

- 2b2b85e6: tailwind config: added min width options
- 3f587756: tailwind breakpoints: update tailwind breakpoint (md,lg)

## 3.0.3

### Patch Changes

- 4d826d6f: Pdf Preview show Pdf Canvas even in failure case

## 3.0.2

### Patch Changes

- 8567c5df: export setPdfPreviewWorkerSrc function

## 3.0.1

### Patch Changes

- a722517b: Pdf Preview use thumbnail or page conditionally

## 3.0.0

### Patch Changes

- 9cc49f55: Pdf Preview move setting worker src out of the component
- Updated dependencies [bcfc7a61]
  - @devkit/utilities@1.6.0

## 2.1.1

### Patch Changes

- 961f4719: PdfPreview: stop render Annotation Layer and Text Layer

## 2.1.0

### Minor Changes

- 21facbb4: [useResponsiveView] update the levels to match with tailwind config screens

### Patch Changes

- fd04af80: Pdf preview, handle textLayers

## 2.0.0

### Minor Changes

- 8e9cb725: [DashboardLayout]: added responsive support + [Icons]: 2 new icons added

### Patch Changes

- Updated dependencies [8e9cb725]
  - @devkit/icons@1.2.0

## 1.15.2

### Patch Changes

- 303cc6e1: Refactor Upload File Component

## 1.15.1

### Patch Changes

- 54f9b855: useResponsiveView: exportuseResponsiveHook and add isDesktop

## 1.15.0

### Minor Changes

- 347936e1: Apply style changes of Upload File component

## 1.14.3

### Patch Changes

- f6bfd84: InputComponent: Added timestamp to id generated from useId()
- 6ea8a53: Datepicker: added conditional setting of arabic config

## 1.14.2

### Patch Changes

- 5024066: OtpField: added autofocus prop

## 1.14.1

### Patch Changes

- ccf9c7d: FormFieldWithEdit: Issue in Ios Safari for password being autofilled

## 1.14.0

### Minor Changes

- 6b10983: upload file input parsing file issue

## 2.0.0-next.15

### Patch Changes

- df388af: [Toast] fix z-index for Toast

## 2.0.0-next.14

### Patch Changes

- 64abaa3: - ReactForm: fix validateField type
  - InputFields: Apply new Design
- Updated dependencies [64abaa3]
  - @devkit/utilities@2.0.0-next.8

## 2.0.0-next.13

### Patch Changes

- 0b204e3: [ReactForm] Fix the validationBehavior and change interfaces names as following:

  - IReactForm -> ReactForm
  - IReactFormOptions -> ReactFormOptions
  - TFormFieldsSchema -> FormFieldsSchema
  - IDynamicForm -> DynamicForm

- Updated dependencies [0b204e3]
  - @devkit/utilities@2.0.0-next.7

## 2.0.0-next.12

### Patch Changes

- 8d0dd76: FullPageLayout: fix z-index for modal, bottomsheet, drawer, and scrollbar tracks

## 2.0.0-next.11

### Patch Changes

- 7641fe1: [FullPageLayout] fix sticky header z index

## 2.0.0-next.10

### Minor Changes

- 3f3ab41: [Dropdown]: Apply DLS styles to Single Dropdown

### Patch Changes

- Updated dependencies [3f3ab41]
  - @devkit/utilities@2.0.0-next.6

## 2.0.0-next.9

### Patch Changes

- 2cb2192: update react form validation behavior to have two modes 'on-blur' or 'on-submit' and the default is
  'on-blur'. Also allow empty validation messages to show the input fields red background and border
- Updated dependencies [2cb2192]
  - @devkit/utilities@2.0.0-next.5

## 2.0.0-next.8

### Minor Changes

- ffee600: [Modal]: Added responsive bottomsheet for mobile view

### Patch Changes

- ce79e8e: [Disclosure]: Add secondary variant
- cb792bb: - [devkitSimpleBar] Reimplement
  - [FullPageLayout] Fix for mobile responsive while scrolling
- Updated dependencies [045cd7d]
  - @devkit/utilities@2.0.0-next.3

## 2.0.0-next.7

### Patch Changes

- a7bb67f: Date-picker: updating calendar icon fixing the age issue when adding a description prop
- Updated dependencies [a7bb67f]
  - @devkit/icons@1.1.17-next.2

## 2.0.0-next.6

### Patch Changes

- 60e714c: [Button]: default size to medium
- 523de25: [RadioCard]: Update padding

## 2.0.0-next.5

### Patch Changes

- a92726a: TextFields: updating the placeholder color DatePicker: updating the placeholder value
- d2257d7: [Radio Card]: Apply Design Style

## 2.0.0-next.4

### Patch Changes

- edc0946: [Colors]: Rename neutral to gray

## 2.0.0-next.3

### Patch Changes

- 4514ca1: Merge Develop Branch to Beta
- Updated dependencies [4514ca1]
  - @devkit/utilities@2.0.0-next.2
  - @devkit/icons@1.1.17-next.1

## 2.0.0-next.2

### Patch Changes

- d17f701: Date Picker: replace the RenderInput with the TextField
- Updated dependencies [16bac2b]
  - @devkit/icons@1.1.17-next.0

## 2.0.0-next.1

### Patch Changes

- 59cdc70: [RadioCard]: changed to accept array of cards objects with the new prop 'cards', added new mapRadioCardsField
  to the dynamic form to render RadioCards
- Updated dependencies [59cdc70]
  - @devkit/utilities@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- 92bd750c: [Colors]: update colors to follow the new dls
- 92bd750c: [Buttons]: Update button styles and variants to follow the dls
- 92bd750c: [Fonts]: update font sizes to follow the new dls
- 79d6e970: TextFields: Updating the styles and adding a new props (size, startIcon and endICon)

### Patch Changes

- 1531fe09: [RadioCard]: new component - toggleable card with label and optional placeholder/icon
- e21c7b26: Date Picker: Updating the styles and adding a new prop (size)
- Updated dependencies [92bd750c]
- @devkit/utilities@2.0.0-next.0

### Patch Changes

- 99d267a: Web: PdfPreview: fix:Image stretch issue, TabNavigation: Handle tab size to fit-content
- 5fa897c: Dropdown: Giving minWidth to the floating-ui
- 99d267a: web/ImagePreview: fixed pdf preview issue

## 1.13.38

### Patch Changes

- 5f7be18: CheckboxGroup: Grid cols configurable

## 1.13.37

### Patch Changes

- b0f1e19: Datepicker: fix the css that was hiding the time picker by default

## 1.13.36

### Patch Changes

- 4725cb2: [TextField] fix text field initial internal state to the prop value to avoid flickering

## 1.13.35

### Patch Changes

- 4a9edb4: web/ImagePreview: fixed pdf preview issue

## 1.13.34

### Patch Changes

- f0b0b00: [CardPayment]: Added custom ref to trigger payment form submit

## 1.13.33

### Patch Changes

- dbc3466: UploadFileInput: added prop hasError to use as form Error to handle empty scenario

## 1.13.32

### Patch Changes

- 3f1060a: NumberRangeField: Added twoColumns prop
- Updated dependencies [3f1060a]
  - @devkit/utilities@1.5.30

## 1.13.31

### Patch Changes

- 1d33afa: UploadFileInput: Added disabled prop to disable actions

## 1.13.30

### Patch Changes

- 6c32792: handle camera ratio

## 1.13.29

### Patch Changes

- 81c23ed: Web: ImagePreview: Fixed image preview modal height
- 81c23ed: Web: Image Preview full screen view change

## 1.13.28

### Patch Changes

- 3016bc9: Web: ImagePreview: Fixed image preview modal height

## 1.13.27

### Patch Changes

- 853ea01: ConfirmDialog:Padding added for Mobile issue

## 1.13.26

### Patch Changes

- 327b04c: [DataGrid]: fix frozen columns when Arabic language is selected

## 1.13.25

### Patch Changes

- a89df90: [DynamicForm]: showing value for none editable fields
- 9e86191: Datagrid: Header border for Arabic

## 1.13.24

### Patch Changes

- 19f54ae: Fix Pdf thumb issue

## 1.13.23

### Patch Changes

- 42fd06c: Handle camera horizontal scroll

## 1.13.22

### Patch Changes

- bde6547: [DynamicForm]: optimize condition for FormNonEditableField
- Updated dependencies [bde6547]
  - @devkit/utilities@1.5.28

## 1.13.21

### Patch Changes

- 47c4aac: [DataGrid]: fix empty message condition precedence

## 1.13.20

### Patch Changes

- 95f6ee0: Datepcker: responsive, removed Input field in case of mobile

## 1.13.19

### Patch Changes

- c38a0d5: [DataGrid]: arabic empty message with onRenderItem prop fix

## 1.13.18

### Patch Changes

- b8ef22e: Toast: Responsive Toast notification - will be center top or bottom for mobile

## 1.13.17

### Patch Changes

- 4cc70c8: Move ImagePreview Component from Old devkit UI

## 1.13.16

### Patch Changes

- 63e652d: [DataGrid]: add Arabic message when empty data, fix empty data message style when arabic language is selected

## 1.13.15

### Patch Changes

- 78a51a9: DatePicker: keyboard issue in mobile datepicker solved
- 3b70b77: Dropdown-Bottomsheet: Text align start to fix in Arabic

## 1.13.14

### Patch Changes

- 44efbcc: Toggle switch RTL support

## 1.13.13

### Patch Changes

- 49fdd45: Date picker internal validations fixes

## 1.13.12

### Patch Changes

- bd70740: Checkbox multi line and dashboard layout width fix
- 7b8d3b6: [Dropdown] fix options bottom sheet state to reflect options changes after the component get mounted

## 1.13.11

### Patch Changes

- 7f8e4bb: Consider screen ratio in Camera component

## 1.13.10

### Patch Changes

- 24762f2: [CardPayment]: Add onTokenizedError method to handle tokenization errors

## 1.13.9

### Patch Changes

- 78fa2b9: DatePicker: on clear to set focus to start of the input field

## 1.13.8

### Patch Changes

- 2165c78: LanguageSwitch: change cusrsor to default when disabled
- 6238bf5: LanguageSwitch: MAking cursor not allowed on disable.

## 1.13.7

### Patch Changes

- 33161bd: Export PdfPreview Component

## 1.13.6

### Patch Changes

- c3e625d: Multiselect group selection and autochange
- Updated dependencies [c3e625d]
  - @devkit/utilities@1.5.26

## 1.13.5

### Patch Changes

- 722cffb: CardPayment: Add new CardPayment component

## 1.13.4

### Patch Changes

- 6d70ea1: handle Camera style in Arabic case
- b807c91: [Modal]: Merged BottomSheet

## 1.13.3

### Patch Changes

- e21ac0b: Dropdown:overflow visible for arabic language issue

## 1.13.2

### Patch Changes

- 6a76db1: FormLabel and FormInputGroup: Adding variant for tooltip in form fields.
- Updated dependencies [6a76db1]
  - @devkit/utilities@1.5.25

## 1.13.1

### Patch Changes

- aa7048c: [Dropdown]: Added Placeholder for search input in dropdown responsive mobile view
- 947e9fc: Add Camera capture component to upload file component
- Updated dependencies [947e9fc]
  - @devkit/icons@1.1.16

## 1.13.0

### Minor Changes

- 67c5de4: LanguageSwitch: Update behavior of LanguageSwitch

## 1.12.18

### Patch Changes

- 7bea688: DashboardLayout : Mobile view SubHeader fixed

## 1.12.17

### Patch Changes

- 8d4961e: [Dashboard Layout] Fix tab navigation position in mobile view
- ba505bf: TailwindTheme: responsive md:700

## 1.12.16

### Patch Changes

- 18b7b64: [DatePicker]: validate value length

## 1.12.15

### Patch Changes

- 4529b56: Datagrid: fixed content view inside the modal. replaced modal with bottomsheet

## 1.12.14

### Patch Changes

- 5e155f6: [DatePicker]: validate time 00/00/0000
- Updated dependencies [5e155f6]
  - @devkit/utilities@1.5.24

## 1.12.13

### Patch Changes

- f4576c3: [File Upload]: Hide drag and drop section on mobile and tablet

## 1.12.12

### Patch Changes

- f142364: [Dropdown]: Enhancements for dropdown bottomsheet

## 1.12.11

### Patch Changes

- 912e583: [Dropdown]: Added BottomSheet for mobileview
- Updated dependencies [f359644]
  - @devkit/utilities@1.5.23

## 1.12.10

### Patch Changes

- 8a695ee: [DatePicker]: Added BottomSheet for mobileview
- fdc0e2d: [UploadFileInput]: added Tooltip prop to display a tooltip next to the label

## 1.12.9

### Patch Changes

- 3dcebba: [DataGrid]: Disable click on disabled checkbox on mobile view

## 1.12.8

### Patch Changes

- dd0cddb: DataGrid: Removed react-pagination, adding pagination.

## 1.12.7

### Patch Changes

- f50281b: FormFieldWithEdit: added tooltip prop that appears in case the form is non editable

## 1.12.6

### Patch Changes

- e664d07: Datagrid:Pagination object-string issue

## 1.12.5

### Patch Changes

- 1f63511: Datagrid: Pagination emptyGridPaginationSitting expression changed from object to ternary operator

## 1.12.4

### Patch Changes

- 636cd27: [General] Update rollup configuration to remove the dependencies from the bundle

## 1.12.3

### Patch Changes

- 400a998: DashboardLayoutSideBar: use the className prop to style the items

## 1.12.2

### Patch Changes

- 71a22b8: Handle pdf preview in File Upload component

## 1.12.1

### Patch Changes

- a98b9db: [Dynamic form] add support for custom field render
- Updated dependencies [a98b9db]
  - @devkit/utilities@1.5.22

## 1.12.0

### Minor Changes

- 6746984: SimpleStepper: updating the font size for the step title by adding text-xTiny for a small screen
  FullPageLayout: updating the padding in a small screen

## 1.11.17

### Patch Changes

- 857d8e7: UploadFileInput: Upload File button given a variant of IBaseButtonProps

## 1.11.16

### Patch Changes

- b67924c: [DataGrid]: changed mobile view gap from 20px to 8px

## 1.11.15

### Patch Changes

- 186ec3c: [DynamicForm, all field components]: added description prop
- 4d6d9be: [DataGrid]: added cellClassName prop to responsive View
- Updated dependencies [186ec3c]
  - @devkit/utilities@1.5.21

## 1.11.14

### Patch Changes

- bb59e28: DatePicker: Modify close icon margin to support AR
- c027f1d: [DataGrid]: fix selection render on mobile responsive, fix some styles

## 1.11.13

### Patch Changes

- 86d50cc: reset editing file of FileUpload component when editing modal is closed

## 1.11.12

### Patch Changes

- 2589220: [DataGrid]: make onMobileResponsiveRender optional for card DataGrid
- Updated dependencies [e462b84]
  - @devkit/icons@1.1.15

## 1.11.11

### Patch Changes

- 5b47029: new variant (Thumbnail) for upload file component whith edit file functionality
- 5932f15: [DataGrid]: fix mobile responsive style

## 1.11.10

### Patch Changes

- 91f32cc: [ToolTip]: added persitOnClick option to make tooltip visible after outer hover

## 1.11.9

### Patch Changes

- cec884b: [DataGrid]: implement DataGrid responsive view, related to PR 19383

## 1.11.8

### Patch Changes

- 9d34f40: dropdownStyles: adding max-content width in the menu style

## 1.11.7

### Patch Changes

- c76f766: NumberFieldRange: Added new component to dynamic form to map between two numbers
- Updated dependencies [c76f766]
  - @devkit/utilities@1.5.18

## 1.11.6

### Patch Changes

- 2920bdb: Button: Revert back the padding

## 1.11.5

### Patch Changes

- d747ba9: Breadcrumbs: updated type of ILink

## 1.11.4

### Patch Changes

- 8cb2884: [DashboardLayout]: Add SubHeader

## 1.11.3

### Patch Changes

- 6d89d1e: [dropdown]: text color changed from hardcoded to inherit

## 1.11.2

### Patch Changes

- 0385571: [TextField, Dropdown]: added arabic language support
- Updated dependencies [39e9c60]
  - @devkit/icons@1.1.14

## 1.11.1

### Patch Changes

- 7c9f175: Card: update the style on the responsive variant FormFieldWithEdit: update the direction for the value on the
  Arabic

## 1.11.0

### Minor Changes

- 1b260e1: Card: Update variant values to be (responsive or default) Tailwind-config: adding a new class shadow-none,
  transparent and dropShadow-none FormFieldWithEdit: updating the component to match the Figma by adding the EditPencil
  icon Link button : adding new props 1. iconPosition for align the icon either start or end 2. iconRotateRTL prop for
  the ability to rotate the icon

### Patch Changes

- d7585a9: [SearchBox]: Empty textbox when clicking onn clear icon

## 1.10.5

### Patch Changes

- c1132a1: Datagrid: Fixing border bottom in case of without border variant.
- ffb7878: OTP error message to be aligned at the start.
- 96674bd: Dropdown: Fixing dropdown indicator icon with red color in case of error.

## 1.10.4

### Patch Changes

- 71d7ce6: [Breadcrumb] Added onClick and changed fontsize to the item
- a39923e: [Datepicker]: Disabled UX improvement
- b12eb61: [FullPageLayout] fix sticky footer issue

## 1.10.3

### Patch Changes

- dcd120e: [LayoutHeaderMenu] Add showBehavior to allow open onHover or onClick
- dcd120e: [MobileTabNavigation]: Fix display on the mobile browser
- dcd120e: [LanguageSwitch]:export language switch component

## 1.10.2

### Patch Changes

- dda6fa3: - Drawer: close drawer on click link
  - Mobile Tab Navigation: navigation link to be clickable
  - LayoutHeaderMenu: Allow using Router Link
- Updated dependencies [dda6fa3]
  - @devkit/icons@1.1.11

## 1.10.1

### Patch Changes

- 7cbe71d: [ActionMenu]: Fix styles for text action menu

## 1.10.0

### Minor Changes

- ad9b584: [Layouts] Enhance and Align all layouts with the Theme provider values and implement the responsive design
  for it
- 6649c4b: [Dropdown/Multiple Dropdown]: fixed menu portal position

## 1.9.68

### Patch Changes

- f2adb74: [ DashboardLayout ]: fixed dashboard layout to support Arabic language
- 50f90d0: [ TextField ]: raised eye and eyeSlash icon height / prevented onBlur to trigger onClick of eye icons

## 1.9.67

### Patch Changes

- 86871b7: DatePicker: Update Date picker and Range to open Current month and initial month on reset
- 8a5c9cd: datepicker overflow issue fixed
- 1dd8f9e: ThemeProvider: children props type definition updated to FC<PropsWithChildren<IdevkitThemeProvider>>

## 1.9.66

### Patch Changes

- dd63199: FullPageLayoutHeader: fixed responsive bugs HeaderMenuRender: removed custom gap added to header menu render,
  as this can be done inside the header component. HeaderUserMenu: if show avatar is true and user is not logged in
  render null. LayoutHeaderMenu: removed w-full for the menu width as this was causing the header menu to wrap.

## 1.9.65

### Patch Changes

- b705124: DataGrid: Fixing selection checkbox color to white.
- e3fb366: - CommonLayoutHeader : added logo in common layout header for full-width header or handheld device, added
  support for opening sidebar on left hand side for mobile device.
  - CommonLayoutSideBar: modified width of items if opened in drawer, displaying only icons in tablet.
  - FullPageLayoutHeader: added support for full-width variant, and added hamburger menu for mobile device.
  - HeaderMenu: removed logo moved to parent component, added support for opening sidebar on right hand side for mobile.
  - UserAvatar - created UserAvatar Component.
  - HeaderUserMenu - made userAvatar clickable and separated out UserAvatar component.
  - Drawer - Fixed alignment and added scrollbar to drawer components.
  - DrawerHamburgerMenu - created component
  - DashboardLayout - adding responsiveness support and making content scrollable depending on variant
  - FullPageLayout - added support for full-width variant and support for responsive ness
  - ThemeProvider - added support for hamburgerMenuAndDrawerPosition
  - WebLayout - Removed WebLayout as we can use FullPageLayout
- ef63b2d: CheckMenu: Updating check action menu with new UI.
- c1162fe: DatePicker:Updating default/initial date selection on reset
- b705124: DataGrid: Fixing twice api call on sort of column datagrid.
- Updated dependencies [24a58b1]
  - @devkit/icons@1.1.10

## 1.9.64

### Patch Changes

- fd0ba56: [Dropdown]: added hideSelectedOptions prop
- 2ca2c7b: Popover - enable trigger on hover
- Updated dependencies [fd0ba56]
  - @devkit/utilities@1.5.17

## 1.9.63

### Patch Changes

- 32a49d5: DatePicker: on resetting datepicker, also reset the initial Month to open

## 1.9.62

### Patch Changes

- d223565: Alert Component: Added a new severity type (success)

## 1.9.61

### Patch Changes

- 712caad: DashboardLayoutSettings: Adding isHidden prop to dashboard layout side menu. LayoutSettings: Adding isHidden
  prop to admin page layout side menu.
- 96a1b7c: [DataGrid]: Fix selection column width

## 1.9.60

### Patch Changes

- 041135e: - HeaderUserMenu: Added support to show avatar and display name in header instead of a user icon
  - WebLayout: New Web Layout
  - dashboard-layout-aber-settings: Added a new dashboard layout to test and support aber related layouts

## 1.9.59

### Patch Changes

- a930478: Drawer: Removed wrapper div

## 1.9.58

### Patch Changes

- 1f11722: DashboardLayoutHeader : Added headerVariant support and action to show side drawer menu
  DashboardLayoutSideBar : Added headerVariant support HeaderMenu : Added headerVariant support and action to show side
  drawer menu Drawer : Resolved bug related to body width change on opening drawer and added z-index to the overlay
  DashboardLayout: Added a full-header variant and made the layout responsive
- 13938c0: [MultiTextField.tsx]: exposed regex, and mask props for dynamic form use
- Updated dependencies [13938c0]
  - @devkit/utilities@1.5.16

## 1.9.57

### Patch Changes

- fad6b0f: MultiTextField: Added new component that contains two text fields

  DynamicForm: Added new type (multi-text) to render MultiTextField component

- d099973: Drawer: create component
- Updated dependencies [fad6b0f]
  - @devkit/utilities@1.5.14

## 1.9.56

### Patch Changes

- 20ef515: made menuPosition optional

## 1.9.55

### Patch Changes

- 937e7ac: FormFieldSchema: Added new function called mapTextAreaField to the form field schema

  DynamicForm: Added new check to render the text area

- Updated dependencies [937e7ac]
  - @devkit/utilities@1.5.13

## 1.9.54

### Patch Changes

- 4510f8b: Date-Picker: fix the gap between age and date

## 1.9.53

### Patch Changes

- 7ffe1af: [Tab Navigation]: Fix style for not selected tab for filled variant
- afb5227: Removed Dropdown position="fixed" prop because it was causing issue when we render it on Popover or Tooltip
  the options gets displayed on wrong position

## 1.9.52

### Patch Changes

- d9dfba8: CheckboxGroup: Change Expand&Collapse button to be single button being conditionally rendered
- Updated dependencies [50d4143]
  - @devkit/icons@1.1.8

## 1.9.51

### Patch Changes

- fbe4cd7: [DataGrid] Update sortOrder on resetData

## 1.9.50

### Patch Changes

- 5176793: [DataGrid]: Reset sort to default on resetData

## 1.9.49

### Patch Changes

- babc03b: Collpasible Form Responsiveness
- 5ef7468: Datagrid: added enhancement to show which colums are sortable using double sided arrows

## 1.9.48

### Patch Changes

- 5a0dff8: JSON Card: added JSON Card to neatly display JSON, Added related utils.
- 4cb2668: FormLabel: update font size for small and large screen
- f492125: ScrollableCards: Fixed extra padding in ScrollableCards in case of Mobile
- Updated dependencies [5a0dff8]
  - @devkit/utilities@1.5.12

## 1.9.47

### Patch Changes

- bb45df4: FormNonEditableField: Use new optional prop called onRenderNoneEditable from field schema DynamicForm: use
  new optional prop from common schema called onRenderNoneEditable to style none editable fields
- 1064f5b: Tooltip: breaking words in case of without space.
- Updated dependencies [bb45df4]
  - @devkit/utilities@1.5.9

## 1.9.46

### Patch Changes

- 53209c2: LayoutHeaderMenu: Fixing menu and footer items in header layout menu.

## 1.9.45

### Patch Changes

- a080352: LayoutHeaderMenu: Adding footer items in header menu.

## 1.9.44

### Patch Changes

- 61f04df: ScrollableCards: Added component ScrollableCards

## 1.9.43

### Patch Changes

- c5db831: LinkButton: issue with link button in some cases fixed

## 1.9.42

### Patch Changes

- 02d82b0: Data Grid Default selected rows implementation
- de88558: Dropdown: for disabled added className to Grey out the dropdown

## 1.9.41

### Patch Changes

- 2674055: CollapsibleForm : Click issue in case of dropdown fixed

## 1.9.40

### Patch Changes

- 8ff76b7: Checkbox: isIndeterminate feature, label click fix

## 1.9.39

### Patch Changes

- ec94dd1: UploadFileInput: Make the Component Responsive
- b2ff3fa: fix typescript issues and linting
- 18003c9: LoginPageLayout : Updated class to fill max space for the card/children
- Updated dependencies [b2ff3fa]
  - @devkit/utilities@1.5.8
  - @devkit/icons@1.1.5

## 1.9.38

### Patch Changes

- 9411f83: EditableForm: New editable form component with edit icon
- 517bb2e: TextEllipsisTooltip: Fixing width observer on text ellipsis with tooltip.

## 1.9.37

### Patch Changes

- 39be5cd: TextEllipsisTooltip: Creating a component for ellipsis to be shown after exceeding max width and on hover,
  there will be tooltip for full content.
- 8792210: [DatePickerRange]: fixed maxEndDate on [useDatePicker.ts]
- 600c9cd: LayoutHeaderMenu: Create a new header menu component

## 1.9.36

### Patch Changes

- 2f2530c: FormLabelWithValue: Create a new component

## 1.9.35

### Patch Changes

- aa214d8: QuestionBlock: Adding responsiveness to question block component.
- d5cb7ad: Modal: Adding prop for should close on outside click.
- 97c31f2: Checkbox: Added disable variant

## 1.9.34

### Patch Changes

- 801f4cb: Carousel: create component
- bd7955d: Datepicker 31st day selection issue fix"
- 5fe63c4: Stepper: Add responsiveness to stepper
- 810d14e: OTPField: Make the Component responsive

## 1.9.33

### Patch Changes

- 07c13c1: InputComponent: Fix Styling

## 1.9.32

### Patch Changes

- dc67f52: MultiSelectDropdown: fix duplicate placeholder when isSearchable
- f90e7bf: DataGrid: Fixed the logic of onRenderItem prop when the data is empty

## 1.9.31

### Patch Changes

- d83a1d6: DataGrid: Fixed the logic of onRenderItem prop when the data is empty

## 1.9.30

### Patch Changes

- d9b5fe1: DataGrid: Fix the style for empty grid data Render Items string message
- 4ee9576: DataGrid: Fix selection for one page when using serverSideHandling prop

## 1.9.29

### Patch Changes

- c398b1b: CheckboxGroup: Added Checkbox Group component
- 0a2a18c: DataGrid: unchecked the disabled rows and remove them from return value of selected rows

## 1.9.28

### Patch Changes

- e62163c: Alert: update padding and adding new prop iconPosition for align icon center or start

## 1.9.27

### Patch Changes

- c9ca1be: DataGird: Fixing height for loading option render item.

## 1.9.26

### Patch Changes

- InputComponent: Fix the inputComponent regex internal value
- c1b14a5: DatePickerRange: Fix date time to make end date equal or greater that start date when using maxStartDate or
  maxEndDate
- Updated dependencies [3e12199]
  - @devkit/utilities@1.5.7

## 1.9.25

### Patch Changes

- 6b62caa: AutoSuggestionsDropdown:refactoring code
- 5441082: OTPField: Fix disabled with blur issue
- ebfd13c: Dropdown: Fixing height for tablet mode.
- a2aabc0: Eslint: fix eslint errors
- Updated dependencies [8041d0e]
  - @devkit/icons@1.1.3

## 1.9.24

### Patch Changes

- b2e58d0: DynamicForm: Fix layout
- 20e80af: OTPField: Reset OTP value if there is an error

## 1.9.23

### Patch Changes

- 5bea635: TextField: fix clear button
- OTPField: fix clear on error

## 1.9.22

### Patch Changes

- 21bbeed: TextField: Fixing cursor position on delete of text.
- DatePicker: fix manual input

## 1.9.21

### Patch Changes

- c467f5f: HeaderMenu: Always show headerMenu component but toggle HeaderUserMenu according to hideMenu prop

## 1.9.20

### Patch Changes

- b1ee2f3: UploadFileInput: change the border color for the upload-confirmation case
- b1ee2f3: ConfirmDialog: change the background color for the success variant
- 0ddd6ed: Dropdown & multiSelectDropdown: Refactor Dropdown and multiSelectDropdown
- 0ddd6ed: Dropdown & multiSelectDropdown: Add Mobile Responsiveness
- Updated dependencies [0ddd6ed]
  - @devkit/utilities@1.5.6

## 1.9.19

### Patch Changes

- 7c1b814: Admin sidebar: fix overlap issue in mobile view
- 1ba9358: DateRangePicker: Fixed the issue related to the timing (end date should be equal or greater that start date)
  also fixed error style for date range to be like other fields
- 580d1c5: Textfield, Button, DatePicker: Adding height for small devices to handle responsiveness.
- 0b0063e: ThemeColors:adding new green color 70 "#30C498"

## 1.9.18

### Patch Changes

- 4b42e0c: Form Container & Tab Navigator: made responsive, SearchForm: added column count prop

## 1.9.17

### Patch Changes

- f71ebaf: Mask: fix input onchange

## 1.9.16

### Patch Changes

- 1738e02: Slider: Fixing bottom css.
- 7825675: Mask: fix mask cursor position & input values
- Updated dependencies [7825675]
  - @devkit/utilities@1.5.5

## 1.9.15

### Patch Changes

- d2be063: Admin page sidebar mobile view integration

## 1.9.14

### Patch Changes

- cab6e36: AutoSuggestionsDropdown: adding a new prop "minChars" for handling minimum allows char to start search with
- Updated dependencies [fc51ce9]
  - @devkit/icons@1.1.2

## 1.9.13

### Patch Changes

- 0f74085: AutoSuggestionsDropdown: adding new component
- 5300e33: DatePicker: fix error: Each child in a list should have a unique "key" prop.
- f75116a: TextField: Refactoring text field components into sub components.

## 1.9.12

### Patch Changes

- a18b5c0: Modal: Supporting modal UI in mobile and tablet.
- e760392: DatePicker: Refactoring date picker components into sub components.

## 1.9.11

### Patch Changes

- 6ba5654: DatePicker : fix time date issue , end date should be greater than or equal start date

## 1.9.10

### Patch Changes

- 953db5e: Fix DatePicker onChange Functionality To Solve DatePickerRange Issue

## 1.9.9

### Patch Changes

- 258aa2b: DatePickerRange: Default end Time for To DateTime is updated to End of day i.e 23:59:59

## 1.9.8

### Patch Changes

- ed39040: SearchForm: Added a component which is an extension to DynamicForm and has Search & Reset button, it is best
  used forreports.

## 1.9.7

### Patch Changes

- FullPageLayout: add footerClassName

## 1.9.6

### Patch Changes

- f28718e: Layouts: Degrading simple bar pkg version

## 1.9.5

### Patch Changes

- 8680d9d: DatePickerRange: added new prop 'twoColumns' to make the field take two colums wide, DynamicForm.stories:
  added example for DateTimePickerRange with the twoColumns prop
- Updated dependencies [d25a355]
- Updated dependencies [8680d9d]
  - @devkit/icons@1.1.1
  - @devkit/utilities@1.5.1

## 1.9.4

### Patch Changes

- ec43dce: TabNavigation: Added prop to define width of title

## 1.9.3

### Patch Changes

- 72b7b1f: DatePickerRange: fixed DateTimePickerRange when picking the end date, time was always set to 23:59

## 1.9.2

### Patch Changes

- a80be13: ExpandableCell: Fixing expandable on cell

## 1.9.1

### Patch Changes

- cfee3e1: Slider: change dots at the bottom position

## 1.9.0

### Minor Changes

- a7cce71: All: Update dependencies to latest version

### Patch Changes

- Updated dependencies [a7cce71]
  - @devkit/utilities@1.5.0
  - @devkit/icons@1.1.0

## 1.8.2

### Patch Changes

- 693655a: TextField: Fixing reset text fields on Reset form

## 1.8.1

### Patch Changes

- edeb15c: TabNavigation: updated Tab navigation to have dynamic Title

## 2.0.0

### Minor Changes

- 63d5a3f: [DatePickerRange]: Replace old props(fromDate/toDate) with new props: minStartDate, maxStartDate, minEndDate,
  maxEndDate + add new stories

### Patch Changes

- Updated dependencies [63d5a3f]
  - @devkit/utilities@1.4.0

## 1.7.3

### Patch Changes

- e1a0b95: Fixing accepted file extensions
- dde0be3: dynamicform: un-editable empty datepicker value

## 1.7.2

### Patch Changes

- f0cd5ba: DynamicForm: Show date value if field is not editable

## 1.7.1

### Patch Changes

- eefb076: Updating tailwind config with 3xl breakpoint and new font sizes

## 1.7.0

### Minor Changes

- 1f40b9f: useToast: allow to add custom style through className

## 1.6.0

### Minor Changes

- 78788dd: Adding max file size and support file type in upload file input

## 1.5.0

### Minor Changes

- a155cb5: TextField: use the hook useMask from the utilities package and include the extract value to the result not
  trigger the change event with the masked value. Also fix an issue with the first set of the text field to make sure
  the value is displayed masked

### Patch Changes

- Updated dependencies [a155cb5]
  - @devkit/utilities@1.2.2

## 1.4.4

### Patch Changes

- 471f8b0: FormFieldWithEdit: add hideEdit link functionality.

## 1.4.3

### Patch Changes

- TextField: Fix mask for input without masks

## 1.4.2

### Patch Changes

- 5b57e16: TextField: Fix input mask

## 1.4.1

### Patch Changes

- 2ef6553: useToast: allow string directly in addition to the full options props

## 1.4.0

### Minor Changes

- 0b29ad1: Toast: add default toast setting in the ThemeProvider and set default value for toast duration to be 400 ms.
  Also set the default position to top-center
- 336fe48: DataGrid: added header variant and fixed select all checkbox functionality

### Patch Changes

- Updated dependencies [0b29ad1]
  - @devkit/utilities@1.2.0

## 1.3.6

### Patch Changes

- ca6cbb6: [Dasboard Layout]: add a new property (footer) to accept ReactNode as a component at the sidebar

## 1.3.5

### Patch Changes

- d50d5c3: OTPField: decreasing the gap between OTP field and the error message

## 1.3.4

### Patch Changes

- 409dba2: Slider: adding optional prop interval for the delay in slider
- Updated dependencies [daecc36]
  - @devkit/icons@1.0.1

## 1.3.3

### Patch Changes

- Adding disable to side menu layout items

## 1.3.2

### Patch Changes

- 24c0a5a: DataGrid: fix reset data to send newSearch flag as true

## 1.3.1

### Patch Changes

- 7ef9ee9: Date picker: Selection of last days of the previous month is not showing the correct value.
  https://github.com/arqex/react-datetime/pull/848
- f0bc86c: DashboardLayout: Update layout to accept menu as ReactNode
- 01d8496: TextField: fix eyeIcon style for password type
- Updated dependencies [794da0a]
  - @devkit/utilities@1.1.2

## 1.3.0

### Minor Changes

- 4b6ac68: - Update Dropdown to use our custom clear and arrows icon

## 1.2.0

### Minor Changes

- 48f7e6a: - UploadFileInput: Add variant prop (section,form-input) and update label font weight according to variant

## 1.1.1

### Patch Changes

- ba19c02: TextField: Numeric text field issue which can accept any character that happened after applying the debounce
