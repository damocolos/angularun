import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-form-product',
    templateUrl: './form-product.component.html',
    styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

    form: FormGroup;
    categories;

    constructor(
        public dialogRef: MatDialogRef<FormProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private _data: ApiService
    ) {
        this.buildForm();
        this.getCategories();
        console.log('dialog', data);
        // not null = edit
        if (data != null) {
            this.patchForm(data);
        }
    }

    ngOnInit() { }

    // id: number;
    // name: string;
    // enable: boolean;
    // description: string;
    // ingredient: string;
    // measurement: string;
    // product_category_id: number;
    // size: string;
    // size_value: number;

    buildForm() {
        this.form = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            enable: [true, Validators.required],
            description: [null, Validators.required],
            ingredient: [null, Validators.required],
            measurement: [null, Validators.required],
            product_category_id: [1, Validators.required],
            size: [null],
            size_value: [1]
        });
    }

    patchForm(product) {
        this.form.patchValue({
            id: product.id,
            name: product.name,
            enable: product.enable,
            description: product.description,
            ingredient: product.ingredient,
            measurement: product.measurement,
            product_category_id: product.product_category_id,
            // size: product.size,
            // size_value: product.size_value
        });
    }

    getCategories() {
        this._data.getCategories()
        .subscribe(d => {
            console.log('categories', d);
            this.categories = d.data;
        });
    }

    onSave() {
        if (this.form.valid) {
            console.log(this.form.value);
            if (this.form.get('id').value == null) {
                this._data.storeProduct(this.form.value)
                .subscribe(d => {
                    console.log('store', d);
                    this.dialogRef.close(d.data);
                });
            } else {
                this._data.updateProduct(this.form.value)
                .subscribe(d => {
                    console.log('store', d);
                    this.dialogRef.close(d.data);
                });
            }
        }
    }

}
