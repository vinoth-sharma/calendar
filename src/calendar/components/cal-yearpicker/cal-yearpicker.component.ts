import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cal-yearpicker',
  templateUrl: './cal-yearpicker.component.html',
  styleUrls: ['./cal-yearpicker.component.css']
})
export class CalYearpickerComponent implements OnInit {

  @Output() showcalendar:EventEmitter<any> = new EventEmitter();
  @Output() showMonths:EventEmitter<any> = new EventEmitter();
  @Input() minMaxDates;
  @Input() selectedObj:any;
  yearList = [
    [],
    [],
    [],
    []
  ];

  yearRange;
  dynamicYear = {
    value: 0,
    isDisabled: false
  };
  minMaxYears = {
    min: null,
    max:null
  };
  constructor() { }

  ngOnInit() {
    this.dynamicYear.value = this.selectedObj.year;
    console.log(this.minMaxDates);

    this.minMaxDates[0]?this.minMaxYears.min = +this.minMaxDates[0].split('-')[0]:'';
    this.minMaxDates[1]?this.minMaxYears.max = +this.minMaxDates[1].split('-')[0]:'';
    this.yearsCollector();

    
  }
  

  yearsCollector() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            this.dynamicYear.value += (i===0 && j ===0)?0 :1;
            this.yearList[i].push({
              value: this.dynamicYear.value,
              isDisabled: false
            });                
        }
    }
    this.yearRange = this.dynamicYear.value -15 + '-' + this.dynamicYear.value
    this.disablingYears();
  }

  disablingYears(){
    this.yearList.forEach(row=>{
      row.forEach(ele=>{
        if(!(this.minMaxYears.min <= ele.value && ele.value <= this.minMaxYears.max))
            ele.isDisabled = true;
      })
    })
    console.log(this.yearList);
  }

  previousYears() {
    this.yearList = this.yearList.map(ele=>[]);      
    this.dynamicYear.value = this.dynamicYear.value - 30;
    this.yearsCollector();
    console.log(this.minYearCheck())
  }

  nextYears() {
    this.yearList = this.yearList.map(ele=>[]);      
    this.yearsCollector();
  }

  backToCalendar(){
    this.showcalendar.emit();
  }

  yearSelected(year){
    this.showMonths.emit(year);
  }
  minYearCheck(){
    return this.yearList[0][0].isDisabled?true:false;
  }
  maxYearCheck(){
    return this.yearList[3][3].isDisabled?true:false;
  }

}
