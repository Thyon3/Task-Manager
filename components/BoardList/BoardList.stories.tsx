import type { Meta, StoryObj } from '@storybook/react';
import BoardList from './BoardList';

const meta: Meta<typeof BoardList> = {
    title: 'Components/BoardList/BoardList',
    component: BoardList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
