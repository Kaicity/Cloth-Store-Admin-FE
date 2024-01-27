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
      // {
      //   path: 'statistic',
      //   loadChildren: () =>
      //     import('./views/base/Statistic/statistics.module').then((m) => m.StatisticsModule)
      // },
      {
        path: 'product',
        loadChildren: () =>
          import('./views/base/product/product.module').then((m) => m.ProductModule)
      },
      {
        path: 'test',
        loadChildren: () =>
          import('./views/base/test/test.module').then((m) => m.TestModule)
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
