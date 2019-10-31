import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../model/customer.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-customer',
  templateUrl: './display-customer.component.html',
  styleUrls: ['./display-customer.component.css']
})
export class DisplayCustomerComponent implements OnInit {
  @Input()
  customer: Customer;
  id: number = 0;

  constructor(private route: ActivatedRoute) {
    if (this.route.snapshot.paramMap.has('id')){
      this.id = +this.route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit() {
  }

}
