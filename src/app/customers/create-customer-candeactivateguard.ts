import { CanDeactivate } from '@angular/router';
import { CreateCustomerComponent } from './create-customer.component';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateCustomerCanDeactivateGuard implements CanDeactivate<CreateCustomerComponent> {
    canDeactivate(component: CreateCustomerComponent): boolean {
        if (component.createCustomerForm.dirty) {
            return confirm("Are you sure you want discard the changes?");
        }
        return true;        
    } 
}

