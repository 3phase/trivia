import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';
import { TriviaService } from './services/trivia.service';
import { TriviaResponseQuestions } from './types/trivia-response.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private triviaService: TriviaService,
    private storageService: StorageService
  ) { }

  get token(): string {
    return this.storageService.getToken() ?? '';
  }

  getToken() {
    this.triviaService.getToken();
  }

  getQuestions() {
    this.triviaService.getQuestions().subscribe((data: TriviaResponseQuestions) => {
      console.log(data);

    });
  }

}
