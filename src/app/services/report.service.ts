import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AppConfig } from './../app.config';

@Injectable()
export class ReportService {

    private API_ROOT_URL = AppConfig.API_URL;   // 'http://api.funxn.tapestryd.com/api';
    private servicePath = '/reports';

    /**
     * Class constructor
     */
    constructor(private _http: Http, private authenticationService: AuthenticationService) {

    }

    public random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    /**
     * Get Items
     * @return {array} list of tasks 
     */
    getItems(limit, offset) {
        console.log("Service! limit:" + limit + " offset:" + offset);
        let headers = new Headers({ 'Authorization': this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: headers });
        let url = this.API_ROOT_URL + this.servicePath + '?limit=' + limit + '&offset=' + offset;
        console.log("URL:" + url);
        return this._http.get(url, options)
            .map(res => res.json());
    }

    /**
     * 
     * Get Report
     * 
     * @returns {object} report data
     * 
     * @memberOf ReportService
     */
    get() {

        let data = {
            task: [],
            mood: []
        };
        let maxElements = 27;
        for (var i = 0; i <= maxElements; i++) {
            data.task.push(this.random(20, 100)); // mainChartTaskData
            data.mood.push(this.random(50, 100)); // mainChartMoodData
        }

        return data;
    }

    getTasks(filter, patients) {
        let headers = new Headers({ 'Authorization': this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: headers });
        let url = this.API_ROOT_URL + '/tasks/completed/percentage?filter=' + filter;
        if (patients !== '') {
            url = this.API_ROOT_URL + '/tasks/completed/percentage?filter=' + filter + '&patients=' + patients;
        }
        console.log("URL:" + url);

        return this._http.get(url, options)
            .map(res => res.json());
    }

    getIncompleteTasks(filter, patients) {
        let headers = new Headers({ 'Authorization': this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: headers });
        let url = this.API_ROOT_URL + '/tasks/incomplete/percentage?filter=' + filter;
        if (patients !== '') {
            url = this.API_ROOT_URL + '/tasks/incomplete/percentage?filter=' + filter + '&patients=' + patients;
        }
        console.log("URL:" + url);

        return this._http.get(url, options)
            .map(res => res.json());
    }

    getMoods(filter, patients) {
        let headers = new Headers({ 'Authorization': this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: headers });
        let url = this.API_ROOT_URL + '/moods/completed/percentage?filter=' + filter;
        if (patients !== '') {
            url = this.API_ROOT_URL + '/moods/completed/percentage?filter=' + filter + '&patients=' + patients;
        }
        console.log("URL:" + url);

        return this._http.get(url, options)
            .map(res => res.json());
    }

    getPatients() {
        let headers = new Headers({ 'Authorization': this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: headers });
        let url = this.API_ROOT_URL + '/patients';
        console.log("URL:" + url);
        return this._http.get(url, options)
            .map(res => res.json());
    }
}

