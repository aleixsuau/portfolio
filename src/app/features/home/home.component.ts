import { MenuService } from './../../core/services/menu/menu.service';
import { ConfigService } from './../../core/services/config/config.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
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
  voidSpaceHeightScreenPercentage = 0.5;
  activeSection: number;

  @ViewChild('homeBackgroundColor')
  homeBackgroundColor: ElementRef;
  @ViewChild('homeBackgroundTitle')
  homeBackgroundTitle: ElementRef;
  @ViewChild('titleBackgroundContainer')
  titleBackgroundContainer: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private scrollDispatcher: ScrollDispatcher,
    private elementRef: ElementRef,
    private menuService: MenuService,
    private ngZone: NgZone,
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
            // We add 1 pixel to scrollTop to cover the case where the scroll
            // comes from a click on an anchor (ie: #blog). In these cases
            // the scroll goes right to the pixel before the <section> starts
            // so it doesn't get activated (activeSection). Adding 1 pixels solves this.
            const scrollTop = cdkScrollable.measureScrollOffset('top') + 1;
            const clientHeight = cdkScrollable.getElementRef().nativeElement.clientHeight;
            // scrollHeight === clientHeight + scrollTop
            // scrollHeight === sectionHeight (90vh) * sections.length  + .void_space (30vh)
            const scrollHeight = cdkScrollable.getElementRef().nativeElement.scrollHeight;
            const sectionHeight = clientHeight * this.sectionHeightScreenPercentage;
            const scrolledPercentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 1000) / 10 ;
            const percentageToTranslateBackgrounTitle = scrolledPercentage * (this.sections.length - 1);
            const lastSection = this.sections.length - 1;
            const currentSection = scrollTop > sectionHeight ?
                                    Math.floor(scrollTop / sectionHeight) :
                                    0;

            this.titleBackgroundContainer.nativeElement.style.transform = `translateX(-${
                                                                            // Fix scroll throttle vagueness
                                                                            percentageToTranslateBackgrounTitle < -5 ?
                                                                              0 :
                                                                              percentageToTranslateBackgrounTitle
                                                                          }%)`;

            if (currentSection === lastSection) {
              this.homeBackgroundTitle.nativeElement.style.top = `-60vh`;
            }

            if (this.activeSection !== currentSection) {
              if (this.activeSection === lastSection) {
                this.homeBackgroundTitle.nativeElement.style.top = 0;
              }
              // To avoid performance issues, ancestorScrolled is runOutsideAngular
              // Here we call ngZone to trigger change detection and refresh views
              this.ngZone.run(() => {
                this.activeSection = currentSection;
                this.menuService.setActiveSection(this.activeSection);
              });
            }
          });
  }

  ngOnDestroy() {
    this.sectionsSubscription.unsubscribe();
  }
}
