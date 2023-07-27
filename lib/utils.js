export const currencyFormater = (amount) => {
  const formatter = Intl.NumberFormat("ar-AE", {
    currency: "AED",
    style: "currency",
  });

  return formatter.format(amount);
};
