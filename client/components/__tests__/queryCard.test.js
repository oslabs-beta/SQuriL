import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryCard from '../QueryCard';

describe('QueryCard renders successfully', () => {

    test('should render QueryCard component', () => {
        const { getByTestId } = render(<QueryCard/>);
        const element = getByTestId('query-card');
        expect(element).toBeInTheDocument();

    })

    // test('delete function is rendered and called when button is clicked', () => {

    //     const mockOnClick = jest.fn()
    //     const { getByTestId } = render(<QueryCard onClick={mockOnClick()}/>)
    
    //     const clickIndicator = getByTestId('query-delete')
    
    //     fireEvent.click(clickIndicator)
        
    //     expect(clickIndicator).toBeInTheDocument();
    //     // expect(mockOnClick).toHaveBeenCalledTimes(1); 

    // })

});

