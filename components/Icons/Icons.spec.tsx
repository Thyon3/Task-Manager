import { render } from '@testing-library/react';
import { BoardIcon, AddTaskIconMobile, VerticalEllipsisIcon, ChevronIcon, CheckIcon, DragIcon } from './Icons';

describe('Icon Components', () => {
    describe('BoardIcon', () => {
        it('renders with correct attributes', () => {
            render(<BoardIcon data-testid="board-icon" />);
            const icon = document.querySelector('[data-testid="board-icon"]');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('width', '16');
            expect(icon).toHaveAttribute('height', '16');
        });
    });

    describe('AddTaskIconMobile', () => {
        it('renders with correct attributes', () => {
            render(<AddTaskIconMobile data-testid="add-task-icon" />);
            const icon = document.querySelector('[data-testid="add-task-icon"]');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('width', '12');
            expect(icon).toHaveAttribute('height', '12');
        });
    });

    describe('VerticalEllipsisIcon', () => {
        it('renders with correct attributes', () => {
            render(<VerticalEllipsisIcon data-testid="ellipsis-icon" />);
            const icon = document.querySelector('[data-testid="ellipsis-icon"]');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('width', '5');
            expect(icon).toHaveAttribute('height', '20');
        });
    });

    describe('ChevronIcon', () => {
        it('renders with correct attributes', () => {
            render(<ChevronIcon data-testid="chevron-icon" />);
            const icon = document.querySelector('[data-testid="chevron-icon"]');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('width', '10');
            expect(icon).toHaveAttribute('height', '10');
        });
    });

    describe('CheckIcon', () => {
        it('renders with correct attributes', () => {
            render(<CheckIcon data-testid="check-icon" />);
            const icon = document.querySelector('[data-testid="check-icon"]');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('width', '12');
            expect(icon).toHaveAttribute('height', '9');
        });
    });

    describe('DragIcon', () => {
        it('renders with correct attributes', () => {
            render(<DragIcon data-testid="drag-icon" />);
            const icon = document.querySelector('[data-testid="drag-icon"]');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('width', '8');
            expect(icon).toHaveAttribute('height', '12');
        });
    });
});
