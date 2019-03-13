import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormProductComponent } from './form-product/form-product.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    products: Product[];

    paginatorLength;
    paginatorPageSize = 10;

    isLoading = true;

    constructor(
        private _data: ApiService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getProducts();
    }

    getProducts(page = 1) {
        this.isLoading = true;
        this._data.getProducts(page)
        .subscribe(d => {
            console.log(d);
            this.products = d.data;
            this.paginatorLength = d.meta.pagination.total_objects;
            this.isLoading = false;
        });
    }

    addProduct() {
        const dialogRef = this.dialog.open(FormProductComponent, {
            width: '500px',
            data: null
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                this.getProducts();
            }
        });
    }

    editProduct(product: Product) {
        const dialogRef = this.dialog.open(FormProductComponent, {
            width: '500px',
            data: product
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                this.getProducts();
            }
        });
    }

    deleteProduct(product: Product) {
        if (confirm('Are you sure to delete ' + product.name)) {
            this._data.deleteProduct(product)
            .subscribe(d => {
                this.getProducts();
            });
        }
    }

    pageEvent(event) {
        this.getProducts(event.pageIndex + 1);
    }

}
