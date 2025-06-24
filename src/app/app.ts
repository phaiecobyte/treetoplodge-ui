import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule],
  template: `<router-outlet/>`,
})
export class App {
  protected title = 'treetoplodge-ui';
}
