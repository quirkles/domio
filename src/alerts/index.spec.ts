import alerts from "./index";

import mailer from "../mailer";
import apartment from "./apartment";
import home from "./home";

jest.mock("./apartment", () => ({
    getAlertMessage: jest.fn(),
    test: jest.fn((property) => property.doesPass),
}));

jest.mock("./home", () => ({
    getAlertMessage: jest.fn(),
    test: jest.fn((property) => property.doesPass),
}));

jest.mock("../mailer", () => jest.fn(() => ({ catch: jest.fn() })));

describe("alerts", () => {
    it("calls the expected functions", () => {
        const proprties = [
            { doesPass: true },
            { doesPass: true },
            { doesPass: true },
            { doesPass: false },
            { doesPass: false },
            { doesPass: false },
            { doesPass: false },
            { doesPass: false },
        ];

        alerts(proprties);
        expect(mailer).toHaveBeenCalledTimes(6);
        expect(apartment.test).toHaveBeenCalledTimes(8);
        expect(apartment.getAlertMessage).toHaveBeenCalledTimes(3);
        expect(home.test).toHaveBeenCalledTimes(8);
        expect(home.getAlertMessage).toHaveBeenCalledTimes(3);
    });
});
