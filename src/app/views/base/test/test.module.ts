import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ControlMaterial} from "../../../UI-COMPONENT/ControlMaterial";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {TestComponent} from "./pages/test.component";

export const routes: Routes = [
  {
    path: '',
    component: TestComponent,

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

export class TestModule {

}
