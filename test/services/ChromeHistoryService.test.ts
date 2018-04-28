import {ChromeHistoryService, IChromeHistoryQuery} from "~/services/history_items/ChromeHistoryService";

const chrome: any = {history: { search: () => null as any}}; // this is a mock
declare let global: any; // this is parallel to "window"
global.chrome = chrome; // inject the mock to the window, as if chrome supplied this object

describe("ChromeHistoryService", () => {
    it("should call chrome api search function with query of all items", () => {
        const service = new ChromeHistoryService(() => null);
        let actualQuery: IChromeHistoryQuery;
        jest.spyOn(chrome.history, "search").mockImplementation((mockedQuery, mockedCallback) => actualQuery = mockedQuery);

        service.startQuery();

        expect(actualQuery.startTime).toBe(0);
        expect(actualQuery.endTime).toBe(undefined);
        expect(actualQuery.text).toBe("");
        expect(actualQuery.maxResults).toBeGreaterThan(80000);
    });

    it("should call chrome api search function with injected callback", () => {
        const items = ["some", "items", "that", "are", "history"];
        const callback = jasmine.createSpy("items callback");
        const service = new ChromeHistoryService(callback);
        jest.spyOn(chrome.history, "search").mockImplementation((mockedQuery, mockedCallback) => mockedCallback(items));

        service.startQuery();

        expect(callback).toHaveBeenCalledWith(items);
    });
});
