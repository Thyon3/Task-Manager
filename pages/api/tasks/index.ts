// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/db';
import { v4 as uuidv4, validate } from 'uuid';
import { NewTask } from '../../../types';
import { getServerSession, Session } from 'next-auth';
import { options } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, options);
    if (!session) {
        res.status(401).end('Unauthorized');
        return;
    }

    switch (req.method) {
        case 'POST': {
            await createTask(req, res, session);
            break;
        }
        case 'GET': {
            await getTasks(res, session);
            break;
        }
        default:
            res.status(405).end('Method not allowed');
            break;
    }
}

const isNewTask = (data: unknown): data is NewTask => {
    return (
        typeof data === 'object' &&
        data !== null &&
        'column_uuid' in data &&
        typeof data.column_uuid === 'string' &&
        'name' in data &&
        typeof data.name === 'string' &&
        (!('description' in data) || typeof data.description === 'string') &&
        (!('subtasks' in data) || data.subtasks instanceof Array)
    );
};

const getTasks = async (res: NextApiResponse, session: Session) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                subtasks: true,
            },
        });
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).end('Internal server error');
    }
};

const createTask = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    try {
        const data = req.body;
        if (!isNewTask(data)) {
            return res.status(400).end('Invalid task data');
        }

        const { column_uuid, name, description, subtasks } = data;

        // Verify column exists and belongs to user
        const column = await prisma.column.findFirst({
            where: {
                uuid: column_uuid,
                board: {
                    userId: session.user.id,
                },
            },
        });

        if (!column) {
            return res.status(404).end('Column not found');
        }

        // Get the highest position in the column
        const lastTask = await prisma.task.findFirst({
            where: {
                columnUuid: column_uuid,
            },
            orderBy: {
                position: 'desc',
            },
        });

        const newPosition = lastTask ? lastTask.position + 1 : 0;

        // Create task
        const task = await prisma.task.create({
            data: {
                uuid: uuidv4(),
                name,
                description: description || '',
                position: newPosition,
                columnUuid: column_uuid,
                userId: session.user.id,
            },
        });

        // Create subtasks if provided
        if (subtasks && Array.isArray(subtasks)) {
            for (const subtask of subtasks) {
                if (typeof subtask === 'object' && subtask !== null && 'name' in subtask && typeof subtask.name === 'string') {
                    await prisma.subtask.create({
                        data: {
                            uuid: uuidv4(),
                            name: subtask.name,
                            isCompleted: false,
                            taskUuid: task.uuid,
                        },
                    });
                }
            }
        }

        // Return the created task with subtasks
        const createdTask = await prisma.task.findUnique({
            where: {
                uuid: task.uuid,
            },
            include: {
                subtasks: true,
            },
        });

        return res.status(201).json(createdTask);
    } catch (error) {
        return res.status(500).end('Internal server error');
    }
};
