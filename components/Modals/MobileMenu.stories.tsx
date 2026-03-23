import type { Meta, StoryObj } from '@storybook/react';
import MobileMenu from './MobileMenu';

const meta: Meta<typeof MobileMenu> = {
    title: 'Components/Modals/MobileMenu',
    component: MobileMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        closeMenuHandler: () => {},
    },
};
