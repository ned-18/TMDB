import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent {
  @Input() header!: string;
  @Input() message!: string;
}
