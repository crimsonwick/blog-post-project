export interface AppInterface {
  port: number;
  app: Express.Application;
  createServerFunction: () => void;
}

export interface RouterInterface {
  checkRequests: () => void;
}
