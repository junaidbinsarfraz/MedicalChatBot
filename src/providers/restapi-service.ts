import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Restapi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestapiService {

  data: any;
  apiUrl = 'https://physicianstat.com/WS';

  constructor(public http: Http) {
    console.log('Hello Restapi Provider');
  }

  getUsers() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/users')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {

      var headers = new Headers();
      // headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json; charset=utf-8');
      // headers.append('dataType', 'json' );
      let options = new RequestOptions({ headers: headers });

      this.http.post(this.apiUrl + '/Login', JSON.stringify(data), options)
        .subscribe((res: any) => {
          console.log(res);
          resolve(JSON.parse(res._body));
        }, (err) => {
          reject(err);
        });
    });
  }

  signup(data) {
    return new Promise((resolve, reject) => {

      var headers = new Headers();
      // headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json; charset=utf-8');
      // headers.append('dataType', 'json' );
      let options = new RequestOptions({ headers: headers });

      this.http.post(this.apiUrl + '/Signup', JSON.stringify(data), options)
        .subscribe((res: any) => {
          console.log(res);
          resolve(JSON.parse(res._body));
        }, (err) => {
          reject(err);
        });
    });
  }

  sendText(data) {
    return new Promise((resolve, reject) => {

      var headers = new Headers();
      // headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json; charset=utf-8');
      // headers.append('dataType', 'json' );
      let options = new RequestOptions({ headers: headers });

      this.http.post(this.apiUrl + '/SendTextMessage', JSON.stringify(data), options)
        .subscribe((res: any) => {
          console.log(res);
          resolve(JSON.parse(res._body));
        }, (err) => {
          reject(err);
        });
    });
  }

}
