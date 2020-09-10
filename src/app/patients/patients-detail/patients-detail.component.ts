import { IPatient } from './../../shared/models/patients';
import { PatientsService } from './../patients.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patients-detail',
  templateUrl: './patients-detail.component.html',
  styleUrls: ['./patients-detail.component.scss']
})
export class PatientsDetailComponent implements OnInit {
  patient: IPatient;
  patientForm: FormGroup;

  constructor(
    private patientsService: PatientsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.getPatient();
  }

  createFormGroup(): void {
    this.patientForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
    });
  }

  getPatient(): void {
    this.patient = this.createDefaultPatient();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (+id === 0) {
      return;
    }

    this.patientsService.getPatient(+id).subscribe(response => {
      if (response) {
        this.patient = response;
        this.setPatientValues();
      }
    });
  }

  createDefaultPatient(): IPatient {
    const patient: IPatient = {
      id: 0,
      firstName: '',
      lastName: '',
      dateOfBirth: null
    };
    return patient;
  }

  private setPatientValues(): void {
    this.patientForm.patchValue({firstname: this.patient.firstName});
    this.patientForm.patchValue({lastname: this.patient.lastName});
    this.patientForm.patchValue({dateOfBirth: new Date(this.patient.dateOfBirth)});
  }

  onCreate(): void {
    if (confirm('Create new patient?')) {
      this.updatePatientData();
      this.patientsService.createPatient(this.patient).subscribe(response => {
        if (response) {
          alert('Patient created!');
          this.router.navigateByUrl('/patients');
        }
      })
    }
  }

  onUpdate(): void {
    if (confirm('Update patient?')) {
      this.updatePatientData();
      this.patientsService.updatePatient(this.patient).subscribe(response => {
        if (response) {
          alert('Patient updated!');
          this.router.navigateByUrl('/patients');
        }
      })
    }
  }

  private updatePatientData(): void {
    this.patient.firstName = this.patientForm.value.firstname;
    this.patient.lastName = this.patientForm.value.lastname;
    this.patient.dateOfBirth = this.patientForm.value.dateOfBirth;
    console.log(this.patient);
  }

}
