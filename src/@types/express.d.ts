declare namespace Express {
    // override da tipagem
    export interface Request {
        user: {
            id: string;
        };
    }
}
