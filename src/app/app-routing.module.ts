import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'schedule', loadChildren: () => import('./schedule/schedule.module')
    .then(mod => mod.ScheduleModule)},
  {path: 'patients', loadChildren: () => import('./patients/patients.module')
    .then(mod => mod.PatientsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
