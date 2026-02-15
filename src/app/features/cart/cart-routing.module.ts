import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GetCartComponent } from './get-cart/get-cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';

const routes: Routes = [

  {
    path: '',
    component: GetCartComponent
  },
  {
    path: 'item/:id',
    component: CartItemComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}
