import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Order } from '../model/order.model';
import { Injectable } from '@angular/core';
import { RestDataSource } from '../model/rest.datasource';

@Injectable()
export class OrdersResolverService implements Resolve<Order[]> {
    constructor(private datasource: RestDataSource) { 
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.datasource.getOrders();      
    }
}