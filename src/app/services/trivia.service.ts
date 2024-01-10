import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TriviaResponse, TriviaResponseQuestions, TriviaResponseToken } from '../types/trivia-response.type';
import { StorageService } from './storage.service';
import { TRIVIA_BASE_URL } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  getToken(): void {
    this.http.get<TriviaResponseToken>(`${TRIVIA_BASE_URL}/api_token.php?command=request`).subscribe((response: TriviaResponseToken) => {
      if (response.response_code > 0) throw new Error('Error fetching session token.');
      if (!response.token) throw new Error('Session token not provided.');

      this.storageService.storeToken(response.token);
    });
  }

  getQuestions(): Observable<TriviaResponseQuestions> {
    return this.http.get<TriviaResponseQuestions>(`${TRIVIA_BASE_URL}/api.php?amount=10&category=17`);
  }

}
