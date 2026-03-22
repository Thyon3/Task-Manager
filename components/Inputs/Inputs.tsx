import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import { MultiInput, MultiInputChangeEvent, MultiInputFocusEvent } from '../../types';
import { ButtonSecondary } from '../Buttons/Buttons';
import Droppable from '../Drag-and-drop/Droppable';
import { Check, Chevron, Cross, DragIcon } from '../Icons/Icons';
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
                className={`${
                    haserror
                        ? 'border-danger sm:pr-24'
                        : 'border-mid-grey border-opacity-25 hover:border-primary focus:border-primary'
                } h-10 min-h-fit w-full cursor-pointer rounded border-2   bg-transparent py-2 px-4 text-sm font-medium text-black placeholder-black placeholder-opacity-25 outline-none focus:placeholder-opacity-0 dark:text-white dark:placeholder-white dark:placeholder-opacity-25 ${
                    className ?? ''
                }`}
            />
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        </div>
    );
};
