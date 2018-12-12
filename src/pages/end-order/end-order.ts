import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductHttp } from '../../providers/product-http';
import { Observable } from 'rxjs/Observable';
import { Cart } from '../../providers/cart';
import { OrderService } from '../../providers/order.service';

/**
 * Generated class for the ProductsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-end-order',
  templateUrl: 'end-order.html',
})
export class EndOrderPage {

  ticketNumber: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public orderService: OrderService)  {
  }

  ionViewDidLoad() {
    this.ticketNumber = this.navParams.get('orderNumber');
  }

}
