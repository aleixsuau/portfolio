import { BaseComponent } from './core/components/base/base.component';
import { ConfigResolverService } from './core/resolvers/config/config.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    resolve: {
      config: ConfigResolverService,
    },
    children: [
      {
        path: '',
        loadChildren: './features/features.module#FeaturesModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
