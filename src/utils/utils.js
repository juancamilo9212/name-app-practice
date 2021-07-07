export const fieldValidation = (input) => {
    const regex = /^[a-zA-Z]*$/;
    let isValid;
    regex.test(input) && input !== '' &&  input !== null ? 
    isValid = true :
    isValid = false;
    return isValid;
};