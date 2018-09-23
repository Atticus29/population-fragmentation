import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private displayLizards: boolean = false;
  setDisplayLizards(shouldLizardsDisplay: boolean){
    this.displayLizards = shouldLizardsDisplay;
  }
}
