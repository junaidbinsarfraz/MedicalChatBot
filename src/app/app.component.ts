import { Component } from '@angular/core';
import { Platform, LoadingController, ToastController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';

import LoaderUtil from '../utils/loader.util';
import ToastUtil from '../utils/toast.util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // Initialize util classes
      LoaderUtil.init(this.loadingCtrl);
      ToastUtil.init(this.toastCtrl);

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
