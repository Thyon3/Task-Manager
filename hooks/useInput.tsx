import { useState } from 'react';
import type { MultiInputChangeEvent } from '../types';

// Input hook interface for form input management
type InputHook<T> = {
    value: T | undefined;
    isValid?: boolean;
    hasError?: boolean;
    errorMsg?: string;
    setValue: (val: T) => void;
    setIsTouched: (val: boolean) => void;
    valueChangeHandler: (e: MultiInputChangeEvent) => void;
    customValueChangeHandler: (val: T) => void;
    inputBlurHandler: (e: MultiInputChangeEvent) => void;
};

// Custom hook for form input state management and validation
function useInput<T>(options?: { validateFn?: (value: T) => [boolean, string]; initialValue?: T }): InputHook<T> {
    const [value, setValue] = useState<T | undefined>(options?.initialValue ?? undefined);
    const [isTouched, setIsTouched] = useState(false);

    const [isValid, errorMsg] = options?.validateFn ? options.validateFn(value as T) : [true, ''];
    const hasError = !isValid && isTouched;

    const valueChangeHandler = (e: MultiInputChangeEvent) => {
        setValue(e.target.value as T);
    };

    const customValueChangeHandler = (val: T) => {
        setValue(val);
    };

    const inputBlurHandler = (e: MultiInputChangeEvent) => {
        setIsTouched(true);
    };

    if (!options?.validateFn) {
        return {
            value,
            setValue,
            valueChangeHandler,
            customValueChangeHandler,
            inputBlurHandler,
            setIsTouched,
        };
    }

    return {
        value,
        isValid,
        hasError,
        errorMsg,
        valueChangeHandler,
        customValueChangeHandler,
        inputBlurHandler,
        setIsTouched,
        setValue,
    };
}

export default useInput;
