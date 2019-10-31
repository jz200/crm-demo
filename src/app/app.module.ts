import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListCustomersComponent } from './customers/list-customers.component';
import { ListOrdersComponent } from './orders/list-orders.component';
import { CreateCustomerComponent } from './customers/create-customer.component';
import { CreateOrderComponent } from './orders/create-order.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';

import { RestDataSource } from './model/rest.datasource';
import { CustomerDetailComponent } from './customers/customer-detail.component';
import { NotfoundComponent } from './notfound.component';
import { OrderDetailComponent } from './orders/order-detail.component';
import { DisplayCustomerComponent } from './customers/display-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCustomersComponent,
    ListOrdersComponent,
    CreateCustomerComponent,
    CreateOrderComponent,
    CustomerDetailComponent,
    NotfoundComponent,
    SelectRequiredValidatorDirective,
    OrderDetailComponent,
    DisplayCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RestDataSource],
  bootstrap: [AppComponent]
})
export class AppModule { }
