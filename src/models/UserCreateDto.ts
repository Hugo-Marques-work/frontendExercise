export default class UserCreateDto {
  fullName: string = '';
  email: string = '';
  password: string = '';

  constructor(fullName: string, email: string, password: string) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }
}