import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  sessionToken$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor() { }

  storeToken(token: string): void {
    localStorage.setItem('session_token', token);
    this.sessionToken$.next(token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('session_token');
    if (this.sessionToken$.value != token) this.sessionToken$.next(token ?? undefined);
    return token;
  }
}
