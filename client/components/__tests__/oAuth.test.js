import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OAuth, {deleteQuery } from '../OAuth';

describe('OAuth component render', () => {

    test('should render OAuth component', () => {
        render(<OAuth />);
        const element = screen.getByTestId('OAuth-1');
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('github');
    })

})

describe('OAuth GitHub login functionality', () => {

    test('delete function is triggered when button is clicked', () => {
        const mockOnClick = jest.fn()
        const { getByTestId } = render(<OAuth deleteQuery={mockOnClick()}/>)
    
        const clickIndicator = getByTestId('OAuth-2')
    
        fireEvent.click(clickIndicator)
    
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

})

