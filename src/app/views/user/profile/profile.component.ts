import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../../core/models/user-response.model';
import { UtilHelper } from '../../../helpers/util.helper';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationService } from '../../../shared/notification/notification.service';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    RowDirective,
    GutterDirective,
    ColComponent,
    FormLabelDirective,
    FormControlDirective,
    FormFeedbackComponent,
    FormSelectDirective,
    ButtonDirective,
    CommonModule,
    CardBodyComponent,
    CardComponent,
    RowComponent,
    NgSelectModule,
    RouterModule
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  customStylesValidated = false;
  profileForm: FormGroup;
  loading = true;
  profileImage: string | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  base64Image: string | null = null;
  userType: string | null = null;
  showDetails: boolean = true;
  isReadonly: boolean = false;
  newUser: boolean = false;
  showStatusField: boolean = true;

  userTypeOptions = [
    { id: '', value: '', label: 'Choose User Type' },
    { id: 'SELLER', value: 'SELLER', label: 'SELLER' },
    { id: 'BUYER', value: 'BUYER', label: 'BUYER' },
    { id: 'ADMIN', value: 'ADMIN', label: 'ADMIN' },
    { id: 'SUPER_ADMIN', value: 'SUPER_ADMIN', label: 'SUPER_ADMIN' }
  ];

  roleByUsertype: Record<string, string[]> = {
    SELLER: ['Manufacturer', 'Wholesaler', 'Re-Seller'],
    BUYER: ['Wholesaler', 'Retailer']
  };

  statusOptions = [
    { id: '', value: '', label: 'Choose Status' },
    { id: '0', value: '0', label: 'Pending' },
    { id: '1', value: '1', label: 'Active' },
    { id: '2', value: '2', label: 'On Hold' },
    { id: '3', value: '3', label: 'Rejected' }
  ];
  
  countryOptions = UtilHelper.countryOptions();

  roles: string[] = []; // will update dynamically

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notify: NotificationService    
  ) {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],      
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      country: ['', Validators.required],
      user_type: ['', Validators.required],
      role: [''],
      company_name: [''],
      website: [''],
      business_email_address: [''],
      // business_contact_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      business_registration_number: [''],
      business_country_names: [''],
      business_description: [''],
      status: [true, Validators.required]      
    });

    this.profileForm.get('user_type')?.valueChanges.subscribe(userType => {
      this.roles = this.roleByUsertype[userType] || [];
      this.profileForm.get('role')?.setValue('');
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id')!;
    if(!Number.isNaN(Number(userId))) {
      this.getProfileDetails(userId ? parseInt(userId) : 0);    
    }else{
      console.error('Invalid user ID');
      this.profileForm.get('user_type')?.setValue(userId.toUpperCase());
      this.isReadonly = true;
      this.showDetails = false;
      this.newUser = true;
      // this.showStatusField = false;
    }    
  }

  profileSubmit() {
    this.customStylesValidated = true;
    
    if (this.profileForm.valid) {
      const profileData = this.profileForm.value;
      console.log('Profile Data to submit:', profileData);
      if(this.newUser == true) {
        this.apiService.post<UserResponse>('backend/user-register', profileData)
          .subscribe({
            next: (res) => {
              console.log('Profile updated successfully:', res);
              localStorage.setItem(this.authService.USER_KEY, JSON.stringify(res));
              this.authService.fetchLoggedInUser();
              // this.router.navigate(['/dashboard']);
              this.notify.success('User Created Successfully.');
            },
            error: (err) => {
              this.notify.error('Something went wrong. Please try after some time.');
              console.error(err);
            },
          });  
      }else{
        this.apiService.post<UserResponse>('user/profile/update', profileData)
          .subscribe({
            next: (res) => {
              console.log('Profile updated successfully:', res);
              localStorage.setItem(this.authService.USER_KEY, JSON.stringify(res));
              this.authService.fetchLoggedInUser();
              // this.router.navigate(['/dashboard']);
              this.notify.success('Profile details updated successfully.');
            },
            error: (err) => {
              this.notify.error('Something went wrong. Please try after some time.');
              console.error(err);
            },
          });
        }
    }    
  }
  
  getProfileDetails(userId: number): void {
    this.apiService.get<UserResponse>('user/profile/view/'+userId)
      .subscribe({
        next: (res) => {
          this.profileForm.patchValue({
            first_name: res.details.first_name,
            last_name: res.details.last_name,
            email: res.details.email,
            phone: res.details.phone,
            country: res.details.country,
            user_type: res.details.user_type,
            company_name: res.details.profile_details?.company_name,
            website: res.details.profile_details?.website,
            business_email_address: res.details.profile_details?.business_email_address,
            business_registration_number: res.details.profile_details?.business_registration_number,
            business_country_names: res.details.profile_details?.business_country_names,
            business_description: res.details.profile_details?.business_description,
            role: res.details.user_role,
            status: res.details.status
          });
          this.profileImage = res.details?.profile_image;
          this.userType = res.details?.user_type;
          console.log('Profile data loaded:', res);
          
          if(this.userType == "SUPER_ADMIN" || this.userType == "ADMIN"){
            this.showDetails = false; 
          }
          this.isReadonly = true;
          this.loading = false;          
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  onFileSelected(event: Event) {
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
      this.previewUrl = reader.result;
      console.log('File selected:', reader.result);
      // Remove "data:image/png;base64," part
      const base64String = (reader.result as string).split(',')[1];
      // this.base64Image = base64String;

      this.uploadImage(base64String);
    };
    // reader.readAsDataURL(file);
    
  }

  uploadImage(base64Image : any) {
    if (!base64Image) {
      alert('Please select an image first!');
      return;
    }
    const profileData = this.profileForm.value;
    
    const payload = {
      user_type : profileData.user_type,
      profile_image: base64Image
    };

    // console.log('Uploading image with payload:', payload);
    // return false; // Remove this line to enable upload

    this.apiService.post<UserResponse>('user/profile/update', payload).subscribe({
      next: (res : any) => {
        this.profileImage = res.details.profile_image;
        // console.log('Image uploaded successfully:', res);
        localStorage.setItem(this.authService.USER_KEY, JSON.stringify(res));
        this.authService.fetchLoggedInUser();
      },
      error: (err) => console.error('Upload failed:', err)
    });
  }

  preventSelectChange(event: MouseEvent) {
    if (this.isReadonly) {
      event.preventDefault(); // stops opening dropdown
    }
  }
}
