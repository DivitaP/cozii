import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-travel-info',
  imports: [MatStepperModule, FormsModule, ReactiveFormsModule, ErrorMessageComponent, CommonModule],
  templateUrl: './travel-info.component.html',
  styleUrl: './travel-info.component.css'
})
export class TravelInfoComponent {
@Input() form!: FormGroup
showOtherRoleInput = false;
customRole: string = '';
constructor() {}

onRoleChange(event: Event) {
  const selectedRole = (event.target as HTMLSelectElement).value;
  this.showOtherRoleInput = selectedRole === 'Other';

  if (!this.showOtherRoleInput) {
    this.customRole = '';
    this.form.get('travelDetails.rolePreference')?.setValue(selectedRole);
  } else {
    this.form.get('travelDetails.rolePreference')?.setValue('');
  }
}

updateRolePreference() {
  this.form.get('travelDetails.rolePreference')?.setValue(this.customRole);
  console.log(this.form.get('travelDetails.rolePreference'))
}

step2Submitted() {
  const travelDetails = this.form.get('travelDetails') as FormGroup; // Cast to FormGroup

  if (travelDetails) {
    Object.keys(travelDetails.controls).forEach((field) => {
      const control = travelDetails.get(field);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  }

  // Prevent moving to next step if form is invalid
  if (travelDetails.invalid) {
    return;
  }
}
}
