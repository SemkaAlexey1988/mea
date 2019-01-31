import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: Http) { }

  url:string = 'http://localhost:3000/users';

 getUsers(){
  return this.http.get(this.url).pipe(map(response => { 
    return  response.json() 
  }));
    }

addUser(user_name, user_email, user_description){
      const data = {
        user_name: user_name,
        user_email: user_email,
        user_description: user_description
      }


      
      return this.http.post(this.url, data ).pipe(map((response: Response) => {
      //	console.log(response);
      // return response.json();	
      return response;
      }));
      }    


      deleteUser(delId){
	
        return this.http.delete(`${this.url}/${delId}`).pipe(map((response: Response) => {
        //  console.log(response);
        //  return response.json();	
          return response;
          }));
      }  
      
      getOneUser(editId){
        console.log(editId);
        return this.http.get(`${this.url}/${editId}`).pipe(map((response: Response) => {
        
        return response.json();	
        }));	
        } 
        
        editUser(user_name, user_email, user_description, idValue){


          const data = {
            user_name: user_name,
            user_email: user_email,
            user_description:  user_description,
          }

        
          
          return this.http.put(`${this.url}/${idValue}`, data ).pipe(map((response: Response) => {
          return response;	
          }));
          }  


}
