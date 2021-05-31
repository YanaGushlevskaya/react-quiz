export function createControl(config, validation) {
  return(
    {
      ...config,
      validation,
      valid: !validation,
      touched: false,
      value: ''
    }
  )
}

export function validate(value, validation = null) {
  if(!validation) {
    return true
  }

  let isValid = true;

  if(validation.required) {
    return isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {
  let isValid = true;
  Object.keys(formControls).map(name => {
    return isValid = formControls[name].valid && isValid;
  })
  return isValid;
}