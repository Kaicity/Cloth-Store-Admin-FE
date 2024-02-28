import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';
import {DashboardComponent} from "./views/base/dashboard/pages/dashboard.component";
import {LoginComponent} from "./modules/login-page/login.component";


const routes: Routes = [

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
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/base/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'supplier',
        loadChildren: () =>
          import('./views/base/supplier/supplier.module').then((m) => m.SupplierModule)
      },
      {
        path: 'importing',
        loadChildren: () =>
          import('./views/base/importing/importing.module').then((m) => m.ImportingModule)
      },
      {
        path: 'exporting',
        loadChildren: () =>
          import('./views/base/exportingbill/Exporting.module').then((m) => m.ExportingModule)
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
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit{
  ngOnInit(): void {
    alert("Hello");
  }
}
