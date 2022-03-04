import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  registerForm: any;
 
  constructor(
    protected router: Router,
    protected fb: FormBuilder,
    protected api: ApiService,
    protected alertService: AlertService,
    
    ) { }

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      email: ['',  [Validators.required, Validators.email]],
      gender: ['male',  [Validators.required]],
      //username: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm?.invalid) {
      this.alertService.error('Invalid form data');
      return;
    }
    let user = new User(this.registerForm?.value);

    this.api
      .register(user)
      .pipe(first())
      .subscribe((result: any) => {
        if (result) {
          this.alertService.info('Successfully completed');
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigate(['/home']);
        }
      });
  }

}
