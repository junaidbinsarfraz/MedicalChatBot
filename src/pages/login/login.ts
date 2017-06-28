import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

import { HomePage } from '../home/home';

import { RestapiService } from '../../providers/restapi-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  error: string = '';
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
    this.error = '';

    if (this.showLogin) {
      var data = { username: this.username, password: this.password };

      this.restapiService.login(data).then((result: any) => {
        console.log(result);
        // TODO: Check status
        if(result.status == 200) {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.error = result.message;
        }
      }, (err) => {
        console.log(err);
        this.error = 'Unable to login';
      });
    }
    this.showLogin = true;
  }

  doRegister() {
    this.error = '';

    if(!this.showLogin) {
      // Do Register
      var data = {
        Username: this.username,
        Password: this.password,
        Email: this.email,
        Name: this.name,
        Age: 0
      }

      this.restapiService.signup(data).then((result: any) => {
        console.log(result);
        if(result.status == 200) {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.error = result.message;
        }
      }, (err) => {
        console.log(err);
        this.error = 'Unable to register';
      });
    }
    this.showLogin = false;
  }
}