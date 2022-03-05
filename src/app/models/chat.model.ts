export class Chat {
  user: string;
  message: string;
  date: Date;
  id: number;

  constructor(user: string, message: string) {
    this.user = user;
    this.message = message;
    this.date = new Date();
    this.id = 0;
  }
}
