import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import OAuth from '../OAuth';

test('should render OAuth component', () => {
    render(<OAuth />);
    const element = screen.getByTestId('OAuth-1');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('github');
})