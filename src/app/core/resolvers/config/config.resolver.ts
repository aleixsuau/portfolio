import { MenuService } from './../../services/menu/menu.service';
import { ConfigService } from './../../services/config/config.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigResolverService implements Resolve<IAppConfig> {

  constructor(
    private configService: ConfigService,
    private menuService: MenuService,
  ) { }

  resolve() {
    return this.configService
                  .getConfig()
                  .pipe(
                    map(appConfig => {
                      this.menuService.loadMenu(appConfig.menu);

                      return appConfig;
                    })
                  );
  }
}
