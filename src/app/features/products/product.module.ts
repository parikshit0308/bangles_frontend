import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    AllProductsComponent,
    AddProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    FormsModule
  ]
})
export class ProductModule {}
