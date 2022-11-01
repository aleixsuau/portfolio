import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Input()
  works: IWork[];

  selectedWork: IWork;
  selectedWorkIndex = 0;
  selectedWorkLink: SafeResourceUrl;
  iframeLoading: boolean;
  dialogRef: MatDialogRef<TemplateRef<any>>;

  @ViewChild('codeIframeTemplate')
  codeIframeTemplate: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    if (!this.works) {
      this.works = this.activatedRoute.snapshot.data.works;
    }
  }

  openWorkInDialog(index: number) {
    this.selectedWorkIndex = index;
    this.selectedWork = {...this.works[index]};
    let templateToShow = null;

    const isIframe = this.selectedWork.categories.find(category => category.title === 'code');

    if (isIframe) {
      this.iframeLoading = true;
      this.selectedWorkLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedWork.link);
      templateToShow = this.codeIframeTemplate;

      setTimeout(() => {
        this.iframeLoading = false;
      }, 5000);
    }

    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(templateToShow, {panelClass: 'dialog__iframe'});

      this.dialogRef.afterClosed().subscribe(() => this.dialogRef = null);
    }
  }
}
