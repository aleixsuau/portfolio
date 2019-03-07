import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'portfolio',
    loadChildren: '../features/portfolio/portfolio.module#PortfolioModule'
  },
  {
    path: 'blog',
    loadChildren: '../features/blog/blog.module#BlogModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
