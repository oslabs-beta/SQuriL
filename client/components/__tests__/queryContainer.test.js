import React from 'react';
// import unmountComponentAtNode used in afterEach function
import { unmountComponentAtNode } from 'react-dom';
// import React testing methods
import { render } from '@testing-library/react';
// import jest-dom testing library (i.e., toBeInDocument())
import '@testing-library/jest-dom';
// import QueryContainer component
import QueryContainer from '../QueryContainer';

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

// initiate render test for QueryContainer component
describe('QueryContainer renders successfully', () => {
  test('should render QueryContainer component', () => {
    // dummy variable to satisfy queryCard property (array of IDs) on QueryContainer
    const card = [1, 2, 3];

    // deconstruct getByTestId method from render function
    const { getByTestId } = render(<QueryContainer queryCard={card} />);

    // assign variable to QueryContainer React component
    const element = getByTestId('query-container');

    // expect QueryContainer component to be in document when rendered
    expect(element).toBeInTheDocument();
  });
});
