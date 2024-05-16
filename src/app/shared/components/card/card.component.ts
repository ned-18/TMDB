import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Flip } from '@models/index';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({ transform: 'rotateY(180deg)' })),
      state('inactive', style({ transform: 'rotateY(0)' })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class CardComponent {
  @Input() imgSrc!: string;
  @Input() title!: string;
  @Input() date!: string;
  @Input() description!: string;
  public flip = Flip.Inactive;

  public toggleFlip() {
    this.flip = this.flip === Flip.Inactive ? Flip.Active : Flip.Inactive;
  }
}
