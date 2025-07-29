export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  success: boolean;
  data: {
    accessToken: string;
    username: string;
  };
}
