declare module "evejs" {
    export = eve;
}

declare var eve: {
    Agent: {
        new (id: string): any;
    },
    system: {
        transports: {
            getAll(): any;
        }
    }
};
