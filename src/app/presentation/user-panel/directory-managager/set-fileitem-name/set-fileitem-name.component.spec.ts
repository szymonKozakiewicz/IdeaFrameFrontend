import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFileitemNameComponent } from './set-fileitem-name.component';

describe('SetFileitemNameComponent', () => {
  let component: SetFileitemNameComponent;
  let fixture: ComponentFixture<SetFileitemNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetFileitemNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetFileitemNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
