const changeSubmitButtonState = () => {
  const allFieldsDone = () => {
    const order = setOrder();
    if (canGetPrime() && !checkObjectEmpty(order)) {
      return true;
    }
    return false;
  }
  
  const submitButton = document.querySelector('.confirm-button');
  if (allFieldsDone()) {
    const errorWrapper = document.querySelector('.error-wrapper');
    submitButton.removeAttribute('disabled');
    errorWrapper.style.display = 'none';
  } else {
    submitButton.setAttribute('disabled', 'disabled');
  }
}