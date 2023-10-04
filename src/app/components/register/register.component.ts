import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationUserResponse } from 'src/app/commons/domain/dto/AuthenticationUserResponse';
import { AuthenticationService } from 'src/app/commons/services/login/impl/login-service.service';
import * as $AB from 'jquery';
import 'bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formLogin: FormGroup;
  registerResult?: string = "";



  constructor(private formBuilder: FormBuilder,
    private loginService: AuthenticationService,) {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  register() {
    if (this.formLogin.valid) {
      this.loginService.createUser(
        this.formLogin.get('username')?.value,
        this.formLogin.get('password')?.value).subscribe(
          {
            next: (data: any) => {
              let response: AuthenticationUserResponse = data['sucess'];
              if (response != null && response.ok) {
                this.openRegisterModal(response.status);
              }
            },
            error: (e: any) => {
              console.error(e);
            }
          }
        );
    }
  }

  validPassword() {
    if (this.formLogin.get('password')?.value !== this.formLogin.get('passwordRepeat')?.value) {
      return false;
    }
    return true;
  }

  openRegisterModal(message?: string) {
    this.registerResult = message;
    $('#registerModal').modal('show');
  }

  closeRegisterModal() {
    $('#registerModal').modal('hide');

  }

}
