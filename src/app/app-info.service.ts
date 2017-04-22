import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  isOn: boolean = false;

  setInfoOn() {
    this.isOn = !this.isOn;
  }

}
