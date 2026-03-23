import type { Meta, StoryObj } from '@storybook/react';
import Droppable from './Droppable';

const meta: Meta<typeof Droppable> = {
    title: 'Components/Droppable',
    component: Droppable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        droppableId: 'droppable-1',
        children: 'Drop zone',
    },
};

export const WithCustomContent: Story = {
    args: {
        droppableId: 'droppable-2',
        children: (
            <div style={{ 
                padding: '40px', 
                border: '2px dashed #999', 
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
                textAlign: 'center'
            }}>
                Drop items here
            </div>
        ),
    },
};
