1. variants: changed to: 'primary' | 'iconPrimary' | 'secondary' | 'iconSecondary' | 'text' | 'iconText' replace
   'outline' variant to 'secondary'. (BREAKING CHANGE)

2. icon prop is no longer supported. (BREAKING CHANGE)

3. iconPosition prop is no longer supported. (BREAKING CHANGE)

4. new two props (iconStart, iconEnd): replace 'icon' with iconStart/iconEnd depending on the old 'iconPosition' prop
   default 'iconPosition' was 'start' -> should be replaced with 'iconStart'. (BREAKING CHANGE)

5. new optional prop (size) with one value of 'large' | 'medium' | 'small' , default is 'medium'.
