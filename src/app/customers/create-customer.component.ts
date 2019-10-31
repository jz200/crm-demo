import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../model/customer.model';
import { Router } from "@angular/router";
import { RestDataSource } from '../model/rest.datasource';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  @ViewChild('customerForm')
  public createCustomerForm: NgForm;
  customer: Customer = new Customer();
  constructor(private router: Router, private datasource: RestDataSource) { }

  save(customer: Customer) {
    this.datasource.postCustomer(customer).subscribe(customer => {
      alert(`${customer.firstName} ${customer.lastName} has been added as a new customer.`);
      //reset the form to avoid triggering router guard     
      this.createCustomerForm.reset();
      this.router.navigate(['customers']);
    });


  }
}
