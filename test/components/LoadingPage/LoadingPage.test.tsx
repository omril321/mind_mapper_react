import {render} from 'enzyme';
import LoadingPage from "../../../src/components/LoadingPage/LoadingPage";
import * as React from "react";


describe('LoadingPage', () => {
    it('should contain loading text when loading', () => {
        const wrapper = render(<LoadingPage isLoading={true}/>);
        expect(wrapper.text()).toBe("Loading!");
    });

    it('should not contain anything when not loading', () => {
        const wrapper = render(<LoadingPage isLoading={false}/>);
        expect(wrapper.empty()).toBeTruthy()
    });

});