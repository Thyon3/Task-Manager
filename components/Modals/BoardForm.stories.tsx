import type { Meta, StoryObj } from '@storybook/react';
import BoardForm from './BoardForm';

const meta: Meta<typeof BoardForm> = {
    title: 'Components/Modals/BoardForm',
    component: BoardForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        closeModal: () => {},
    },
};

export const WithInitialData: Story = {
    args: {
        closeModal: () => {},
        initialData: {
            uuid: 'test-uuid',
            name: 'Test Board',
            columns: [
                { uuid: 'col-1', name: 'To Do', color: '#49C4E5' },
                { uuid: 'col-2', name: 'In Progress', color: '#8471FF' },
                { uuid: 'col-3', name: 'Done', color: '#67E2A9' },
            ],
        },
    },
};
