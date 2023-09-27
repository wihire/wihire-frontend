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
