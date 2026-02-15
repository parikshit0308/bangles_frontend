import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';

import { GetCartComponent } from './get-cart/get-cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
  declarations: [
    GetCartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule {}
