import { ConfigService } from './../../services/config/config.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ConfigResolverService implements Resolve<IAppConfig> {

  constructor(
    private configService: ConfigService,
  ) { }

  resolve() {
    return this.configService.getConfig();
  }
}
