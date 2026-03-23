import type { Meta, StoryObj } from '@storybook/react';
import { ButtonPrimaryLarge, ButtonPrimary, ButtonSecondary, ButtonDanger } from './Buttons';

const meta: Meta<typeof ButtonPrimary> = {
    title: 'Components/Buttons',
    component: ButtonPrimary,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Primary Button',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary Button',
    },
    render: (args) => <ButtonSecondary {...args} />,
};

export const Danger: Story = {
    args: {
        children: 'Danger Button',
    },
    render: (args) => <ButtonDanger {...args} />,
};

export const LargePrimary: Story = {
    args: {
        children: 'Large Primary Button',
    },
    render: (args) => <ButtonPrimaryLarge {...args} />,
};
