import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { DatePicker } from '../../services/datePicker.service';
import { DateObj } from '../../dataObj/dataObj.class';
import { Logs } from 'selenium-webdriver';

@Component({
    selector: 'app-cal-datepicker',
    templateUrl: './cal-datepicker.component.html',
    styleUrls: ['./cal-datepicker.component.css']
})
export class CalDatepickerComponent implements OnInit {

    @Output() showYears: EventEmitter<any> = new EventEmitter();
    @Output() onDateClick: EventEmitter<any> = new EventEmitter();
    @Output() sendSelectedDate: EventEmitter<any> = new EventEmitter();
    @Input() selectedObj;
    @Input() minDate: string;
    @Input() maxDate: string;
    @Input() blackList;
    @Input() userSelectedDates;
    minDateObj = new DateObj();
    maxDateObj = new DateObj();

    daysList = [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa'
    ]

    baseArray = [];
    groupedArray = [];
    selectedDateObj = [];

    selectedMY = {
        month: null,
        year: null,
        date: null
    };

    showDate;
    startOfDay;
    currentDays;

    showDatePicker: boolean = true;
    constructor(public datePickerService: DatePicker) { }

    ngOnInit() {
        let splittedMinDate = this.minDate.split('-')
        this.minDateObj.year = +splittedMinDate[0];
        this.minDateObj.month = +splittedMinDate[1];
        this.minDateObj.date = +splittedMinDate[2];

        let splittedMaxDate = this.maxDate.split('-')
        this.maxDateObj.year = +splittedMaxDate[0];
        this.maxDateObj.month = +splittedMaxDate[1];
        this.maxDateObj.date = +splittedMaxDate[2];

        this.selectedMY = this.selectedObj;
        console.log(this.userSelectedDates);
        let selectedArr = [];
        this.userSelectedDates.forEach(date=>{
            let localDate = date.split("-");
            let data = new DateObj();
            data.date = +localDate[2];
            data.month = +localDate[1];
            data.year = +localDate[0];
            selectedArr.push(data);
        })
        selectedArr.forEach(ele=>this.datePickerService.setSelectedDate(ele));
        this.daysCollector();
    }


    daysCollector() {
        this.selectedDateObj = this.datePickerService.getSelectedDate();

        this.startOfDay = moment(this.selectedMY.year + '-' + this.selectedMY.month, 'YYYY-MM').startOf('month').day();
        this.currentDays = moment(this.selectedMY.year + '-' + this.selectedMY.month, 'YYYY-MM').daysInMonth();
        this.showDate = moment(this.selectedMY.year + '-' + this.selectedMY.month, 'YYYY-MM').format('MMM YYYY');

        this.baseArray.length = 42;
        this.baseArray.fill(0);
        this.baseArray = this.baseArray.map(ele => {
            return {
                value: '',
                isSelected: false,
                isDisabled: false,
                isBlackList: false
            }
        })

        for (let i = 1; i <= this.currentDays; i++) {
            this.baseArray[i - 1].value = i;
        }

        this.baseArray = [...(new Array(this.startOfDay)).fill(0).map(ele => {
            return {
                value: '',
                isSelected: false,
                isDisabled: false,
                isBlackList: false
            }
        }), ...this.baseArray];

        this.baseArray.forEach(ele => {
            ele.isDisabled = ele.value ? false : true;
        });

        this.blackList.length != 0 ? this.blackListColoring() : '';

        for (let j = 0; j < 6; j++) {
            let index = 7 * j;
            this.groupedArray[j] = this.baseArray.slice(index, index + 7);
        }
        this.disablingDates();
        this.colouringDays();

    }

    blackListColoring() {
        this.blackList.forEach(element => {
            let localDB = element.split('-');
            if(+localDB[0] === this.selectedMY.year && +localDB[1] === this.selectedMY.month )
            {

            
            this.baseArray.filter(fil => {
                return fil.value === +localDB[2] 
                }).forEach(attr=>{
                    attr.isDisabled = true;
                    attr.isBlackList = true;
                })
            }
            // let localDB = element.split('-');
            // this.baseArray.filter(ele => {
            //     return +localDB[0] === this.selectedMY.year && +localDB[1] === this.selectedMY.month ? true : false
            // }).forEach(res => {
            //     console.log(res);
                
            //     res.isDisabled = res.value === +localDB[2] || res.value === '' ? true : false;
            //     res.isBlackList = res.value === +localDB[2] ? true : false;
            // })
        });

    }

    previousMonth() {

        this.selectedMY.month = this.selectedMY.month === 1 ? 12 : this.selectedMY.month - 1;
        this.selectedMY.year = this.selectedMY.month === 12 ? this.selectedMY.year - 1 : this.selectedMY.year;
        this.daysCollector();

    }

    nextMonth() {
        this.selectedMY.month = this.selectedMY.month === 12 ? 1 : this.selectedMY.month + 1;
        this.selectedMY.year = this.selectedMY.month === 1 ? this.selectedMY.year + 1 : this.selectedMY.year;
        this.daysCollector();
    }

    disablingDates() {

        if (this.minDateObj.month === this.selectedMY.month &&
            this.minDateObj.year === this.selectedMY.year) {
            let value = this.startOfDay - 1 + this.minDateObj.date;
            let row = Math.floor(value / 7);
            let column = value % 7;


            for (let i = 0; i <= row; i++) {
                let flag = (i >= row) ? column : 7;
                for (let j = 0; j < flag; j++) {
                    this.groupedArray[i][j].isDisabled = true;
                }
            }
        }

        if (this.maxDateObj.month === this.selectedMY.month
            && this.maxDateObj.year === this.selectedMY.year) {
            let value = this.startOfDay - 1 + this.maxDateObj.date;
            let row = Math.floor(value / 7);
            let column = value % 7;

            for (let i = row; i <= 5; i++) {
                let flag = (i === row) ? column + 1 : 0;
                for (let j = flag; j < 7; j++) {
                    this.groupedArray[i][j].isDisabled = true;
                }
            }
        }

    }

    colouringDays() {
        this.selectedDateObj.filter(ele => {
            return (ele.year === this.selectedMY.year) && (ele.month === this.selectedMY.month)
        }).forEach(element => {

            let value = this.startOfDay - 1 + element.date;
            let row = Math.floor(value / 7);
            let column = value % 7;
            this.groupedArray[row][column].isSelected = true;
        });
    }

    showYearView() {
        this.showYears.emit(this.selectedMY);
    }

    dateClicked(i, j) {
        this.groupedArray[i][j].isSelected = !this.groupedArray[i][j].isSelected;

        this.selectedMY.date = this.groupedArray[i][j].value;

        this.datePickerService.setSelectedDate(this.selectedMY);
        this.sendSelectedDate.emit(this.datePickerService.getSelectedDate());

    }

    minDateCheck() {
        return (this.minDateObj.month >= this.selectedMY.month &&
            this.minDateObj.year >= this.selectedMY.year) ? true : false;
    }

    maxDateCheck() {
        return (this.maxDateObj.month <= this.selectedMY.month &&
            this.maxDateObj.year <= this.selectedMY.year) ? true : false;
    }

}
