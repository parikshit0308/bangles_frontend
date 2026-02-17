import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';

import { GetCartComponent } from './get-cart/get-cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    GetCartComponent,
    CartItemComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule {}
