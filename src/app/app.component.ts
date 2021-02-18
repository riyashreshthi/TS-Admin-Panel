import { Component} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    const key = localStorage.getItem('Authorization');
    if (key) {
      this.router.navigate(['/dashboard'])
    } else  {
      this.router.navigate(['/login']);
    }
  }
}
