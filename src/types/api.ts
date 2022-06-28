export type TResponse<T> = {
  success: boolean;
} & T;

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string
}

export interface IUserResponse {
  user: {
    email: string;
    name: string;
  }
}