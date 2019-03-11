import { ConfigResolverService } from './resolvers/config/config.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config/config.service';
import { BaseComponent } from './components/base/base.component';
import { SharedModule } from '../shared/shared.module';
import { ContentService } from './services/content/content.service';
import { ContentResolverService } from './resolvers/content/content.resolver';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    ConfigService,
    ConfigResolverService,
    ContentService,
    ContentResolverService,
  ]
})
export class CoreModule { }
