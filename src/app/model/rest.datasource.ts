import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Customer } from "./customer.model";
import { Order } from "./order.model";
import { OrderLine } from "./line.model";
import { Product } from "./product.model";
import { catchError } from 'rxjs/operators';

@Injectable()
export class RestDataSource {
    baseUrl: string;
    constructor(private http: HttpClient) {
        this.baseUrl = "http://localhost:3000/";
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error: ', errorResponse.error.message);
        }        
        else {
            console.error('Server Side Error: ', errorResponse);
        }
        return throwError(`Problem with service: ${errorResponse.message}`);
    } 

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.baseUrl + "customers")
        .pipe(catchError(this.handleError));
    }

    getCustomer(id: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.baseUrl}customers/${id}`)
        .pipe(catchError(this.handleError));
    }

    postCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.baseUrl + "customers", customer)
        .pipe(catchError(this.handleError));
    }

    updateCustomer(customer:Customer): Observable<Customer> {
        return this.http.put<Customer>(`${this.baseUrl}customers/${customer.id}`, customer)
        .pipe(catchError(this.handleError));
    }

    deleteCustomer(id: number): Observable<Customer> {
        return this.http.delete<Customer>(`${this.baseUrl}customers/${id}`)
        .pipe(catchError(this.handleError));
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + "orders")
        .pipe(catchError(this.handleError));
    }

    getOrder(id: number): Observable<Order> {
        return this.http.get<Order>(`${this.baseUrl}orders/${id}`)
        .pipe(catchError(this.handleError));
    }

    postOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + "orders", order)
        .pipe(catchError(this.handleError));
    }

    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`, order)
        .pipe(catchError(this.handleError));
    }

    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(`${this.baseUrl}orders/${id}`)
        .pipe(catchError(this.handleError));
    }

    getOrderLines(): Observable<OrderLine[]> {
        return this.http.get<OrderLine[]>(this.baseUrl + "orderlines")
        .pipe(catchError(this.handleError));
    }

    postOrderLine(orderLine: OrderLine): Observable<OrderLine> {
        return this.http.post<OrderLine>(this.baseUrl + "orderlines", orderLine)
        .pipe(catchError(this.handleError));
    }

    deleteOrderLine(id: number): Observable<OrderLine> {
        return this.http.delete<OrderLine>(`${this.baseUrl}orderlines/${id}`)
        .pipe(catchError(this.handleError));
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products")
        .pipe(catchError(this.handleError));
    }

}