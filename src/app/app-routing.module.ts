import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './auth/login/login.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent
    },
    {
        path: 'category',
        component: CategoryComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
