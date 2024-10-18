export default class User {
  id: number = -1;
  fullName: string = '';
  email: string = '';

  constructor(jsonObj: User) {
    if(jsonObj) {
      this.id = jsonObj.id;
      this.fullName = jsonObj.fullName;
      this.email = jsonObj.email;
    }
  }
}