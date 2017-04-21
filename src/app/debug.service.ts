import { Injectable } from '@angular/core';

@Injectable()
export class DebugService {
  isOn: boolean = false;

  setDebugOn() {
    this.isOn = !this.isOn;
  }

}
