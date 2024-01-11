import { Component, Input } from '@angular/core';
import { PointsService } from '../services/points.service';
import { TriviaQuestionWithMeta } from '../types/trivia.types';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {

  @Input('question')
  public question: TriviaQuestionWithMeta | undefined;

  @Input('index')
  public index: number = 0;

  constructor(
    private pointsService: PointsService
  ) { }

  handleChange(event: Event) {
    if (!this.question) throw new Error('No question.');

    const radio = event.target as HTMLInputElement;
    if (!radio) throw new Error('No selected radio button.');

    if (this.question.answered) {
      alert("Don't try to summon this evil.");
      radio.checked = false;
      return false;
    }

    const answerId = radio?.attributes?.getNamedItem('data-answer-id')?.value;
    if (!answerId) throw new Error('Non-correspondant radio button.');

    this.question.answered = true;

    if (this.question.answers.find(x => x.id === +answerId)?.correct) {
      this.pointsService.points++;
      alert("Not impressive, but correct.");
    }

    return true;
  }
}