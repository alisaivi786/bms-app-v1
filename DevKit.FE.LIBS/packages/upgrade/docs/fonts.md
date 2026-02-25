How to Update Colors:
1. Open a terminal.
1. Change current directory to the root folder for the `devkit.Frontend.Libs`
1. Install dependencies by running `pnpm i`
1. Run the following command:
    ```
    pnpm scripts:fix-fonts "FolderPathToUpdate"
    ```


Please find map fonts to switch from old fonts to the new fonts schema:
| Old Font Name | Old Font Size (rem) | Old Font Size (px) | New Font Name | New Font Size (rem) | New Font Size (px) |
| --------------| ------------------- | ------------------ | ------------- | ------------------- | ------------------ |
| N/A           | N/A                 | N/A                | legal         | 0.5                 | 8                  |
| xTiny         | 0.625               | 10                 | caption2      | 0.625               | 10                 |
| tiny          | 0.75                | 12                 | caption1      | 0.75                | 12                 |
| small         | 0.875               | 14                 | paragraph     | 0.875               | 14                 |
| body          | 1                   | 16                 | body          | 1                   | 16                 |
| title4        | 1.125               | 18                 | title         | 1.125               | 18                 |
| title3        | 1.25                | 20                 | N/A           | N/A                 | N/A                |
| title2.5      | 1.5                 | 24                 | h3            | 1.5                 | 24                 |
| title2        | 1.625               | 26                 | h2            | 1.75                | 28                 |
| title1        | 1.875               | 30                 | h1            | 2                   | 32                 |
| large         | 2.188               | 35.008             | h1            | 2                   | 32                 |
| xLarge        | 2.5                 | 40                 | display3      | 2.625               | 42                 |
| xxLarge       | 2.625               | 42                 | display3      | 2.625               | 42                 |
| h1            | 2                   | 32                 | display2      | 3.125               | 50                 |
| h1            | 2                   | 32                 | display1      | 3.75                | 60                 |