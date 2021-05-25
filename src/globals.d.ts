export declare global {
  export namespace Express {
    export interface User {
      _id?: string;
      email: string
      username: string
    }
  }
}
