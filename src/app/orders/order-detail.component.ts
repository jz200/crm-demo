import { Component, OnInit } from '@angular/core';
import { OrderLine } from '../model/line.model';
import { RestDataSource } from '../model/rest.datasource';
import { Product } from '../model/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../model/order.model';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId: number;
  newOrderLine: OrderLine;
  customer: Customer;
  order: Order;
  orderLines: OrderLine[];
  products: Product[];
  orderLineForm: FormGroup;

  validationMessages = {
    product: {
      required: 'Product is required.'
    },
    price: {
      required: 'Price is required.',
      pattern: 'Invalid Price'
    },
    orderQty: {
      required: 'Quantity is required.',
      pattern: "Invalid Quantity"
    }
  };

  formErrors = {
    product: '',
    price: '',
    orderQty: ''
  };

  constructor(private datasource: RestDataSource, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.orderId = + this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.datasource.getOrderLines().subscribe(data => this.orderLines = data.filter(ol => ol.orderId == this.orderId));
    this.datasource.getProducts().subscribe(data => this.products = data);
    this.datasource.getOrder(this.orderId).subscribe(order => {
      this.order = order;
      this.datasource.getCustomer(order.customerId).subscribe(c => this.customer = c);
    }, error => alert(error));

    this.orderLineForm = this.fb.group({
      product: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern("^[0-9\.]+$")]],
      orderQty: [null, [Validators.required, Validators.pattern("^(100|[1-9][0-9]?)$")]]
    });

    this.orderLineForm.controls.product.valueChanges.subscribe(data => {
      if (data) {
        const unitPrice = this.products.find(p => p.id == data).listPrice;
        this.orderLineForm.controls.price.setValue(unitPrice);
      }
      else {
        this.orderLineForm.controls.price.setValue(0);
      }
    });
    this.orderLineForm.valueChanges.subscribe(data => this.logValidationErrors(this.orderLineForm));
  }

  logValidationErrors(group: FormGroup = this.orderLineForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.get(key);
      if (control instanceof FormGroup) {
        this.logValidationErrors(control);
      }
      else {
        this.formErrors[key] = '';
        if (control && control.touched && !control.valid) {
          const messages = this.validationMessages[key];
          for (const errorKey in control.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  get orderTotal() {
    return this.orderLines.reduce((prev, current) => {
      prev[0] = prev[0] + current.orderQty;
      prev[1] = prev[1] + current.orderQty * current.unitPrice;
      return prev;
    }, [0, 0])
  }

  get orderLinesWItemNo() {
    const result = this.orderLines.map(line => {
      const item = this.products.find(p => p.id == line.productId);
      const newproperty = { itemNumber: item.itemNumber };
      return Object.assign(line, newproperty);
    });
    return result;
  }

  markConfirmed(): void {
    if (this.orderLines.length > 0) {
      this.order.status = 'Confirmed';
      this.datasource.updateOrder(this.order).subscribe(order => console.log("order status changed to confirmed!"));
    } else {
      alert("Please add at least one product line before confirming the order.");
    }
  }

  markVoided(): void {
    this.order.status = 'Voided';
    this.datasource.updateOrder(this.order).subscribe(order => console.log("order status changed to voided!"));
  }

  markShipped(): void {
    this.order.status = 'Shipped';
    this.order.shipDate = new Date();
    this.datasource.updateOrder(this.order).subscribe(order => console.log("order status changed to shipped!"));
  }

  deleteOrder(): void {
    if (confirm(`Are you sure you want to delete order # ${this.order.id}?`)) {
      this.orderLines.forEach(orderLine => this.datasource.deleteOrderLine(orderLine.id).subscribe(data => {
        console.log("orderline # " + orderLine.id + " has been deleted!");
      }));
      this.datasource.deleteOrder(this.orderId).subscribe(data => {
        console.log("order # " + this.orderId + " has been deleted!");
        this.router.navigate(['/orders'])
      });
    } else {
      console.log("you clicked cancel");
    }
  }

  deleteOrderLine(id: number): void {
    this.datasource.deleteOrderLine(id).subscribe(data => {
      this.orderLines.splice(this.orderLines.findIndex( ol => ol.id == id), 1);
      alert("orderline # " + id + " has been deleted!");
    });
  }

  resetForm(): void {
    this.orderLineForm.reset();
  }

  onSubmit(): void {
    if (this.orderLineForm.valid) {
      //prepare data
      this.newOrderLine = new OrderLine();
      this.newOrderLine.orderId = this.orderId;
      this.newOrderLine.productId = +this.orderLineForm.controls.product.value;
      this.newOrderLine.orderQty = +this.orderLineForm.get('orderQty').value;
      this.newOrderLine.unitPrice = +this.orderLineForm.get('price').value;
      //post to rest data service
      this.datasource.postOrderLine(this.newOrderLine).subscribe(orderline => this.orderLines.push(orderline));
      //reset form and clean new orderline object
      this.orderLineForm.reset();
      this.newOrderLine = new OrderLine();
    }
  }
}
