import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ControlMaterial} from "../../../UI-COMPONENT/ControlMaterial";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {BillRealTimeComponent} from "./pages/bill-real-time.component";

export const routes: Routes = [
  {
    path: '',
    component: BillRealTimeComponent,

  },
];

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    ControlMaterial,
    DataTableComponent,
  ]
})

export class BillRealTimeModule {

}
