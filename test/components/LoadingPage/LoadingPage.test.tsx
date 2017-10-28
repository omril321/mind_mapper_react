import { shallow, render, mount } from 'enzyme';
import LoadingPage from "../../../src/components/LoadingPage/LoadingPage";
import * as React from "react";

it('should contain a proper text', () => {
    const wrapper = render(
        <LoadingPage isLoading={true}/>
    );
    expect(wrapper.text()).toBe("Loading!");
});