import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { SendRequestPage } from './send-request.page';

const routes: Routes = [
  {
    path: '',
    component: SendRequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SendRequestPage]
})
export class SendRequestPageModule {}
