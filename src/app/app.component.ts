import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    blacklistarray = [
        '2018-07-15',
        '2018-09-6',
        '2018-07-24'
    ]
    selectedDatesArr = ['2018-07-29']

    sendSelectedDateApp(event){
        console.log(event);
    }

}
