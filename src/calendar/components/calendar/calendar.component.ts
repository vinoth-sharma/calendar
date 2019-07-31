import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CONSTANTS } from '../../constants';
import * as moment from 'moment';
import { DatePicker } from '../../services/datePicker.service';



@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    providers: [DatePicker]
})
export class CalendarComponent implements OnInit {

    @Input() minDate;
    @Input() maxDate;
    @Input() blackList;
    @Input() selectedDates;
    @Output() userSelectedDates: EventEmitter<any> = new EventEmitter();
    state;
    showYears: boolean = false;

    statesList = CONSTANTS.CALENDER_STATE;
    todayDate = moment().format();
    cdMinDate;
    cdMaxDate;
    selectedMY = {
        month: null,
        year: null,
        date: null
    };

    // selectedDates = [];
    minMaxDate = [];
    constructor() { }

    ngOnInit() {
        this.selectedMY.month = moment(this.todayDate).month() + 1;
        this.selectedMY.year = moment(this.todayDate).year();
        this.selectedMY.date = moment(this.todayDate).date();
        this.minMaxDateValidation();
        this.blackList = this.blackList ? this.blackList : [];
        this.state = CONSTANTS.CALENDER_STATE.DATE;
        this.minMaxDate.push(this.minDate,this.maxDate);

    }
    minMaxDateValidation() {
        this.cdMaxDate = (this.selectedMY.year + 100) + '-' + this.selectedMY.month + '-' + this.selectedMY.date;
        this.cdMinDate = (this.selectedMY.year - 100) + '-' + this.selectedMY.month + '-' + this.selectedMY.date;

        this.cdMinDate = this.minDate ? this.minDate : this.cdMinDate;
        this.cdMaxDate = this.maxDate ? this.maxDate : this.cdMaxDate;
    }

    viewYearSelected(event) {
        console.log(event);
        
        this.selectedMY = event;
        this.showYears = event.flag;
        this.state = CONSTANTS.CALENDER_STATE.YEAR;
    }

    viewCalendar() {
        this.state = CONSTANTS.CALENDER_STATE.DATE;
    }

    viewMonths(event) {
        this.state = CONSTANTS.CALENDER_STATE.MONTH;
        this.selectedMY.year = event;
    }

    monthSelectSuccess(event) {
        this.selectedMY.month = event;
        this.state = CONSTANTS.CALENDER_STATE.DATE;
    }
    sendSelectedDate(event) {
        this.userSelectedDates.emit(event)

    }
}
