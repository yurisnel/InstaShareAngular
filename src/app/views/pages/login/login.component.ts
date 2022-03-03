import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: any;

  constructor(
    protected router: Router,
    protected fb: FormBuilder,
    protected api: ApiService,
    protected alertService: AlertService,
  ) {}

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formLogin.invalid) {
      this.alertService.error('Invalid form data');
      return;
    }
    const values = this.formLogin.value;

    this.api
      .login(values.username, values.password)
      .pipe(first())
      .subscribe((result:any) => {
        if (result) {
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigate(['/home']);
        }
      });
  }

}
