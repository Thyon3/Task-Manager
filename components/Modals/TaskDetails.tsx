import { FC } from 'react';
import { useBoardsContext } from '../../store/BoardListContext';
import { ButtonPrimary, ButtonSecondary } from '../Buttons/Buttons';
import { CrossIcon } from '../Icons/Icons';

// Task details modal component
const TaskDetails: FC = () => {
    const { selectedTask, setSelectedTask } = useBoardsContext();

    if (!selectedTask) {
        return null;
    }

    const handleClose = () => {
        setSelectedTask(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-v-dark-grey">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-mid-grey dark:text-white">Task Details</h2>
                    <button
                        onClick={handleClose}
                        className="text-grey hover:text-mid-grey dark:text-grey-light dark:hover:text-white"
                    >
                        <CrossIcon />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-medium text-mid-grey dark:text-white">Title</h3>
                        <p className="text-grey dark:text-grey-light">{selectedTask.title || 'Untitled Task'}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-mid-grey dark:text-white">Description</h3>
                        <p className="text-grey dark:text-grey-light">{selectedTask.description || 'No description'}</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-mid-grey dark:text-white">Status</h3>
                        <p className="text-grey dark:text-grey-light">{selectedTask.status || 'No status'}</p>
                    </div>
                </div>
                <div className="mt-6 flex gap-3">
                    <ButtonPrimary onClick={handleClose}>Close</ButtonPrimary>
                    <ButtonSecondary onClick={handleClose}>Cancel</ButtonSecondary>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
