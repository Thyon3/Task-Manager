import type { Meta, StoryObj } from '@storybook/react';
import useInput from './useInput';

const meta: Meta<typeof useInput> = {
    title: 'Hooks/useInput',
    component: useInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    render: () => {
        const input = useInput<string>({
            validateFn: (value) => {
                if (!value) return [false, 'Field is required'];
                if (value.length < 3) return [false, 'Must be at least 3 characters'];
                return [true, ''];
            },
        });

        return (
            <div>
                <input
                    value={input.value || ''}
                    onChange={input.valueChangeHandler}
                    onBlur={input.inputBlurHandler}
                    placeholder="Type something..."
                />
                {input.hasError && <p style={{ color: 'red' }}>{input.errorMsg}</p>}
            </div>
        );
    },
};
