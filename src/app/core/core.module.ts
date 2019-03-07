import { ConfigResolverService } from './resolvers/config/config.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config/config.service';
import { BaseComponent } from './components/base/base.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    ConfigService,
    ConfigResolverService,
  ]
})
export class CoreModule { }
