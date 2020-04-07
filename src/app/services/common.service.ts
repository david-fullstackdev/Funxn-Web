import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';

export class CommonService {
  private _selectedMonth = new Date();
  private _selectedPatients = [];
  private _selectedToggleGraph = {};
  private _selectedUsers = {};
  monthChange$: Observable<Object>;
  patientsChange$: Observable<Object>;
  toggleGraphChange$: Observable<Object>;
  usersChange$: Observable<Object>;
  
  private _observerMonth: Observer<Object>;
  private _observerPatients: Observer<Object>;
  private _observerToggleGraph: Observer<Object>;
  private _observerUser: Observer<Object>;
  constructor() {
    this.monthChange$ = new Observable(observer =>
      this._observerMonth = observer).share();
    this.patientsChange$ = new Observable(observer =>
      this._observerPatients = observer).share();
    this.toggleGraphChange$ = new Observable(observer =>
      this._observerToggleGraph = observer).share();
    this.usersChange$ = new Observable(observer =>
      this._observerUser = observer).share();
  }
  changeMonth(selected) {
    this._selectedMonth = selected;
    this._observerMonth.next(selected);
  }
  selectedMonth() {
    return this._selectedMonth;
  }
  changePatient(selected) {
    this._selectedPatients = selected;
    this._observerPatients.next(selected);
  }
  selectedPatients() {
    return this._selectedPatients;
  }
  changeToggleGraph(selected) {
    this._selectedToggleGraph = selected;
    this._observerToggleGraph.next(selected);
  }
  selectedToggleGraph() {
    return this._selectedToggleGraph;
  }
  changeUser(selected) {
    this._selectedUsers = selected;
    this._observerUser.next(selected);
  }
  selectedUser() {
    return this._selectedUsers;
  }
  
}