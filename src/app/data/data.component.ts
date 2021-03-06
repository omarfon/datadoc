import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpDataService } from '../service/up-data.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {

  public consultaForm: FormGroup;
  public nameDoctor;
  public formacion : any = [];
  public capacitacion : any = [];
  public enferquetrato : any = [];
  public dataEnviada: any;
  public dataDoc: any;
  public forma;
  public capa;
  public dataDoctor;
  public dataDoctorGuardada;
  public edit: boolean = false;
  public datosGuardados:boolean = false;
  constructor(public upData: UpDataService, public fb: FormBuilder, public router: Router) {
  }

  ngOnInit(){
    if(localStorage.getItem('dataDoctor')){
      this.dataDoctor = JSON.parse(localStorage.getItem('dataDoctor'));
      console.log(this.dataDoctor);
      this.nameDoctor = this.dataDoctor.displayName;
    }
    this.getDataDoctor();
  }

  closeSesion(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getDataDoctor(){
    const id = JSON.parse(localStorage.getItem('dataDoctor'))
    const idDoctor = id.professionalId;
    this.upData.getDoctorInfo(idDoctor).subscribe(data => {
      this.dataDoctorGuardada = data;
      if(this.dataDoctorGuardada){
        this.edit = true;
      }else{
        this.edit = false;
      }
      console.log(this.dataDoctorGuardada, this.datosGuardados);
    })
  }
  
    doctorForm = this.fb.group({
      fraseCorta: new FormControl('', [Validators.minLength(5), Validators.maxLength(400)]),
      fraseExtend: new FormControl('', [Validators.minLength(5)]),
      formacionuno: new FormControl(this.formacion, [Validators.minLength(5)]),
      formacionDos: new FormControl(this.formacion, [Validators.minLength(5)]),
      formacionTres: new FormControl(this.formacion, [Validators.minLength(5)]),
      capacitacion: new FormControl(this.capacitacion, [Validators.minLength(5)]),
      enferquetrato: new FormControl('', [Validators.minLength(5)]),
      cmp: new FormControl('', [Validators.minLength(4)]),
      rne: new FormControl('', [Validators.minLength(4)]),
    })
 

  onReset() {
    this.consultaForm.reset();
  }

  onSaveForm(): void {
    console.log('this.doctor.value:', this.doctorForm.value);
    let datosForm = this.doctorForm.value;
    this.dataEnviada = {
      nombreDoctor: this.dataDoctor.displayName,
      apellidoDoctor: this.dataDoctor.surname1,
      apellidomDoctor: this.dataDoctor.surname2,
      professionalId: this.dataDoctor.professionalId,
      user: this.dataDoctor.username,
      savein: new Date(),
      now: moment().format('YYYY-MM-DD'),
      shortSpeach: datosForm.fraseCorta,
      longSpeach: datosForm.fraseExtend,
      professionalTrainings: [{
        idCenter:0,
        data:datosForm.formacionUno,
      },{
        idCenter:1,
        data:datosForm.formacionDos,
      },
      {
        idCenter:2,
        data:datosForm.formacionTres,
      },
    ],
      enferquetrato: datosForm.enferquetrato,
      cmp: datosForm.cmp,
      rne: datosForm.rne,
      stateInfo:'lleno',
      visible: false
    }
      console.log(this.dataEnviada);

    this.upData.createSpaceUser(this.dataEnviada).subscribe(data => {
      console.log(data)
    });
    Swal.fire('Data Guardada...', 'Listo... acabas de guardar datos de la consulta!', 'success')
    console.log('data enviada:', this.dataEnviada);
    this.doctorForm.reset();
  }

  addFormer() {
    this.formacion.push(
      {
        lugares: this.forma,
      }
    );
    this.forma = "";

    console.log('this.medicinas en el push:', this.formacion);

  }

  addCapa() {
    this.formacion.push(
      {
        formacion: this.capa,
      }
    );
    this.capa = "";
    console.log('this.medicinas en el push:', this.formacion);

  }

  addenfer() {
    this.formacion.push(
      {
        enfermedades: this.enferquetrato,
      }
    );
    this.capa = "";
    console.log('this.medicinas en el push:', this.formacion);

  }

}
