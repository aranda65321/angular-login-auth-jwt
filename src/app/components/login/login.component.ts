import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationUserResponse } from 'src/app/commons/domain/dto/AuthenticationUserResponse';
import { AuthenticationService } from 'src/app/commons/services/login/impl/login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  errorCredentials: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private loginService: AuthenticationService,
    private router: Router) {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }


  loginUser() {
    if (this.formLogin.valid) {
      this.loginService.authenticateUser(
        this.formLogin.get('username')?.value,
        this.formLogin.get('password')?.value).subscribe(
          {
            next: (data: any) => {
              let response: AuthenticationUserResponse = data['succes'];
              if (response !== null && response.ok) {
                this.loginService.setToken(response.token);
                this.router.navigate(['/home'])
                this.errorCredentials = false;
                return;
              }
              this.errorCredentials = true;
            },
            error: (e: any) => {
              console.error(e);
            }
          }
        )
    }
  }


}
