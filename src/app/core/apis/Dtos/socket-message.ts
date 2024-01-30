import {ExportingBillDto} from "./ExportingBillDto";

export interface SocketMessage<T>{
    message: string;
    idSocket: string;
    data:T;
}
