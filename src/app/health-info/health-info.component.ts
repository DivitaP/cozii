import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-health-info',
  imports: [MatStepperModule, FormsModule, ReactiveFormsModule, ErrorMessageComponent, CommonModule],
  templateUrl: './health-info.component.html',
  styleUrl: './health-info.component.css'
})
export class HealthInfoComponent {
  @Input() form!: FormGroup
  vaccinationOptions = ['COVID-19', 'Influenza', 'Hepatitis B', 'MMR']; // Example vaccines
  showOtherInput = false;
  otherVaccine = '';
  selectedVaccines: string[] = [];

  constructor() { }

  isSelected(vaccine: string): boolean {
    return this.form.get('healthDetails.vaccinations')?.value?.includes(vaccine);
  }

  onVaccineChange(event: any) {
    let selectedVaccines = [...this.form.get('healthDetails.vaccinations')?.value || []];

    if (event.target.checked) {
      selectedVaccines.push(event.target.value);
    } else {
      selectedVaccines = selectedVaccines.filter(v => v !== event.target.value);
    }

    this.form.get('healthDetails.vaccinations')?.setValue(selectedVaccines);
    console.log(this.form.get('healthDetails.vaccinations')?.value)
  }

  step3Submitted() {
    const healthDetails = this.form.get('healthDetails') as FormGroup; // Cast to FormGroup
  
    if (healthDetails) {
      Object.keys(healthDetails.controls).forEach((field) => {
        const control = healthDetails.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
    }
  
    // Prevent moving to the next step if form is invalid
    if (healthDetails.invalid) {
      console.log("Error")
      return;
    }
  }

}
