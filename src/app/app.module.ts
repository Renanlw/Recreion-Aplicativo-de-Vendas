import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductsListPage } from '../pages/products-list/products-list';
import { ProductHttp } from '../providers/product-http';
import {HttpModule} from "@angular/http";
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { Cart } from '../providers/cart';
import {MyCartPage} from "../pages/my-cart/my-cart";
import { ButtonCartComponent } from '../components/button-cart/button-cart';
import { CheckoutPage } from '../pages/checkout/checkout';
import {PaymentHttp} from '../providers/payment-http';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import { OrdersPageModule } from '../pages/orders/orders.module';
import { OrderHttp } from '../providers/order-http';
import { OrdersPage } from '../pages/orders/orders';
import { EndOrderPage } from '../pages/end-order/end-order';
import { OrderService } from '../providers/order.service';
import { AllItemsPage } from '../pages/all-items/all-items';
import { LoadingProvider } from '../providers/loading/loading';
import { HttpClient } from '@angular/common/http';

export const firebaseConfig = {
  apiKey: "AIzaSyD5xzhZcKiG156kkX5kATSFX51r5bDzE0Y",
  authDomain: "tcc-recreion.firebaseapp.com",
  databaseURL: "https://tcc-recreion.firebaseio.com",
  projectId: "tcc-recreion",
  storageBucket: "tcc-recreion.appspot.com",
  messagingSenderId: "668088387411"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductsListPage,
    ProductDetailPage,
    MyCartPage,
    ButtonCartComponent,
    CheckoutPage,
    OrdersPage,
    EndOrderPage,
    AllItemsPage
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp, {},  {
      links: [
        {component: ProductsListPage, segment: 'products', name: 'Products'},
        {component: ProductDetailPage, segment: 'products/:product/detail', name: 'ProductDetail'},
        {component: MyCartPage, segment: 'my-cart', name: 'MyCart'},
        {component: CheckoutPage, segment: 'checkout', name: 'Checkout'},
        
      ]
    }),
    HttpModule
    
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductsListPage,
    ProductDetailPage,
    MyCartPage,
    CheckoutPage,
    OrdersPage,
    EndOrderPage,
    AllItemsPage
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductHttp,
    ProductsListPage,
    Cart,
    HttpClient,
    PaymentHttp,
    AngularFireAuth,
    OrderHttp,
    OrderService,
    LoadingProvider,
    LoadingProvider
   
  ]
})
export class AppModule {}
