import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { RestDataSource } from '../model/rest.datasource';
import { Customer } from '../model/customer.model';

@Injectable()
export class CustomersResolverService implements Resolve<Customer[]> {
    constructor(private datasource: RestDataSource) { 
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.datasource.getCustomers();
    }
}