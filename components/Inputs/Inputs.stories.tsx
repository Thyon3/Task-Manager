import type { Meta, StoryObj } from '@storybook/react';
import { Input, Textarea, Dropdown, MultiValueInput } from './Inputs';

const meta: Meta<typeof Input> = {
    title: 'Components/Inputs',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        type: 'email',
    },
};

export const InputWithError: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter password',
        type: 'password',
        haserror: true,
        errorMsg: 'Password must be at least 8 characters',
    },
};

export const DefaultTextarea: Story = {
    args: {},
    render: () => (
        <Textarea
            label="Description"
            placeholder="Enter a description"
            rows={4}
        />
    ),
};

export const DefaultDropdown: Story = {
    args: {},
    render: () => (
        <Dropdown
            label="Category"
            options={['Option 1', 'Option 2', 'Option 3']}
            value=""
            onChange={() => {}}
        />
    ),
};

export const DefaultMultiValueInput: Story = {
    args: {},
    render: () => (
        <MultiValueInput
            label="Tags"
            placeholder="Add tags"
            values={[]}
            onChange={() => {}}
        />
    ),
};
