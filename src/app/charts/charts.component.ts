// import { Component }        from '@angular/core';

// @Component({
//     templateUrl: 'charts.component.html'
// })
// export class ChartsComponent {


import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { ReportService}         from '../services/report.service';
import { CommonService}         from '../services/common.service';

@Component({
    // templateUrl: 'dashboard.component.html'
    templateUrl: 'charts.component.html',
    providers: [ReportService]
})
export class ChartsComponent implements OnInit {

    // http://www.w3schools.com/colors/colors_picker.asp
    public brandPrimary:string =  '#20a8d8';
    public brandSuccess:string =  '#4dbd74';
    public brandInfo:string =     '#63c2de';
    public brandWarning:string =  '#f8cb00';
    public brandDanger:string =   '#f86c6b';
    public datepickerOpts:Object = {
        icon: "fa fa-th"
    }; 
    // custom colors
    public completedTaskColor:string = '#63c2de';
    public incompleteTaskColor:string = '#f8cb00';
    public moodColor:string = '#f86c6b';

    constructor( private router: Router, private _reportService: ReportService, private _commonService: CommonService ) { }
 
    // dropdown buttons
    public status: { isopen: boolean } = { isopen: false };

    public toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    // Utility Functions

    /**
     * 
     * Convert hex color value to RGBA
     * @param {string} hex
     * @param {number} opacity
     * @returns {number}
     * 
     * 
     */
    public convertHex(hex:string,opacity:number){
        hex = hex.replace('#','');
        let r = parseInt(hex.substring(0,2), 16);
        let g = parseInt(hex.substring(2,4), 16);
        let b = parseInt(hex.substring(4,6), 16);

        let rgba = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return rgba;
    }

    /**
     * 
     * Generate Random number
     * 
     * @param {number} min
     * @param {number} max
     * @returns {number}
     * 
     */
    public random(min:number, max:number) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    // Events

    /**
     * 
     * Chart click event
     * 
     * @param {*} e
     * 
     */
    public chartClicked(e:any):void {
        console.log(e);
    }

    /**
     * 
     * Chart hover event
     * 
     * @param {*} e
     * 
     */
    public chartHovered(e:any):void {
        console.log(e);
    }

    // Main Chart Setup


    // TODO: loaded data will be assigned to the data1/2/3 objects below
    public mainChartElements:number = 27;
    public tempBackupData: Array<any> = [];
    public mainChartData1:Array<number> = [];   // task data
    public mainChartData2:Array<number> = [];   // mood data
    public mainChartData3:Array<number> = [];
    public reportDate:Object = new Date();
    public toggleGraph:Object = {
        mood: true,
        complete: true,
        incomplete: true
    };
    public averageComplete:number = 0;
    public averageIncomplete:number = 0;
    public averageMood:number = 0;
    public selectedPatients:Array<number> = [];
    /**
     * 
     * Main Chart Data Initialization
     * 
     * @type {Array<any>}
     */
    public mainChartData:Array<any> = [
        {
            data: this.mainChartData1,
            label: 'Completed Tasks'
        },
        {
            data: this.mainChartData2,
            label: 'Mood'
        },
        {
            data: this.mainChartData3,
            label: 'Incomplete Tasks'
        }
    ];

    /**
     * 
     * Horizontal chart labels, days of the month
     * 
     * @type {Array<any>}
     * 
     */
    public mainChartLabels:Array<any> = [];

    /**
     * 
     * Customize the display of the main chart using options
     * 
     * @type {*}
     * 
     */
    public mainChartOptions:any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: function(value:any) {
                        return value;
                    }
                },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(100 / 5),
                    max: 100
                }
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        legend: {
            display: false
        }
    };

    /**
     * 
     * set the main chart colors
     * 
     * @type {Array<any>}
     * 
     */
    public mainChartColours:Array<any> = [
        { // Completed Tasks - data 1
            backgroundColor: 'transparent',
            borderColor: this.completedTaskColor,
            pointHoverBackgroundColor: '#fff'
        },
        { // Mood - data 2
            backgroundColor: 'transparent',
            borderColor: this.moodColor,
            pointHoverBackgroundColor: '#fff'
        },
        { //Incomplete Tasks, data 3
            backgroundColor: 'transparent',
            borderColor: this.incompleteTaskColor,
            pointHoverBackgroundColor: '#fff'
        }
    ];

    /**
     * 
     * Optionally display the chart legend
     * 
     * @type {boolean}
     * 
     */
    public mainChartLegend:boolean = true;

    /**
     * Set the main chart type
     * 
     * @type {string}
     * @memberOf ChartsComponent
     */
    public mainChartType:string = 'line';

    /**
     * 
     * Set the report data. For some reason this seems to require
     * the `push` loop rather than straight assignment.
     * 
     * @private
     * @param {any} data
     * 
     * @memberOf ChartsComponent
     */
    private setTaskReport(tasks, days):void {
        let _mainChartData:Array<any> = new Array(this.mainChartData.length);
        for (let i = 0; i < this.mainChartData.length; i++) {
            _mainChartData[i] = {data: new Array(this.mainChartData[i].data.length), label: this.mainChartData[i].label};
            for (let j = 0; j < this.mainChartData[i].data.length; j++) {
                _mainChartData[i].data[j] = this.mainChartData[i].data[j];
            }
        }
        for (let j = 0; j < days; j++) {
            let taskValue = tasks.find(x => x.finish_due == j+1);
            if (taskValue) taskValue = taskValue.correctPercentage;
            else taskValue = 0;
            _mainChartData[0].data[j] = taskValue;
            this.averageComplete += taskValue;
        }
        this.averageComplete = Math.round(this.averageComplete / days);
        this.mainChartData = _mainChartData;
        this.tempBackupData = this.mainChartData;
        this.updateGraphShowHide();
    }

    private setIncompleteTaskReport(tasks, days):void {
        let _mainChartData:Array<any> = new Array(this.mainChartData.length);
        for (let i = 0; i < this.mainChartData.length; i++) {
            _mainChartData[i] = {data: new Array(this.mainChartData[i].data.length), label: this.mainChartData[i].label};
            for (let j = 0; j < this.mainChartData[i].data.length; j++) {
                _mainChartData[i].data[j] = this.mainChartData[i].data[j];
            }
        }
        for (let j = 0; j < days; j++) {
            let taskValue = tasks.find(x => x.finish_due == j+1);
            if (taskValue) taskValue = taskValue.correctPercentage;
            else taskValue = 0;
            _mainChartData[2].data[j] = taskValue;
            this.averageIncomplete += taskValue;
        }
        this.averageIncomplete = Math.round(this.averageIncomplete / days);
        this.mainChartData = _mainChartData;
        this.tempBackupData = this.mainChartData;
        this.updateGraphShowHide();
    }

    private setMoodReport(moods, days):void {
        let _mainChartData:Array<any> = new Array(this.mainChartData.length);
        for (let i = 0; i < this.mainChartData.length; i++) {
            _mainChartData[i] = {data: new Array(this.mainChartData[i].data.length), label: this.mainChartData[i].label};
            for (let j = 0; j < this.mainChartData[i].data.length; j++) {
                _mainChartData[i].data[j] = this.mainChartData[i].data[j];
            }
        }
        
        for (let j = 0; j < days; j++) {
            let moodValue = moods.find(x => x.date == j+1);
            if (moodValue) moodValue = moodValue.value;
            else moodValue = 0;
            _mainChartData[1].data[j] = moodValue;
            this.averageMood += moodValue;
        }
        this.averageMood = Math.round(this.averageMood / days);
        this.mainChartData = _mainChartData;
        this.tempBackupData = this.mainChartData;
        this.updateGraphShowHide();
    }

    /**
     * 
     * Init this component when NG is ready
     * 
     */
    // TODO: This is the test data! use real data here
    ngOnInit(): void {
        this._commonService.monthChange$.subscribe(
            item => this.onChangeReportDate(item)
        );
        this._commonService.patientsChange$.subscribe(
            item => this.onChangePatients(item)
        );
        this._commonService.toggleGraphChange$.subscribe(
            item => this.onToggleGraphState(item)
        );
        this.reportDate = this._commonService.selectedMonth();
        this._updateReportData();
    }

    onChangeReportDate(date): void {
        this.reportDate = date;
        this._updateReportData();
    }

    onChangePatients(patients): void {
        this.selectedPatients = patients;
        this._updateReportData();
    }
    updateGraphShowHide(): void {
        let _mainChartData:Array<any> = new Array(this.mainChartData.length);
        for (let i = 0; i < this.mainChartData.length; i++) {
            _mainChartData[i] = {data: new Array(this.mainChartData[i].data.length), label: this.mainChartData[i].label};
            for (let j = 0; j < this.mainChartData[i].data.length; j++) {
                _mainChartData[i].data[j] = this.mainChartData[i].data[j];
            }
        }
        if (!this.toggleGraph['incomplete']) {
            _mainChartData[2].data = {};
        } 
        if(!this.toggleGraph['complete']) {
            _mainChartData[0].data = {};
        } 
        if(!this.toggleGraph['mood']) {
            _mainChartData[1].data = {};
        } 
        if(this.toggleGraph['incomplete']) {
            _mainChartData[2].data = this.tempBackupData[2].data;
        } 
        if(this.toggleGraph['complete']) {
            _mainChartData[0].data = this.tempBackupData[0].data;
        } 
        if(this.toggleGraph['mood']) {
            _mainChartData[1].data = this.tempBackupData[1].data;
        }
        this.mainChartData = _mainChartData;
    }
    onToggleGraphState(toggleData): void {
        this.toggleGraph = toggleData;
        this.updateGraphShowHide();
    }

    private _updateReportData(): void {
        let date = this.reportDate;
        let filterYear = new Date(date.toString()).getFullYear();
        let filterMonth = new Date(date.toString()).getMonth() + 1;
        let filter = filterYear + '-' + filterMonth;
        if (filterMonth < 10) {
            filter = filterYear + '-0' + filterMonth;
        }
        let days = new Date(filterYear, filterMonth, 0).getDate();
        this.mainChartLabels = [];
        for (let i = 1; i <= days; i++) {
            if (i < 10) {
                this.mainChartLabels.push('0' + i);
            } else {
                this.mainChartLabels.push(i);
            }
        }
        let patients = '';
        if (this.selectedPatients.length > 0) patients = this.selectedPatients.join(',');
        this._reportService.getTasks(filter, patients)
            .subscribe(tasks=> this.setTaskReport(tasks, days));
        this._reportService.getIncompleteTasks(filter, patients)
            .subscribe(tasks=> this.setIncompleteTaskReport(tasks, days));
        this._reportService.getMoods(filter, patients)
            .subscribe(moods=> this.setMoodReport(moods, days));
    }
}
