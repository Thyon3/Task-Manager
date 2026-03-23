import { render, screen } from '@testing-library/react';
import { ButtonPrimary, ButtonSecondary, ButtonDanger } from './Buttons';

describe('Button Components', () => {
    describe('ButtonPrimary', () => {
        it('renders with correct text', () => {
            render(<ButtonPrimary>Test Button</ButtonPrimary>);
            expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
        });

        it('applies correct classes', () => {
            render(<ButtonPrimary>Test Button</ButtonPrimary>);
            const button = screen.getByRole('button', { name: 'Test Button' });
            expect(button).toHaveClass('bg-primary');
        });
    });

    describe('ButtonSecondary', () => {
        it('renders with correct text', () => {
            render(<ButtonSecondary>Test Button</ButtonSecondary>);
            expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
        });

        it('applies correct classes', () => {
            render(<ButtonSecondary>Test Button</ButtonSecondary>);
            const button = screen.getByRole('button', { name: 'Test Button' });
            expect(button).toHaveClass('bg-opacity-10');
        });
    });

    describe('ButtonDanger', () => {
        it('renders with correct text', () => {
            render(<ButtonDanger>Test Button</ButtonDanger>);
            expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
        });

        it('applies correct classes', () => {
            render(<ButtonDanger>Test Button</ButtonDanger>);
            const button = screen.getByRole('button', { name: 'Test Button' });
            expect(button).toHaveClass('bg-danger');
        });
    });
});
