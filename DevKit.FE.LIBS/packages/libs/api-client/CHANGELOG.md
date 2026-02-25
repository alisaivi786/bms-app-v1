# @devkit/api-client

## 12.3.2

### Patch Changes

- bd0bf71f3: [APIFactory]: added signal prop for abort promise use case

## 12.3.1

### Patch Changes

- b521c7825: chore: add arraybuffer as new response type

## 12.3.0

### Minor Changes

- b6317a8e6: Add fetch support

## 12.2.8

### Patch Changes

- Updated dependencies [949d31fb5]
  - @devkit/utilities@12.3.28

## 12.2.7

### Patch Changes

- Updated dependencies [d26060a3c]
  - @devkit/utilities@12.3.27

## 12.2.6

### Patch Changes

- Updated dependencies [2f4055cb3]
  - @devkit/utilities@12.3.26

## 12.2.5

### Patch Changes

- Updated dependencies [e3e9d23dc]
  - @devkit/utilities@12.3.25

## 12.2.4

### Patch Changes

- Updated dependencies [25bddda51]
  - @devkit/utilities@12.3.24

## 12.2.3

### Patch Changes

- Updated dependencies [20233cba9]
  - @devkit/utilities@12.3.23

## 12.2.2

### Patch Changes

- Updated dependencies [ab623e9d3]
  - @devkit/utilities@12.3.22

## 12.2.1

### Patch Changes

- Updated dependencies [4bb8f6280]
  - @devkit/utilities@12.3.21

## 12.2.0

### Minor Changes

- dbc4ae055: Fix Axios retry to enhance the performance

## 12.1.4

### Patch Changes

- Updated dependencies [edacabc21]
  - @devkit/utilities@12.3.20

## 12.1.3

### Patch Changes

- Updated dependencies [41667e513]
  - @devkit/utilities@12.3.19

## 12.1.2

### Patch Changes

- Updated dependencies [ff8b01978]
  - @devkit/utilities@12.3.18

## 12.1.1

### Patch Changes

- a229f7c3: Extend refresh token

## 12.1.0

### Minor Changes

- 114e5f17: API Client packages

## 12.0.8

### Patch Changes

- 4dea8039: [API Client] fix devkit/utilities packages import for debugger

## 12.0.7

### Patch Changes

- ef016887: [useLazyApi and useApiOnMount] add use client to support app router

## 12.0.6

### Patch Changes

- Updated dependencies [da819aad9]
- Updated dependencies [13cb7a741]
- Updated dependencies [8e1304b8a]
  - @devkit/utilities@12.1.8

## 12.0.10

### Patch Changes

- cc395841: Fix commonJS build

## 12.0.9

### Patch Changes

- b730a64b: Add commonJS build to support React Native

## 12.0.8

### Patch Changes

- 61775a85: Revert add main property to package.json

## 12.0.7

### Patch Changes

- 389ca7f7: Add main property in package.json

## 12.0.6

### Patch Changes

- b242ab49: Add responseType property to support json or blob, blob can be used on the browsers only

## 12.0.5

### Patch Changes

- 15399852: Change @types/react version to be consistent

## 12.0.4

### Patch Changes

- 557f0e4b: apiCreatedefinition: Fixing transform response header

## 12.0.3

### Patch Changes

- 25b4ab97: Fix isError condition

## 12.0.2

### Patch Changes

- 25ee0f6c: apiCreateDefinition: Handling response header in isErrorResponse and transformError

## 12.0.1

### Patch Changes

- 4ac94495: Enhanced-Logger: Add Enhanced Logger with Pino.js for enhanced server side logging

## 12.0.0

### Major Changes

- b0d709bb: Major version 12.0.0 for all packages

## 11.0.0

### Patch Changes

- f5d9811ea: [General] Update peer dependencies
- 40a899885: Modify refreshToken to return the new headers to be used on the second refresh after refreshing the token
- f5555d9bc: [createAPIDefinition]: Do not retry request on 422 http status
- 25e68c72b: [createAPIDefinition]: Support api client parameters and headers
- c32168cbc: createAPIDefinition: Added retryConfig prop
- 38d099d9d: Fix param type issue
- 572dcf471: [refreshToken]: add refresh token callback to handle unauthorized
- 4514ca16f: Merge Develop Branch to Beta
- 5cb88fde8: [createAPIDefinition]: ignore parsing response body if response header is undefined
- e043a0522: Fix peer dependencies
- 50d9003cc: dont apply transformUrlAndBody if the request is array
- 3ef381a66: api-client: Fix TypeOfAPIError & TypeOfAPIResponse Type issue
- e93f895d3: [createAPIDefinition]: Validate and transform response error
- da6fa7bfb: [api-clients]: refactor error handling
- e1dee5e9e: [apiCreateDefinition]: do not parse response data if it is empty
- b1ffd48e2: Add timeout configuration to the api definition
- 81939adf0: - Add async headers for use cases such as get the access token via async call.
  - Adding uuid request id to track individual requests logs
  - Removing unnecessary logs and show minimum useful logs only
- 975570393: [ApiClient]: Refactor transformedData assignment logic
- 90a81fbc4: Update refreshToken function to return the new access token only
- f65d98982: [createAPIDefinition]: Ignore string request on transform
- 6617554c5: - Add async headers for use cases such as get the access token via async call.
  - Adding uuid request id to track individual requests logs
  - Removing unnecessary logs and show minimum useful logs only
- 9e4c3d65b: api-client: add DELETE method to apiCreateDefinition
- d3af26abd: Support Blob in response
- Updated dependencies [f5d9811ea]
- Updated dependencies [28d98ed6d]
- Updated dependencies [d3c63d83f]
- Updated dependencies [91207a847]
- Updated dependencies [327cfd626]
- Updated dependencies [2cb2192cc]
- Updated dependencies [e2b8ea176]
- Updated dependencies [df9effeb3]
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
- Updated dependencies [284ac9185]
- Updated dependencies [0f8115ca7]
- Updated dependencies [3f3ab4122]
- Updated dependencies [362cf0ee3]
- Updated dependencies [64abaa39c]
- Updated dependencies [59cdc70c5]
- Updated dependencies [e376ac794]
- Updated dependencies [b416eeb9f]
- Updated dependencies [9365cf84d]
- Updated dependencies [e95a8caf6]
- Updated dependencies [4be913850]
- Updated dependencies [905927164]
- Updated dependencies [da7eabe28]
- Updated dependencies [045cd7d78]
- Updated dependencies [5a8171e40]
- Updated dependencies [4dc316cbf]
- Updated dependencies [18977ca8d]
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
- Updated dependencies [ce9af3b4d]
- Updated dependencies [134ef0ec3]
- Updated dependencies [1dedb4514]
- Updated dependencies [c09340155]
- Updated dependencies [65d2fcc79]
- Updated dependencies [790ebb414]
- Updated dependencies [1ea4ad413]
- Updated dependencies [03357cbc7]
- Updated dependencies [15d04a861]
- Updated dependencies [93e97f1c8]
- Updated dependencies [9800ae4dc]
- Updated dependencies [e4471b505]
- Updated dependencies [dd346dfb0]
- Updated dependencies [ab6468878]
- Updated dependencies [e0c1d9462]
- Updated dependencies [816c9ea7d]
- Updated dependencies [5677dc955]
- Updated dependencies [cf0da1888]
- Updated dependencies [2c461f6f6]
- Updated dependencies [7e006bbcb]
- Updated dependencies [5c30cbdf6]
- Updated dependencies [9f234c56a]
- Updated dependencies [c2218e2e4]
- Updated dependencies [f1ab36f3f]
  - @devkit/utilities@2.0.0

## 1.0.0-next.59

### Patch Changes

- 97557039: [ApiClient]: Refactor transformedData assignment logic

## 1.0.0-next.58

### Patch Changes

- Updated dependencies [1ea4ad41]
  - @devkit/utilities@2.0.0-next.67

## 1.0.0-next.57

### Patch Changes

- Updated dependencies [9800ae4d]
  - @devkit/utilities@2.0.0-next.66

## 1.0.0-next.56

### Patch Changes

- Updated dependencies [379df14c]
  - @devkit/utilities@2.0.0-next.65

## 1.0.0-next.55

### Patch Changes

- Updated dependencies [bc95ba40]
  - @devkit/utilities@2.0.0-next.64

## 1.0.0-next.54

### Patch Changes

- Updated dependencies [91207a84]
- Updated dependencies [dd346dfb]
  - @devkit/utilities@2.0.0-next.63

## 1.0.0-next.53

### Patch Changes

- Updated dependencies [825f810d]
  - @devkit/utilities@2.0.0-next.62

## 1.0.0-next.52

### Patch Changes

- 90a81fbc: Update refreshToken function to return the new access token only

## 1.0.0-next.51

### Patch Changes

- Updated dependencies [18977ca8]
- Updated dependencies [45cb26a0]
  - @devkit/utilities@2.0.0-next.61

## 1.0.0-next.50

### Patch Changes

- Updated dependencies [2b3aac51]
  - @devkit/utilities@2.0.0-next.60

## 1.0.0-next.49

### Patch Changes

- Updated dependencies [0f8115ca]
  - @devkit/utilities@2.0.0-next.59

## 1.0.0-next.48

### Patch Changes

- Updated dependencies [5528a397]
  - @devkit/utilities@2.0.0-next.58

## 1.0.0-next.47

### Patch Changes

- Updated dependencies [65d0241b]
  - @devkit/utilities@2.0.0-next.57

## 1.0.0-next.46

### Patch Changes

- Updated dependencies [9185b907]
  - @devkit/utilities@2.0.0-next.56

## 1.0.0-next.45

### Patch Changes

- Updated dependencies [e95a8caf]
  - @devkit/utilities@2.0.0-next.55

## 1.0.0-next.44

### Patch Changes

- e1dee5e9: [apiCreateDefinition]: do not parse response data if it is empty

## 1.0.0-next.43

### Patch Changes

- c32168cb: createAPIDefinition: Added retryConfig prop
- 9e4c3d65: api-client: add DELETE method to apiCreateDefinition

## 1.0.0-next.42

### Patch Changes

- Updated dependencies [93e97f1c]
  - @devkit/utilities@2.0.0-next.54

## 1.0.0-next.41

### Patch Changes

- Updated dependencies [317c5802]
  - @devkit/utilities@2.0.0-next.53

## 1.0.0-next.40

### Patch Changes

- Updated dependencies [5a8171e4]
  - @devkit/utilities@2.0.0-next.52

## 1.0.0-next.39

### Patch Changes

- Updated dependencies [da7eabe2]
  - @devkit/utilities@2.0.0-next.51

## 1.0.0-next.38

### Patch Changes

- 5cb88fde: [createAPIDefinition]: ignore parsing response body if response header is undefined

## 1.0.0-next.37

### Patch Changes

- Updated dependencies [0bc04114]
  - @devkit/utilities@2.0.0-next.50

## 1.0.0-next.36

### Patch Changes

- Updated dependencies [03357cbc]
  - @devkit/utilities@2.0.0-next.49

## 1.0.0-next.35

### Patch Changes

- Updated dependencies [ce9af3b4]
  - @devkit/utilities@2.0.0-next.48

## 1.0.0-next.34

### Patch Changes

- Updated dependencies [5047ad17]
  - @devkit/utilities@2.0.0-next.47

## 1.0.0-next.33

### Patch Changes

- Updated dependencies [c2218e2e]
  - @devkit/utilities@2.0.0-next.46

## 1.0.0-next.32

### Patch Changes

- Updated dependencies [327cfd62]
  - @devkit/utilities@2.0.0-next.45

## 1.0.0-next.31

### Patch Changes

- Updated dependencies [134ef0ec]
  - @devkit/utilities@2.0.0-next.44

## 1.0.0-next.30

### Patch Changes

- e93f895d: [createAPIDefinition]: Validate and transform response error

## 1.0.0-next.29

### Patch Changes

- b1ffd48e: Add timeout configuration to the api definition

## 1.0.0-next.28

### Patch Changes

- d3af26ab: Support Blob in response

## 1.0.0-next.27

### Patch Changes

- Updated dependencies [2c461f6f]
  - @devkit/utilities@2.0.0-next.43

## 1.0.0-next.26

### Patch Changes

- 81939adf: - Add async headers for use cases such as get the access token via async call.
  - Adding uuid request id to track individual requests logs
  - Removing unnecessary logs and show minimum useful logs only

## 1.0.0-next.24

### Patch Changes

- Updated dependencies [9f234c56]
  - @devkit/utilities@2.0.0-next.42

## 1.0.0-next.23

### Patch Changes

- Updated dependencies [362cf0ee]
  - @devkit/utilities@2.0.0-next.41

## 1.0.0-next.22

### Patch Changes

- Updated dependencies [15d04a86]
  - @devkit/utilities@2.0.0-next.40

## 1.0.0-next.21

### Patch Changes

- 38d099d9: Fix param type issue

## 1.0.0-next.20

### Patch Changes

- 3ef381a6: api-client: Fix TypeOfAPIError & TypeOfAPIResponse Type issue

## 1.0.0-next.19

### Patch Changes

- 25e68c72: [createAPIDefinition]: Support api client parameters and headers

## 1.0.0-next.18

### Patch Changes

- Updated dependencies [f100ac99]
  - @devkit/utilities@2.0.0-next.39

## 1.0.0-next.17

### Patch Changes

- 40a89988: Modify refreshToken to return the new headers to be used on the second refresh after refreshing the token

## 1.0.0-next.16

### Patch Changes

- 572dcf47: [refreshToken]: add refresh token callback to handle unauthorized

## 1.0.0-next.15

### Patch Changes

- f5555d9b: [createAPIDefinition]: Do not retry request on 422 http status

## 1.0.0-next.14

### Patch Changes

- f65d9898: [createAPIDefinition]: Ignore string request on transform

## 1.0.0-next.13

### Patch Changes

- Updated dependencies [d3c63d83]
  - @devkit/utilities@2.0.0-next.38

## 1.0.0-next.12

### Patch Changes

- Updated dependencies [e0c1d946]
  - @devkit/utilities@2.0.0-next.37

## 1.0.0-next.11

### Patch Changes

- 50d9003c: dont apply transformUrlAndBody if the request is array

## 1.0.0-next.10

### Patch Changes

- Updated dependencies [f337cc53]
  - @devkit/utilities@2.0.0-next.36

## 1.0.0-next.9

### Patch Changes

- da6fa7bf: [api-clients]: refactor error handling

## 1.0.0-next.8

### Patch Changes

- Updated dependencies [e4471b50]
  - @devkit/utilities@2.0.0-next.35

## 1.0.0-next.7

### Patch Changes

- Updated dependencies [90592716]
  - @devkit/utilities@2.0.0-next.34

## 1.0.0-next.6

### Patch Changes

- Updated dependencies [1dedb451]
  - @devkit/utilities@2.0.0-next.33

## 1.0.0-next.5

### Patch Changes

- f5d9811e: [General] Update peer dependencies
- Updated dependencies [f5d9811e]
  - @devkit/utilities@2.0.0-next.32

## 1.0.0-next.4

### Patch Changes

- e043a052: Fix peer dependencies

## 1.0.0-next.3

### Patch Changes

- Updated dependencies [99a5905]
  - @devkit/utilities@2.0.0-next.10

## 1.0.0-next.2

### Patch Changes

- Updated dependencies [3f3ab41]
  - @devkit/utilities@2.0.0-next.6

## 1.0.0-next.1

### Patch Changes

- 4514ca1: Merge Develop Branch to Beta
- Updated dependencies [4514ca1]
  - @devkit/utilities@2.0.0-next.2

## 1.0.0-next.0

### Patch Changes

- Updated dependencies [92bd750c]
  - @devkit/utilities@2.0.0-next.0

## 1.0.0

### Patch Changes

- Updated dependencies [bcfc7a61]
  - @devkit/utilities@1.6.0

## 0.0.5

### Patch Changes

- 1390ad2: [api-client]: update createAPIDefinition to return transformed response

## 0.0.4

### Patch Changes

- 62c9109: Change API Client Response Type and Errors Type

## 0.0.3

### Patch Changes

- 23ad33a: Add updateConfig Method / Fix package.json main field / expose functions / fix OriginalSchema

## 0.0.2

### Patch Changes

- 0c878b1: Add api client package, it is a wrapper around axios with zod schema validation for request and response.
  Also it contains backend error code typescript mapping and global configuration for errors and response transformation
