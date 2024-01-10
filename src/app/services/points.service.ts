import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  points = 0;

  constructor() { }

  resetPoints(): void {
    this.points = 0;
  }
}
