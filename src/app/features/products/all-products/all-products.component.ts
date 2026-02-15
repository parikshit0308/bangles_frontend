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
    // this.api.get('products').subscribe({
    //   next: (res: any) => {
    //     this.products = res;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.loading = false;
    //   },
    // });

    this.products = [
      {
        id: 101,
        name: 'Royal Heritage Gold Bangle',
        description:
          'Premium handcrafted 22K gold bangle with traditional Rajasthani design.',
        price: 5499.99,
        weight: '22g',
        color: 'Gold',
        image_url: 'https://via.placeholder.com/400x400.png?text=Gold+Bangle',
        sizes: [
          { size: '2.4', stock: 5 },
          { size: '2.6', stock: 8 },
          { size: '2.8', stock: 3 },
        ],
      },
      {
        id: 102,
        name: 'Elegant Silver Bracelet',
        description: 'Minimalist silver bracelet crafted for modern elegance.',
        price: 2499.0,
        weight: '18g',
        color: 'Silver',
        image_url:
          'https://via.placeholder.com/400x400.png?text=Silver+Bracelet',
        sizes: [
          { size: '2.2', stock: 10 },
          { size: '2.4', stock: 6 },
          { size: '2.6', stock: 4 },
        ],
      },
      {
        id: 103,
        name: 'Classic Rose Gold Kada',
        description: 'Stylish rose gold kada with smooth matte finish.',
        price: 7999.5,
        weight: '30g',
        color: 'Rose Gold',
        image_url:
          'https://via.placeholder.com/400x400.png?text=Rose+Gold+Kada',
        sizes: [
          { size: '2.4', stock: 2 },
          { size: '2.6', stock: 5 },
          { size: '2.8', stock: 7 },
        ],
      },
    ];
  }

  viewProduct(id: number) {
    this.router.navigate(['/products', id]);
  }
}
