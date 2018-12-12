import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ToastController, LoadingController, ActionSheetController, ModalController, AlertController, ViewController } from 'ionic-angular';
import { ProductHttp } from '../../providers/product-http';
import { Observable } from 'rxjs/Observable';
import { Cart } from '../../providers/cart';
import { OrderModel } from '../../model/OrderModel';
import { OrderService } from '../../providers/order.service';
import { AllItemsPage } from '../all-items/all-items';

/**
 * Generated class for the ProductsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  OrdersNotPrepared: Array<OrderModel>;
  OrdersInPrepare: Array<OrderModel>;
  OrdersReady: Array<OrderModel>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public orderService: OrderService,
              public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController, 
              public platform: Platform)  {
  }

  ionViewDidLoad() {
    this.carregaListas();
  }

  carregaListas() {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();

    let rq1 = this.orderService.getOrdersNotPrepared();
    let rq2 = this.orderService.getOrdersInPrepare();
    let rq3 = this.orderService.getOrdersReady();

    Observable.forkJoin([rq1, rq2, rq3]).subscribe( v => {
      this.OrdersNotPrepared = v[0];
      this.OrdersInPrepare = v[1];
      this.OrdersReady = v[2];
    }, (error) => {loader.dismiss();throw error;}, () => {loader.dismiss();});
  }

  alterarParaEmPreparo(order: OrderModel) {
    this.orderService.mergeOrder({...order, status: 'IP'}).take(1).subscribe(v => this.carregaListas());
  }

  alterarParaPronto(order: OrderModel) {
    this.orderService.mergeOrder({...order, status: 'RD'}).take(1).subscribe(v => this.carregaListas());
  }

  alterarParaEntregue(order: OrderModel) {
    this.orderService.mergeOrder({...order, status: 'DL'}).take(1).subscribe(v => this.carregaListas());
  }

  excluirLixeira(order: OrderModel){
    this.orderService.mergeOrder({...order, status: 'EX'}).take(1).subscribe(v => this.carregaListas());
  }

  itemClick(order: OrderModel) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Ações - Pedido ' + order.orderNumber,
      buttons: [
        {
          text: 'Enviar para proxima etapa',
          icon: !this.platform.is('ios') ? 'forward' : null,
          handler: () => {
            if ( order.status == 'NP')
              this.alterarParaEmPreparo(order);
            else if ( order.status == 'IP')
              this.alterarParaPronto(order);
            else if ( order.status == 'RD')
              this.alterarParaEntregue(order);
            else if ( order.status == 'EX')
             this.excluirLixeira(order);
          }
        },{
          text: 'Ver itens do Pedido',
          icon: !this.platform.is('ios') ? 'cart' : null,
          handler: () => {
            let modal = this.modalCtrl.create(AllItemsPage, {orderId: order.id, orderNumber: order.orderNumber});
            modal.present();            
          }
        },{
            text: 'Excluir Pedido',
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'trash' : null,
            
            handler: () => {
              this.excluirLixeira(order),
              
              console.log('Deletado');
              
             
               }                     
    }
     ]
    });
    actionSheet.present();
  }
}
