import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomersComponent } from './customers/list-customers.component';
import { ListOrdersComponent } from './orders/list-orders.component';
import { CreateCustomerComponent } from './customers/create-customer.component';
import { CreateOrderComponent } from './orders/create-order.component';
import { CreateCustomerCanDeactivateGuard } from './customers/create-customer-candeactivateguard';
import { CustomerDetailComponent } from './customers/customer-detail.component';
import { OrdersResolverService } from './orders/orders-resolver.service';
import { CustomersResolverService } from './customers/customers-resolver.service';
import { NotfoundComponent } from './notfound.component';
import { CustomerDetailCanActivateGuard } from './customers/customer-detail-canactivateguard';
import { OrderDetailCanActivateGuard } from './orders/order-detail-canactivateguard';
import { OrderDetailComponent } from './orders/order-detail.component';

const routes: Routes = [
  {path: 'customers', component: ListCustomersComponent, resolve: { customers: CustomersResolverService}},
  {path: 'customers/detail/:id', component: CustomerDetailComponent, canActivate: [CustomerDetailCanActivateGuard]},
  {path: 'customers/create', component: CreateCustomerComponent, canDeactivate: [CreateCustomerCanDeactivateGuard]},
  {path: 'orders', component: ListOrdersComponent, resolve: { orders: OrdersResolverService, customers: CustomersResolverService}},
  {path: 'orders/create', component: CreateOrderComponent},
  {path: 'orders/detail/:id', component: OrderDetailComponent, canActivate: [OrderDetailCanActivateGuard]},
  {path: 'notfound', component: NotfoundComponent},
  {path: '', redirectTo: '/customers', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CreateCustomerCanDeactivateGuard, OrdersResolverService, CustomerDetailCanActivateGuard, OrderDetailCanActivateGuard, CustomersResolverService]
})
export class AppRoutingModule { }
