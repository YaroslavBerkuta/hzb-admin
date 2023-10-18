export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponce {
  accessToken: string;
  refreshToken: string;
}
