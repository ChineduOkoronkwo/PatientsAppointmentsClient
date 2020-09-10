import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { PatientsRoutingModule } from './patients-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients.component';
import { PatientsDetailComponent } from './patients-detail/patients-detail.component';


@NgModule({
  declarations: [PatientsComponent, PatientsDetailComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PatientsModule { }
