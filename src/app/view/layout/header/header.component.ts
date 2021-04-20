import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isCollapsed: boolean = true;

  @ViewChild('collapsePanel') collapsePanel: ElementRef<HTMLElement>;
  @ViewChild('panelContent') panelContent: ElementRef<HTMLElement>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.collapsePanel.nativeElement.clientWidth < 768) {
      this.collapsePanel.nativeElement.style.width =
        this.panelContent.nativeElement.clientWidth + 'px';
    } else {
      if (this.collapsePanel.nativeElement.clientWidth) {
        this.collapsePanel.nativeElement.style.width =
          this.panelContent.nativeElement.clientWidth + 'px';
      }
    }
  }
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.collapsePanel.nativeElement.style.width =
      this.panelContent.nativeElement.clientWidth + 'px';
  }

  collapse(): void {
    if (this.collapsePanel.nativeElement.clientWidth) {
      this.collapsePanel.nativeElement.style.width = '0';
      this.isCollapsed = true;
    } else {
      this.collapsePanel.nativeElement.style.width =
        this.panelContent.nativeElement.clientWidth + 'px';
      this.isCollapsed = false;
    }
  }

  openPanel(): void {
    if (!this.collapsePanel.nativeElement.clientWidth) {
      this.collapsePanel.nativeElement.style.width =
        this.panelContent.nativeElement.clientWidth + 'px';
      this.isCollapsed = false;
    }
  }

  closePanel(): void {
    if (this.collapsePanel.nativeElement.clientWidth) {
      this.collapsePanel.nativeElement.style.width = '0';
      this.isCollapsed = true;
    }
  }
}