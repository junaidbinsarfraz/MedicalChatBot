import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { RestapiService } from '../../providers/restapi-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  question: string;
  response: string;
  contexts: any;

  constructor(public navCtrl: NavController, public restapiService: RestapiService) {
    // this.getUsers();
    this.response = "";
  }

  sendText() {
    if (!this.question || this.question == "") {
      return;
    }

    var data = { text: this.question, contexts: this.contexts };

    this.restapiService.sendText(data).then((result: any) => {
      console.log(result);
      if(result && result.Response) {
        this.response = "<h3 style=\"border-bottom: 1px solid #dedede;\">" + result.Response + "</h3>" + this.response;
      }
      this.contexts = result.contexts;
      this.question = "";
    }, (err) => {
      console.log(err);
      this.question = "";
      // TODO: Show error
    });
  }
}