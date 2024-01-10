import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TriviaResponse } from '../types/trivia-response.type';
import { StorageService } from './storage.service';
import { TRIVIA_BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  getToken(): void {
    this.http.get<TriviaResponse & { token?: string }>(`${TRIVIA_BASE_URL}/api_token.php?command=request`).subscribe((response: TriviaResponse & { token?: string }) => {
      if (response.response_code > 0) throw new Error('Error fetching session token.');
      if (!response.token) throw new Error('Session token not provided.');

      this.storageService.storeToken(response.token);
    });
  }


}
