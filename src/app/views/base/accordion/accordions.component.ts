import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent implements OnInit{

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  constructor() {}

  ngOnInit(): void {
    this.slides[0] = {
      src: './assets/images/angular.jpg',
    };
    this.slides[1] = {
      src: './assets/images/react.jpg',
    }
    this.slides[2] = {
      src: './assets/images/vue.jpg',
    }
  }

}
