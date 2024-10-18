import axios from 'axios';
import User from './models/User';
import type UserCreateDto from './models/UserCreateDto';
import Order from './models/Order';
import store from './store';

const httpClient = axios.create();
httpClient.defaults.timeout = 30000;

httpClient.defaults.baseURL = import.meta.env.VITE_API_URL + ":" + import.meta.env.VITE_API_PORT;

httpClient.defaults.headers.post['Content-Type'] = 'application/json';

export default class RemoteService {
  //Fetch all users
  static async getAllUsers(): Promise<User[]> {
    return httpClient.get(`/users/`)
      .then(response => {
        return response.data.map((user: User) => new User(user));
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }

  //Create new user
  //Expected body: { fullName: string, email: string, password: string }
  static async createUser(userCreateDto: UserCreateDto): Promise<void> {
    return httpClient.post(`/users/`, {
      fullName: userCreateDto.fullName,
      email: userCreateDto.email,
      password: userCreateDto.password
    })
      .then(response => {
        store.dispatch('setAlertContent', {status: 0, content: 'User created successfully'});
        //no response
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }

  //Get user by id
  static async getUser(id: number): Promise<User> {
    return httpClient.get(`/users/${id}`)
      .then(response => {
        return new User(response.data);
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }

  //Delete user
  static async deleteUser(id: number): Promise<void> {
    return httpClient.delete(`/users/${id}`)
      .then(response => {
        store.dispatch('setAlertContent', {status: 0, content: 'User deleted successfully'});
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }

  //Update user
  //Expected body: { fullName: string, email: string }
  static async updateUser(id: number, fullName: string, email: string): Promise<void> {
    return httpClient.put(`/user/${id}/edit`, {
      fullName: fullName,
      email: email,
    })
      .then(response => {
        store.dispatch('setAlertContent', {status: 0, content: 'User updated successfully'});
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }

  //Get orders by user id
  static async getOrders(id: number): Promise<Order[]> {
    return httpClient.get(`/orders/${id}`)
      .then(response => {
        return response.data.map((order: {id: number,user_id: number, order_date: Date, product: string}) => 
          new Order({id: order.id, userId: order.user_id, orderDate: order.order_date, product: order.product})
      );
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }

  //Create order
  //Original Expected body: { userId: string, orderDate: date, product: string }
  //Bug discovered, true expected body { user: string, orderDate: date, product: string }
  static async createOrder(order: Order): Promise<void> {
    return httpClient.post(`/orders/`, {
      user: order.userId.toString(),
      orderDate: order.orderDate,
      product: order.product
    })
      .then(response => {
        store.dispatch('setAlertContent', {status: 0, content: 'Order created successfully'});
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }

  //Delete order
  static async deleteOrder(id: number): Promise<void> {
    return httpClient.delete(`/orders/${id}`)
      .then(response => {
        store.dispatch('setAlertContent', {status: 0, content: 'User deleted successfully'});
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }

  //Get order by id
  static async getOrder(id: number): Promise<Order> {
    return httpClient.get(`/order/${id}`)
      .then(response => {
        let order: {id: number,user_id: number, order_date: Date, product: string} = response.data;

        return new Order({id: order.id, userId: order.user_id,
          orderDate: order.order_date, product: order.product
        });
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }

  //Update order
  //Expected body: { orderDate: date, product: string }
  static async updateOrder(id: number, orderDate: Date, product: string): Promise<void> {
    return httpClient.put(`/order/${id}/edit/`, {
      orderDate: orderDate,
      product: product,
    })
      .then(response => {
        store.dispatch('setAlertContent', {status: 0, content: 'Order updated successfully'});
      })
      .catch(async error => {
        store.dispatch('setAlertContent', {status: 1, content: error.message});
        throw error;
      }); 
  }
}