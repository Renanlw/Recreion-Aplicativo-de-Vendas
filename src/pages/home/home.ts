import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, ToastController , LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {TabsPage} from '../tabs/tabs';
import { ProductsListPage } from '../products-list/products-list';
import { OrdersPage } from '../orders/orders';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;
  //public nome: any;
         
  //@ViewChild ('nome') primeiro;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  @ViewChild('nome') name;

  navRef: Nav;
  rootPage: any = TabsPage;

constructor(  public navCtrl: NavController,
              public toastCtrl: ToastController,
              public firebaseauth: AngularFireAuth,
              public loadingCtrl: LoadingController) {
      firebaseauth.user.subscribe((data => {
        this.user = data;
      }));     
  }
public LoginComEmail(): void {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value , this.password.value)
      .then(() => {        
        this.exibirToast('Login efetuado com sucesso');
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }
public cadastrarUsuario(): void {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value , this.password.value)
    .then(() => {
      this.exibirToast('Usuário criado com sucesso');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }
public Sair(): void {
    this.firebaseauth.auth.signOut()
    .then(() => {
      this.exibirToast('Você saiu');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }
private exibirToast(mensagem: string): void {
    let toast = this.toastCtrl.create({duration: 3000, 
                                      position: 'botton'});
    toast.setMessage(mensagem);
    toast.present();
  }

  public Acessar(): void{
  this.navCtrl.push(ProductsListPage);
  }

  abrirTodosPedidos() {
    this.navCtrl.push(OrdersPage);
  }
  
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Link para resetar a senha enviado para' + this.email.value
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }   
}
