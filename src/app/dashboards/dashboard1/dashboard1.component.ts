import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {

  constructor() { 
    console.log('Dentro del dashboard 1'); 
  }

  ngOnInit() {
    console.log('Dentro del dashboard 1');
  }

}
