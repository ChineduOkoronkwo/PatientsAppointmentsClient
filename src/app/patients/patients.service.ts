import { IPatient } from './../shared/models/patients';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(`${this.baseUrl}patients`);
  }

  getPatient(id: number): Observable<IPatient> {
    return this.http.get<IPatient>(`${this.baseUrl}patients/${id}`);
  }

  createPatient(patient: IPatient): Observable<IPatient> {
    return this.http.post<any>(`${this.baseUrl}patients`, patient)
      .pipe(map(response => {
        return response;
      }));
  }

  updatePatient(patient: IPatient): Observable<IPatient> {
    return this.http.put<any>(`${this.baseUrl}patients`, patient)
      .pipe(map(response => {
        return response;
      }));
  }

  deletePatient(id: number): any {
    return this.http.delete<boolean>(`${this.baseUrl}patients/${id}`)
      .pipe(map(response => {
        return response;
      }));
  }

}
