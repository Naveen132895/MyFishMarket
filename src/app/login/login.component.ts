import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  state=1;
 email:string
 password:string
  constructor(private formBuilder: FormBuilder,private router: Router) { }
  data =
  [
  {
    email: "admin@gmail.com", 
    password:"Admin@123" 
  },
  {
    email: "admin1@gmail.com", 
    password:"Admin@123" 
  },
  {
    email: "admin2@gmail.com", 
    password:"Admin@123" 
  }
]

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      },

    );
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.email=this.registerForm.value.email
    this.password=this.registerForm.value.password
   console.log(this.email)
   console.log(this.password)

    this.data.forEach((e)=>{
      if(e.email==this.email && e.password==this.password)
      {
        // this.router.navigate(['/home']);
        this.state=0;
         this.router.navigate(['/home']);
        }
       
       
    })
    this.registerForm.reset();

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
