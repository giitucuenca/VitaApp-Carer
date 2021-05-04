import { Component, OnInit, ViewChild } from '@angular/core';
import { Carer } from 'src/app/controller/interfaces/carer.interface';
import { Elderly } from 'src/app/controller/interfaces/elderly.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { CollapsePanelComponent } from 'src/app/view/components/collapse-panel/collapse-panel.component';

@Component({
  selector: 'app-elderly-crud',
  templateUrl: './elderly-crud.component.html',
  styleUrls: ['./elderly-crud.component.scss'],
})
export class ElderlyCrudComponent implements OnInit {
  showAddElderly = false;
  @ViewChild('updatePanel') updatePanel: CollapsePanelComponent;
  elderlies: Elderly[] = [];

  constructor(private vitaapp: VitaappService) {}

  ngOnInit(): void {
    this.vitaapp.meInformation().subscribe((carer: Carer) => {
      this.vitaapp.getAllElderlies(carer.carerId).subscribe((elderlies) => {
        this.elderlies = elderlies;
        console.log(elderlies);
      });
    });
  }

  getAllElderlies(): void {}

  setShowAddElderly(): void {
    this.showAddElderly = !this.showAddElderly;
  }

  updateElderly(): void {
    this.updatePanel.collapse();
  }
}
