import React from 'react';
// import unmountComponentAtNode used in afterEach function
import { unmountComponentAtNode } from 'react-dom';
// import React testing methods
import { render, screen, fireEvent } from '@testing-library/react';
// import jest-dom testing library (i.e., toBeInDocument())
import '@testing-library/jest-dom';
// import QueryCard component
import QueryCard from '../QueryCard';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// initiate render test for QueryCard component
describe('QueryCard renders successfully', () => {
  test('should render QueryCard component', () => {
    // deconstruct getByTestId method from render function
    const { getByTestId } = render(<QueryCard />);

    // assign variable to QueryCard React component
    const element = getByTestId('query-card');

    // expect GitHub component to be in document when rendered
    expect(element).toBeInTheDocument();
  });

  test('should render QueryCard component with query_id', () => {
    // declare dummy variable
    const id = 100;

    // render QueryCard component with queryCard prop to be equal to dummy variable
    render(<QueryCard queryCard={id} />);

    // expect h3 component to contain text of 'Schema 100' when rendered
    expect(screen.getByText(`Schema ${id}`)).toBeInTheDocument();
  });
});

// initiate function test for QueryCard h3 component schema fetch
describe('QueryCard h3 click to fetch schema works successfully', () => {
  test('h3 component click fires successfully to fetch schema', () => {
    // declare mock function for getSchema
    const baseProps = { getSchema: jest.fn() };

    // declare mock function for onClick function
    const mockOnClick = jest.fn();

    // render QueryCard component with getByTestId destructured, with onClick and baseProps passed in
    const { getByTestId } = render(<QueryCard onClick={mockOnClick()} {...baseProps} />);

    // declare clickIndicator variable for h3 querycard
    const clickIndicator = getByTestId('query-card-h3');

    // fire click event for h3 component
    fireEvent.click(clickIndicator);

    // expect mockOnClick function to fire one time
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

// initiate function test for QueryCard h3 component schema fetch
describe('QueryCard delete button works successfully', () => {
  test('delete click fires successfully', () => {
    // declare mock functions for deleteQuery and getSchema
    const baseProps = {
      deleteQuery: jest.fn(),
      getSchema: jest.fn(),
      setCurrentQueryId: jest.fn(),
    };

    // declare mock function for onClick function
    const mockOnClick = jest.fn();

    // render QueryCard component with getByTestId destructured, with onClick and baseProps passed in
    const { getByTestId } = render(<QueryCard onClick={mockOnClick()} {...baseProps} />);

    // declare clickIndicator variable for delete button
    const clickIndicator = getByTestId('query-delete');

    // fire click event for delete button
    fireEvent.click(clickIndicator);

    // expect mockOnClick function to fire one time
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
