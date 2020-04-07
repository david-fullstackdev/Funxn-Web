import { Component }        from '@angular/core';
import { TaskService }      from '../services/task.service';
import { HttpModule }       from '@angular/http';


/**
 * @class TablesComponent
 * To customize this for other services just change the `title` and constructor Service 
 */
@Component({
    templateUrl: 'tables.component.html',
    providers: [TaskService, HttpModule]
})
export class TablesComponent {

    private PAGE_SIZE:number = 7;
    private items;
    private title: string;
    private currentPageNumber:number;
    private totalItems:number; 

    constructor(private _service: TaskService) {
    };

    ngOnInit() {
        this.title = 'Patient Tasks';
        this.getPage(1);
    };

    getPage(pageNumber:number):boolean {
        this.currentPageNumber = pageNumber;
        // calculate limit and offset
        let limit = this.PAGE_SIZE;
        let offset = ((pageNumber-1) * this.PAGE_SIZE);
        this._service.getItems(limit, offset)
            .subscribe(items => this.setPage(items));
        return false;
    };

    setPage(items) {
        this.items = items.data;
        this.totalItems = items.pagination.rowCount;
    };
}

