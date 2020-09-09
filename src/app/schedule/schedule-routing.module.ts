import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule.component';

const routes: Routes = [
  {path: '', component: ScheduleComponent},
  {path: ':id', component: ScheduleDetailComponent}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
