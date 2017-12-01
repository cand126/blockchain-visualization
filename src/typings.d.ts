/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

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

