import { Appointment } from './../../shared/models/appointment';
import { SearchParam } from './../../shared/models/searchParams';
import { IPatient } from './../../shared/models/patients';
import { ScheduleService } from './../schedule.service';
import { ISchedule } from './../../shared/models/schedule';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit {
  schedule: ISchedule;
  patients: IPatient[];
  appointmentForm: FormGroup;
  patientsValue: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.getPatients();
    this.getSchedule();
  }

  createFormGroup(): void {
    this.appointmentForm = this.fb.group({
      patientId: [null, Validators.required],
      appointmentDate: [null, Validators.required],
      appointmentTime: [null, Validators.required],
      notes: [null, [Validators.required, Validators.maxLength(200)]]
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
        this.setAppointmentValues();
      }
    }, error => {
      console.log(error);
    });
  }

  getPatients(): void {
    this.scheduleService.getPatients().subscribe(response => {
      this.patients = response;
      const arr = Array<string>();
      response.forEach(p => {
        arr.push(
          this.createPatientView(p)
        );
      });
      this.patientsValue = arr;
    }, error => {
      console.log(error);
    });
  }

  createPatientView(p: IPatient): string {
    return  p.id + ': ' + p.firstName + ' ' + p.lastName +
      ' (' + new Date(p.dateOfBirth).toLocaleDateString() + ')';
  }

  onCreate(): void {
    if (!confirm('Create this appointment?')) {
      return;
    }

    const appointment = this.createAppointment();
    this.scheduleService.createAppointment(appointment).subscribe(response => {
      if (response) {
        alert('Appointment created!');
        this.backToSchedule();
      }
    }, error => {
      console.log(error);
      alert(error);
    });
  }

  onUpdate(): void {
    if (!confirm('Update this appointment?')) {
      return;
    }

    const appointment = this.createAppointment();
    this.scheduleService.updateAppointment(appointment).subscribe(response => {
      if (response) {
        alert('Appointment updated!');
        this.backToSchedule();
      }
    }, error => {
      console.log(error);
      alert(error);
    });
  }

  onDelete(): void {
    if (!confirm('Delete this appointment?')) {
      return;
    }

    this.scheduleService.deleteAppointment(this.schedule.appointmentId).subscribe(response => {
      if (response) {
        alert('Appointment updated!');
        this.backToSchedule();
      }
    }, error => {
      console.log(error);
    });
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

    this.appointmentForm.patchValue({appointmentTime: this.schedule.appointmentTime});
  }

  setAppointmentValues(): void {
    if (this.patients === null) {
      alert('There is an error communicating with the server');
      console.log('error! patients has not been loaded');
      return;
    }

    if (this.schedule === null) {
      alert('There is an error communicating with the server');
      console.log('error! schedule has not been loaded');
      return;
    }

    const patient = this.patients.find(p => p.id === this.schedule.patientId);
    if (patient) {
      this.appointmentForm.patchValue({patientId: this.createPatientView(patient)});
    }
    this.appointmentForm.patchValue({appointmentDate: new Date(this.schedule.appointmentTime)});
    this.appointmentForm.patchValue({appointmentTime: this.schedule.appointmentTime});
    this.appointmentForm.patchValue({notes: this.schedule.notes});
    this.appointmentForm.get('patientId').disable();
  }

  createAppointment(): Appointment {
    const appointment = new Appointment();
    appointment.id = this.schedule.appointmentId;
    appointment.Notes = this.appointmentForm.value.notes;

    const apptDate = new Date(this.appointmentForm.value.appointmentDate).toISOString().substring(0, 10)
    + new Date(this.appointmentForm.value.appointmentTime).toISOString().substring(10);
    appointment.AppointmentTime = new Date(apptDate);

    if (!this.appointmentForm.get('patientId').disabled) {
      const patientId = String(this.appointmentForm.value.patientId).split(':')[0];
      appointment.patientId = +patientId;
    } else {
      appointment.patientId = this.schedule.patientId;
    }
    return appointment;
  }

  confirm(message: string): any  {
  }

  backToSchedule(): void {
    this.router.navigateByUrl('/schedule');
  }
}
