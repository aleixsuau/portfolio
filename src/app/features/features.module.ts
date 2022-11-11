import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [HomeComponent, ContactComponent],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule,
  ],
  exports: [
  ]
})
export class FeaturesModule { }
