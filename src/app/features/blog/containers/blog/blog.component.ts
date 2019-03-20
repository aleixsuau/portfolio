import { Component, OnInit, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  mediumResourceUrl = 'https://medium.com/@aleixsuau';
  interval;
  numberOfPosts: number;

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      let counter = 0;

      this.interval = setInterval(() => {
        counter++;
        this.numberOfPosts = this.elementRef.nativeElement.getElementsByClassName('medium-widget-article__item').length;

        if (this.interval && (this.numberOfPosts || counter > 60)) {
          clearInterval(this.interval);
          this.changeDetectorRef.detectChanges();
        }
      }, 1000);
    });
  }
}
