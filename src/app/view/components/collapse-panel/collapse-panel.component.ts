import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-collapse-panel',
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss'],
})
export class CollapsePanelComponent implements OnInit {
  isCollapsed: boolean = true;

  @ViewChild('collapsePanel') collapsePanel: ElementRef<HTMLElement>;
  @ViewChild('panelContent') panelContent: ElementRef<HTMLElement>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.collapsePanel.nativeElement.clientHeight) {
      this.collapsePanel.nativeElement.style.height =
        this.panelContent.nativeElement.clientHeight + 'px';
    }
  }
  constructor() {}

  ngOnInit(): void {}

  collapse(): void {
    if (this.collapsePanel.nativeElement.clientHeight) {
      this.collapsePanel.nativeElement.style.height = '0';
      this.isCollapsed = true;
    } else {
      this.collapsePanel.nativeElement.style.height =
        this.panelContent.nativeElement.clientHeight + 'px';
      this.isCollapsed = false;
    }
  }

  openPanel(): void {
    if (!this.collapsePanel.nativeElement.clientHeight) {
      this.collapsePanel.nativeElement.style.height =
        this.panelContent.nativeElement.clientHeight + 'px';
      this.isCollapsed = false;
    }
  }

  closePanel(): void {
    if (this.collapsePanel.nativeElement.clientHeight) {
      this.collapsePanel.nativeElement.style.height = '0';
      this.isCollapsed = true;
    }
  }
}
