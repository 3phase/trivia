import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';
import { TriviaService } from './services/trivia.service';
import { TriviaQuestion, TriviaResponseQuestions } from './types/trivia-response.type';
import { QuestionsModule } from './question/questions.module';
import { PointsService } from './services/points.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, QuestionsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  questions: TriviaQuestion[] = [];

  constructor(
    public pointsService: PointsService,
    private triviaService: TriviaService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.pointsService.resetPoints();
  }

  get token(): string {
    return this.storageService.getToken() ?? '';
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
