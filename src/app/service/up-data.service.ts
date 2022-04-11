import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UpDataService {
  private SERVER = API_ENDPOINT;
  private doctors: AngularFirestoreCollection<any>;
  constructor(public afs: AngularFirestore, 
              public http: HttpClient) { 
    this.doctors = afs.collection<any>('doctores')
  }

  getAllDataPerUser(idDoctor){
    console.log(idDoctor)
      return this.afs.collection('doctors', ref => ref.where('idDoc', '==', idDoctor)).valueChanges();
  }

  updateDataPerUser(data){
    const doctorId = data.idDoc.toString();
    console.log(doctorId);
    return this.afs.collection('doctors').doc(doctorId).set({
      data
    } ,{ merge: true })
    .catch(err => {
      console.log('error de escritura en cita', err)
    });
  }

  getDoctorInfo(id){
    return this.http.get(this.SERVER + `ebooking/doctors/getDoctorByProfessionalId/${id}`).pipe(
      map(data => {
        return data
      }, err => {
        return err
      })
    )
  }

  createSpaceUser(data){
    let params = data
      return this.http.post(this.SERVER + 'ebooking/doctors/create', params).pipe(
        map(data => {
          return data
        }, err => {
          return err
        })
      )
  }

}
