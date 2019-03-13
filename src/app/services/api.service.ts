import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private httpPass: HttpClient;

    constructor(private http: HttpClient, handler: HttpBackend, private router: Router) {
        this.httpPass = new HttpClient(handler);
    }

    login(data): Observable<any> {
        return this.httpPass.post(`${environment.api.endpoint}/api/v1/auth`, data);
    }

    credential(): Observable<any> {
        return this.http.get(`${environment.api.endpoint}/api/v1/me`);
    }

    // products

    // all products
    getProducts(page = 1): Observable<any> {
        return this.http.get(`${environment.api.endpoint}/api/v1/product?page=${page}`);
    }

    // "name":"Baju Polos",
    // "enable":true,
    // "description":"ok",
    // "ingredient":"100% wall",
    // "measurement":"16 centimeter",
    // "product_category_id":1,
    // "size":"cm",
    // "size_value":13

    storeProduct(productData: Product): Observable<any> {
        return this.http.post(`${environment.api.endpoint}/api/v1/product`, productData);
    }

    updateProduct(productData: Product): Observable<any> {
        return this.http.put(`${environment.api.endpoint}/api/v1/product/${productData.id}`, productData);
    }

    deleteProduct(productData: Product): Observable<any> {
        return this.http.delete(`${environment.api.endpoint}/api/v1/product/${productData.id}`);
    }

    // category

    // all categories
    getCategories(page = 1): Observable<any> {
        return this.http.get(`${environment.api.endpoint}/api/v1/category?page=${page}`);
    }

    // "name":"category",
    // "enable":true,
    // "image":file

    storeCategory(categoryData): Observable<any> {
        return this.http.post(`${environment.api.endpoint}/api/v1/category`, categoryData);
    }

    storeCategory2(categoryData): Observable<any> {
        console.log('category data', categoryData);
        return Observable.create(observer => {
            const formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

            const token = localStorage.getItem(environment.tokenAlias);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else if (xhr.status === 401 || xhr.status === 400) {
                        this.router.navigate(['login']);
                    } else {
                        observer.error(xhr.response);
                    }
                    console.log(xhr.response);
                }
            };

            xhr.upload.onprogress = (event) => {
                // this.progress = Math.round(event.loaded / event.total * 100);

                // this.progressObserver.next(this.progress);
            };

            xhr.open('POST', `${environment.api.endpoint}/api/v1/category`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.send(categoryData);
        });
    }

    updateCategory(categoryData): Observable<any> {
        return this.http.put(`${environment.api.endpoint}/api/v1/category/${categoryData.id}`, categoryData);
    }

    updateCategory2(id, categoryData): Observable<any> {
        console.log('category data', categoryData);
        return Observable.create(observer => {
            const formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

            const token = localStorage.getItem(environment.tokenAlias);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else if (xhr.status === 401) {
                        this.router.navigate(['login']);
                    } else {
                        observer.error(xhr.response);
                    }
                    console.log(xhr.response);
                }
            };

            xhr.upload.onprogress = (event) => {
                // this.progress = Math.round(event.loaded / event.total * 100);

                // this.progressObserver.next(this.progress);
            };

            xhr.open('PUT', `${environment.api.endpoint}/api/v1/category/${id}`, true);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.send(categoryData);
        });
    }

    deleteCategory(categoryData): Observable<any> {
        return this.http.delete(`${environment.api.endpoint}/api/v1/category/${categoryData.id}`);
    }

}
