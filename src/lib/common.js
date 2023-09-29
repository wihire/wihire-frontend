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

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `0${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
