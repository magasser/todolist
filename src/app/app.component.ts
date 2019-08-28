import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string = 'Test';

  constructor() {
    this.changeName('Manuel');
  }

  changeName(name: string): void {
    this.name = name;
  }
}
