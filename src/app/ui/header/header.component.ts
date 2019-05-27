import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private currentUser: any = {};
  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authentication.currentUser.subscribe(
      user => this.currentUser = user
    );    
  }

  logout() {
    this.authentication.logout();
    this.router.navigateByUrl('/login');
  }

}
