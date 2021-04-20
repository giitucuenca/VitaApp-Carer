import { Component, OnInit, ViewChild } from '@angular/core';
import { CollapsePanelComponent } from 'src/app/view/components/collapse-panel/collapse-panel.component';

@Component({
  selector: 'app-elderly-crud',
  templateUrl: './elderly-crud.component.html',
  styleUrls: ['./elderly-crud.component.scss'],
})
export class ElderlyCrudComponent implements OnInit {
  showAddElderly = false;
  @ViewChild('updatePanel') updatePanel: CollapsePanelComponent;

  constructor() {}

  ngOnInit(): void {}

  setShowAddElderly(): void {
    this.showAddElderly = !this.showAddElderly;
  }

  updateElderly(): void {
    this.updatePanel.collapse();
  }
}
