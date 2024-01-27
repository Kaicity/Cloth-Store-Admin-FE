import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {ProductComponent} from "./product/pages/product.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      // {
      //   path: 'statistic',
      //   component: StatisticsComponent,
      //   data: {
      //     title: 'statistic',
      //   },
      // },
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
