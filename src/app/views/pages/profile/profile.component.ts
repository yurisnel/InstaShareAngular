import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';
import { Profile } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  profileForm: any; //FormGroup
  profile?: Profile;

  constructor( 
    protected fb: FormBuilder,
    protected api: ApiService,
    protected alertService: AlertService,
    protected mainService: MainService) { }

  ngOnInit() {
    this.initialForm();
    this.loadData();
  }

  initialForm() {
    this.profileForm = this.fb.group({
      user: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        email: ['',  [Validators.required, Validators.email]],
        avatarUrl: [''],
      }),     
      about: ['', Validators.required],
      company: ['', Validators.required],
      job: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],     
      twitter: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      linkedin: ['', Validators.required],
    });
  }

  loadData(){
    this.api
      .getProfile()
      .pipe(first())
      .subscribe((result:any) => {
        if (result) {
          this.profileForm?.patchValue(result);
          this.profile = new Profile(result);
        }
      });
    
  }

  onSubmit() {
    if (this.profileForm?.invalid) {
      this.alertService.error('Invalid form data');
      return;
    }   
    this.profile = new Profile(this.profileForm?.value);

    this.api
      .saveProfile(this.profile)
      .pipe(first())
      .subscribe((result:any) => {
        if (result) {     
          if(this.profile?.user){
            this.mainService.setUser(this.profile?.user);
          }          
          this.alertService.info('Successfully completed');
        }
      });
  }

  onLoadImage(data: any){
    if(this.profile && this.profile.user){
      this.profile.user.avatarUrl = data['url'];
      this.profileForm.patchValue({     
        user: {
          avatarUrl: data['url']
        }
      })
      this.mainService.setUser(this.profile.user);
    }
    
  }

}
