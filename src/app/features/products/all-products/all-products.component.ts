import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent {
  products: any[] = [];
  loading = true;

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.get('products').subscribe({
      next: (res: any) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  viewProduct(id: number) {
    this.router.navigate(['/products', id]);
  }
}
