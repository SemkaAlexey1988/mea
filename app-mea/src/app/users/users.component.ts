import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '../common/services/users.service';

import { Users } from '../common/models/users.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  listUsers: Users[] = [];

  constructor(private UsersService: UsersService) { }

  form: FormGroup; 
  user_name: string;
  user_email: string;
  user_description: string;

  titleForm: string;
 buttonForm: string;

  nameValue:string;
  emailValue:string;
  descriptionValue:string;
  id_value:number; 

  imputLength: number;
  messageSuccess: boolean;
  messageSeveSuccess: boolean;

changeData() {
  this.UsersService
  .getUsers()
  .subscribe((listUsers: Users[]) => {
  this.listUsers = listUsers;
  //	console.log(this.listUsers);
  });	
}
 

  ngOnInit() {

    this.imputLength = 3;  
    this.messageSuccess = false;
    this.messageSeveSuccess = false;

    this.titleForm = "Add user"; 
  this.buttonForm = "Add  user"; 
    

    this.nameValue = "";
    this.emailValue = "";
    this.descriptionValue = "";
    this.id_value = null; 



    this.UsersService
.getUsers()
.subscribe((listUsers: Users[]) => {
 
this.listUsers = listUsers;
//	console.log(this.listUsers);
});	


this.form = new FormGroup({
  idUser: new FormControl('', ),
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  description: new FormControl('', [Validators.required, this.checkMinLength.bind(this)])

});



  }

  checkMinLength(control: FormControl){
    //  console.log(control.value);
  
  if (control.value.length < this.imputLength ){
    return {
      "lengthError": true
    };
  }else {
   return null;
  }
    }


    reset(){
      this.form = new FormGroup({
        idUser: new FormControl('', ),
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        description: new FormControl('', [Validators.required, this.checkMinLength.bind(this)])
      });  
      this.id_value = null;
      this.titleForm = "Add user"; 
      this.buttonForm = "Add user"; 
    }


  onSubmit(){
    this.user_name = this.form.value.name;
    this.user_email = this.form.value.email;
    this.user_description = this.form.value.description;

    if(this.id_value == null){
    

    this.UsersService
.addUser(this.user_name, this.user_email, this.user_description)
.subscribe((response) => {

  this.changeData();

 // console.log(this.user_description);
//this.listUsers.push(json);

this.form = new FormGroup({
  idUser: new FormControl('', ),
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  description: new FormControl('', [Validators.required, this.checkMinLength.bind(this)])
});

this.messageSuccess = true;

setInterval(()=>{
  this.messageSuccess = false;
},5000)


});

this.titleForm = "Add user"; 
this.buttonForm = "Save user"; 

    /*
    console.log(this.user_name);
    console.log(this.user_email);
    console.log(this.user_description);
    */
  }else{
    this.UsersService
    .editUser(this.user_name, this.user_email, this.user_description, this.id_value)
    .subscribe((json) => {
    
    
   
    
      this.changeData();
   
  
  
      this.form = new FormGroup({
        idUser: new FormControl('', ),
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        description: new FormControl('', [Validators.required, this.checkMinLength.bind(this)])
      });
    
      this.titleForm = "Add user"; 
      this.buttonForm = "Save user"; 
  
    this.messageSuccess = false;
    this.messageSeveSuccess = true;
    
    setInterval(()=>{
          this.messageSeveSuccess = false;
    },5000)
    
    
    
    
    });    
  }  


}


onDelete(elementEl){

var confirmed = confirm('Are you sure you want to delete the user?');
if(confirmed){
var delId:number = elementEl.id; 

this.UsersService.deleteUser(delId).subscribe((json) => {
  this.changeData();
  });
}
}

onEdit(elementEl){

  this.nameValue = "";
  this.emailValue = "";
  this.descriptionValue = "";
  this.id_value = null;  
  
  var editId:number = elementEl.id; 

  this.titleForm = "Edit user"; 
  this.buttonForm = "Save user"; 

  this.UsersService
  .getOneUser(elementEl.id)
  .subscribe((json:Users) => {

   var data = json[0]; 
 
    

  this.nameValue = data.name;
this.emailValue = data.email;
this.descriptionValue = data.description;
this.id_value = elementEl.id; 




  });
  
}





}
