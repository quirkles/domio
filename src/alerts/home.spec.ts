import homeAlert from "./home";

describe("apartment alerts", () => {
    describe("test function", () => {
        it("doesnt pass if the object is not a home", () => {
            const inputs = [
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 25},
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 75},
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 50},
                {type: "hom", dynamicDisplayPrice: 50, basePrice: 25},
                {type: "hom", dynamicDisplayPrice: 50, basePrice: 75},
                {type: "hom", dynamicDisplayPrice: 50, basePrice: 50},
            ];
            for (const input of inputs) {
                expect(homeAlert.test(input)).toBe(false);
            }
        });
        it("doesnt pass if the object display price is less than or equal to the base price", () => {
            const inputs = [
                {type: "home", dynamicDisplayPrice: 50, basePrice: 75},
                {type: "home", dynamicDisplayPrice: 50, basePrice: 50},
                {type: "home", dynamicDisplayPrice: 50, basePrice: 51},
                {type: "home", dynamicDisplayPrice: 50, basePrice: 999},
                {type: "home", dynamicDisplayPrice: 100, basePrice: 100},
                {type: "home", dynamicDisplayPrice: 1, basePrice: 1},
            ];
            for (const input of inputs) {
                expect(homeAlert.test(input)).toBe(false);
            }
        });
        it("does pass if the object is a home and the display price is greater than the base price", () => {
            const inputs = [
                {type: "home", dynamicDisplayPrice: 50, basePrice: 49},
                {type: "home", dynamicDisplayPrice: 50000, basePrice: 500},
                {type: "home", dynamicDisplayPrice: 50000, basePrice: 49999},
                {type: "home", dynamicDisplayPrice: 5, basePrice: 4},
                {type: "home", dynamicDisplayPrice: 1, basePrice: 0},
                {type: "home", dynamicDisplayPrice: 100, basePrice: 99},
            ];
            for (const input of inputs) {
                expect(homeAlert.test(input)).toBe(true);
            }
        });
    });
    describe("getAlertMessage", () => {
        it("generates expected alert message", () => {
            expect(homeAlert.getAlertMessage({
                basePrice: 100,
                dateTimeOfPrice: 1234,
                dynamicDisplayPrice: 50,
                id: "abcd",
            })).toBe("A home has met the requirements to trigger an alert. Property id: abcd, dynamicDisplayPrice: 50, basePrice 100 at the datetime 1234");
        });
    });
});
