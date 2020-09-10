import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';



@NgModule({
  declarations: [ScheduleComponent, ScheduleItemComponent, ScheduleDetailComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ScheduleModule { }
