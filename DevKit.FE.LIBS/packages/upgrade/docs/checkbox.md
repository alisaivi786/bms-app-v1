checkbox onClick event has been fixed as it was send the same value at on click.

- Old usage
  - <Checkbox value={isChecked} onChange(isChecked)={setIsChecked(!isChecked)} />
- New usage
  - <Checkbox value={isChecked} onChange(isChecked)={setIsChecked(isChecked)} />
