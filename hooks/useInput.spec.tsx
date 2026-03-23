import { renderHook, act } from '@testing-library/react';
import useInput from './useInput';

describe('useInput Hook', () => {
    it('initializes with empty value', () => {
        const { result } = renderHook(() => useInput<string>({
            validateFn: () => [true, ''],
        }));

        expect(result.current.value).toBe('');
        expect(result.current.hasError).toBe(false);
        expect(result.current.errorMsg).toBe('');
        expect(result.current.isTouched).toBe(false);
    });

    it('validates input on change', () => {
        const { result } = renderHook(() => useInput<string>({
            validateFn: (value) => [value.length >= 3, value.length >= 3 ? '' : 'Too short'],
        }));

        act(() => {
            result.current.valueChangeHandler('ab');
        });

        expect(result.current.value).toBe('ab');
        expect(result.current.hasError).toBe(true);
        expect(result.current.errorMsg).toBe('Too short');
    });

    it('sets touched state on blur', () => {
        const { result } = renderHook(() => useInput<string>({
            validateFn: () => [true, ''],
        }));

        act(() => {
            result.current.inputBlurHandler();
        });

        expect(result.current.isTouched).toBe(true);
    });

    it('handles custom value change', () => {
        const { result } = renderHook(() => useInput<string>({
            validateFn: () => [true, ''],
        }));

        act(() => {
            result.current.customValueChangeHandler('custom value');
        });

        expect(result.current.value).toBe('custom value');
        expect(result.current.isTouched).toBe(true);
    });
});
