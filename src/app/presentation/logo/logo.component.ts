import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {
  @Input("scale")scale=1

  getFontSize():string
  {
    return 2*this.scale+"rem";
  }

  getHeight():string
  {
    return 4*this.scale+"rem";
  }
}
