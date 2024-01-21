import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatisticsComponent} from "./Statistic/pages/statistics.component";
import {FormsModule} from "@angular/forms";
import {ProductComponent} from "./product/pages/product.component";
import {DataTableComponent} from "../../shared/components/data-table/data-table.component";




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      {
        path: 'statistic',
        component: StatisticsComponent,
        data: {
          title: 'statistic',
        },
      },
      {
        path: 'product',
        component: ProductComponent,
        data: {
          title: 'product',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

