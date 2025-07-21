export interface UserPayLoad {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

declare global {
    namespace Express{
        interface Request {
            user: UserPayLoad
        }
    }
}