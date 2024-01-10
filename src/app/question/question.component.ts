import { Component, Input } from '@angular/core';
import { TriviaQuestion } from '../types/trivia-response.type';
import { PointsService } from '../services/points.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {

  _question: TriviaQuestion & { answers: string[] } | undefined;

  @Input('question')
  public get question(): TriviaQuestion | undefined {
    if (!this._question) return undefined;

    const { answers, ..._question } = { ...this._question };
    return _question;
  }
  public set question(value: TriviaQuestion | undefined) {
    if (!value) this._question = undefined;

    this._question = {
      ...value!,
      answers: [
        ...value?.incorrect_answers || [],
        value?.correct_answer || ''
      ]
    };
  }

  constructor(
    private pointsService: PointsService
  ) { }

  handleChange(event: Event): void {
    const radio = event.target as HTMLInputElement;
    if (!radio) throw new Error('No selected radio button.');

    const answer = radio?.attributes?.getNamedItem('data-answer-id')?.value;
    if (!answer) throw new Error('Non-correspondant radio button.');

    if (+answer === this._question!.answers.length - 1) {
      this.pointsService.points++;
    }

  }
}