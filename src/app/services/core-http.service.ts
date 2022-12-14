import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CoreHttpService {
    constructor(
        private http: HttpClient,
        
        // private toastrService: ToastrService
    ) { }
    httpGetRequest<TResponse>(
        url: string,
        reqHeader?: HttpHeaders,
        showLoader?: boolean,
        isShowLoaderAfterRespond?: boolean
    ): Observable<TResponse> {
        // this.loaderService.display(true);
        // showLoader = showLoader === undefined ? true : showLoader;
        // this.loaderService.display(showLoader);
        return this.http
            .get(url, { headers: reqHeader }).pipe(
            map(res => {
                if (!isShowLoaderAfterRespond || isShowLoaderAfterRespond === undefined) {
                    // this.loaderService.display(false);
                }
                return <TResponse>res;
            }))
            // .catch(this.errorHandler);
    }

    httpPostRequest<TRequest, TResponse>(
        url: string,
        data: TRequest,
        reqHeader?: HttpHeaders,
 
    ): Observable<TResponse> {
        // showLoader = showLoader === undefined ? true : showLoader;
        // this.loaderService.display(showLoader);
        return this.http
            .post(url, data, { headers: reqHeader }).pipe(
            map(res => {
                // this.loaderService.display(false);
                return <TResponse>res;
            }))
            // .catch(this.errorHandler);
    }

    httpDeleteRequest<TRequest, TResponse>(
        url: string,
        id?: TRequest,
     
    ): Observable<TResponse> {
        // showLoader = showLoader === undefined ? true : showLoader;
        // this.loaderService.display(showLoader);
        return this.http
            .delete(url, id).pipe(
            map(res => {
                // this.loaderService.display(false);
                return <TResponse>res;
            }))
            // .catch(this.errorHandler);
    }

    httpPutRequest<TRequest, TResponse>(
        url: string,
        id?: TRequest,
      
    ): Observable<TResponse> {
        // showLoader = showLoader === undefined ? true : showLoader;
        // this.loaderService.display(showLoader);
        return this.http
            .put(url, id).pipe(
            map(res => {
                // this.loaderService.display(false);
                return <TResponse>res;
            }))
            // .catch(this.errorHandler);
    }

    errorHandler = (error: HttpErrorResponse) => {
        
        // this.loaderService.display(false);
        // this.toastrService.error('An error occurred');
        // if (error.error instanceof ErrorEvent) {
        //     console.error('An error occurred:', error.error.message);
        // } else {
        //     console.error(
        //         `Backend returned code ${error.status}, ` +
        //             `body was: ${error.error}`
        //     );
        // }
        return Observable.throw(error);
    }
}