import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { FormGroup, FormGroupDirective, NgControl } from '@angular/forms';

@Directive({
    selector: '[appFormSubmitValidation]'
})

export class FormSubmitValidationDirective {

    constructor(
        private elRef: ElementRef,
        private formGroup: FormGroupDirective
    ) { }
    @HostListener('submit', ["$event"])
    handleSubmitEvent(event: any) {
        this.markAsTouched(this.formGroup.form);
    }

    private markAsTouched(formGroup: FormGroup): void {
        formGroup.markAsTouched();
        formGroup.updateValueAndValidity();
        (<any>Object).values(formGroup.controls).forEach(
            (control: FormGroup) => {
                if(control.errors){
                    control.markAsTouched();
                    control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
                    if (control.controls) {
                        this.markAsTouched(control);
                    }
                }                
            });
    }

}