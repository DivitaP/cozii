import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatStepperIcon, MatStepperIntl, MatStepperModule } from '@angular/material/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonalInfoComponent } from "./personal-info/personal-info.component";
import { TravelInfoComponent } from "./travel-info/travel-info.component";
import { HealthInfoComponent } from "./health-info/health-info.component";
import { ReviewSubmitComponent } from "./review-submit/review-submit.component";
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, MatStepperModule, PersonalInfoComponent, TravelInfoComponent, HealthInfoComponent, ReviewSubmitComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'step';

  registrationForm!:FormGroup;

  dateBeforeToday(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date();
      const selectedDate = new Date(control.value);
  
      // Compare dates, and ensure the date is before today
      if (control.value && selectedDate >= today) {
        return { 'dateBeforeToday': true };
      }
  
      return null;  // Valid date
    };
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'personalDetails': new FormGroup({
        'firstname': new FormControl(null, Validators.required),
        'mi': new FormControl(null),
        'lastname': new FormControl(null, Validators.required),
        'dob': new FormControl(null, [Validators.required, this.dateBeforeToday()]),
        'gender': new FormControl(null),
        'phone': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'address': new FormGroup({
          'street': new FormControl(null, Validators.required),
          'city': new FormControl(null, Validators.required),
          'state': new FormControl(null, Validators.required),
          'zip': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{5,6}$')]),
          'country': new FormControl(null, Validators.required)
        }),
        'nationality': new FormControl(null, Validators.required),
        'passport': new FormControl(null, Validators.required),
        'ssn': new FormControl(null),
        'link': new FormControl(null, Validators.pattern('^(https?:\/\/)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\.[a-z]{2})?)(:[0-9]{1,5})?(\/.*)?$'))
      }),
      'healthDetails': new FormGroup({
        'height': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{1,4}(\\.[0-9]{1,2})?$')]),
        'weight': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(999)]),
        'bloodType': new FormControl(null, Validators.required),
        'allergies': new FormControl(null, Validators.required),
        'healthConditions': new FormControl(null, Validators.required),
        'physicalFitness': new FormControl(null),
        'vaccinations': new FormControl(null),
        'healthCheckup': new FormControl(null, [Validators.required, this.dateBeforeToday]),
        'emergencyContact': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]),
        'otherHealthNotes': new FormControl(null)
      
      }),
      'travelDetails': new FormGroup({
        'astronautExperience': new FormControl(null, Validators.required),
        'preferredSpacecraft': new FormControl(null, Validators.required),
        'classPreference': new FormControl(null, Validators.required),
        'preferredFlightDuration': new FormControl(null, Validators.required),
        'seatPreference': new FormControl(null, Validators.required),
        'missionDuration': new FormControl(null, Validators.required),
        'preferredLaunchTime': new FormControl(null, Validators.required),
        'rolePreference': new FormControl(null, Validators.required),
        'travelCompanions': new FormControl(null, Validators.required),
        'otherRole': new FormControl(null),
        'otherAccommodation': new FormControl(null)
        
      }),
      'reviewSubmit': new FormGroup({

      })
    });
  }

  

}
