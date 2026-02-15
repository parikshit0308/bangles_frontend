import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  cartItem: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit() {
    const cartItemId = this.route.snapshot.paramMap.get('id');

    if (cartItemId) {
      this.loadCartItem(Number(cartItemId));
    }
  }

  loadCartItem(id: number) {
    this.api.get('cart').subscribe((res: any) => {
      const found = res.items.find((i: any) => i.id === id);

      this.cartItem = found;
      this.loading = false;
    });
  }
}
