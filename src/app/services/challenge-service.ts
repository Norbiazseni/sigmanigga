import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../models/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private apiUrl = 'http://localhost:8000/api/challenges';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.apiUrl);
  }

  getById(id: number): Observable<Challenge> {
    return this.http.get<Challenge>(`${this.apiUrl}/${id}`);
  }

  create(challenge: Challenge): Observable<Challenge> {
    return this.http.post<Challenge>(this.apiUrl, challenge);
  }

  update(id: number, challenge: Challenge): Observable<Challenge> {
    return this.http.patch<Challenge>(`${this.apiUrl}/${id}`, challenge);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
