import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryCard from '../QueryCard';

test('should render QueryCard component', () => {
    render(<QueryCard />);
    const element = screen.getByTestId('query-card');
    expect(element).toBeInTheDocument();
})