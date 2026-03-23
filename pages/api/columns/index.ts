// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/db';
import { v4 as uuidv4, validate } from 'uuid';
import { NewColumn } from '../../../types';
import { getServerSession, Session } from 'next-auth';
import { options } from '../auth/[...nextauth]';

const isNewColumn = (column: unknown): column is NewColumn => {
    return (
        typeof column === 'object' && column !== null && 'board_uuid' in column && 'name' in column && 'color' in column
    );
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, options);
    if (!session) {
        res.status(401).end('Unauthorized');
        return;
    }

    switch (req.method) {
        case 'POST': {
            await createColumn(req, res, session);
            break;
        }
        case 'GET': {
            await getColumns(res, session);
            break;
        }
        default:
            res.status(405).end('Method not allowed');
    }
}

const getColumns = async (res: NextApiResponse, session: Session) => {
    try {
        const columns = await prisma.column.findMany({
            where: {
                board: {
                    userId: session.user.id,
                },
            },
            include: {
                tasks: true,
            },
        });
        res.status(200).json(columns);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createColumn = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const columnData: unknown = req.body;
    if (!isNewColumn(columnData)) {
        return res.status(400).end('Invalid column data');
    }

    const { board_uuid, name, color } = columnData;

    // Verify board exists and belongs to user
    const board = await prisma.board.findFirst({
        where: {
            uuid: board_uuid,
            userId: session.user.id,
        },
    });

    if (!board) {
        return res.status(404).end('Board not found');
    }

    // Get the highest position in the board
    const lastColumn = await prisma.column.findFirst({
        where: {
            boardUuid: board_uuid,
        },
        orderBy: {
            position: 'desc',
        },
    });

    const newPosition = lastColumn ? lastColumn.position + 1 : 0;

    try {
        const column = await prisma.column.create({
            data: {
                uuid: uuidv4(),
                name,
                color,
                position: newPosition,
                boardUuid: board_uuid,
            },
        });
        res.status(201).json(column);
    } catch (error) {
        res.status(500).json({ error });
    }
};
