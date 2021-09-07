import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { API_ENDPOINT } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SERVER = API_ENDPOINT
  private public_autho = `${this.SERVER}users/public-authorization`;
  private login_doc = `${this.SERVER}auth/login-doctor`;
  constructor(public http: HttpClient) { }

  getKey(){
    return this.http.get(this.public_autho).pipe(
      map(data =>{
        return data
      })
    )
  }

  
  login(email, password){
  
    let params = {username: email, password: password, app:"notas"};
    const authorization = localStorage.getItem('authorization');
    let headers = new HttpHeaders({"Authorization": authorization});

    return this.http.post(this.login_doc, params, {headers}).pipe(
              map((resp:any)=>{
                return resp
              })/* .catch(e =>{
                console.log('error desde el servidor:',e);
              }) */
          )
  }

}
