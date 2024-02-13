import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ControlMaterial} from "../../../UI-COMPONENT/ControlMaterial";
import {DataTableComponent} from "../../../shared/components/data-table/data-table.component";
import {StatisticsComponent} from "./pages/statistics.component";
import {DatePickerComponent} from "../../../shared/components/date-picker/date-picker.component";


export const routes: Routes = [
    {
        path: '',
        component: StatisticsComponent,

    },
];


@NgModule({
    declarations: [
        StatisticsComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        MatTableModule,
        ControlMaterial,
        DataTableComponent,
        DatePickerComponent

    ]
})

export class StatisticsModule {

}
