import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  formRegister: any;

  constructor( 
    protected fb: FormBuilder,
    protected api: ApiService,
    protected alertService: AlertService,) { }

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      about: ['', Validators.required],
      company: ['', Validators.required],
      job: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      twitter: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      linkedin: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formRegister.invalid) {
      this.alertService.error('Form Input Invalid');
      return;
    }
    const values = this.formRegister.value;

    this.api
      .saveProfile(values)
      .pipe(first())
      .subscribe((result:any) => {
        if (result) {
          
        }
      });
  }

}
