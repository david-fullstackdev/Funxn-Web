import { Http, Headers, RequestOptions, Response }        from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable }   from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AppConfig }          from './../app.config';

@Injectable()
export class TaskService {

    private API_ROOT_URL = AppConfig.API_URL;   // 'http://api.funxn.tapestryd.com/api';
    private servicePath = '/tasks';

    /**
     * Class constructor
     */
    constructor(private _http: Http, private authenticationService: AuthenticationService) {

    }

    /**
     * Get Items
     * @return {array} list of tasks 
     */
    getItems(limit, offset) {
        console.log('Service! limit:' + limit + ' offset:' + offset);
        let headers = new Headers({ 'Authorization': this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: headers });
        let url = this.API_ROOT_URL + this.servicePath + '?limit=' + limit + '&offset=' + offset;
        console.log('URL:' + url);
        return this._http.get(url, options)
            .map(res => res.json());
    }

}

