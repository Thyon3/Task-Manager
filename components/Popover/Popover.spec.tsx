import { render, screen, fireEvent } from '@testing-library/react';
import { LinkContainer, PopoverLink } from './Popover';

describe('Popover Components', () => {
    describe('LinkContainer', () => {
        it('renders with correct classes', () => {
            render(<LinkContainer data-testid="link-container">Test Content</LinkContainer>);
            const container = document.querySelector('[data-testid="link-container"]');
            expect(container).toBeInTheDocument();
            expect(container).toHaveClass('w-48');
            expect(container).toHaveClass('animate-fade-in');
            expect(container).toHaveClass('rounded-md');
            expect(container).toHaveClass('bg-white');
            expect(container).toHaveClass('p-4');
            expect(container).toHaveClass('shadow-md');
        });

        it('applies custom className', () => {
            render(<LinkContainer className="custom-class" data-testid="link-container">Test</LinkContainer>);
            const container = document.querySelector('[data-testid="link-container"]');
            expect(container).toHaveClass('custom-class');
        });
    });

    describe('PopoverLink', () => {
        it('renders button with children', () => {
            render(<PopoverLink onClick={() => {}} data-testid="popover-link">Test Link</PopoverLink>);
            const link = document.querySelector('[data-testid="popover-link"]');
            expect(link).toBeInTheDocument();
            expect(link?.textContent).toBe('Test Link');
        });

        it('calls onClick when clicked', () => {
            const handleClick = jest.fn();
            render(<PopoverLink onClick={handleClick} data-testid="popover-link">Test Link</PopoverLink>);
            const link = document.querySelector('[data-testid="popover-link"]');
            if (link) fireEvent.click(link);
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('applies danger styling when danger prop is true', () => {
            render(<PopoverLink onClick={() => {}} danger data-testid="popover-link">Danger Link</PopoverLink>);
            const button = document.querySelector('[data-testid="popover-link"] button');
            expect(button).toHaveClass('text-danger');
        });

        it('is disabled when disabled prop is true', () => {
            render(<PopoverLink onClick={() => {}} disabled data-testid="popover-link">Disabled Link</PopoverLink>);
            const button = document.querySelector('[data-testid="popover-link"] button');
            expect(button).toBeDisabled();
            expect(button).toHaveClass('disabled:cursor-default');
            expect(button).toHaveClass('disabled:text-opacity-50');
        });

        it('applies custom className', () => {
            render(<PopoverLink onClick={() => {}} className="custom-class" data-testid="popover-link">Test</PopoverLink>);
            const listItem = document.querySelector('[data-testid="popover-link"]');
            expect(listItem).toHaveClass('custom-class');
        });
    });
});
