import { ConfigService } from './../../core/services/config/config.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  works: IWork[];
  sections: IMenuSection[];
  sectionsSubscription: Subscription;
  sectionHeightScreenPercentage = 0.9;
  voidSpaceHeightScreenPercentage = 0.6;
  activeSection: number;

  @ViewChild('titleBackgroundContainer')
  titleBackgroundContainer: ElementRef;
  @ViewChild('homeBackgroundColor')
  homeBackgroundColor: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private scrollDispatcher: ScrollDispatcher,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.works = this.activatedRoute.snapshot.data.content;
    this.sectionsSubscription = this.configService.$config.subscribe(config => this.sections = config.menu.sections);

    // Set background color
    const colors = this.sections.map(section => section.background_color).join(' ,');
    this.homeBackgroundColor.nativeElement.style.backgroundImage = `linear-gradient(to bottom, ${colors})`;

    this.scrollDispatcher
          .ancestorScrolled(this.elementRef, 50)
          .subscribe((cdkScrollable: CdkScrollable) => {
            const scrollTop = cdkScrollable.measureScrollOffset('top');
            const clientHeight = cdkScrollable.getElementRef().nativeElement.clientHeight;
            // scrollHeight === clientHeight + scrollTop
            // scrollHeight === sectionHeight (90vh) * sections.length  + .void_space (30vh)
            const scrollHeight = cdkScrollable.getElementRef().nativeElement.scrollHeight;
            const sectionHeight = clientHeight * this.sectionHeightScreenPercentage;
            const voidSpaceHeight = clientHeight * this.voidSpaceHeightScreenPercentage;
            const clientMiddlePoint = scrollTop + (clientHeight / 2);
            // tslint:disable-next-line:max-line-length
            this.titleBackgroundContainer.nativeElement.style.transform = `translateX(-${((clientMiddlePoint - voidSpaceHeight) / sectionHeight) * 100}%)`;
            // tslint:disable-next-line:max-line-length
            const currentSection = clientMiddlePoint > voidSpaceHeight ? Math.ceil((clientMiddlePoint - voidSpaceHeight) / sectionHeight) : 0;

            if (this.activeSection !== currentSection) {
              this.activeSection = currentSection;
              this.changeDetectorRef.detectChanges();
            }
          });
  }

  ngOnDestroy() {
    this.sectionsSubscription.unsubscribe();
  }
}
