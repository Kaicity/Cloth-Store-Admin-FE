import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductComponent} from "./pages/product.component";
import {MatTableModule} from "@angular/material/table";
import {ControlMaterial} from "../../../UI-COMPONENT/ControlMaterial";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {NgForOf} from "@angular/common";
import {ModalWrapperComponent} from "../../../shared/components/modal-wrapper/modal-wrapper.component";
import {AppAddProductComponent} from "./components/app-add-product/app-add-product.component";
import {AppSeachProductComponent} from "./components/app-seach-product/app-seach-product.component";

export const routes: Routes = [
  {
    path: '',
    component: ProductComponent,

  },
];

@NgModule({
  declarations: [
    ProductComponent,
    AppAddProductComponent,
    AppSeachProductComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    ControlMaterial,
    DataTableComponent,
    NgForOf,
    ModalWrapperComponent,
    ReactiveFormsModule,
  ]
})

export class ProductModule {

}
