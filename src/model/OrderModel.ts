import { OrderItemModel } from "./OrderItemModel";

export class OrderModel {
    public id: number;
    public orderNumber: number;
    public orderLabel: string;
    public fullPrice: number;
    public itensQty: number;
    public status: string; //NP = Not prepared, IP = In Prepare, RD = ready, DL = delivered
    public items: Array<OrderItemModel>;
}