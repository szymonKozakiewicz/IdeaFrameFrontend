import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFolderFileComponent } from './add-folder-file.component';

describe('AddFolderFileComponent', () => {
  let component: AddFolderFileComponent;
  let fixture: ComponentFixture<AddFolderFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFolderFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFolderFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
