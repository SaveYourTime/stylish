const APP_ID = 12348;
const APP_KEY = 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF';
TPDirect.setupSDK(APP_ID, APP_KEY, 'sandbox');

TPDirect.card.setup({
  fields: {
    number: {
      // css selector
      element: '#card-number',
      placeholder: '**** **** **** ****'
    },
    expirationDate: {
      // DOM object
      element: '#card-expiration-date',
      placeholder: 'MM / YY'
    },
    ccv: {
      element: '#card-ccv',
      placeholder: '識別碼'
    }
  },
  styles: {
    'input': {
      'color': 'gray'
    },
    'input.cvc': {
      'font-size': '16px'
    },
    'input.expiration-date': {
      'font-size': '16px'
    },
    'input.card-number': {
      'font-size': '16px'
    },
    ':focus': {
      'color': '#276f86'
    },
    '.valid': {
      'color': '#2c662d'
    },
    '.invalid': {
      'color': '#9f3a38'
    }
  }
});

TPDirect.card.onUpdate(function (update) {
  const { cardType, status } = update;
  const { number, expiry, cvc } = status;

  changeSubmitButtonState();

  // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
  if (cardType === 'visa') {
    // Handle card type visa.
  }

  if (number === 2) {
    // setNumberFormGroupToError()
  } else if (number === 0) {
    // setNumberFormGroupToSuccess()
  } else {
    // setNumberFormGroupToNormal()
  }

  if (expiry === 2) {
    // setNumberFormGroupToError()
  } else if (expiry === 0) {
    // setNumberFormGroupToSuccess()
  } else {
    // setNumberFormGroupToNormal()
  }

  if (cvc === 2) {
    // setNumberFormGroupToError()
  } else if (cvc === 0) {
    // setNumberFormGroupToSuccess()
  } else {
    // setNumberFormGroupToNormal()
  }
});

function canGetPrime() {
  const tappayStatus = TPDirect.card.getTappayFieldsStatus();
  return tappayStatus.canGetPrime;
}

function getPrime() {
  if (!canGetPrime()) {
    return false;
  }

  const prime = new Promise((resolve, reject) => {
    TPDirect.card.getPrime((result) => {
      const { status, msg, card } = result;
      const { prime } = card;
      if (status !== 0) {
        console.log(`Get prime error: ${msg}`);
        reject(`Get prime error: ${msg}`);
      }
      resolve(prime);
    });
  });
  return prime;
}