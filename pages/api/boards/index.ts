// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/db';
import { v4 as uuidv4 } from 'uuid';
import { Session, getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';

// Board type for API requests
type Board = {
    name: string;
    columns?: Column[];
    uuid: string;
    user: string;
};

// Column type for API requests
type Column = {
    name: string;
    color: string;
    position: number;
    uuid: string;
};

// Boards API handler with authentication
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, options);
    if (!session) {
        res.status(401).end('Unauthorized');
        return;
    }

    switch (req.method) {
        case 'POST': {
            await createBoard(req, res, session);
            break;
        }
        case 'GET': {
            await getBoards(res, session);
            break;
        }
        default:
            res.status(405).end('Method not allowed');
    }
}

const validateBoard = (board: Board) => {
    if (!board.name) {
        throw new Error('Board name is required');
    } else if (board.name.trim().length < 1) {
        throw new Error('Board name cannot be empty');
    } else if (board.name.trim().length > 30) {
        throw new Error('Board name cannot be longer than 30 characters');
    }
};
