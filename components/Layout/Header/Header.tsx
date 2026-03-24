import React, { FC, useEffect, useState } from 'react';
import { ButtonPrimaryLarge } from '../../Buttons/Buttons';
import { VerticalEllipsisIcon, AddTaskIconMobile, Chevron } from '../../Icons/Icons';
import MobileMenu from '../../Modals/MobileMenu';
import { useBoardsContext } from '../../../store/BoardListContext';
import useModal from '../../../hooks/useModal';
import TaskForm from '../../Modals/TaskForm';
import usePopover from '../../../hooks/usePopover';
import { useRouter } from 'next/router';
import BoardForm from '../../Modals/BoardForm';
import { mutate } from 'swr';
import { LinkContainer, PopoverLink } from '../../Popover/Popover';
import { signOut, useSession } from 'next-auth/react';

// Enhanced Header component with responsive design
const Header: FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const mobileMenu = useModal({ type: 'mobileMenu' });
    const newTaskModal = useModal();
    const router = useRouter();
    const { selectedBoard, mutateBoards } = useBoardsContext();
    const session = useSession();

    // Strings for the delete modal
    const modalTitle = 'Delete this board?';
    const modalMessage = `Are you sure you want to delete the '${selectedBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`;

    const confirmDeleteHandler = async () => {
        await fetch(`/api/boards/${selectedBoard?.uuid}`, {
            method: 'DELETE',
        });
        mutateBoards();
        deleteBoardModal.close();
        await router.push('/');
    };
    const deleteBoardModal = useModal({
        type: 'danger',
        dangerHeader: modalTitle,
        dangerMessage: modalMessage,
        onConfirmDelete: confirmDeleteHandler,
    });
    const DeleteBoardModal = deleteBoardModal.Component;

    const { Component: Popover, ...optionsPopover } = usePopover();

    const NewTaskModal = newTaskModal.Component;
    const MenuModal = mobileMenu.Component;

    const editBoardModal = useModal();
    const EditBoardModal = editBoardModal.Component;
