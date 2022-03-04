import { Directive, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appFormControlValidation]'
})
export class FormControlValidationDirective implements OnInit, OnDestroy {

    constructor(
        private elRef: ElementRef,
        private control: NgControl
    ) { }

    statusChangeSubscription?: Subscription;

    ngOnInit(): void {        
        this.statusChangeSubscription = this.control?.statusChanges?.subscribe(
            (status) => {
                if (status == 'INVALID') {
                    this.showError();
                } else {
                    this.removeError();
                }
            }
        )
    }

    ngOnDestroy(): void {
        this.statusChangeSubscription?.unsubscribe();
    }

    @HostListener('blur', ["$event"])
    handleBlurEvent(event: any) {
        if (this.control.value == null || this.control.value == '') {
            if (this.control.errors) this.showError();
            else this.removeError();
        }
    }

    private showError() {
        this.removeError();
        if (this.control.errors) {

            const errorMessages: any = {
                'required': "The field is a required",
                'minlength': "The field must have 8 characters",
                'maxlength': "The field can have maximum 30 characters",
                'email': 'The field is not in valid format'
            }

            const valErrors: ValidationErrors = this.control.errors;
            const firstKey = Object.keys(valErrors)[0];
            let errorMsg = 'Unknown error';
            if (errorMessages[firstKey]) {
                errorMsg = errorMessages[firstKey];
            }
            const errSpan = '<span style="color:red;" class="error">' + errorMsg + '</span>';
            this.getParent().insertAdjacentHTML('beforeend', errSpan);
        }
    }

    private getParent(){
        let parent = this.elRef.nativeElement.parentElement;
        if(parent.classList.contains('input-group')){
            parent = parent.parentElement;
        }
        return parent;
    }

    private removeError(): void {
        
        const errorElement =  (<HTMLElement>this.getParent()).querySelector('.error');
        if (errorElement) errorElement.remove();
    }

}