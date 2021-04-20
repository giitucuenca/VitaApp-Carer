import { EditPictogramsAssistanceComponent } from './carer/edit-pictograms-assistance/edit-pictograms-assistance.component';
import { CrudOptionsPanelComponent } from './carer/crud-options-panel/crud-options-panel.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElderlyCrudComponent } from './elderly/elderly-crud/elderly-crud.component';
import { ElderlyCategoriesComponent } from './elderly/elderly-categories/elderly-categories.component';
import { EditCategoriesComponent } from './carer/edit-categories/edit-categories.component';
import { EditSubcategoriesComponent } from './carer/edit-subcategories/edit-subcategories.component';
import { EditPictogramsComponent } from './carer/edit-pictograms/edit-pictograms.component';
import { CrudAssistancesComponent } from './carer/crud-assistances/crud-assistances.component';
import { CreateAssistancesComponent } from './carer/create-assistances/create-assistances.component';
import { SelectAssistancesComponent } from './carer/select-assistances/select-assistances.component';
import { SelectCategoriesComponent } from './carer/select-categories/select-categories.component';
import { SelectSubcategoriesComponent } from './carer/select-subcategories/select-subcategories.component';
import { SelectPictogramsComponent } from './carer/select-pictograms/select-pictograms.component';
import { EditGridComponent } from './grid/edit-grid/edit-grid.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'adulto-mayor',
        component: ElderlyCrudComponent,
      },
      {
        path: 'asignar-tablero',
        component: ElderlyCategoriesComponent,
      },
      {
        path: '',
        component: CrudOptionsPanelComponent,
        children: [
          {
            path: 'panel/seleccionar-categorias',
            component: SelectCategoriesComponent,
          },
          {
            path: 'panel/seleccionar-subcategorias/:id',
            component: SelectSubcategoriesComponent,
          },
          {
            path: 'panel/seleccionar-pictogramas/:id',
            component: SelectPictogramsComponent,
          },
          {
            path: 'panel/editar-categorias',
            component: EditCategoriesComponent,
          },
          {
            path: 'panel/editar-subcategorias/:id',
            component: EditSubcategoriesComponent,
          },
          {
            path: 'panel/editar-pictogramas/:id',
            component: EditPictogramsComponent,
          },
          {
            path: 'panel/editar-grid/:id',
            component: EditGridComponent,
          },
        ],
      },
      {
        path: '',
        component: CrudAssistancesComponent,
        children: [
          {
            path: 'ayuda/crear-ayuda',
            component: CreateAssistancesComponent,
          },
          {
            path: 'ayuda/editar-ayuda/:id',
            component: EditPictogramsAssistanceComponent,
          },
          {
            path: 'ayuda/seleccionar-ayudas/:id',
            component: SelectAssistancesComponent,
          },
        ],
      },
    ],
    //canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
