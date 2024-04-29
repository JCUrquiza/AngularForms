import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Debe de aceptar las condiciones de uso.';
      }
    }

    return null;
  }

  onSave(): void {
    console.log('click');

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

  }

}
