export class AuthService {
  isAuth = false;
  name !: string;

  signIn(name : string) {
    this.isAuth = true;
    this.name = name;
  }

  signOut() {
    this.isAuth = false;
  }
}
