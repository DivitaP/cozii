import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatStepperModule, CommonModule, ErrorMessageComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {
  constructor(private http: HttpClient) { }

  @Input() form!: FormGroup

  ngOnInit(): void {
    this.loadCountries();
  }

  countryList: any[] = [];
  stateList: any[] = [];
  cityList: any[] = [];
  nationalityList: any[] = [];
  selectedCountry: any = null;

  step1Submitted() {
    const personalDetails = this.form.get('personalDetails') as FormGroup; // Cast to FormGroup
  
    if (personalDetails) {
      Object.keys(personalDetails.controls).forEach((field) => {
        const control = personalDetails.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
    }
  
    // Prevent moving to the next step if form is invalid
    if (personalDetails.invalid) {
      return;
    }
  }


  // Load countries from REST API
  loadCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe((data) => {
      this.countryList = data.map((country) => country.name.common).sort();
    });
  }



  // Fetch states for a selected country using a simulated API (replace with real one)
  fetchStates(country: string) {
    this.http.post<any>('https://countriesnow.space/api/v0.1/countries/states', { country }).subscribe((response) => {
      if (response.data) {
        console.log(response.data.states)
        this.stateList = response.data.states.map((state: { name: any; }) => state.name);
      } else {
        this.stateList = [];
      }
    });
  }

  // Fetch cities for a selected country using the CountriesNow API
  onCountryChange(event: Event) {
    const selectedCountry = (event.target as HTMLSelectElement)?.value;
    this.selectedCountry = selectedCountry;
    if (selectedCountry) {
      this.http.post<any>('https://countriesnow.space/api/v0.1/countries/cities', { country: selectedCountry }).subscribe((response) => {
        if (response.data) {
          this.cityList = response.data[selectedCountry];
        } else {
          this.cityList = [];
        }
      });
      this.fetchStates(selectedCountry);  // Update states when country is selected
    }
  }

  // Handle state change
  onStateChange(event: Event) {
    const selectedState = (event.target as HTMLSelectElement)?.value;
// console.log(this.selectedCountry, selectedCountry, selectedState);
    if (selectedState && this.selectedCountry) {
      // Fetch cities based on selected country and state
      this.http.post<any>('https://countriesnow.space/api/v0.1/countries/state/cities', { country: this.selectedCountry, state: selectedState }).subscribe((response) => {
        if (response.data) {
          console.log(response.data)
          this.cityList = response.data; // Filter cities based on state
          console.log(this.cityList)
        } else {
          this.cityList = [];
        }
      });
    }
  }


}
