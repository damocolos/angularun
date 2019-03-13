import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { FormCategoryComponent } from './form-category/form-category.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    displayedColumns: string[] = ['no', 'name', 'enable', 'image', 'action'];
    dataSource;

    categories;

    paginatorLength;
    paginatorPageSize = 10;

    currentPage = 1;

    isLoading = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _data: ApiService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getCategories();
        // this.dataSource.paginator = this.paginator;
    }

    getCategories(page = 1) {
        this.isLoading = true;
        this._data.getCategories(page)
        .subscribe(d => {
            console.log(d);
            this.categories = d.data;
            this.dataSource = new MatTableDataSource<any>(d.data);
            this.paginatorLength = d.meta.pagination.total_objects;
            this.isLoading = false;
            // this.paginatorPageSize = d.meta.pagination.total_pages;
        });
    }

    addCategory() {
        const dialogRef = this.dialog.open(FormCategoryComponent, {
            width: '500px',
            data: null
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                this.getCategories();
            }
        });
    }

    editCategory(category) {
        const dialogRef = this.dialog.open(FormCategoryComponent, {
            width: '500px',
            data: category
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                this.getCategories();
            }
        });
    }

    deleteCategory(category) {
        if (confirm('Are you sure to delete ' + category.name)) {
            this._data.deleteCategory(category)
            .subscribe(d => {
                this.getCategories();
            });
        }
    }

    getNumber(index) {
        return ( this.currentPage - 1 ) * this.paginatorPageSize + index + 1;
    }

    pageEvent(event) {
        this.currentPage = event.pageIndex + 1;
        this.getCategories(event.pageIndex + 1);
    }

}
