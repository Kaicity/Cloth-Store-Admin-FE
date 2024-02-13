import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';
import {LoginComponent} from "./views/base/login-page/login.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
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
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./views/base/payment/payment.module').then((m) => m.PaymentModule)
      },
      {
        path: 'receipt',
        loadChildren: () =>
          import('./views/base/receipt/receipt.module').then((m) => m.ReceiptModule)
      },
      {
        path: 'customer',
        loadChildren: () =>
            import('./views/base/customer/customer.module').then((m) => m.CustomerModule)
      },
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
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
