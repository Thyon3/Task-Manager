import type { Meta, StoryObj } from '@storybook/react';
import { LinkContainer, PopoverLink } from './Popover';

const meta: Meta<typeof LinkContainer> = {
    title: 'Components/Popover',
    component: LinkContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <>
                <PopoverLink onClick={() => {}}>Edit</PopoverLink>
                <PopoverLink onClick={() => {}}>Delete</PopoverLink>
                <PopoverLink onClick={() => {}}>Share</PopoverLink>
            </>
        ),
    },
};

export const WithDangerLink: Story = {
    args: {
        children: (
            <>
                <PopoverLink onClick={() => {}}>View Details</PopoverLink>
                <PopoverLink danger onClick={() => {}}>Delete Item</PopoverLink>
                <PopoverLink disabled onClick={() => {}}>Disabled Action</PopoverLink>
            </>
        ),
    },
};
