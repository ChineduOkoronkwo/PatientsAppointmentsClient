import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { PatientsDetailComponent } from './patients-detail/patients-detail.component';

const routes: Routes = [
  {path: '', component: PatientsComponent},
  {path: ':id', component: PatientsDetailComponent}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
