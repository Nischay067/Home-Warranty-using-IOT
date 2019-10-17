import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SendRequestPage} from '../send-request/send-request.page'

import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public nav:NavController) {}

  nextpage(aType: string){
    this.nav.navigateRoot('send-request/' + aType);
  }

}
