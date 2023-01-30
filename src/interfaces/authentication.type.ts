export type Icreate = {
  email: string;
  password: string;
  employeeId: string;
};
export type ILogin = {
  email: string;
  password: string;
};

export enum IloginErrorResponse {
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
}
