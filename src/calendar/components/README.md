1. Add CalendarModule import to your @NgModule like example below

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarModule } from '../calendar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

2. Add the following snippet inside your template:

<calendar [minDate]="'2016-05-5'" [maxDate]="'2018-06-29'" (userSelectedDates)="getDates($event)" 
[blackList]="blacklistarray"></calendar>

3. Dates should be in 'YYYY-MM-DD' format.


