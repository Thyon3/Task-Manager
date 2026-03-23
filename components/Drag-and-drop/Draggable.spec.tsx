import { render } from '@testing-library/react';
import Draggable from './Draggable';

describe('Draggable Component', () => {
    it('renders with correct draggableId', () => {
        render(<Draggable draggableId="test-id" data-testid="draggable">Test Content</Draggable>);
        const draggable = document.querySelector('[data-testid="draggable"]');
        expect(draggable).toBeInTheDocument();
        expect(draggable?.textContent).toBe('Test Content');
    });

    it('passes through additional props', () => {
        render(<Draggable draggableId="test-id" className="custom-class" data-testid="draggable">Test</Draggable>);
        const draggable = document.querySelector('[data-testid="draggable"]');
        expect(draggable).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
        render(
            <Draggable draggableId="test-id" data-testid="draggable">
                <div data-testid="child-content">Child Content</div>
            </Draggable>
        );
        const childContent = document.querySelector('[data-testid="child-content"]');
        expect(childContent).toBeInTheDocument();
        expect(childContent?.textContent).toBe('Child Content');
    });
});
