import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  points = 0;
  answered = 0;
  totalQuestions = 0;

  announce$: Subject<boolean> = new Subject<boolean>();

  get end(): boolean {
    return this.answered === this.totalQuestions;
  }

  constructor() { }

  resetPoints(): void {
    this.points = 0;
  }

  resetAnswered(): void {
    this.answered = 0;
    this.announce$.next(false);
  }
}
