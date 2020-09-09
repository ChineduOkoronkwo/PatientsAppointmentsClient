import { SearchParam } from './../shared/models/searchParams';
import { ISchedule } from './../shared/models/schedule';
import { IPatient } from './../shared/models/patients';
import { ScheduleService } from './schedule.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  patients: IPatient[];
  schedules: ISchedule[];
  searchParam = new SearchParam();

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.getSchedule();
    this.getPatients();
  }

  getPatients(): void {
    this.scheduleService.getPatients().subscribe(response => {
      this.patients = [{id: 0, firstName: 'All', lastName: 'Patients', dateOfBirth: new Date()}
        , ...response];
    }, error => {
      console.log(error);
    });
  }

  getSchedule(): void {
    this.scheduleService.searchSchedule(this.searchParam).subscribe(response => {
      this.schedules = response;
    }, error => {
      console.log(error);
    });
  }

  onDateChanged(event: any): void {
    this.searchParam.dateFrom = event;
    this.getSchedule();
  }

  onPatientSelected(event: any): void {
    this.searchParam.patientId = event;
    this.getSchedule();
  }

}
