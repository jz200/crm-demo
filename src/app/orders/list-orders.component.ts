import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer.model';
import { Order } from "../model/order.model";
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-orders.component.html'
})
export class ListOrdersComponent implements OnInit {

  id: number;
  customerName: string;
  email: string;

  ordersPerPage = 10;
  selectedPage = 1;

  orders: Order[];
  customers: Customer[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orders = this.route.snapshot.data['orders'];
    this.customers = this.route.snapshot.data['customers'];
  }

  get fullOrders() {
    const result = this.orders.map(order => {
      const item = this.customers.find(customer => customer.id == order.customerId);
      const name = item.firstName + " " + item.lastName;
      const email = item.email;
      const newproperties = {
        customerName: name,
        email: email
      };
      return Object.assign(order, newproperties);
    });
    return result;
  }

  get filteredOrders() {
    let fOrders = this.fullOrders;
    if (this.id) {
      fOrders = fOrders.filter(o => o.id == this.id);
    }
    if (this.customerName) {
      fOrders = fOrders.filter(o => o.customerName.toLowerCase().includes(this.customerName.toLowerCase()));
    }
    if (this.email) {
      fOrders = fOrders.filter(o => o.email.includes(this.email));
    }   
    return fOrders;
  }

  get pageOrders(): Customer[] {
    let pageIndex = (this.selectedPage - 1) * this.ordersPerPage;
    return this.filteredOrders.slice(pageIndex, pageIndex + this.ordersPerPage);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.filteredOrders.length / this.ordersPerPage)).fill(0).map((x, i) => i + 1);
  }

}
