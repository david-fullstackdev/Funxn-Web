import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';
import { ReportService}                 from '../services/report.service';
import { CommonService}                 from '../services/common.service';
import { AuthenticationService }        from '../services/authentication.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html',
    providers: [ReportService, AuthenticationService]
})
export class FullLayoutComponent implements OnInit {

    constructor( 
        private router: Router, 
        private _commonService: CommonService, 
        private _reportService: ReportService, 
        private _authenticationService: AuthenticationService
    ) { }

    public disabled:boolean = false;
    public datepickerOpts:Object = {
        icon: "fa fa-th",
        minViewMode: "months",
        format: "mm/yyyy"
    }; 
    public reportDate:Object = new Date();
    public selected_patients = [];
    public patients_list = [];
    public selected_patients_id = [];
    public patients = []
    public status:{isopen:boolean} = {isopen: true};
    public user = null;
    public showItem = {
        mood: true,
        complete: true,
        incomplete: true
    };

    public toggleMood() {
        this.showItem.mood = (this.showItem.mood) ? false : true;
        this._commonService.changeToggleGraph(this.showItem);
    }

    public toggleCompletedTask() {
        this.showItem.complete = (this.showItem.complete) ? false : true;
        this._commonService.changeToggleGraph(this.showItem);
    }

    public toggleIncompleteTask() {
        this.showItem.incomplete = (this.showItem.incomplete) ? false : true;
        this._commonService.changeToggleGraph(this.showItem);
    }

    public toggled(open:boolean):void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit(): void {
        this._commonService.usersChange$.subscribe(
            item => {
                this.updateUserProfile(item);
                this._reportService.getPatients()
                    .subscribe(patients=> this.setPatientsList(patients));
            }
        );
        this.user = localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')).user : {};
        this._reportService.getPatients()
            .subscribe(patients=> this.setPatientsList(patients));
        
    }

    setPatientsList(patients): void {
        this.patients = patients;
        this.patients_list = [];
        for (let i = 0; i < patients.length; i++) {
            this.patients_list.push(patients[i].first_name + ' ' + patients[i].last_name);
        }
    }

    onChangeReportDate(): void {
        this._commonService.changeMonth(this.reportDate);
    }

    onItemChanged(event): void {
        this.selected_patients_id = [];
        for (let i = 0; i < this.patients.length; i++) {
            let tmp_name = this.patients[i].first_name + ' ' + this.patients[i].last_name;
            if (this.selected_patients.indexOf(tmp_name) >= 0) {
                this.selected_patients_id.push(this.patients[i].id);
            }
        }
        this._commonService.changePatient(this.selected_patients_id);
    }
    logout(): void {
        this.user = {};
        this._authenticationService.logout();
        this.router.navigate(['/login']);
    }
    updateUserProfile(item): void {
        this.user = item;
    }
}
