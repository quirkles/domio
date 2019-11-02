const getEmailContent = ({ id, dynamicDisplayPrice, basePrice, dateTimeOfPrice}) =>
  `A home has met the requirements to trigger an alert. Property id: ${id}, dynamicDisplayPrice: ${dynamicDisplayPrice}, basePrice ${basePrice} at the datetime ${dateTimeOfPrice}`
