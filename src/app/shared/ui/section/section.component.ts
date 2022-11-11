import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input()
  collection: ICollectionItem[];

  @Output() itemClicked = new EventEmitter<number>();

  emitItemClicked(item: number) {
    this.itemClicked.emit(item);
  }
}
