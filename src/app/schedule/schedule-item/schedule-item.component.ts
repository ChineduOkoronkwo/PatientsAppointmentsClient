import { ISchedule } from './../../shared/models/schedule';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {
  @Input() schedule: ISchedule;

  constructor() { }

  ngOnInit(): void {
  }

}
