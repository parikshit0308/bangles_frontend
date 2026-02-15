import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  isEditMode = false;
  productId!: number;
  selectedFile!: File;
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      weight: [''],
      color: [''],
      sizes: this.fb.array([]),
    });
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.productId = Number(id);
      this.loadProduct();
    }
  }

  loadProduct() {
    this.api.get(`products/${this.productId}`).subscribe((res: any) => {
      this.productForm.patchValue({
        name: res.name,
        description: res.description,
        price: res.price,
        weight: res.weight,
        color: res.color,
      });

      // Clear existing sizes
      this.sizes.clear();

      res.sizes.forEach((s: any) => {
        this.sizes.push(
          this.fb.group({
            size: [s.size, Validators.required],
            stock: [s.stock, Validators.required],
          }),
        );
      });
    });
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  addSize() {
    const sizeGroup = this.fb.group({
      size: ['', Validators.required],
      stock: ['', Validators.required],
    });

    this.sizes.push(sizeGroup);
  }

  removeSize(index: number) {
    this.sizes.removeAt(index);
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const formData = new FormData();

    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('weight', this.productForm.value.weight);
    formData.append('color', this.productForm.value.color);

    // IMPORTANT: backend expects JSON string
    formData.append('sizes', JSON.stringify(this.productForm.value.sizes));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode) {
      this.api.put(`products/${this.productId}`, formData).subscribe(() => {
        alert('Product updated successfully ✏️');
        this.router.navigate(['/products']);
      });
    } else {
      this.api.post('products/add', formData).subscribe(() => {
        alert('Product added successfully 🎉');
        this.router.navigate(['/products']);
      });
    }
  }

  deleteProduct() {
    if (!confirm('Are you sure?')) return;

    this.api.delete(`products/${this.productId}`).subscribe(() => {
      alert('Product deleted 🗑️');
      this.router.navigate(['/products']);
    });
  }
}
