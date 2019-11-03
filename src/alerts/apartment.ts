import {
    allPass,
    apply,
    lt,
    pipe,
    propEq,
} from "ramda";

const getAlertMessage = ({ id, dynamicDisplayPrice, basePrice, dateTimeOfPrice}) =>
  `An apartment has met the requirements to trigger an alert. Property id: ${id}, dynamicDisplayPrice: ${dynamicDisplayPrice}, basePrice ${basePrice} at the datetime ${dateTimeOfPrice}`;

const getProps = (props) => (obj) => props.map((propName) => obj[propName]);

const isApartment = propEq("type", "apartment");
const isDisplayPriceLtBasePrice = pipe(
    getProps(["dynamicDisplayPrice", "basePrice"]),
    apply(lt),
);

export default {
    getAlertMessage,
    test: allPass([isApartment, isDisplayPriceLtBasePrice]),
};
