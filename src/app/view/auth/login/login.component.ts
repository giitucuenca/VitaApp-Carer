import { AuthService } from './../../../services/auth/auth.service';
import { VitaappService } from './../../../services/vitaapp/vitaapp.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { Auth, Carer } from 'src/app/controller/interfaces/carer.interface';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

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
  formRegister: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private vitaapp: VitaappService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // * Obtengo la fecha actual
    this.date = Date.now();
    // * Inicializo el formulario
    this.initializeForm();
  }

  logIn(): void {
    if (this.formLogin.valid) {
      const auth: Auth = {
        username: this.formLogin.get('email').value,
        password: this.formLogin.get('password').value,
      };

      this.vitaapp.loginCarer(auth).subscribe(
        (resp) => {
          this.authService.setSession(resp.jwt);
          // * Redirecciono al main en caso de que la informacion de registro sea correcta
          this.router.navigateByUrl('/adulto-mayor');
        },
        (err) => {
          const msg = {
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          };
          this.showMessage(msg);
        }
      );
    } else {
      const msg = {
        severity: 'error',
        summary: 'Error',
        detail: 'Revise el formulario.',
      };
      this.showMessage(msg);
      this.validateForm();
    }
  }

  register(): void {
    if (this.formRegister.valid) {
      const carer: Carer = {
        name: this.formRegister.get('name').value,
        surname: this.formRegister.get('surname').value,
        email: this.formRegister.get('email').value,
        password: this.formRegister.get('password').value,
      };

      this.vitaapp.registerCarer(carer).subscribe(
        (data) => {
          console.log(data);

          this.authService.setSession(data.token);
          // * Redirecciono al main en caso de que la informacion de registro sea correcta
          this.router.navigateByUrl('/adulto-mayor');
          const msg = {
            severity: 'success',
            summary: 'Enhorabuena',
            detail: data.message,
          };
          this.showMessage(msg);
        },
        (error) => {
          error.error.errors.forEach((err) => {
            const msg = {
              severity: 'error',
              summary: 'Error',
              detail: err,
            };
            this.showMessage(msg);
          });
        }
      );
    } else {
      const msg = {
        severity: 'error',
        summary: 'Error',
        detail: 'Revise el formulario.',
      };
      this.showMessage(msg);
      this.validateRegister();
    }
  }

  initializeForm(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
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

  get invalidName() {
    return (
      this.formRegister.get('name').invalid &&
      this.formRegister.get('name').touched
    );
  }

  get invalidSurname() {
    return (
      this.formRegister.get('surname').invalid &&
      this.formRegister.get('surname').touched
    );
  }

  get invalidEmailRegister() {
    return (
      this.formRegister.get('email').invalid &&
      this.formRegister.get('email').touched
    );
  }

  get invalidPasswordRegister() {
    return (
      this.formRegister.get('password').invalid &&
      this.formRegister.get('password').touched
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
      return Object.values(this.formLogin.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }

  validateRegister() {
    if (this.formRegister.invalid) {
      return Object.values(this.formRegister.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }

  openModal() {
    this.modal.openModal();
  }

  showMessage(msg: Message) {
    this.messageService.add({
      key: 'toastLogin',
      ...msg,
    });
  }
}
