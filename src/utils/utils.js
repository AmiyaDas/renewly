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

const generateRenewalEvents = (subscription, categoryColorMap, isYearView = false) => {
  const events = [];
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  let start = new Date(subscription.renewalDate);
  if (isNaN(start.getTime())) return events; // skip invalid dates
  start.setHours(0, 0, 0, 0); // normalize

  const cycle = (subscription.billingCycle || "").toLowerCase();
  const seen = new Set();

  while (start <= nextYear) {
    // Unique key: per month if year view, else per date
    const eventKey = isYearView
      ? `${subscription.id}-${start.getFullYear()}-${start.getMonth()}`
      : `${subscription.id}-${start.toISOString().slice(0,10)}`;

    if (!seen.has(eventKey)) {
      events.push({
        id: eventKey,
        title: subscription.name,
        time: start.toISOString(),
        price: subscription.price,
        color: categoryColorMap[subscription.category] || "border-gray-400",
        icon: subscription.icon,
      });
      seen.add(eventKey);
    }

    if (cycle.includes("month")) {
      start.setMonth(start.getMonth() + 1);
    } else if (cycle.includes("week")) {
      start.setDate(start.getDate() + 7);
    } else if (cycle.includes("year")) {
      start.setFullYear(start.getFullYear() + 1);
    } else {
      break;
    }
  }

  return events;
};

export {
  currencySymbols,
  totalYearly,
  totalYearlyFormatted,
  formatBillingCycle,
  generateRenewalEvents
};
