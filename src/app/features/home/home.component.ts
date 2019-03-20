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

    // Set background height & color
    const colors = this.sections.map(section => section.background_color).join(' ,');
    this.homeBackgroundColor.nativeElement.style.backgroundImage = `linear-gradient(to bottom, ${colors})`;
    this.homeBackgroundColor.nativeElement.style.height = `${((this.sections.length *
                                                            this.sectionHeightScreenPercentage) +
                                                            this.voidSpaceHeightScreenPercentage) *
                                                            100}vh`;

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
            const percentageToTranslateBackgrounTitle = Math.round(((clientMiddlePoint - voidSpaceHeight) / sectionHeight) * 1000) / 10;
            this.titleBackgroundContainer.nativeElement.style.transform = `translateX(-${
                                                                            // Fix scroll throttle vagueness
                                                                            percentageToTranslateBackgrounTitle < -5 ?
                                                                              0 :
                                                                              percentageToTranslateBackgrounTitle
                                                                          }%)`;
            const currentSection = scrollTop > sectionHeight ?
                                    Math.floor(scrollTop / sectionHeight) :
                                    0;

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
