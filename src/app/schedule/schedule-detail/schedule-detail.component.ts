import { SearchParam } from './../../shared/models/searchParams';
import { IPatient } from './../../shared/models/patients';
import { ScheduleService } from './../schedule.service';
import { ISchedule } from './../../shared/models/schedule';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit {
  schedule: ISchedule;
  patients: IPatient[];
  appointmentForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.getPatients();
    this.getSchedule();
  }

  createFormGroup(): void {
    this.appointmentForm = this.fb.group({
      patientId: [null, [Validators.required]],
      appointmentTime: [null, [Validators.required]],
      notes: [null, [Validators.required]]
    });
  }

  getSchedule(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (+id > 0) {
      const searchParam = new SearchParam();
      searchParam.appointmentId = +id;
      this.getScheduleByParams(searchParam);
    } else {
      this.setDefaultSchedule();
    }
  }

  getScheduleByParams(searchParam: SearchParam): void {
    this.scheduleService.searchSchedule(searchParam).subscribe(response => {
      if (response && response.length === 1) {
        this.schedule = response[0];
        this.appointmentForm.patchValue({patientId: this.schedule.patientId});
      }
    }, error => {
      console.log(error);
    });
  }

  getPatients(): void {
    this.scheduleService.getPatients().subscribe(response => {
      this.patients = response;
    }, error => {
      console.log(error);
    });
  }

  onCreate(): void {
    console.log('appointment created');
    console.log(this.appointmentForm.value);
  }

  onUpdate(): void {
    console.log('appointment updated');
    console.log(this.appointmentForm.value);
  }

  onDelete(): void {
    console.log('appointment deleted');
    console.log(this.appointmentForm.value);
  }

  setDefaultSchedule(): void {
    this.schedule = {
      patientId: 0,
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      appointmentId: 0,
      appointmentTime: new Date(),
      notes: '',
    };
    console.log(this.schedule);
  }
}
