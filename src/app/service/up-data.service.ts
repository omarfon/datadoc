import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UpDataService {

  private doctors: AngularFirestoreCollection<any>;
  constructor(public afs: AngularFirestore) { 
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

}
