import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

import { HomePage } from '../home/home';

import { RestapiService } from '../../providers/restapi-service';

import ToastUtil from '../../utils/toast.util';
import LoaderUtil from '../../utils/loader.util';

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

      if (this.username === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: 'All fields are rquired',
          buttons: ['OK']
        });
        alert.present();
        return;
      }

      LoaderUtil.showLoader("Please wait ...");

      var data = { username: this.username, password: this.password };

      this.restapiService.login(data).then((result: any) => {
        console.log(result);
        
        LoaderUtil.dismissLoader();

        if(result.status == 200) {
          this.navCtrl.setRoot(HomePage);
          ToastUtil.showToast("Successfully Loggedin");
        } else {
          this.error = result.message;
        }
      }, (err) => {
        console.log(err);
        LoaderUtil.dismissLoader();
        this.error = 'Unable to process request at the moment.';
      });
    }
    this.showLogin = true;
  }

  doRegister() {
    this.error = '';

    if(!this.showLogin) {

      if (this.username === '' || this.password === '' || this.email === '' || this.name === '') {
        let alert = this.alertCtrl.create({
          title: 'Register Error',
          subTitle: 'All fields are rquired',
          buttons: ['OK']
        });
        alert.present();
        return;
      }

      LoaderUtil.showLoader("Please wait ...");
      // Do Register
      var data = {
        Username: this.username,
        Password: this.password,
        Email: this.email,
        Name: this.name,
        Age: 0
      }

      this.restapiService.signup(data).then((result: any) => {
        LoaderUtil.dismissLoader();
        console.log(result);
        if(result.status == 200) {
          this.navCtrl.setRoot(HomePage);
          ToastUtil.showToast("Successfully Registered");
        } else {
          this.error = result.message;
        }
      }, (err) => {
        LoaderUtil.dismissLoader();
        console.log(err);
        this.error = 'Unable to process request at the moment.';
      });
    }
    this.showLogin = false;
  }
}