import { render } from '@testing-library/react';
import Droppable from './Droppable';

describe('Droppable Component', () => {
    it('renders with correct droppableId', () => {
        render(<Droppable droppableId="test-id" data-testid="droppable">Test Content</Droppable>);
        const droppable = document.querySelector('[data-testid="droppable"]');
        expect(droppable).toBeInTheDocument();
        expect(droppable?.textContent).toBe('Test Content');
    });

    it('passes through additional props', () => {
        render(<Droppable droppableId="test-id" className="custom-class" data-testid="droppable">Test</Droppable>);
        const droppable = document.querySelector('[data-testid="droppable"]');
        expect(droppable).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
        render(
            <Droppable droppableId="test-id" data-testid="droppable">
                <div data-testid="child-content">Child Content</div>
            </Droppable>
        );
        const childContent = document.querySelector('[data-testid="child-content"]');
        expect(childContent).toBeInTheDocument();
        expect(childContent?.textContent).toBe('Child Content');
    });
});
