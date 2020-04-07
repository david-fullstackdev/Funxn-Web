import { Http }        from '@angular/http';
import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';
import 'rxjs/add/operator/map';
import { Router }        from '@angular/router';
import { AppConfig }          from './../app.config';

@Injectable()
export class AuthenticationService {

    private API_ROOT_URL = AppConfig.API_URL; // 'http://api.funxn.tapestryd.com/api';
    public token: string;
    /**
     * Class constructor
     */
    constructor(private _http: Http, private router: Router) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, pwd: string): Observable<boolean> {
        var url = this.API_ROOT_URL + '/authenticate';
        console.log("URL:"+url);
        var authData = {
            email: email,
            pwd: pwd
        };
        return this._http.post(url,authData)
            .map(res => {
                let token = res.json() && res.json().token;
                let user = res.json() && res.json().user;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({token: token, user: user}));
                    return {user: user};
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    getToken() {
        if (!localStorage.getItem('currentUser')) {
            this.router.navigate(['/login']);
            return null;
        } else {
            return JSON.parse(localStorage.getItem('currentUser')).token;
        }
    }
}

