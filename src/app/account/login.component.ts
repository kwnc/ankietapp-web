import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '@app/services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          () => {
            console.log('Użytkownik jest zalogowany');
            this.router.navigateByUrl('/home');
          }
        );
    }
  }

  // this.accountService.login(
  //   {
  //     email: this.f.email.value,
  //     password: this.f.password.value
  //   }
  // )
  //   .subscribe(success => {
  //     if (success) {
  //       this.router.navigate(['/']);
  //     }
  //   });
  // }


//   form: FormGroup;
//   loading = false;
//   submitted = false;
//
//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private accountService: AuthService,
//     private alertService: AlertService
//   ) {
//   }
//
//   ngOnInit() {
//     this.form = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }
//
// // convenience getter for easy access to form fields
//   get f() {
//     return this.form.controls;
//   }
//
//   onSubmit() {
//     // this.submitted = true;
//
//     // // reset alerts on submit
//     // this.alertService.clear();
//
//     // // stop here if form is invalid
//     // if (this.form.invalid) {
//     //   return;
//     // }
//
//     // this.loading = true;
//     this.accountService.login(this.f.email.value, this.f.password.value)
//       .pipe(first())
//       .subscribe(success => {
//         if (success) {
//           this.router.navigate(['/surveys']);
//         }
//       });
//       // .subscribe({
//       //   next: () => {
//       //     // get return url from query parameters or default to home page
//       //     const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//       //     this.router.navigateByUrl(returnUrl);
//       //   },
//       //   error: error => {
//       //     this.alertService.error(error);
//       //     this.loading = false;
//       //   }
//       // });
//   }
}
