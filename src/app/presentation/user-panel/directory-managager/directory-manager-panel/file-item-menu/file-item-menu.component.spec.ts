import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileItemMenuComponent } from './file-item-menu.component';

describe('FileItemMenuComponent', () => {
  let component: FileItemMenuComponent;
  let fixture: ComponentFixture<FileItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileItemMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
