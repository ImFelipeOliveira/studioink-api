export class LoginResponseDTO {
  constructor(
    public readonly access_token: string,
    public readonly refresh_token: string,
    public readonly user_id: number,
    public readonly username: string,
    public readonly expires_at: Date,
  ) {}
}
