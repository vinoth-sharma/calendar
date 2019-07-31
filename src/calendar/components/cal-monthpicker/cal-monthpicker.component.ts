import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-cal-monthpicker',
  templateUrl: './cal-monthpicker.component.html',
  styleUrls: ['./cal-monthpicker.component.css']
})
export class CalMonthpickerComponent implements OnInit {

  @Output() showcalendar:EventEmitter<any> = new EventEmitter();
  @Output() monthSelectionSuccess:EventEmitter<any> = new EventEmitter();
  @Input() minMaxDates:any;

  monthList = [
    [{id:1,value:'JAN'}, {id:2,value:'FEB'},{id:3,value: 'MAR'},{id:4,value: 'APR'}],
    [{id:5,value:'MAY'},{id:6,value: 'JUN'},{id:7,value: 'JUL'},{id:8,value: 'AUG'}],
    [{id:9,value:'SEP'},{id:10,value: 'OCT'},{id:11,value: 'NOV'},{id:12,value: 'DEC'}]
  ]
  minData = {
    year : null,
    month : null,
    date : null
  }
  maxData = {
    year : null,
    month : null,
    date : null
  }

  availMonth = [];
  constructor() { }

  ngOnInit() {
    this.availMonth = [];
    console.log(this.minMaxDates)
    this.monthValidation();
  }

  check(obj){
    return !this.availMonth.some(ele=>ele==obj.id)
  }

  monthValidation(){
    if(this.minMaxDates[0])
        this.minData.year = +this.minMaxDates[0].split('-')[0];
        this.minData.month = +this.minMaxDates[0].split('-')[1];
        this.minData.date = +this.minMaxDates[0].split('-')[2];
    if(this.minMaxDates[1])
        this.maxData.year = +this.minMaxDates[1].split('-')[0];
        this.maxData.month = +this.minMaxDates[1].split('-')[1];
        this.maxData.date = +this.minMaxDates[1].split('-')[2];

    if((this.minData.year == this.maxData.year))
    {
      for(let i = this.minData.month;i<=this.maxData.month;i++){
        this.availMonth.push(i);
      }
    }
  }

  backToCalendar(){
    this.showcalendar.emit();
  }

  monthSelected(i,j){
    let month = i*4 + j+1;
    this.monthSelectionSuccess.emit(month);
  }
}
