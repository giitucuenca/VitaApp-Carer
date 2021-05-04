import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { LoginComponent } from './view/auth/login/login.component';
import { ModalComponent } from './view/components/modal/modal.component';
import { HeaderComponent } from './view/layout/header/header.component';
import { LayoutComponent } from './view/layout/layout/layout.component';
import { ElderlyCrudComponent } from './view/elderly/elderly-crud/elderly-crud.component';
import { AppRoutingModule } from './view/app.routing';
import { ElderlyAddComponent } from './view/elderly/elderly-add/elderly-add.component';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { CollapsePanelComponent } from './view/components/collapse-panel/collapse-panel.component';
import { ElderlyCategoriesComponent } from './view/elderly/elderly-categories/elderly-categories.component';
import { CardComponent } from './view/components/card/card.component';
import { SplitterModule } from 'primeng/splitter';
import { CrudOptionsPanelComponent } from './view/carer/crud-options-panel/crud-options-panel.component';
import { ButtonModule } from 'primeng/button';
import { HorizontalCollapsePanelComponent } from './view/components/horizontal-collapse-panel/horizontal-collapse-panel.component';
import { EditSubcategoriesComponent } from './view/carer/edit-subcategories/edit-subcategories.component';
import { EditPictogramsComponent } from './view/carer/edit-pictograms/edit-pictograms.component';
import { EditPictogramsAssistanceComponent } from './view/carer/edit-pictograms-assistance/edit-pictograms-assistance.component';
import { EditCategoriesComponent } from './view/carer/edit-categories/edit-categories.component';
import { CrudAssistancesComponent } from './view/carer/crud-assistances/crud-assistances.component';
import { CreateAssistancesComponent } from './view/carer/create-assistances/create-assistances.component';
import { SelectAssistancesComponent } from './view/carer/select-assistances/select-assistances.component';
import { SubmenuComponent } from './view/components/submenu/submenu.component';
import { SelectCategoriesComponent } from './view/carer/select-categories/select-categories.component';
import { SelectSubcategoriesComponent } from './view/carer/select-subcategories/select-subcategories.component';
import { SelectPictogramsComponent } from './view/carer/select-pictograms/select-pictograms.component';
import { EditGridComponent } from './view/grid/edit-grid/edit-grid.component';
import { GridDragDropComponent } from './view/grid/grid-drag-drop/grid-drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalComponent,
    HeaderComponent,
    LayoutComponent,
    ElderlyCrudComponent,
    ElderlyAddComponent,
    CollapsePanelComponent,
    ElderlyCategoriesComponent,
    CardComponent,
    CrudOptionsPanelComponent,
    HorizontalCollapsePanelComponent,
    EditSubcategoriesComponent,
    EditPictogramsComponent,
    EditPictogramsAssistanceComponent,
    EditCategoriesComponent,
    CrudAssistancesComponent,
    CreateAssistancesComponent,
    SelectAssistancesComponent,
    SubmenuComponent,
    SelectCategoriesComponent,
    SelectSubcategoriesComponent,
    SelectPictogramsComponent,
    EditGridComponent,
    GridDragDropComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FieldsetModule,
    PanelModule,
    SplitterModule,
    ButtonModule,
    DragDropModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
