import { Component }                    from '@angular/core';
import { Router }                       from '@angular/router';
import { CommonService}                 from '../services/common.service';
import { AuthenticationService }        from '../services/authentication.service';
import { AuthorizationService }         from '../services/authorization.service';

@Component({
    templateUrl: 'login.component.html',
    providers: [AuthenticationService]
})
export class LoginComponent {
    model: any = {};
    error = '';
    constructor(private router: Router, private _commonService: CommonService, private authenticationService: AuthenticationService) { }
    ngOnInit() {
        this.authenticationService.logout();
    }
    login() {
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result) {
                    this._commonService.changeUser(result['user']);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.error = 'Email or password is incorrect';
                }
            })
    }
}
