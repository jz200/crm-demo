import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { RestDataSource } from '../model/rest.datasource';
import { Customer } from '../model/customer.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable()
export class CustomerDetailCanActivateGuard implements CanActivate {

    constructor(private datasource: RestDataSource, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const id = +route.paramMap.get('id');
        return this.datasource.getCustomers().pipe(map(data => {
            if (data.filter(c => c.id == id).length > 0) {
                return true;
            }
            else {
                this.router.navigate(['notfound']);
                return false;
            }
        }));
    }
}
