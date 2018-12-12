import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { OrderModel } from '../model/OrderModel';


@Injectable()
export class OrderService {

    constructor(public http: Http){
        
    }

    getRandomTicket() {
        return Math.floor(Math.random()*(999-100+1)+100);
    }

    getOrdersNotPrepared() {
        return this.http.get('http://localhost:3000/orders', {search: {status: 'NP'}})
            .map(response => response.json())
    }

    getOrdersInPrepare() {
        return this.http.get('http://localhost:3000/orders', {search: {status: 'IP'}})
            .map(response => response.json())
    }

    getOrdersReady() {
        return this.http.get('http://localhost:3000/orders', {search: {status: 'RD'}})
            .map(response => response.json())
    }

    getOrdersById(id: number) {
        return this.http.get(`http://localhost:3000/orders/${id}`)
            .map(response => response.json())
    }

    addOrder(order: OrderModel) {
        return this.http.post('http://localhost:3000/orders', order);
    }

    mergeOrder(order: OrderModel) {
        return this.http.patch(`http://localhost:3000/orders/${order.id}`, order);
    }
}