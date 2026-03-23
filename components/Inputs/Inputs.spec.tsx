import { render, screen, fireEvent } from '@testing-library/react';
import { Input, MultiValueInput } from './Inputs';

describe('Input Components', () => {
    describe('Input', () => {
        it('renders with label and placeholder', () => {
            render(<Input label="Email" placeholder="Enter email" data-testid="input" />);
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
        });

        it('shows error message when hasError is true', () => {
            render(<Input label="Name" haserror errorMsg="Name is required" data-testid="input" />);
            expect(screen.getByText('Name is required')).toBeInTheDocument();
        });

        it('calls onChange when input value changes', () => {
            const handleChange = jest.fn();
            render(<Input label="Test" onChange={handleChange} data-testid="input" />);
            const input = screen.getByRole('textbox');
            fireEvent.change(input, { target: { value: 'test' } });
            expect(handleChange).toHaveBeenCalled();
        });

        it('calls onBlur when input loses focus', () => {
            const handleBlur = jest.fn();
            render(<Input label="Test" onBlur={handleBlur} data-testid="input" />);
            const input = screen.getByRole('textbox');
            fireEvent.blur(input);
            expect(handleBlur).toHaveBeenCalled();
        });
    });

    describe('MultiValueInput', () => {
        it('renders with placeholder', () => {
            render(<MultiValueInput placeholder="Add items" values={[]} onChange={() => {}} data-testid="multi-input" />);
            expect(screen.getByPlaceholderText('Add items')).toBeInTheDocument();
        });

        it('displays existing values', () => {
            render(<MultiValueInput values={['Item 1', 'Item 2']} onChange={() => {}} data-testid="multi-input" />);
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });

        it('calls onChange when value is added', () => {
            const handleChange = jest.fn();
            render(<MultiValueInput placeholder="Add items" values={[]} onChange={handleChange} data-testid="multi-input" />);
            const input = screen.getByPlaceholderText('Add items');
            fireEvent.change(input, { target: { value: 'new item' } });
            fireEvent.keyDown(input, { key: 'Enter' });
            expect(handleChange).toHaveBeenCalledWith(['new item']);
        });
    });
});
