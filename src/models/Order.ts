export default class Order {
  id: number = -1;
  userId: number = -1;
  orderDate: Date = new Date(0);
  product: string = '';
  
  constructor(jsonObj: Order) {
    if(jsonObj) {
      this.id = jsonObj.id;
      this.userId = jsonObj.userId;
      this.orderDate = jsonObj.orderDate;
      this.product = jsonObj.product;
    }
  }
}