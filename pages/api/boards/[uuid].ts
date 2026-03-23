// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/db';
import { validate } from 'uuid';
import { Column } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import { Session, getServerSession } from 'next-auth';
import { randomHexColor } from '../../../utils/utils';
import { options } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, options);
    if (!session) {
        res.status(401).end('Unauthorized');
        return;
    }
    if (!req.query.uuid || !validate(req.query.uuid.toString())) {
        res.status(400).end('Invalid board UUID');
        return;
    }
    switch (req.method) {
        case 'DELETE': {
            await deleteBoard(req, res, session);
            break;
        }
        case 'GET': {
            await getBoard(req, res, session);
            break;
        }
        case 'PUT': {
            await updateBoard(req, res, session);
            break;
        }
        default:
            res.status(405).end('Method not allowed');
    }
}

const deleteBoard = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const boardUUID = req.query.uuid?.toString();
    if (!boardUUID) {
        return res.status(400).end('Board uuid is required');
    }
    const result = await prisma.board.deleteMany({
        where: {
            uuid: boardUUID,
            userId: session.user.id,
        },
    });
    if (result.count === 0) return res.status(404).end('Board not found');
    return res.status(200).end('Board deleted successfully');
};

const getBoard = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const boardUUID = req.query.uuid?.toString();
    if (!boardUUID) {
        return res.status(400).end('Board uuid is required');
    }
    const board = await prisma.board.findFirst({
        where: {
            uuid: boardUUID,
            userId: session.user.id,
        },
        include: {
            columns: {
                orderBy: {
                    position: 'asc',
                },
                include: {
                    tasks: {
                        orderBy: {
                            position: 'asc',
                        },
                        include: {
                            subtasks: true,
                        },
                    },
                },
            },
        },
    });
    if (!board) return res.status(404).end('Board not found');
    return res.status(200).json(board);
};

const updateBoard = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const boardUUID = req.query.uuid?.toString();
    if (!boardUUID) {
        return res.status(400).end('Board uuid is required');
    }
    const { name, columns } = req.body;
    if (!name) {
        return res.status(400).end('Board name is required');
    }

    // Update board name
    const board = await prisma.board.updateMany({
        where: {
            uuid: boardUUID,
            userId: session.user.id,
        },
        data: {
            name,
        },
    });

    if (board.count === 0) return res.status(404).end('Board not found');

    // Update columns if provided
    if (columns && Array.isArray(columns)) {
        // Delete existing columns
        await prisma.column.deleteMany({
            where: {
                boardUuid: boardUUID,
            },
        });

        // Create new columns
        for (const [index, column] of columns.entries()) {
            if (column.uuid) {
                // Update existing column
                await prisma.column.update({
                    where: {
                        uuid: column.uuid,
                    },
                    data: {
                        name: column.name,
                        position: index,
                    },
                });
            } else {
                // Create new column
                await prisma.column.create({
                    data: {
                        name: column.name,
                        position: index,
                        color: column.color || randomHexColor(),
                        boardUuid: boardUUID,
                    },
                });
            }
        }
    }

    return res.status(200).end('Board updated successfully');
};
