import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-form-category',
    templateUrl: './form-category.component.html',
    styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

    form: FormGroup;
    imagePreview;
    imageName;

    constructor(
        public dialogRef: MatDialogRef<FormCategoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private _data: ApiService,
        private cd: ChangeDetectorRef
        ) {
            this.buildForm();
            console.log('dialog', data);
            // not null = edit
            if (data != null) {
                this.patchForm(data);
            }
        }

        ngOnInit() {
        }

        buildForm() {
            this.form = this.fb.group({
                id: [null],
                name: [null, [Validators.required]],
                enable: [true, Validators.required],
                image: [null, Validators.required]
            });
        }

        patchForm(category) {
            this.imagePreview = category.image.url;
            this.form.patchValue({
                id: category.id,
                name: category.name,
                enable: category.enable,
                image: category.image
            });
        }

        onFileChange(event) {

            console.log(event);

            const reader = new FileReader();

            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                this.form.get('image').setValue(file);
                this.imageName = file.name;
                this.imagePreview = reader.result;
            }
        }

        private prepareSave(): any {
            const input = new FormData();
            input.append('id', this.form.get('id').value);
            input.append('name', this.form.get('name').value);
            input.append('enable', this.form.get('enable').value);
            input.append('image', this.form.get('image').value);
            return input;
        }

        onSave() {
            if (this.form.valid) {
                const formModel = this.prepareSave();
                console.log(this.form.value);
                if (this.form.get('id').value == null) {
                    this._data.storeCategory2(formModel)
                    .subscribe(d => {
                        console.log('store', d);
                        this.dialogRef.close(d.data);
                    });
                } else {
                    this._data.updateCategory2(this.form.get('id').value, formModel)
                    .subscribe(d => {
                        console.log('store', d);
                        this.dialogRef.close(d.data);
                    });
                }
            }
        }

    }
