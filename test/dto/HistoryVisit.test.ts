import HistoryVisit from "../../src/dto/HistoryVisit";

describe('HistoryVisit', () => {
    it('should return the history item title using the proper getter', () => {
        const visit = new HistoryVisit({
            id: 100,
            title: "this is a test!"
        });

        expect(visit.getTitle()).toBe("this is a test!");
    });

    it('should return the history item url using the proper getter', () => {
        const visit = new HistoryVisit({
            id: 200,
            url: "some url"
        });

        expect(visit.getVisitUrl()).toBe("some url");
    });
});