import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './containers/blog/blog.component';
import { MediumWidgetModule } from 'ngx-medium-widget';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule,
    MediumWidgetModule,
  ]
})
export class BlogModule { }
