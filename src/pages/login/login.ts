import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

import { RestapiService } from '../../providers/restapi-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  showLogin: boolean = true;
  email: string = '';
  password: string = '';
  name: string = '';
  forgetPasswordUrl = '';
  confirmPassword: string = '';
  contactNumber: string = '';
  username: string = '';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http, public restapiService: RestapiService) {
  }

  ionViewDidLoad() {
    
  }

  /*
  for both of these, if the right form is showing, process the form,
  otherwise show it
  */
  doLogin() {
    var link = 'https://physicianstat.com/WS/Login';
    var data = JSON.stringify({ username: this.username, password: this.password });

    // this.http.post(link, data)
    //   .subscribe(data => {
    //     console.log(data);
    //   }, error => {
    //     console.log("Oooops!");
    // });

    this.restapiService.login({ username: this.username, password: this.password }).then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });

    this.showLogin = true;
  }

  doRegister() {
    this.showLogin = false;
  }

}