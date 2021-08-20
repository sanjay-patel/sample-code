import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { TransportAddComponent } from './containers/transport-add/transport-add.component';
import { TransportListComponent } from './containers/transport-list/transport-list.component';
import { AntModule } from '../shared/ant.module';


@NgModule({
  declarations: [
    TransportAddComponent,
    TransportListComponent
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    AntModule
  ]
})
export class TransportModule { }
