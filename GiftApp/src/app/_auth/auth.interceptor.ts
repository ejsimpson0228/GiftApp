import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('token');
        if (idToken) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken)
            });
            return next.handle(clonedReq)
            // .pipe(
            //     tap(
            //         succ => {},
            //         err => {
            //             if (err.status == 401) {
            //                 console.log('yep, here\'s your problem');
            //                 localStorage.removeItem('token');
            //                 this.router.navigateByUrl('/');
            //             }
            //         }
            //     )
            // )
            ;
        } else {
            return next.handle(req.clone());
        }
    }
}
