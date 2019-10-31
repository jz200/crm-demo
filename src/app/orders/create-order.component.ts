import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { Router, ActivatedRoute } from "@angular/router";
import { RestDataSource } from '../model/rest.datasource';
import { Customer } from '../model/customer.model';

@Component({
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  order: Order = new Order();
  customers: Customer[];

  addOrder: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private datasource: RestDataSource) {
    
    if (this.route.snapshot.queryParamMap.has('customerId')){
      this.order.customerId = + this.route.snapshot.queryParamMap.get('customerId');
      this.addOrder = true;
    } else {
      this.order.customerId = -1;
    }
  }

  ngOnInit(): void {
    this.datasource.getCustomers().subscribe( customers => this.customers = customers);
  }

  save(order: Order) {
    this.order.status='Draft';
    this.datasource.postOrder(this.order).subscribe(order => this.router.navigate(['/orders/detail', order.id]));
  }
}
