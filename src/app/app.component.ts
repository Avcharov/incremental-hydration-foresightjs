import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
  signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForesightService } from '../foresight.service';
import { HydratedCardComponent } from '../app-hydrated-card/app-hydrated-card.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HydratedCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private foresightService = inject(ForesightService);

  @ViewChildren('cardPlaceholder') cardPlaceholders!: QueryList<ElementRef>;

  cards = Array.from({ length: 100 }, (_, i) => i + 1);
  hydrationTriggers: WritableSignal<boolean>[] = this.cards.map(() => signal(false));

  ngAfterViewInit() {
    this.foresightService.init();

    this.cardPlaceholders.forEach((placeholderRef: ElementRef, index: number) => {
      const element = placeholderRef.nativeElement;
      const trigger = this.hydrationTriggers[index];

      this.foresightService.register(element, () => {
        if (!trigger()) {
          console.log(
            `Foresight.js predicts interaction with Card ${index + 1}!`
          );

          trigger.set(true);
        }
      });
    });
  }

  ngOnDestroy() {
    this.cardPlaceholders.forEach((ref: any) => {
      this.foresightService.unregister(ref.nativeElement);
    });
  }
}