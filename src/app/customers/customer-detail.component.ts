import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { Order } from '../model/order.model';
import { RestDataSource } from '../model/rest.datasource';
import { OrderLine } from '../model/line.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  id: number;
  customer: Customer;
  mode: string = 'view';
  orders: Order[];
  orderLines: OrderLine[];

  constructor(private route: ActivatedRoute, private router: Router, private datasource: RestDataSource) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.datasource.getCustomer(this.id).subscribe(c => this.customer = c);
    this.datasource.getOrders().subscribe(orders => this.orders = orders.filter(o => o.customerId == this.id));
    this.datasource.getOrderLines().subscribe(orderLines => this.orderLines = orderLines);

  }

  get ordersWSum() {
    const result = this.orders.map(order => {
      const orderLines = this.orderLines.filter(ol => ol.orderId == order.id);
      const itemCount = orderLines.reduce((prev, line) => prev + line.orderQty, 0);
      const orderTotal = orderLines.reduce((prev, line) => prev + line.orderQty * line.unitPrice, 0);
      const newproperties = { itemCount: itemCount, orderTotal: orderTotal };
      return Object.assign(order, newproperties);
    });
    return result;
  }

  saveCustomer(form: NgForm): void {
    if (form.valid) {
      this.datasource.updateCustomer(this.customer).subscribe(customer => this.mode = 'view');
    }
  }

  deleteCustomer(): void {
    if (confirm(`Are you sure you want to delete ${this.customer.firstName} ${this.customer.lastName}?`)) {
      this.datasource.deleteCustomer(this.id).subscribe(data => {
        alert(`${this.customer.firstName} ${this.customer.lastName} has been deleted.`);
        this.router.navigate(['customers']);
      });
    }
  }
}
