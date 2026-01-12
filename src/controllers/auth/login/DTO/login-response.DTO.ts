export class LoginResponseDTO {
  access_token: string;
  refresh_token: string;
  user_id: number;
  username: string;
  expires_at: Date;

  constructor(
    access_token: string,
    refresh_token: string,
    user_id: number,
    username: string,
    expires_at: Date,
  ) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.user_id = user_id;
    this.username = username;
    this.expires_at = expires_at;
  }
}
