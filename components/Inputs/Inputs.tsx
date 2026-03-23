import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import { MultiInput, MultiInputChangeEvent, MultiInputFocusEvent } from '../../types';
import { ButtonSecondary } from '../Buttons/Buttons';
import Droppable from '../Drag-and-drop/Droppable';
import { Check, ChevronIcon, CrossIcon, DragIcon } from '../Icons/Icons';
import { v4 as uuidv4 } from 'uuid';
import {
    DndContext,
    DragEndEvent,
    MeasuringStrategy,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import usePopover from '../../hooks/usePopover';

const ErrorMsg: FC<PropsWithChildren> = ({ children }) => {
    return (
        <span className="absolute right-3 -top-2.5 whitespace-nowrap bg-white px-1 text-sm text-danger dark:bg-dark-grey sm:top-2.5 sm:right-4">
            {children}
        </span>
    );
};

const FormFieldLabel: FC<React.ComponentProps<'label'>> = (props) => {
    const { className, ...labelProps } = props;
    return (
        <label
            {...labelProps}
            className={`pointer-events-none mb-2 text-sm text-mid-grey dark:text-white ${className ?? ''}`}
        >
            {props.children}
        </label>
    );
};

const InputField: FC<React.ComponentProps<'input'> & { haserror?: boolean; errorMsg?: string }> = (props) => {
    const { className, haserror, errorMsg, ...inputProps } = props;
    return (
        <div className="relative w-full">
            <input
                {...inputProps}
                className={`${haserror
                    ? 'border-danger sm:pr-24'
                    : 'border-mid-grey border-opacity-25 hover:border-primary focus:border-primary'
                    } h-10 min-h-fit w-full cursor-pointer rounded border-2   bg-transparent py-2 px-4 text-sm font-medium text-black placeholder-black placeholder-opacity-25 outline-none focus:placeholder-opacity-0 dark:text-white dark:placeholder-white dark:placeholder-opacity-25 ${className ?? ''
                    }`}
            />
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        </div>
    );
};

const Input: FC<
    React.ComponentProps<'input'> & { label: string; haserror?: boolean; errorMsg?: string; hideLabel?: boolean }
> = (props) => {
    const { label, className, hideLabel, ...inputProps } = props;
    return (
        <fieldset className={`flex flex-col text-mid-grey dark:text-white ${className ?? ''}`}>
            <FormFieldLabel htmlFor={props.id} hidden={hideLabel}>
                {props.label}
            </FormFieldLabel>
            <InputField {...inputProps} />
        </fieldset>
    );
};

type MultiValueInputProps = React.ComponentProps<'fieldset'> & {
    id?: string;
    label: string;
    changeHandler: Function;
    values?: MultiInput[];
    placeholder?: string;
    addBtnText?: string;
    className?: string;
    validationHandler: (val: string | undefined) => [boolean, string];
    draggable?: boolean;
};

const MultiValueInput: FC<MultiValueInputProps> = (props) => {
    const values = props.values ?? [];
    const setValues = props.changeHandler;
    const [id, setId] = React.useState(uuidv4());
    const [animateIn, setAnimateIn] = useState(false);

    const handleInputChange = (e: MultiInputChangeEvent) => {
        const { value, id } = e.target;
        const newValues: MultiInput[] = values.map((item) => {
            if (item.id === id) {
                const [isValid, errorMsg] = props.validationHandler(value);
                return { ...item, value, isValid, errorMsg, isTouched: true };
            }
            return item;
        });
        setValues(newValues);
    };

    const onNewColumn = () => {
        setAnimateIn(true);
        const newValues = [...values, { value: '', id: `${id}`, isValid: false, isTouched: false }];
        setValues(newValues);
        setId(uuidv4());
        setTimeout(() => setAnimateIn(false), 250);
    };

    const handleDeleteInput = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setAnimateIn(false);
        const { id } = e.currentTarget;
        setTimeout(() => {
            const newValues = values.filter((item) => item.id !== id.replace('delete-', ''));
            setValues(newValues);
        }, 230);
    };

    const handleBlur = (e: MultiInputFocusEvent) => {
        const { value, id } = e.target;
        const newValues: MultiInput[] = values.map((item) => {
            if (item.id === id) {
                const [isValid, errorMsg] = props.validationHandler(value);
                return { ...item, value, isValid, errorMsg, isTouched: true };
            }
            return item;
        });
        setValues(newValues);
    };

    return (
        <div className={props.className ?? ''}>
            <fieldset className="flex flex-col overflow-x-visible" id={props.id}>
                <FormFieldLabel htmlFor={props.id}>{props.label}</FormFieldLabel>
                {values.map((item) => (
                    <div key={item.id} className="relative mb-3 flex items-center">
                        <InputField
                            id={item.id}
                            value={item.value}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder={props.placeholder}
                            haserror={!item.isValid && item.isTouched}
                            errorMsg={item.errorMsg}
                            className="pr-10"
                        />
                        <CrossIcon
                            id={`delete-${item.id}`}
                            className="absolute right-3 cursor-pointer"
                            onClick={handleDeleteInput}
                        />
                    </div>
                ))}
                <ButtonSecondary
                    type="button"
                    onClick={onNewColumn}
                    className="w-full"
                >
                    {props.addBtnText || '+ Add New'}
                </ButtonSecondary>
            </fieldset>
        </div>
    );
};

export { Input, MultiValueInput };
