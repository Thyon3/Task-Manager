import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
    it('renders with correct classes', () => {
        render(<Spinner data-testid="spinner" />);
        const spinner = document.querySelector('[data-testid="spinner"]');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass('animate-spin');
        expect(spinner).toHaveClass('rounded-full');
        expect(spinner).toHaveClass('border-8');
    });

    it('has correct dimensions', () => {
        render(<Spinner data-testid="spinner" />);
        const spinner = document.querySelector('[data-testid="spinner"]');
        expect(spinner).toHaveClass('w-24');
        expect(spinner).toHaveClass('aspect-square');
    });

    it('has correct border styling', () => {
        render(<Spinner data-testid="spinner" />);
        const spinner = document.querySelector('[data-testid="spinner"]');
        expect(spinner).toHaveClass('border-primary-light');
        expect(spinner).toHaveClass('border-r-transparent');
    });
});
