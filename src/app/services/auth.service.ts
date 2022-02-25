export class AuthService {
  isAuth = false;
  name : String | undefined;

  signIn(name : String) {
    this.isAuth = true;
    this.name = name;
  }

  signOut() {
    this.isAuth = false;
  }
}
