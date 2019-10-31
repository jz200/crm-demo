import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  customersPerPage = 5;
  selectedPage = 1;

  customers: Customer[];

  constructor(private route: ActivatedRoute, private router: Router) {
    if (this.route.snapshot.queryParamMap.has('p')) {
      this.selectedPage = +this.route.snapshot.queryParamMap.get('p');
    }
    if (this.route.snapshot.queryParamMap.has('firstName')) {
      this.firstName = this.route.snapshot.queryParamMap.get('firstName');
    }
    if (this.route.snapshot.queryParamMap.has('lastName')) {
      this.lastName=this.route.snapshot.queryParamMap.get('lastName');
    }
    if (this.route.snapshot.queryParamMap.has('email')) {
      this.email = this.route.snapshot.queryParamMap.get('email');
    }
    if (this.route.snapshot.queryParamMap.has('phoneNumber')) {
      this.phoneNumber = this.route.snapshot.queryParamMap.get('phoneNumber');
    }
  }

  ngOnInit(): void {
    this.customers= this.route.snapshot.data['customers'];
  }

  get filteredCustomers(): Customer[] {
    let filteredCustomers = this.customers;
    if (this.firstName) {
      filteredCustomers = filteredCustomers.filter(c => c.firstName.toLowerCase().includes(this.firstName.toLowerCase()));
    }
    if (this.lastName) {
      filteredCustomers = filteredCustomers.filter(c => c.lastName.toLowerCase().includes(this.lastName.toLowerCase()));
    }
    if (this.email) {
      filteredCustomers = filteredCustomers.filter(c => c.email.toLowerCase().includes(this.email.toLowerCase()));
    }
    if (this.phoneNumber) {
      filteredCustomers = filteredCustomers.filter(c => c.phoneNumber.toString().includes(this.phoneNumber));
    }
    filteredCustomers.sort( (a, b) => a.id - b.id);
    return filteredCustomers;
  }

  get pageCustomers(): Customer[] {
    let pageIndex = (this.selectedPage - 1) * this.customersPerPage;
    return this.filteredCustomers.slice(pageIndex, pageIndex + this.customersPerPage);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.filteredCustomers.length / this.customersPerPage)).fill(0).map((x, i) => i + 1);
  }

  viewDetail(id: number): void {
    this.router.navigate(['customers/detail', id], {
      queryParams: {'p': this.selectedPage, 'firstName': this.firstName, 'lastName': this.lastName, 'email': this.email, 'phoneNumber': this.phoneNumber}
    })
  }
}
