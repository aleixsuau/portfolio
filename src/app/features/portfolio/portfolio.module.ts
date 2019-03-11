import { PortfolioResolverService } from './services/portfolio/portfolio.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './containers/portfolio/portfolio.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    SharedModule,
    PortfolioRoutingModule,
  ],
  providers: [
    PortfolioResolverService,
  ],
  exports: [
    PortfolioComponent,
  ]
})
export class PortfolioModule { }
