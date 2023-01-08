    const FormService = (formParentElement, onSubmit) => {
    // initialize isValid to true
    let isValid = true;
  
    // create a map of input types to their respective validation functions
    const inputValidations = {
      text: input => input.value.length >= 2,
      number: input => /^(0|[1-9]\d|1[0-1]\d|120)$/,
      email: input => /^\S+@\S+\.\S+$/.test(input.value)
    };
  
    // create a map of input types to their respective error messages
    const inputErrors = {
      text: "Must be at least 2 characters",
      number: "Must be a number",
      email: "Must be a valid email address"
    };
  
    // get all the inputs in the form
    const inputs = formParentElement.querySelectorAll("input");
  
    // create the onSubmit method
    const onFormSubmit = event => {
      event.preventDefault();
  
      // reset isValid to true
      isValid = true;
  
      // validate all the inputs
      inputs.forEach(input => {
        const inputType = input.getAttribute("type");
        if (inputType in inputValidations) {
          const inputValid = inputValidations[inputType](input);
          if (!inputValid) {
            isValid = false;
            input.style.borderColor = "red";
            input.nextElementSibling.innerHTML = inputErrors[inputType];
            input.nextElementSibling.style.color = "red";
          } else {
            input.style.borderColor = "";
            input.nextElementSibling.innerHTML = "";
          }
        }
      });
  
      // call onSubmit if isValid is true
      if (isValid) {
        onSubmit();
      }
    };
  
    // create the onResetForm method
    const onResetForm = () => {
      // reset all the inputs and error messages
      inputs.forEach(input => {
        input.value = "";
        input.style.borderColor = "";
        input.nextElementSibling.innerHTML = "";
      });
    };
  
    // return the object with the onSubmit and onResetForm methods and the isValid property
    return {
      onSubmit: onFormSubmit,
      isValid,
      onResetForm
    };
  };