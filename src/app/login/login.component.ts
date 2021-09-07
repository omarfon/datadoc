import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email;
  public password;
  public dataLoginSuccess;

  constructor(public router: Router, public auth: AuthService, public loading: LoadingController, public alert: AlertController) { }

  ngOnInit() {
    this.getPublicKey();
  }

  getPublicKey() {
    this.auth.getKey().subscribe((data: any) => {
      console.log('data', data);
      const keypublic = data.authorization;
      const role = data.role;
      if (keypublic) {
        localStorage.setItem('authorization', keypublic);
        localStorage.setItem('role', role);
      }
    });
  }

  async goToHome(email, password){
    const loading = await this.loading.create({
      message:'Espere por favor'
    });
    await loading.present();
    console.log(email, password);
    this.auth.login(email, password).subscribe(data => {
      this.dataLoginSuccess = data;
      if (this.dataLoginSuccess) {
        localStorage.setItem('dataDoctor', JSON.stringify(this.dataLoginSuccess));
        localStorage.setItem('authorization', this.dataLoginSuccess.authorization);
        this.router.navigate(['/data']);
      }
      loading.dismiss();
    }, async err => {
      loading.dismiss();
      console.log('data error:', err);
      const alert = await this.alert.create({
        header:'Error de registro',
        message:`${err.error.message}`,
        buttons:[{
          text:'Reintentar'
        }]
      });
      await alert.present();
      /* this.dialog.open(ErrorLoginComponent, { data }) */
    });
  }
  

}
 