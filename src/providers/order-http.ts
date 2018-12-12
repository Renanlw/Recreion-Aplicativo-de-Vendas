import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the ProductHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderHttp {

    constructor(public http: Http) {
        console.log('Hello ProductHttpProvider Provider');
    }

    query(): Observable<Array<any>> {
        return this.http.get('http://localhost:3000/orders')
            .map(response => response.json());
    }

    get(id: number): Observable<Object> {
        return this.http.get(`http://localhost:3000/orders/${id}`)
            .map(response => response.json());
    }

}