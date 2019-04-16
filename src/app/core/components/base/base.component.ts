import { fadeIn } from './../../../shared/animations/animations';
import { MenuService } from './../../services/menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, transition, animate, style, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',
        useAnimation(fadeIn, { params: { time: '0.5s' }})
      ),
      transition(':leave',
        animate('0.5s ease-in', style({opacity: 0})),
      )
    ]),
  ],
})
export class BaseComponent implements OnInit {
  menu$: Observable<IMenu>;
  activeSection$: Observable<IMenuSection>;

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit() {
    this.menu$ = this.menuService.menu$;
    this.activeSection$ = this.menuService.activeSection$;
  }
}
