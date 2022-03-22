import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../Dashboard';

describe('Dashboard component render', () => {

    test('should render OAuth component', () => {
        render(<Dashboard />);
        const element = screen.getByTestId('dashboard');
        expect(element).toBeInTheDocument();
    })

})