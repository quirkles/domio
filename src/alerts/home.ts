import {
    allPass,
    apply,
    gt,
    pipe,
    propEq,
} from "ramda";

const getAlertMessage = ({ id, dynamicDisplayPrice, basePrice, dateTimeOfPrice}) =>
  `A home has met the requirements to trigger an alert. Property id: ${id}, dynamicDisplayPrice: ${dynamicDisplayPrice}, basePrice ${basePrice} at the datetime ${dateTimeOfPrice}`

const getProps = (props) => (obj) => props.map((propName) => obj[propName]);

const isHome = propEq("type", "home");
const isDisplayPriceGtThanBasePrice = pipe(
    getProps(["dynamicDisplayPrice", "basePrice"]),
    apply(gt),
);

export default {
    getAlertMessage,
    test: allPass([isHome, isDisplayPriceGtThanBasePrice]),
};
