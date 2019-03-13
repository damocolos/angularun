import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// components
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './auth/login/login.component';
import { ApiService } from './services/api.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/http-token.interceptor';
import { FormProductComponent } from './product/form-product/form-product.component';
import { CategoryComponent } from './category/category.component';
import { FormCategoryComponent } from './category/form-category/form-category.component';

const MATERIALS_MODULE = [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
];

@NgModule({
    declarations: [
        AppComponent,
        ProductComponent,
        LoginComponent,
        FormProductComponent,
        CategoryComponent,
        FormCategoryComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MATERIALS_MODULE,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        FormProductComponent,
        FormCategoryComponent
    ],
    providers: [
        ApiService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
