const formatBillingCycle = (cycle) => {
  switch (cycle.toLowerCase()) {
    case "monthly":
    case "every month":
      return "per month";
    case "yearly":
    case "every year":
      return "per year";
    case "weekly":
    case "every week":
      return "per week";
    default:
      return cycle;
  }
};

// Lookup currency symbol
const currencySymbols = { USD: "$", EUR: "€", INR: "₹", GBP: "£" };
const totalYearly = (subscriptions) => {
  return subscriptions.reduce((total, sub) => {
    let yearlyPrice = 0;
    const cycle = (sub.billingCycle || "").toLowerCase();
    const priceNum =
      parseFloat(sub.price.toString().replace(/[^0-9.]/g, "")) || 0;

    if (cycle.includes("month")) {
      yearlyPrice = priceNum * 12;
    } else if (cycle.includes("year")) {
      yearlyPrice = priceNum;
    } else if (cycle.includes("week")) {
      yearlyPrice = priceNum * 52;
    } else {
      yearlyPrice = priceNum;
    }

    return total + yearlyPrice;
  }, 0);
};

const totalYearlyFormatted = (currency, subscriptions) => {
  return `${currencySymbols[currency] || ""} ${totalYearly(
    subscriptions
  ).toFixed(2)}`;
};
export {
  currencySymbols,
  totalYearly,
  totalYearlyFormatted,
  formatBillingCycle,
};
