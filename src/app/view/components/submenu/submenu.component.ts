import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent implements OnInit {
  @ViewChild('collapsePanel') collapsePanel: ElementRef<HTMLElement>;
  @ViewChild('panelContent') panelContent: ElementRef<HTMLElement>;
  @Input() showEdit: boolean = false;
  @Output() clickEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  isCollapsed = true;
  constructor() {}

  ngOnInit(): void {}

  collapse(): void {
    if (this.isCollapsed) {
      this.collapsePanel.nativeElement.style.transform = 'translateX(0%)';
      this.panelContent.nativeElement.style.height = 'auto';
      this.panelContent.nativeElement.style.width = 'auto';
      this.panelContent.nativeElement.style.overflow = 'visible';
      this.isCollapsed = false;
    } else {
      this.collapsePanel.nativeElement.style.transform = 'translateX(100%)';
      setTimeout(() => {
        this.panelContent.nativeElement.style.height = '0';
        this.panelContent.nativeElement.style.width = '0';
        this.panelContent.nativeElement.style.overflow = 'hidden';
        this.isCollapsed = true;
      }, 500);
    }
  }

  clickedEdit(): void {
    this.clickEdit.emit(true);
  }

  clickedSave(): void {
    this.clickSave.emit(true);
  }
}
