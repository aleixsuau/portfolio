import { MenuService } from './../../services/menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
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
