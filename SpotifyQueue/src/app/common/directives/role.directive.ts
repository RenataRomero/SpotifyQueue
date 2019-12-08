import { Directive, Input, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements AfterViewChecked {

  constructor() { }

  @Input() 
  role: string;

  ngAfterViewChecked() {
    
  }

}
