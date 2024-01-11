import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionsModule } from './question/questions.module';
import { PointsService } from './services/points.service';
import { StorageService } from './services/storage.service';
import { TriviaService } from './services/trivia.service';
import { TriviaQuestion, TriviaResponseQuestions } from './types/trivia-response.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, QuestionsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  questions: TriviaQuestion[] = [];
  private _token = '';

  constructor(
    public pointsService: PointsService,
    private triviaService: TriviaService,
    private storageService: StorageService,
  ) {
    this.storageService.sessionToken$.subscribe((token: string | undefined) => {
      if (token) this._token = token;
    });
  }

  ngOnInit() {
    this.storageService.getToken();
    this.pointsService.resetPoints();
  }

  get token(): string {
    return this._token;
  }

  getToken() {
    this.triviaService.getToken();
  }

  getQuestions() {
    this.triviaService.getQuestions().subscribe((data: TriviaResponseQuestions) => {
      this.questions = data.results ?? [];
    });
  }

}
