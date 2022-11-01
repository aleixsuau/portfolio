import { BaseComponent } from './core/components/base/base.component';
import { ConfigResolverService } from './core/resolvers/config/config.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentResolverService } from './core/resolvers/content/content.resolver';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    resolve: {
      config: ConfigResolverService,
      content: ContentResolverService,
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule), 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
