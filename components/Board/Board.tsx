import { FC } from 'react';
import { useBoardsContext } from '../../store/BoardListContext';
import { Droppable } from '../Drag-and-drop/Droppable';
import { Draggable } from '../Drag-and-drop/Draggable';
import { Column } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Board component for rendering columns and tasks
const Board: FC = () => {
    const { selectedBoard, isLoading } = useBoardsContext();

    if (isLoading) {
        return <div>Loading board...</div>;
    }

    if (!selectedBoard) {
        return <div>No board selected</div>;
    }

    return (
        <div className="flex h-full gap-6 overflow-scroll p-6">
            {selectedBoard.columns.map((column: Column) => (
                <Droppable key={column.uuid} droppableId={column.uuid}>
                    <div className="min-w-[300px] rounded-lg bg-grey-highlight p-4 dark:bg-v-dark-grey">
                        <h3 className="mb-4 font-bold text-mid-grey dark:text-white">{column.name}</h3>
                        <div className="flex flex-col gap-3">
                            {column.tasks?.map((task) => (
                                <Draggable key={task.uuid} draggableId={task.uuid}>
                                    <div className="rounded-md bg-white p-3 shadow-sm dark:bg-v-dark-grey">
                                        <h4 className="font-medium text-mid-grey dark:text-white">{task.title}</h4>
                                        <p className="text-sm text-grey dark:text-grey-light">{task.description}</p>
                                    </div>
                                </Draggable>
                            ))}
                        </div>
                    </div>
                </Droppable>
            ))}
        </div>
    );
};

export default Board;
