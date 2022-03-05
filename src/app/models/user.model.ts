export class User {
  constructor(
    public name: string,
    public email: string,
    public favoriteGames: any[],
    public creationDate: Date = new Date()
  ) {}
}
