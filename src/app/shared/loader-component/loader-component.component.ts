import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader-component.component.html',
  styleUrls: ['./loader-component.component.scss']
})
export class LoaderComponentComponent implements OnInit {

  @Input() showLoader: string;

  constructor() { }

  ngOnInit() {
  }

}
