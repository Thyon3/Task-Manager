import { useDraggable } from '@dnd-kit/core';
import { FC, PropsWithChildren } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

const Draggable: FC<PropsWithChildren<{ draggableId: UniqueIdentifier } & React.ComponentProps<'div'>>> = (props) => {
    const { draggableId, ...restProps } = props;

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: draggableId,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            {...restProps}
        >
            {props.children}
        </div>
    );
};

export default Draggable;
