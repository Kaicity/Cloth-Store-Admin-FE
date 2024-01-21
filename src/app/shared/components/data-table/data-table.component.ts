import {Component, Input} from '@angular/core';
import {PeriodicElement} from "../../../views/base/product/pages/product.component";
import {ControlMaterial} from "../../../UI-COMPONENT/ControlMaterial";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  imports: [
    ControlMaterial
  ],
  standalone: true
})
export class DataTableComponent {
  displayedColumns: string[] = ['id', 'code', 'name', 'price', 'status', 'image', 'description', 'menu'];
  @Input() dataTable!: PeriodicElement[];
  @Input() columnNumber! : number ;
  @Input() tableFormatClass! : string

}
