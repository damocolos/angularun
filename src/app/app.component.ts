import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'preTestPrivy';

    // products: Product[];

    constructor(private _data: ApiService) {}

    test() {
        // this._data.getProducts()
        // .subscribe(d => {
        //     // console.log(d);
        //     this.products = d.data;
        // });
    }
}
