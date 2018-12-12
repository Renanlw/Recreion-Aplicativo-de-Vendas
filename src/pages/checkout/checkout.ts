import {Component, NgZone, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Segment, Loading, Checkbox} from 'ionic-angular';
import {PaymentHttp} from "../../providers/payment-http";
import scriptjs from 'scriptjs';
import {Cart} from "../../providers/cart";
import { MyCartPage } from '../my-cart/my-cart';
import { OrdersPage } from '../orders/orders';
import { EndOrderPage } from '../end-order/end-order';
import { OrderService } from '../../providers/order.service';
import { OrderModel } from '../../model/OrderModel';
import { LoadingController } from 'ionic-angular';



declare let PagSeguroDirectPayment;

/**
 * Generated class for the CheckoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html',
})
export class CheckoutPage {

    @ViewChild(Segment)
    segment: Segment;

    paymentMethod = 'BOLETO';
    paymentMethods: Array<any> = [];

    creditCard = {
        num: '',
        cvv: '',
        monthExp: '',
        yearExp: '',
        brand: '',
        token: ''
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public paymentHttp: PaymentHttp,
                public cart: Cart,
                public zone: NgZone,
                public orderService: OrderService,
                public loadingCtrl: LoadingController
                ) {
    }
     

    


    ionViewDidLoad() {
        scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
            this.paymentHttp.getSession()
                .subscribe(data => {
                    this.initSession(data);
                    this.getPaymentMethods();
                })
        })
    }

    initSession(data) {
        PagSeguroDirectPayment.setSessionId(data.sessionId);
    }

    getPaymentMethods() {
        PagSeguroDirectPayment.getPaymentMethods({
            amount: 100,
            success: (response) => {
                this.zone.run(() => {
                    let paymentMethods = response.paymentMethods;
                    this.paymentMethods = Object.keys(paymentMethods).map((key) => paymentMethods[key]);
                    setTimeout(() => {
                        this.segment._inputUpdated();
                        this.segment.ngAfterContentInit();
                    });
                });
            }
        });
    }

    makePayment() {
        let data = {
            items: this.cart.items,
            hash: PagSeguroDirectPayment.getSenderHash(),
            method: this.paymentMethod,
            total: this.cart.total
        };

        let doPayment = () => {
            this.paymentHttp.doPayment(data).subscribe(() => {
                console.log('deu certo')
            });
        };
        if(this.paymentMethod == 'CREDIT_CARD'){
            this.prepareCreditCard().then(() => {
                (<any>data).token = this.creditCard.token;
                doPayment();
            },(error) => console.log(error));
            return;
        }

        doPayment();
    }

    prepareCreditCard(): Promise<any> {
        return this.getCreditCardBrand().then(() => {
            return this.getCreditCardToken();
        });
    }

    getCreditCardBrand(): Promise<any> {
        return new Promise((resolve,reject) => {
            PagSeguroDirectPayment.getBrand({
                cardBin: this.creditCard.num.substring(0, 6),
                success: (response) => {
                    this.zone.run(() => {
                        this.creditCard.brand = response.brand.name;
                        console.log(response);
                        resolve({brand: response.brand.name});
                    });
                },
                error(error){
                    reject(error)
                }
            });
        });
    }

    getCreditCardToken(): Promise<any> {
        return new Promise((resolve,reject) => {
            PagSeguroDirectPayment.createCardToken({
                cardNumber: this.creditCard.num,
                brand: this.creditCard.brand,
                cvv: this.creditCard.cvv,
                expirationMonth: this.creditCard.monthExp,
                expirationYear: this.creditCard.yearExp,
                success: (response) => {
                    this.zone.run(() => {
                        this.creditCard.token = response.card.token;
                        resolve({token: response.card.token});
                        console.log(response);
                    });
                },
                error(error){
                    reject(error)
                }
            })
        });
        
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
        
        CheckTrue(){
                       
        }

        presentLoading() {
            const loader = this.loadingCtrl.create({
              content: "Processando Pagamento",
              duration: 3000,
              
            });
            
            loader.present();
            
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

      			 					        


