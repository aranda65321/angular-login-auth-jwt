import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtokenUtilService } from 'src/app/commons/services/login/impl/jwtokenUtil.service';
import { AuthenticationService } from 'src/app/commons/services/login/impl/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
