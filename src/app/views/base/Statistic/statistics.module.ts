import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from './pages/statistics.component';
import {FormsModule} from "@angular/forms";

export const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,

  },
];

@NgModule({
  declarations: [
    StatisticsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule
  ]
})

export class StatisticsModule {

}
