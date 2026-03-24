// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/db';
import { validate } from 'uuid';
import { getServerSession, Session } from 'next-auth';
import { options } from '../auth/[...nextauth]';

// Column UUID API handler with authentication and validation
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, options);
    if (!session) {
        res.status(401).end('Unauthorized');
        return;
    }

    if (!req.query.uuid || !validate(req.query.uuid.toString())) {
        res.status(400).end('Invalid column UUID');
        return;
    }
    switch (req.method) {
        case 'DELETE': {
            await deleteColumn(req, res, session);
            break;
        }
        case 'GET': {
            await getColumn(req, res, session);
            break;
        }
        case 'PUT': {
            await updateColumn(req, res, session);
            break;
        }
        default:
            res.status(405).end('Method not allowed');
            break;
    }
}

const deleteColumn = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const columnUUID = req.query.uuid?.toString();
    if (!columnUUID) {
        return res.status(400).end('Column uuid is required');
    }

    const result = await prisma.column.deleteMany({
        where: {
            uuid: columnUUID,
            userId: session.user.id,
        },
    });

    if (result.count === 0) return res.status(404).end('Column not found');
    return res.status(200).end('Column deleted successfully');
};

const getColumn = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const columnUUID = req.query.uuid?.toString();
    if (!columnUUID) {
        return res.status(400).end('Column uuid is required');
    }

    const column = await prisma.column.findFirst({
        where: {
            uuid: columnUUID,
            userId: session.user.id,
        },
        include: {
            tasks: {
                orderBy: {
                    position: 'asc',
                },
            },
            board: true,
        },
    });

    if (!column) return res.status(404).end('Column not found');
    return res.status(200).json(column);
};

const updateColumn = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const columnUUID = req.query.uuid?.toString();
    if (!columnUUID) {
        return res.status(400).end('Column uuid is required');
    }

    const { name, color, position } = req.body;

    // Verify column exists and belongs to user
    const existingColumn = await prisma.column.findFirst({
        where: {
            uuid: columnUUID,
            userId: session.user.id,
        },
    });

    if (!existingColumn) {
        return res.status(404).end('Column not found');
    }

    // Update column
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (color !== undefined) updateData.color = color;
    if (position !== undefined) updateData.position = position;

    const updatedColumn = await prisma.column.update({
        where: {
            uuid: columnUUID,
        },
        data: updateData,
        include: {
            tasks: {
                orderBy: {
                    position: 'asc',
                },
            },
            board: true,
        },
    });

    return res.status(200).json(updatedColumn);
};
