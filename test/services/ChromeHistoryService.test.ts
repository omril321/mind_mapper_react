import {ChromeHistoryQuery, ChromeHistoryService} from "../../src/services/ChromeHistoryService";

let chrome: any = {history: { search: () => null}}; //this is a mock
declare let global: any; //this is parallel to "window"
global.chrome = chrome; //inject the mock to the window, as if chrome supplied this object

describe('ChromeHistoryService', () => {
    it('should call chrome api search function with query of all items', () => {
        const service = new ChromeHistoryService(() => null);
        let actualQuery: ChromeHistoryQuery = undefined;
        jest.spyOn(chrome.history, 'search').mockImplementation((_query, _callback) => actualQuery = _query);

        service.startQuery();

        expect(actualQuery.startTime).toBe(0);
        expect(actualQuery.endTime).toBe(undefined);
        expect(actualQuery.text).toBe('');
        expect(actualQuery.maxResults).toBeGreaterThan(80000);
    });

    it('should call chrome api search function with injected callback', () => {
        const items = ["some", "items", "that", "are", "history"];
        const callback = jasmine.createSpy('items callback');
        const service = new ChromeHistoryService(callback);
        jest.spyOn(chrome.history, 'search').mockImplementation((_query, _callback) => _callback(items));

        service.startQuery();

        expect(callback).toHaveBeenCalledWith(items);
    });
});