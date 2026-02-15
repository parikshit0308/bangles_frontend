import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-google-success-component',
  templateUrl: './google-success-component.component.html',
  styleUrls: ['./google-success-component.component.scss'],
})
export class GoogleSuccessComponentComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      localStorage.setItem('token', token);
      this.router.navigate(['/products']);
    }
  }
}
