import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-review-submit',
  imports: [MatStepperModule, FormsModule],
  templateUrl: './review-submit.component.html',
  styleUrl: './review-submit.component.css'
})
export class ReviewSubmitComponent {
  @Input() form!: FormGroup

  constructor(){}

  goBack() {
    console.log("Going back to edit details...");
  }

  submitForm() {
    if (this.form.valid) {
      console.log("Form Submitted Successfully!", this.form.value);
      alert("Your application has been submitted successfully!");
    } else {
      alert("Please complete all required fields before submitting.");
    }
  }
}
