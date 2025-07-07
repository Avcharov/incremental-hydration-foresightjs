import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-hydrated-card',
  imports: [],
  templateUrl: './app-hydrated-card.component.html',
  styleUrl: './app-hydrated-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HydratedCardComponent {
  @Input() cardNumber: number = 0;
}