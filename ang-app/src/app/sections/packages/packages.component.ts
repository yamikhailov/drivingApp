import { Component, OnInit } from '@angular/core';
import { packages } from './mock-packages';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  packages = packages;
  constructor() { }
  
  ngOnInit(): void {
  }

}
