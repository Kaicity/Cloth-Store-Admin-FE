import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'statistic',
        loadChildren: () =>
          import('./views/base/statistic/statistics.module').then((m) => m.StatisticsModule)
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./views/base/product/product.module').then((m) => m.ProductModule)
      },
      {
        path: 'bill-real-time',
        loadChildren: () =>
          import('./views/base/bill-real-time/bill-real-time.module').then((m) => m.BillRealTimeModule)
      }
    ]
  },

  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
