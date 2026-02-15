import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: any;
  loading = true;
  selectedSize!: string;
  quantity: number = 1;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadProduct(Number(id));
    }
  }

  loadProduct(id: number) {
    this.api.get(`products/${id}`).subscribe({
      next: (res: any) => {
        this.product = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (!this.selectedSize) {
      this.errorMessage = 'Please select size';
      return;
    }

    const payload = {
      product_id: this.product.id,
      size: this.selectedSize,
      quantity: this.quantity,
    };

    this.api.post('cart/add', payload).subscribe({
      next: () => {
        alert('Added to cart 🛒');
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error adding to cart';
      },
    });
  }
}
