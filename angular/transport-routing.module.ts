import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportListComponent } from './containers/transport-list/transport-list.component';
import { TransportAddComponent } from './containers/transport-add/transport-add.component';

const routes: Routes = [
  {
    path: '',
    component: TransportListComponent,
    data: {
      breadcrumb: 'Display Name',
      customBreadcrumb: 'Display Name',
      title: 'File Manager',
      headerDisplay: "none"
    }
  },
  {
    path: 'add',
    component: TransportAddComponent,
    data: {
      headerDisplay: "none"
    }
  },
  {
    path: 'edit/:id',
    component: TransportAddComponent,
    data: {
      headerDisplay: "none"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
