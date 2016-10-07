import { Component } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'my-app',
  // template: '<h1>My First Angular App</h1>'
  templateUrl: './views/app.html',
})
export class AppComponent { }