export interface TokenPayload {
  userId: number;
}

export interface ActiveToken {
  userId: number;
  token: string;
}
