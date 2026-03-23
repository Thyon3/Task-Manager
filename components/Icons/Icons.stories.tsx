import type { Meta, StoryObj } from '@storybook/react';
import { BoardIcon, AddTaskIconMobile, VerticalEllipsisIcon, ChevronIcon, CheckIcon, DragIcon, DarkThemeIcon, LightThemeIcon } from './Icons';

const meta: Meta<typeof BoardIcon> = {
    title: 'Components/Icons',
    component: BoardIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Board: Story = {
    args: {},
};

export const AddTaskMobile: Story = {
    args: {},
    render: () => <AddTaskIconMobile />,
};

export const VerticalEllipsis: Story = {
    args: {},
    render: () => <VerticalEllipsisIcon />,
};

export const Chevron: Story = {
    args: {},
    render: () => <ChevronIcon />,
};

export const Check: Story = {
    args: {},
    render: () => <CheckIcon />,
};

export const Drag: Story = {
    args: {},
    render: () => <DragIcon />,
};

export const DarkTheme: Story = {
    args: {},
    render: () => <DarkThemeIcon />,
};

export const LightTheme: Story = {
    args: {},
    render: () => <LightThemeIcon />,
};
