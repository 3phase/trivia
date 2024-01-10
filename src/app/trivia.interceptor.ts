import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TRIVIA_BASE_URL } from './constants';
import { TriviaService } from './services/trivia.service';
import { TriviaResponse } from './types/trivia-response.type';

@Injectable()
export class TriviaInterceptor implements HttpInterceptor {

  constructor(
    private triviaService: TriviaService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(TRIVIA_BASE_URL)) return next.handle(req);

    return next.handle(req).pipe(
      tap((response: HttpEvent<any> & { body?: TriviaResponse }) => {
        if (response.body?.response_code === 4) {
          // expired token
          this.triviaService.getToken();
        }
      })
    )
  }
}
