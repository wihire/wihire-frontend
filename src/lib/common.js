export const toCurrency = (number, withoutSign) => {
  let currency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    signDisplay: 'never'
  }).format(number);

  if (withoutSign) {
    currency = currency.replace('Rp', '').trim();
  }

  return currency;
};

export const capitalEachWord = (sentences) => {
  const words = sentences.split(' ');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  return capitalizedWords.join(' ');
};

export const splitStatus = (word) => {
  const firstTwoDigit = word.slice(0, 2);
  if (firstTwoDigit !== 'ON') {
    return word;
  }
  const leftovers = word.slice(2, word.length);
  return `${firstTwoDigit} ${leftovers}`;
};
