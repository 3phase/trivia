import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionsModule } from './question/questions.module';
import { PointsService } from './services/points.service';
import { StorageService } from './services/storage.service';
import { TriviaService } from './services/trivia.service';
import { TriviaQuestion, TriviaResponseQuestions } from './types/trivia-response.type';
import { TriviaQuestionWithMeta } from './types/trivia.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, QuestionsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  questions: TriviaQuestionWithMeta[] = [];
  announce: boolean = false;

  private _token = '';
  get token(): string {
    return this._token;
  }

  constructor(
    public pointsService: PointsService,
    private triviaService: TriviaService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.storageService.getToken();
    this.pointsService.resetPoints();
    this.pointsService.resetAnswered();

    this.storageService.sessionToken$.subscribe((token: string | undefined) => {
      if (token) this._token = token;
    });

    this.pointsService.announce$.subscribe((announce: boolean) => {
      if (announce) setTimeout(() => {
        this.announce = true;
      }, 2000);
    })
  }


  getToken() {
    this.triviaService.getToken();
  }

  getQuestions() {
    this.triviaService.getQuestions().subscribe((data: TriviaResponseQuestions) => {
      const questions = data.results ?? [];

      this.pointsService.totalQuestions = questions.length;
      this.pointsService.resetAnswered();

      this.questions = questions.map((question: TriviaQuestion) => ({
        ...question,
        answered: false,
        answers: [
          ...question.incorrect_answers.map((x, idx) => ({
            id: idx,
            answer: x,
            correct: false
          })),
          {
            id: question.incorrect_answers.length,
            answer: question.correct_answer,
            correct: true
          }
        ]
      }))
    });
  }

  getAnnouncement(): string {
    if (this.pointsService.points < 3) {
      return `${this.pointsService.points} points... You're doomed to the <span class='highlight'>endless abyss 😈</span>.`
    }

    if (this.pointsService.points < 7) {
      return `Despite your ${this.pointsService.points} points... You survive... <span class='highlight'> For now...</span>`;
    }

    return `${this.pointsService.points} points... <span class='highlight'>I call you my patron...</span> 🙇`
  }

}
