import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFloatingDirective, FormLabelDirective } from '@coreui/angular';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';
import { UserResponse } from '../../../core/models/user-response.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule, CommonModule, FormFloatingDirective]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  overlay = `<h1 style="color:white;opacity:0.9">Welcome</h1>`;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router    
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit (): void {
    // this.loader.show();
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.apiService.post<UserResponse>('auth/login', loginData)
          .subscribe({
            next: (res) => {
              // this.alert.success('CSV uploaded successfully', { timeout: 4000 });
              if(res.details.user_type == "BUYER") {
                this.errorMessage = 'Access denied. Buyer cannot log in here.';
              }else{
                // ✅ Save JWT token to localStorage
                console.log('Login successful:', res.details.accessToken);
                this.authService.setToken(res.details.accessToken);
                localStorage.setItem(this.authService.USER_KEY, JSON.stringify(res));
                this.authService.fetchLoggedInUser();
                // Navigate to dashboard or another page
                this.router.navigate(['/dashboard']);                 
              }              
            },
            error: (err) => {
              console.error(err);
              this.errorMessage = 'Invalid credentials!';
            },
          });
          
    }
  }

}
