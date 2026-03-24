// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/db';
import { validate, v4 as uuidv4 } from 'uuid';
import { Subtask } from '../../../types';
import { getServerSession, Session } from 'next-auth';
import { options } from '../auth/[...nextauth]';

// Task UUID API handler with authentication and validation
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, options);
    if (!session) {
        res.status(401).end('Unauthorized');
        return;
    }

    if (!req.query.uuid || !validate(req.query.uuid.toString())) {
        res.status(400).end('Invalid task UUID');
        return;
    }
    switch (req.method) {
        case 'DELETE': {
            await deleteTask(req, res, session);
            break;
        }
        case 'GET': {
            await getTask(req, res, session);
            break;
        }
        case 'PUT': {
            await updateTask(req, res, session);
            break;
        }
        default:
            res.status(405).end('Method not allowed');
            break;
    }
}

const deleteTask = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const taskUUID = req.query.uuid?.toString();
    if (!taskUUID) {
        return res.status(400).end('Task uuid is required');
    }

    const result = await prisma.task.deleteMany({
        where: {
            uuid: taskUUID,
            userId: session.user.id,
        },
    });

    if (result.count === 0) return res.status(404).end('Task not found');
    return res.status(200).end('Task deleted successfully');
};

const getTask = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const taskUUID = req.query.uuid?.toString();
    if (!taskUUID) {
        return res.status(400).end('Task uuid is required');
    }

    const task = await prisma.task.findFirst({
        where: {
            uuid: taskUUID,
            userId: session.user.id,
        },
        include: {
            subtasks: true,
            column: true,
        },
    });

    if (!task) return res.status(404).end('Task not found');
    return res.status(200).json(task);
};

const updateTask = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const taskUUID = req.query.uuid?.toString();
    if (!taskUUID) {
        return res.status(400).end('Task uuid is required');
    }

    const { name, description, column_uuid, position, subtasks } = req.body;

    // Verify task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
        where: {
            uuid: taskUUID,
            userId: session.user.id,
        },
    });

    if (!existingTask) {
        return res.status(404).end('Task not found');
    }

    // Update task basic info
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (column_uuid !== undefined) updateData.columnUuid = column_uuid;
    if (position !== undefined) updateData.position = position;

    const updatedTask = await prisma.task.update({
        where: {
            uuid: taskUUID,
        },
        data: updateData,
    });

    // Update subtasks if provided
    if (subtasks && Array.isArray(subtasks)) {
        // Delete existing subtasks
        await prisma.subtask.deleteMany({
            where: {
                taskUuid: taskUUID,
            },
        });

        // Create new subtasks
        for (const subtask of subtasks) {
            if (typeof subtask === 'object' && subtask !== null && 'name' in subtask && typeof subtask.name === 'string') {
                await prisma.subtask.create({
                    data: {
                        uuid: uuidv4(),
                        name: subtask.name,
                        isCompleted: subtask.isCompleted || false,
                        taskUuid: taskUUID,
                        userId: session.user.id,
                    },
                });
            }
        }
    }

    // Return updated task with subtasks
    const finalTask = await prisma.task.findUnique({
        where: {
            uuid: taskUUID,
        },
        include: {
            subtasks: true,
            column: true,
        },
    });

    return res.status(200).json(finalTask);
};
