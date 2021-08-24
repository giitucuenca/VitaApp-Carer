import { AuthService } from 'src/app/services/auth/auth.service';
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
import { MessageNotContentComponent } from './view/components/message-not-content/message-not-content.component';
import { AddHelperComponent } from './view/forms/helpers/add-helper/add-helper.component';
import { EditHelperComponent } from './view/forms/helpers/edit-helper/edit-helper.component';
import { EditCategoryComponent } from './view/forms/category/edit-category/edit-category.component';
import { EditSubcategoryComponent } from './view/forms/subcategory/edit-subcategory/edit-subcategory.component';
import { EditPictogramComponent } from './view/forms/pictogram/edit-pictogram/edit-pictogram.component';
import { PageNotFoundComponent } from './view/components/page-not-found/page-not-found.component';
import { MessagesComponent } from './view/components/messages/messages.component';
import { DragExampleComponent } from './view/grid/drag-example/drag-example.component';
import { ImagesRadioComponent } from './view/components/images-radio/images-radio.component';
import { EditPictogramHelperComponent } from './view/forms/helpers/edit-pictogram-helper/edit-pictogram-helper.component';
import { ElderlyEditComponent } from './view/elderly/elderly-edit/elderly-edit.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MessagesElderlyComponent } from './view/messages/messages-elderly/messages-elderly.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LdsSpinnerComponent } from './view/components/lds-spinner/lds-spinner.component';
import { GestionPanelComponent } from './view/board/gestion-panel/gestion-panel.component';

// probando git-hub

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
    MessageNotContentComponent,
    AddHelperComponent,
    EditHelperComponent,
    EditCategoryComponent,
    EditSubcategoryComponent,
    EditPictogramComponent,
    PageNotFoundComponent,
    ImagesRadioComponent,
    MessagesComponent,
    DragExampleComponent,
    EditPictogramHelperComponent,
    ElderlyEditComponent,
    MessagesElderlyComponent,
    LdsSpinnerComponent,
    GestionPanelComponent,
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
    ConfirmDialogModule,
    ToastModule,
    BadgeModule,
    ScrollingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
