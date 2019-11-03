import {getPropertyDataFromResponse} from "./index";

describe("getPropertyDataFromResponse", () => {
    it("maps objects as expected", () => {
        Date.now = jest.fn(() => 123456789);
        const input = {
            properties: [
                {
                    basePrice: 100,
                    dynamicDisplayPrice: 99,
                    foo: "bar",
                    id: "abcd",
                },
                {
                    basePrice: 100000,
                    dynamicDisplayPrice: 9,
                    id: "aaaa",
                    ignoreMe: true,
                },
                {
                    basePrice: 50,
                    dynamicDisplayPrice: 5,
                    extra: 876,
                    id: "1234",
                },
            ],
        };
        expect(getPropertyDataFromResponse(input)).toEqual([
            {
                basePrice: 100,
                dateTimeOfPrice: 123456789,
                dynamicDisplayPrice: 99,
                id: "abcd",
            },
            {
                basePrice: 100000,
                dateTimeOfPrice: 123456789,
                dynamicDisplayPrice: 9,
                id: "aaaa",
            },
            {
                basePrice: 50,
                dateTimeOfPrice: 123456789,
                dynamicDisplayPrice: 5,
                id: "1234",
            },
        ]);
    });
});
