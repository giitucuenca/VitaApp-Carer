import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Modal } from '../../../../assets/js/bootstrap.js';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modal') modal: ElementRef<HTMLElement>;
  @Input() modalTitle = '';
  @Input() modalContent = '';
  myModal: Modal;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.myModal = new Modal(this.modal.nativeElement);
  }

  openModal(): void {
    this.myModal.show();
  }

  closeModal(): void {}
}
