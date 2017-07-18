
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slice1', [
      state('inactive', style({
        transform: 'rotate(0)'
      })),
      state('active',   style({
        transform: 'rotate(45deg) translate(3px, 5px)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
    trigger('slice2', [
      state('inactive', style({
        transform: 'rotate(0)'
      })),
      state('active',   style({
        transform: 'rotate(-45deg) translate(0px, -2px)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
  ]
})
export class AppComponent  {
  name = 'Vitaliy\'s site';
  isMenuActive = 'active';
  menuActive: boolean = true;

    public constructor(private titleService: Title ) {
      this.titleService.setTitle('Vitaliy\'s Portfolio');
     }

    toggleMenu() {
      console.log('menu active');
      this.isMenuActive = (this.isMenuActive === 'active' ? 'inactive' : 'active');
      this.menuActive = !this.menuActive;
    }
}
