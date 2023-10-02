import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LogicService } from '../logic.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaConfig } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService,public logicservice:LogicService)
  {
    //console.log(this.getCurrentRole());

  }
  clicked=false;
  faBurger = faBars;
  faTimes = faTimes;
  getCurrentRole() :any
  {
    return this.auth.getUserRole(this.auth.currentUser);
  }

  isMenuOpen = false;
   openMenu() : void {
    var x = document.getElementById("nav-menu");
  if (x.className === "nav-container") {
    x.className += " responsive";
    this.clicked=true;
  } else {
    x.className = "nav-container";
  }

  }

  closeMenu() : void {
    this.clicked=false;
    var x = document.getElementById("nav-menu");
    if (x.className === "nav-container responsive") {
      x.className = "nav-container";
    }
  }

}
