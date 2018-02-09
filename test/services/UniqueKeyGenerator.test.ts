import * as _ from "lodash";
import generateUniqueKey from "../../src/services/UniqueKeyGenerator";

describe('generateUniqueKey', () => {
    it('should return different values when called multiple times', () => {
        const keys = [
            generateUniqueKey(),
            generateUniqueKey(),
            generateUniqueKey(),
            generateUniqueKey(),
            generateUniqueKey(),
            generateUniqueKey(),
            generateUniqueKey(),
            generateUniqueKey(),
            generateUniqueKey(),
        ];
        const uniqKeys = _.uniq(keys);

        expect(uniqKeys).toEqual(keys);
    })
});