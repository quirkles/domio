import apartmentAlert from "./apartment";

describe("apartment alerts", () => {
    describe("test function", () => {
        it("doesnt pass if the object is not an apartment", () => {
            const inputs = [
                {type: "home", dynamicDisplayPrice: 50, basePrice: 25},
                {type: "home", dynamicDisplayPrice: 50, basePrice: 75},
                {type: "home", dynamicDisplayPrice: 50, basePrice: 50},
                {type: "appt", dynamicDisplayPrice: 50, basePrice: 25},
                {type: "appt", dynamicDisplayPrice: 50, basePrice: 75},
                {type: "appt", dynamicDisplayPrice: 50, basePrice: 50},
            ];
            for (const input of inputs) {
                expect(apartmentAlert.test(input)).toBe(false);
            }
        });
        it("doesnt pass if the object display price is greater than or equal to the base price", () => {
            const inputs = [
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 25},
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 50},
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 40},
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 25},
                {type: "apartment", dynamicDisplayPrice: 100, basePrice: 100},
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 49},
            ];
            for (const input of inputs) {
                expect(apartmentAlert.test(input)).toBe(false);
            }
        });
        it("does pass if the object is an apartment and the display price is less than the base price", () => {
            const inputs = [
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 51},
                {type: "apartment", dynamicDisplayPrice: 50000, basePrice: 500000},
                {type: "apartment", dynamicDisplayPrice: 50000, basePrice: 50001},
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 75},
                {type: "apartment", dynamicDisplayPrice: 100, basePrice: 500},
                {type: "apartment", dynamicDisplayPrice: 50, basePrice: 499},
            ];
            for (const input of inputs) {
                expect(apartmentAlert.test(input)).toBe(true);
            }
        });
    });
    describe("getAlertMessage", () => {
        it("generates expected alert message", () => {
            expect(apartmentAlert.getAlertMessage({
                basePrice: 100,
                dateTimeOfPrice: 1234,
                dynamicDisplayPrice: 50,
                id: "abcd",
            })).toBe("An apartment has met the requirements to trigger an alert. Property id: abcd, dynamicDisplayPrice: 50, basePrice 100 at the datetime 1234");
        });
    });
});
