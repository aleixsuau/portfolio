import { MenuService } from './../../core/services/menu/menu.service';
import { ConfigService } from './../../core/services/config/config.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone, AfterViewInit, TemplateRef, Inject } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { Subscription, take } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  works: ICollectionItem[];
  posts: ICollectionItem[];
  sections: IMenuSection[];
  sectionsSubscription: Subscription;
  sectionHeightScreenPercentage = 0.9;
  voidSpaceHeightScreenPercentage = 0.5;
  activeSection: number;
  iframeLoading: boolean;
  selectedWorkIndex = 0;
  selectedWorkLink: SafeResourceUrl;
  dialogRef: MatDialogRef<TemplateRef<any>>;

  @ViewChild('homeBackgroundColor')
  homeBackgroundColor: ElementRef;
  @ViewChild('homeBackgroundTitle')
  homeBackgroundTitle: ElementRef;
  @ViewChild('titleBackgroundContainer')
  titleBackgroundContainer: ElementRef;
  @ViewChild('codeIframeTemplate')
  codeIframeTemplate: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private scrollDispatcher: ScrollDispatcher,
    private elementRef: ElementRef,
    private menuService: MenuService,
    private ngZone: NgZone,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private readonly document: Document,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.works = this.activatedRoute.snapshot.data.content.works;
    this.posts = this.activatedRoute.snapshot.data.content.posts;
    this.sectionsSubscription = this.configService.$config.subscribe(config => this.sections = config.menu.sections);   

    this.scrollDispatcher
          .ancestorScrolled(this.elementRef, 50)
          .subscribe((cdkScrollable: CdkScrollable) => this.makeTheBackgroundShine(cdkScrollable));
  }

  ngAfterViewInit(): void {
    // Set background height & color
    const colors = this.sections.map(section => section.background_color).join(' ,'); 
    
    this.homeBackgroundColor.nativeElement.style.backgroundImage = `linear-gradient(to bottom, ${colors})`;
    this.homeBackgroundColor.nativeElement.style.height = `${((this.sections.length *
      this.sectionHeightScreenPercentage) +
      this.voidSpaceHeightScreenPercentage) *
      100}vh`;
  }

  ngOnDestroy() {
    this.sectionsSubscription.unsubscribe();
  }

  makeTheBackgroundShine(cdkScrollable: CdkScrollable) {
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
    const scrolledPercentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 1000) / 10;
    const percentageToTranslateBackgroundTitle = scrolledPercentage * (this.sections.length - 1);
    const lastSection = this.sections.length - 1;
    const currentSection = scrollTop > sectionHeight ?
      Math.floor(scrollTop / sectionHeight) :
      0;

    this.titleBackgroundContainer.nativeElement.style.transform = `translateX(-${
      // Fix scroll throttle vagueness
      percentageToTranslateBackgroundTitle < -5 ?
        0 :
        percentageToTranslateBackgroundTitle
      }%)`;

    if (currentSection === lastSection) {
      this.homeBackgroundTitle.nativeElement.style.top = `-60vh`;
    }

    if (this.activeSection !== currentSection) {
      if (this.activeSection === lastSection) {
        this.homeBackgroundTitle.nativeElement.style.top = 0;
      }

      this.ngZone.run(() => {
        this.activeSection = currentSection;
        
        this.menuService.setActiveSection(this.activeSection);
      });
    }
  };

  openWorkInDialog(index: number) {
    const selectedWork = this.works[index];
    let templateToShow = null;
    this.selectedWorkIndex = index;

    const isIframe = selectedWork.categories.find(category => category.title === 'code');

    if (isIframe) {
      this.iframeLoading = true;
      this.selectedWorkLink = this.sanitizer.bypassSecurityTrustResourceUrl(selectedWork.link);
      templateToShow = this.codeIframeTemplate;

      setTimeout(() => {
        this.iframeLoading = false;
      }, 5000);
    }

    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(templateToShow, { panelClass: 'dialog__iframe' });

      this.dialogRef.afterClosed().pipe(take(1)).subscribe(() => this.dialogRef = null);
    }
  }

  goToExternalUrl(index: number) {
    const url = this.posts[index].link;

    this.document.defaultView.open(url, '_blank');
  }
}
