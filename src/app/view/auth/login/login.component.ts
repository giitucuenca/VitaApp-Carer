import { AuthService } from './../../../services/auth/auth.service';
import { VitaappService } from './../../../services/vitaapp/vitaapp.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('formLoginContainer') formLoginContainer: ElementRef<HTMLElement>;
  @ViewChild('formRegisterContainer')
  formRegisterContainer: ElementRef<HTMLElement>;
  @ViewChild('modal') modal: ModalComponent;

  // * Actualiza la fecha del footer
  date: number;
  // * Contiene los valores del formulario de log in.
  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // * Obtengo la fecha actual
    this.date = Date.now();
    // * Inicializo el formulario
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  logIn(): void {
    if (this.formLogin.valid) {
    }
  }

  openRegister(): void {
    if (
      this.formRegisterContainer.nativeElement.classList.contains('init__left')
    ) {
      this.formRegisterContainer.nativeElement.classList.remove('init__left');
    }
    if (
      this.formRegisterContainer.nativeElement.classList.contains(
        'animate__bounceOutLeft'
      )
    ) {
      this.formRegisterContainer.nativeElement.classList.remove(
        'animate__bounceOutLeft'
      );
    }

    this.formRegisterContainer.nativeElement.classList.add(
      'animate__backInLeft'
    );
    this.formLoginContainer.nativeElement.classList.add(
      'animate__bounceOutRight'
    );
  }

  openLogin(): void {
    this.formRegisterContainer.nativeElement.classList.add(
      'animate__bounceOutLeft'
    );
    if (
      this.formLoginContainer.nativeElement.classList.contains(
        'animate__bounceOutRight'
      )
    ) {
      this.formLoginContainer.nativeElement.classList.remove(
        'animate__bounceOutRight'
      );
    }

    this.formLoginContainer.nativeElement.classList.add('animate__backInRight');
  }

  /**
   * * Comprueba que el email sea invalido y regresa true
   * * si es invalido y si fue pulsado por el usuario
   */
  get invalidEmail() {
    return (
      this.formLogin.get('email').invalid && this.formLogin.get('email').touched
    );
  }
  /**
   * * Comprueba que el password sea invalido y regresa true
   * * si es invalido y si fue pulsado por el usuario
   */
  get invalidPassword() {
    return (
      this.formLogin.get('password').invalid &&
      this.formLogin.get('password').touched
    );
  }

  get getEmail(): string {
    return this.formLogin.get('email').value;
  }

  get getPassword(): string {
    return this.formLogin.get('password').value;
  }

  /**
   * * Valida que todos los campos del formulario sean validos
   * * en caso de nos ser así marca a todos los inputs como touched
   * * para que se muestre el error al usuario.
   */
  validateForm() {
    if (this.formLogin.invalid) {
      return Object.values(this.formLogin.controls).forEach(
        (control) => control.markAllAsTouched
      );
    }
  }

  openModal() {
    this.modal.openModal();
  }
}
