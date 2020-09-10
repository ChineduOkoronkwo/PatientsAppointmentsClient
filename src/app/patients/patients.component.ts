import { IPatient } from './../shared/models/patients';
import { PatientsService } from './patients.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styles: [
  ]
})
export class PatientsComponent implements OnInit {
  patients: IPatient[];

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  deletePatient(id: number): void {
    const patient = this.patients.find(p => p.id === id);
    if (patient && confirm(`Delete patient with id: ${patient.id}?`)) {
      this.deleteSelectedPatient(id);
    }
  }

  private deleteSelectedPatient(id: number): void {
    this.patientsService.deletePatient(id).subscribe(response => {
      if (response) {
        this.getPatients();
        alert('Patient delete!');
      }
    }, error => {
      console.log(error);
    });
  }

  getPatients(): void {
    this.patientsService.getPatients().subscribe(response => {
      this.patients = response;
    }, error => {
      console.log(error);
    });
  }

}
