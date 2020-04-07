import { Component, ViewChild }        from '@angular/core';
import { TaskService }      from '../services/task.service';
import { HttpModule }       from '@angular/http';
import { ModalDirective }   from 'ng2-bootstrap';

/**
 * @class TablesComponent
 * To customize this for other services just change the `title` and constructor Service 
 */
@Component({
    // templateUrl: 'tables.component.html',
    // providers: [TaskService, HttpModule]
  // selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService, HttpModule]

})
export class TasksComponent {
    @ViewChild('childModal') public childModal:ModalDirective;
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

    showChildModal():void {
        this.childModal.show();
    }
}


