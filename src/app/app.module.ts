import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DataComponent } from './data/data.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AprobatedComponent } from './aprobated/aprobated.component';


@NgModule({
  declarations: [AppComponent,LoginComponent, DataComponent, AprobatedComponent],
  entryComponents: [],
  imports: [
  BrowserModule, 
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  IonicModule.forRoot(), 
  AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFirestoreModule, // firestore
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
