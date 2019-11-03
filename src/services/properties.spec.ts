import { get } from "https";

import {propertiesService} from "./properties";

jest.mock("https", () => ({
  get: jest.fn(),
}));

jest.mock("rxjs", () => ({
  Observable: jest.fn(),
  from: jest.fn(() => ({ pipe: jest.fn() })),
  of: jest.fn((thing) => thing),
}));

jest.mock("rxjs/operators", () => ({
  switchMap: jest.fn(),
}));

describe("properties service", () => {
  it("Calls the api url", () => {
    propertiesService.getProperties();
    expect(get).toHaveBeenCalledTimes(1);
    expect((get as any).mock.calls[0][0]).toBe("https://interview.domio.io/properties/");
  });
});
