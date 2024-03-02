import {BaseSearchModel} from "./Base-search.model";
import {ImportingReturnFullModel} from "./Importing-return-full.model";

export class ImportingReturnSearchModel extends BaseSearchModel<ImportingReturnFullModel[]> {
  idCompany!: string | null;
  status!: string | null;
}
