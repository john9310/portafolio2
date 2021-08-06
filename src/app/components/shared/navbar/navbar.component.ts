import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



    show:boolean = false;
  
    // otro código que necesites
  
    toggleCollapse() {
      this.show = !this.show
    }
 

  public isCollapsed = true;

  constructor(route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
