import React from 'react';
// import unmountComponentAtNode used in afterEach function
import { unmountComponentAtNode } from 'react-dom';
// import React testing methods
import { render, screen } from '@testing-library/react';
// import jest-dom testing library (i.e., toBeInDocument())
import '@testing-library/jest-dom';
// import SchemaContainer component
import SchemaContainer from '../SchemaContainer';

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

// initiate render test for SchemaContainer component
describe('SchemaContainer renders successfully', () => {
  test('should render SchemaContainer component', () => {
    // deconstruct getByTestId method from render function
    const { getByTestId } = render(<SchemaContainer />);

    // assign variable to SchemaContainer React component
    const element = getByTestId('schema-container');

    // expect SchemaContainer component to be in document when rendered
    expect(element).toBeInTheDocument();
  });

  test('should render SchemaContainer component with query_id', () => {
    // declare dummy variable
    const id = 100;

    // render SchemaContainer component with currentQueryId prop to be equal to dummy variable
    render(<SchemaContainer currentQueryId={id} />);

    // expect h2 component to contain text of 'Schema 100' when rendered
    expect(screen.getByText(`Schema ${id}`)).toBeInTheDocument();
  });
});
