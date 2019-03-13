import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private unsubscribe: Subject<void> = new Subject();

    isLoadingResults = false;

    form: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _data: ApiService
    ) {
        this.buildForm();
    }

    ngOnInit() {
    }

    buildForm() {
        this.form = this.fb.group({
            privy_id: [null, [Validators.required]],
            password: [null, Validators.required]
        });
    }

    onLogin() {
        if (this.form.valid) {
            this.isLoadingResults = true;
            this._data.login(this.form.value)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe( ret => {
                console.log('login ret', ret);
                if (ret.data.token) {
                    localStorage.setItem(environment.tokenAlias, ret.data.token);
                    // this.router.navigate(['p']);
                }
                this.isLoadingResults = false;
            }, err => {
                console.log('login err', err);
                this.isLoadingResults = false;
            });
        }
    }

}
