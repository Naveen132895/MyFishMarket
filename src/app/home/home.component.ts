import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import foodsList from '../foods';
import { Router, CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import * as jsPDF from 'jspdf'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods          : Object[];
  user          : Object[];

  myList         : {name: string, amount: number, quantity: number, image: string}[] = [];
  userdetails    : {name: string, phone: number, email: string, address: string}[] = [];
  pattern        : string;
  isEditing      : boolean = false;
  newFoodName    : string = "Example Name";
  newFoodamount  : number = 250;
  newFoodImage   : string = "https://pngimg.com/uploads/goldfish/goldfish_PNG88.png";
  quantity       : number;
  totalamount    : number = 0;
  name           : string;
  phone          : number;
  email          : string; 
  address        : string;
  type           : boolean = false;
  constructor(private router: Router,private toastr: ToastrService) {}

  ngOnInit() {
    this.foods = foodsList;
  }

  enableUserToAddFood(){
    this.isEditing = !this.isEditing;
  }

  newFood(){
    const newFood = {
      name: this.newFoodName,
      amount: this.newFoodamount,
      image: this.newFoodImage,
      quantity: 0
    }

    this.foods.unshift(newFood);

    this.isEditing = true;
    this.newFoodName = "";
    this.newFoodamount = null;
    this.newFoodImage = "";
  }

  addToMyList(food, quantityInput){
    document.getElementById('menu').style.visibility='visible'
    const existingFood = this.myList.find(item => item.name === food.name)
    const quantity = Number(quantityInput.value)

    if (existingFood){
      existingFood.quantity += quantity;
    } else {
      food.quantity = quantity;
      this.myList.push(food);
    }
    this.totalamount += (food.amount * quantity);
    this.quantity = 1;
  }
  @ViewChild('pdfTable') pdfTable: ElementRef;


  public downloadAsPDF() {
    let doc = new jsPDF('p','pt', 'a4');
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('xyzinvoice.pdf');
    this.toastr.success('Check your Invoice',"Thank You For Order",{timeOut: 5000});;

    this.router.navigate(['/login']);

  }

  userdata(){
    document.getElementById('address').style.visibility='visible'

    const userdata = {
      name  : this.name,
      phone : this.phone,
      email : this.email,
      address: this.address
    }
    this.user.unshift(userdata);
    this.isEditing = true;
    this.name = "";
    this.phone = null
    this.email = "";
    this.address = "";

  }
  addmore(){
    document.getElementById('address').style.visibility='hidden'

  }
}
