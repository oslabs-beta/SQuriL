import React from 'react';
// import React testing methods
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
// import jest-dom testing library (i.e., toBeInDocument())
import '@testing-library/jest-dom';
// import OAuth component
import OAuth from '../OAuth';
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

// initiate render test for GitHub OAuth component
describe('OAuth component renders successfully', () => {

    test('should render OAuth component', () => {
        // deconstruct getByTestId method from render function
        const { getByTestId } = render(<OAuth />);

        // assign variable to GitHub OAuth React component
        const element = getByTestId('OAuth-1');

        //expect GitHub component to be in document when rendered
        expect(element).toBeInTheDocument();

        // expect GitHub component to have test of 'github' when rendered
        expect(element).toHaveTextContent('github');
    })

})

// initiate onClick test for GitHub OAuth button
describe('OAuth GitHub login functionality onClick', () => {

    test('OAuth button function triggered onClick', () => {
        // create mock jest function to test OAuth button
        const mockOnClick = jest.fn()

        // deconstruct getByTestId method from render function
        const { getByTestId } = render(<OAuth onClick={mockOnClick()}/>)
        
        // assign variable to OAuth button
        const clickIndicator = getByTestId('OAuth-2')
    
        // fire click event for OAuth button
        fireEvent.click(clickIndicator)
    
        // expect to have been called times as 1 for a single button click
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

})

