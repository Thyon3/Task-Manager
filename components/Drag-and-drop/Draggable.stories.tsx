import type { Meta, StoryObj } from '@storybook/react';
import Draggable from './Draggable';

const meta: Meta<typeof Draggable> = {
    title: 'Components/Draggable',
    component: Draggable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        draggableId: 'draggable-1',
        children: 'Drag me!',
    },
};

export const WithCustomContent: Story = {
    args: {
        draggableId: 'draggable-2',
        children: (
            <div style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '8px' }}>
                Custom draggable content
            </div>
        ),
    },
};
