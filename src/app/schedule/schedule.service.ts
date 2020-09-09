import { SearchParam } from './../shared/models/searchParams';
import { ISchedule } from './../shared/models/schedule';
import { IPatient } from './../shared/models/patients';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(`${this.baseUrl}patients`);
  }

  searchSchedule(searchParam: SearchParam): Observable<ISchedule[]> {
    let params = new HttpParams();
    params = params.append('patientId', searchParam.patientId.toString());
    params = params.append('appointmentId', searchParam.appointmentId.toString());
    if (searchParam.dateFrom) {
      params = params.append('dateFrom', searchParam.dateFrom.toString());
    }

    return this.http.get<ISchedule[]>(`${this.baseUrl}search`, {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

}
