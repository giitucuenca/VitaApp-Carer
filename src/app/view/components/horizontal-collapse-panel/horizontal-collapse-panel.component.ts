import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-horizontal-collapse-panel',
  templateUrl: './horizontal-collapse-panel.component.html',
  styleUrls: ['./horizontal-collapse-panel.component.scss'],
})
export class HorizontalCollapsePanelComponent implements OnInit {
  isCollapsed: boolean = true;

  @ViewChild('collapsePanel') collapsePanel: ElementRef<HTMLElement>;
  @ViewChild('panelContent') panelContent: ElementRef<HTMLElement>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.collapsePanel.nativeElement.clientWidth) {
      this.collapsePanel.nativeElement.style.width =
        this.panelContent.nativeElement.clientWidth + 'px';
    }
  }
  constructor() {}

  ngOnInit(): void {}

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
