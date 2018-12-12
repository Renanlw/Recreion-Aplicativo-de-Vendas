import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ActionSheetController, ViewController } from 'ionic-angular';
import { ProductHttp } from '../../providers/product-http';
import { Observable } from 'rxjs/Observable';
import { Cart } from '../../providers/cart';
import { OrderModel } from '../../model/OrderModel';
import { OrderService } from '../../providers/order.service';
import { OrderItemModel } from '../../model/OrderItemModel';

/**
 * Generated class for the ProductsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-items',
  templateUrl: 'all-items.html',
})
export class AllItemsPage {

  items: Array<OrderItemModel>;
  orderNumber: number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public orderService: OrderService,
              public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              public viewCtrl: ViewController)  {
  }

  ionViewDidLoad() {
    this.orderNumber = this.navParams.get('orderNumber');
    this.carregaListas();
  }

  carregaListas() {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();

    this.orderService.getOrdersById(this.navParams.get('orderId'))
    .take(1)
    .subscribe(v => {
      this.items = v.items;
      loader.dismiss();
    }, (error) => {
      loader.dismiss();
      throw error;
    });
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

}
