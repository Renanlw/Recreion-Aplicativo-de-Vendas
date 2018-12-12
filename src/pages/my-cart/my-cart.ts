import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cart } from '../../providers/cart';
import { OrdersPage } from '../orders/orders';
import { EndOrderPage } from '../end-order/end-order';
import { OrderService } from '../../providers/order.service';
import { OrderModel } from '../../model/OrderModel';

/**
 * Generated class for the MyCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cart:Cart,
              public orderService: OrderService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
  }

  removeItem(index) {
    this.cart.removeItem(index);
  }

  pagar() {

    let order: OrderModel = {
      id: Math.ceil(Math.random() * 100),
      fullPrice: this.cart.total,
      itensQty: this.cart.items.length,
      orderNumber: this.orderService.getRandomTicket(),
      status: 'NP',
      orderLabel: this.cart.items.map(v => v.name + ' / ').toString(),      
      items: this.cart.items.map(v => { return {
          id: Math.ceil(Math.random() * 100),
          productId: v.id,
          qty: 1,
          price: v.price,
          total: v.price * 1,
          productName: v.name
        }
      })
    }

    this.orderService.addOrder(order).take(1).subscribe(v => {
      if ( v.ok ){
        this.navCtrl.setRoot(EndOrderPage, {orderNumber: order.orderNumber});
        this.cart.resetCart();
      }
      else
        console.log('deu erro');
    });
  }

}
