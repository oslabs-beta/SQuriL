import React from 'react';
// import React testing methods
import { render } from '@testing-library/react';
// import jest-dom testing library (i.e., toBeInDocument())
import '@testing-library/jest-dom';
// import URIInput component
import URIInput from '../URIInput';
// import unmountComponentAtNode used in afterEach function
import { unmountComponentAtNode } from 'react-dom';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

// initiate render test for URIInput component
describe('URIInput renders successfully', () => {

    test('should render URIInput component', () => {

        // deconstruct getByTestId method from render function
        const { getByTestId } = render(<URIInput/>);

        // assign variable to URIInput React component
        const element = getByTestId('uri');

        //expect URIInput component to be in document when rendered
        expect(element).toBeInTheDocument();
    })
});