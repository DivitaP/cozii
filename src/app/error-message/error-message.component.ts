import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  styleUrl: './error-message.component.css',
  template: `
    <div *ngIf="control?.touched && control?.invalid" class="text-danger">
      <div *ngIf="control?.hasError('required')">
        This field is required.
      </div>
      <div *ngIf="control?.hasError('email')">
        Please enter a valid email address.
      </div>
      <div *ngIf="control?.hasError('maxlength')">
        Maximum length exceeded.
      </div>
      <div *ngIf="control?.hasError('pattern')">
        Invalid format.
      </div>
      <div *ngIf="control?.hasError('minlength')">
        Minimum length required.
      </div>
      <div *ngIf="control?.hasError('dateBeforeToday')">
        <p class="text-danger">Date of birth must be before today.</p>
      </div>
    </div>
  `
})
export class ErrorMessageComponent {
  @Input() control: AbstractControl | null = null;
}
