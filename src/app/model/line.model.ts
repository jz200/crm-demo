export class OrderLine {
    constructor(public id?: number,
        public orderId?: number,
        public productId?: number,
        public unitPrice?: number,
        public orderQty?: number) {}
}