export class Order {
    constructor(
        public id?: number,
        public customerId?: number,
        public orderDate?: Date,
        public dueDate?: Date,
        public shipDate?: Date,
        public status?: string) { }
}