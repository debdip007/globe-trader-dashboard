import { Component } from '@angular/core';
import { Product } from '../../../core/models/product-response.model';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ButtonDirective,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  FormSelectDirective,
  GutterDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowDirective,
  CardBodyComponent,
  CardComponent,
  RowComponent
} from '@coreui/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilHelper } from '../../../helpers/util.helper';
import { CommonService } from '../../../core/services/common.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../../../src/environments/environment';
import { NotificationService } from '../../../shared/notification/notification.service';

@Component({
  selector: 'app-product-details',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    RowDirective,
    GutterDirective,
    ColComponent,
    FormLabelDirective,
    FormControlDirective,
    FormSelectDirective,
    ButtonDirective,
    CommonModule,
    CardBodyComponent,
    CardComponent,
    RowComponent,
    NgSelectModule,
    MatSlideToggleModule,
    RouterLink,
    RouterModule
],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  loading = true;
  customStylesValidated = false;
  isToggled = false;

  product: Product = {} as Product;
  productForm: FormGroup;
  mainImage = ""; // For displaying the selected image;
  additional_image: any[] = [];

  countryOptions : any; 
  categoryOptions : any; 
  productUnitOptions : any; 
  productCapacityOptions : any;
  userTypeOptions : any;
  subCategoryOptions: any;
  // status: any;
  productName = "";
  productSku = "";
  imageBaseUrl = "";
  showImageSection = false;
  finalImages: any[] = [];
  seller_details: any = {};

  statusOptions = [
    { id: '', value: '', label: 'Choose Status' },
    { id: '0', value: '0', label: 'Pending' },
    { id: '1', value: '1', label: 'Active' },
    { id: '2', value: '2', label: 'On Hold' },
    { id: '3', value: '3', label: 'Rejected' }
  ];

  constructor(
      private apiService: ApiService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private commonService: CommonService,
      private notify: NotificationService        
  ) {
    this.countryOptions = UtilHelper.countryOptions();
    this.productUnitOptions = UtilHelper.productUnitOptions();   
    this.productCapacityOptions = UtilHelper.productCapacityUnitOptions();   
     
    // this.status = UtilHelper.productUnitOptions();

    console.log('Category Options:', this.categoryOptions);
    
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      sub_category: ['', Validators.required],
      product_name: ['', Validators.required],
      sku: ['', Validators.required],
      product_unit: ['', [Validators.required]],
      product_capacity: ['', Validators.required],
      product_capacity_unit: ['', Validators.required],
      minimum_order_qty: ['', Validators.required],
      country: ['', Validators.required],
      product_description: ['', [Validators.required]],
      status: ['']
    });

    this.productForm.get('category')?.valueChanges.subscribe(category_id => {
      
      this.commonService.getSubCategories(category_id).subscribe({
        next: (res) => {
          console.log('Categories fetched:', res);
          this.subCategoryOptions = res.category; // adjust according to API response structure
        },
        error: (err) => {
          this.subCategoryOptions = [];
          console.error('API Error:', err);
        }
      });
      this.subCategoryOptions = this.commonService.getSubCategories(category_id) || [];
      
    });

    this.imageBaseUrl = environment.apiBaseUrl+'/images';
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id')!;    
    this.showImageSection = productId == "" || productId == null || productId == undefined ? false : true;

    this.commonService.getCategories().subscribe({
      next: (res) => {
        console.log('Categories fetched:', res);
        this.categoryOptions = res.category; // adjust according to API response structure
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });

    this.getProductDetails(productId ? parseInt(productId) : 0);

    console.log('Category Options after API call:', this.categoryOptions);
  }

  getProductDetails(productId : any): void {
    const PRODUCT_DETAILS_URL = "user/product/"+productId;
    
    this.loading = true;
    this.apiService.get<any>(PRODUCT_DETAILS_URL)
      .subscribe({
        next: (res) => {
          this.product = res.products;
          // this.products = res.products;
          console.log('Products data loaded:', this.product);
          this.mainImage = this.product.main_image;
          this.productForm.patchValue({
            category: this.product.category,
            sub_category: this.product.sub_category,
            product_name: this.product.product_name,
            sku: this.product.sku,
            product_unit: this.product.product_unit,
            product_capacity: this.product.product_capacity,
            product_capacity_unit: this.product.product_capacity_unit,
            minimum_order_qty: this.product.minimum_order_qty,
            country: this.product.country,
            product_description: this.product.product_description,
            status: this.product.status            
          });
          this.productName = this.product.product_name;
          this.productSku = this.product.sku;
          // Set status separately if needed        
          // this.status = this.product.status;
          this.mainImage = this.product.main_image;
          this.additional_image = this.product.additional_image;
          this.seller_details = this.product.seller;

          this.prepareImageSlots();
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
  }

  async prepareImageSlots() {
    const maxSlots = 4;
    this.finalImages = [...this.additional_image];

    // Add blank slots if less than 4
    while (this.finalImages.length < maxSlots) {
      this.finalImages.push({ image: null, id : null });  
    }
  }

  productSubmit(): void {
    const productId = this.route.snapshot.paramMap.get('id')!;    

    if (this.productForm.valid) {
      const formData = this.productForm.value;
      formData.product_id = productId; 
      console.log('Product Form Data:', formData);

      this.apiService.post<any>('user/product/update', formData).subscribe({
        next: (res : any) => {
          this.notify.success('Product Updated successfully!');
        },
        error: (err) => console.error('Upload failed:', err)
      });
      // Implement the logic to submit the form data to the server
    } else {
      console.log('Product Form is invalid');
      this.productForm.markAllAsTouched();
    } 
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const formData = this.productForm.value;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed!');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      // this.previewUrl = reader.result;
      console.log('File selected:', reader.result);
      // Remove "data:image/png;base64," part
      const base64String = (reader.result as string).split(',')[1];
      // this.base64Image = base64String;

      this.uploadImage(base64String, formData.product_name, formData.sku);
    };
    // reader.readAsDataURL(file);
    
  }

  uploadImage(base64Image : any, productName : any, sku : any) {
    let productId = this.route.snapshot.paramMap.get('id');
    if (!base64Image) {
      this.notify.error('Please select an image first!'); 
      return;
    }
    const payload = {
      product_id: productId,
      product_name : productName,
      sku : sku,
      main_image: base64Image
    };

    console.log('Uploading image with payload:', payload);
    // return false; // Remove this line to enable upload

    this.apiService.post<any>('user/product/update', payload).subscribe({
      next: (res : any) => {
        this.mainImage = res.details.main_image;
        this.notify.success('Product image uploaded successfully!');
      },
      error: (err) => console.error('Upload failed:', err)
    });
  }

  onAdditionalFileSelected(event: Event, obj: any) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed!');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      // this.previewUrl = reader.result;
      console.log('File selected:', reader.result);
      // Remove "data:image/png;base64," part
      const base64String = (reader.result as string).split(',')[1];
      this.uploadAddImage(base64String, obj);
    };
    // reader.readAsDataURL(file);
    
  }

  uploadAddImage(base64Image : any, obj : any) {
    let productId = this.route.snapshot.paramMap.get('id');
    if (!base64Image) {
      // alert('Please select an image first!');
      this.notify.error('Please select an image first!'); 
      return;
    }
    const payload = {
      product_id: productId,
      status : 1,
      sort_order : 1,
      image: base64Image
    };

    console.log('Uploading Additional image with payload:', payload);
    // return false; // Remove this line to enable upload

    this.apiService.put<any>('user/product/additional-image', payload).subscribe({
      next: (res : any) => {
        console.log(res);
        this.notify.success('Additional image uploaded successfully!'); 
        this.ngOnInit();
      },
      error: (err) => console.error('Upload failed:', err)
    });
  }

  getCategories() {
    console.log('Fetching categories...');
    return this.apiService.get<any>('common/category');
  }

  removeAddImage(obj: any) {
    console.log(obj);
  }
}
