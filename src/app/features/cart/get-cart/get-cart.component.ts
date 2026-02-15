import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-get-cart',
  templateUrl: './get-cart.component.html',
  styleUrls: ['./get-cart.component.scss']
})
export class GetCartComponent {

    cart: any;
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.api.get('cart')
      .subscribe({
        next: (res: any) => {
          this.cart = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  removeItem(id: number) {
    this.api.delete(`cart/${id}`)
      .subscribe(() => {
        this.loadCart();
      });
  }

  updateQuantity(id: number, quantity: number) {
    this.api.put(`cart/${id}`, { quantity })
      .subscribe(() => {
        this.loadCart();
      });
  }

}
