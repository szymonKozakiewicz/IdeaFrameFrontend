import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryManagagerComponent } from './directory-managager.component';

describe('DirectoryManagagerComponent', () => {
  let component: DirectoryManagagerComponent;
  let fixture: ComponentFixture<DirectoryManagagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectoryManagagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryManagagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
