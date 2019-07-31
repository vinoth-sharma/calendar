import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CalendarComponent } from './components/calendar/calendar.component';
import { CalDatepickerComponent } from './components/cal-datepicker/cal-datepicker.component';
import { CalMonthpickerComponent } from './components/cal-monthpicker/cal-monthpicker.component';
import { CalYearpickerComponent } from './components/cal-yearpicker/cal-yearpicker.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalDatepickerComponent,
    CalMonthpickerComponent,
    CalYearpickerComponent
  ],
  imports: [
    BrowserModule
  ],
  exports:[
    CalendarComponent,
    CalDatepickerComponent,
    CalMonthpickerComponent,
    CalYearpickerComponent
  ]
})
export class CalendarModule { }
