import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { Message, MessageService } from 'primeng/api';
import { MessagesComponent } from '../../components/messages/messages.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-gestion-panel',
  templateUrl: './gestion-panel.component.html',
  styleUrls: ['./gestion-panel.component.scss'],
})
export class GestionPanelComponent implements OnInit {
  @ViewChild('message') message: MessagesComponent;
  /*
   * Id:
   *     - 0: contenedor mensaje
   *     - 1: Boton eliminar
   *     - 2: Boton eliminar todo
   *     - 3: Boton enviar
   */

  finished: boolean = true;
  pictogramsDefault = [
    {
      id: '0',
      type: 'msg',
      index: 3,
    },
    {
      id: '1',
      type: 'pic',
      name: 'Borrar',
      imageUrl: 'assets/Images/delete.png',
      color: 'FFE4AE',
    },
    {
      id: '2',
      type: 'pic',
      name: 'Borrar Todo',
      imageUrl: 'assets/Images/delete-all.png',
      color: 'FFE4AE',
    },

    {
      id: '3',
      type: 'pic',
      name: 'Enviar',
      imageUrl: 'assets/Images/entregar.png',
      color: 'B7FF9E',
    },
  ];

  pictograms = [];

  constructor(
    private vitaapp: VitaappService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPositionPanel();
  }

  items = [];

  change = false;

  drop(event: CdkDragDrop<any>) {
    this.change = true;

    this.pictograms[event.previousContainer.data.index] =
      event.container.data.item;
    this.pictograms[event.container.data.index] =
      event.previousContainer.data.item;
    console.log(this.pictograms);
  }

  get getPictograms(): any[] {
    return this.pictograms;
  }

  savePosition(): void {
    if (this.finished) {
      this.vitaapp.meInformation().subscribe(
        (carer: Carer) => {
          const carerId = carer.carerId;

          let positions: string = this.getPictograms
            .reduce(
              (accumulater, currentValue) =>
                accumulater + '-' + currentValue.id,
              ''
            )
            .substring(1);
          const data = {
            positions,
            carerId,
          };
          console.log(data);
          this.finished = false;
          this.vitaapp.savePositionAdminPanel(data).subscribe(
            (resp) => {
              console.log(resp);
              this.finished = true;
              const msg = {
                severity: 'success',
                summary: 'Realizado',
                detail: resp.message,
              };
              this.message.createMessage(msg);
            },
            (error) => {
              this.finished = true;
              const msg = {
                severity: 'error',
                summary: 'Error',
                detail: error.message,
              };
              this.message.createMessage(msg);
            }
          );
        },
        (error) => {
          const msg = {
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          };
          this.message.createMessage(msg);
          this.finished = true;
        }
      );
    }
  }

  set setChange(change: boolean) {
    this.change = change;
  }

  get getChange(): boolean {
    return this.change;
  }

  getPositionPanel(): void {
    this.vitaapp.getPositionAdminPanel().subscribe((data: any[]) => {
      if (data.length) {
        const ids = data[0].positions.split('-');

        ids.forEach((id: string) => {
          this.pictograms.push(this.pictogramsDefault[+id]);
        });
      } else {
        this.pictograms = this.pictogramsDefault;
      }
    });
  }

  showMessage(msg: Message) {
    this.messageService.add({
      key: 'toastElderlyAdd',
      ...msg,
    });
  }
}
