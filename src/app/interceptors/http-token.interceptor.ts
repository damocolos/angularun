import { Injectable, ErrorHandler, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/do';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private token = '';

    constructor(
        private router: Router,
        private injector: Injector
        ) {}

        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            if (localStorage.getItem(environment.tokenAlias)) {
                console.log(localStorage.getItem(environment.tokenAlias));
                this.token = localStorage.getItem(environment.tokenAlias);
            }

            console.log('request token', request);

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('request token');

            return next
            // next to request
            .handle(request)
            .pipe(
                tap(null, (err: any) => {
                    if (err.status === 500) {
                        this.router.navigate(['/login']);  // login page
                    }
                    if (err.status === 401 || err.error.code === 401) {
                        this.router.navigate(['/login']);  // login page
                    }
                    if (err instanceof HttpErrorResponse) {
                        const appErrorHandler = this.injector.get(ErrorHandler);
                        appErrorHandler.handleError(err);
                    }
                })
                );

            }
        }
