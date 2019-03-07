import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './containers/portfolio/portfolio.component';
import { PortfolioResolverService } from './services/portfolio/portfolio.resolver';

const routes: Routes = [{
  path: '',
  component: PortfolioComponent,
  resolve: {
    works: PortfolioResolverService,
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
