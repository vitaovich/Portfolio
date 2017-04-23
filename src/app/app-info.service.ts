import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  isOn: boolean = true;

  setInfoOn() {
    this.isOn = !this.isOn;
  }

}
