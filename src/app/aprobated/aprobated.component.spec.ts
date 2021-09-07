import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AprobatedComponent } from './aprobated.component';

describe('AprobatedComponent', () => {
  let component: AprobatedComponent;
  let fixture: ComponentFixture<AprobatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobatedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AprobatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
