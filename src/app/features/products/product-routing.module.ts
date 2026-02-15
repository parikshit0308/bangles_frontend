import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllProductsComponent } from './all-products/all-products.component';

const routes: Routes = [

  {
    path: '',
    component: AllProductsComponent
  },
  {
    path: 'add',
    component: AddProductComponent
  },
  {
    path: ':id',
    component: ProductDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}