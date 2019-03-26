import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { BlogModule } from './blog/blog.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [HomeComponent, ContactComponent],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule,
    BlogModule,
    PortfolioModule,
  ],
  exports: [
    BlogModule,
    PortfolioModule,
  ]
})
export class FeaturesModule { }
