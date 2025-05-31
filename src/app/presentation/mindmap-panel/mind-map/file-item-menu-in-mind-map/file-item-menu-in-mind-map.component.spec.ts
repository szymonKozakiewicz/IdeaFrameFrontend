import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FileItemMenuInMindMapComponent } from './file-item-menu-in-mind-map.component';
import { getElementByTestId } from 'src/app/testHelpers/data-testid-selector';
import { getAuthorisationServiceMock, getDirectoryServiceMock, getLoginServiceMock, getMindMapMock, getMoveFileItemServiceMock, getRenameServiceMock, getUserPanelServiceMock, getUserServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { routes } from 'src/app/app.routes';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { UserPanelComponent } from 'src/app/presentation/user-panel/user-panel.component';
import { LoginService } from 'src/app/core/services/login.service';
import { UserPanelService } from 'src/app/core/services/user-panel.service';
import { UserService } from 'src/app/core/services/user.service';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';
import { AuthorisationService } from 'src/app/core/services/authorisation.service';
import { of } from 'rxjs';

describe('FileItemMenuInMindMapComponent', () => {
  let component: FileItemMenuInMindMapComponent;
  let fixture: ComponentFixture<FileItemMenuInMindMapComponent>;
  let mindMapServiceMock:any;
  let authorizationServiceMock:any;

  beforeEach(async () => {
    mindMapServiceMock=getMindMapMock();
    authorizationServiceMock=getAuthorisationServiceMock();
    authorizationServiceMock.isLoggedIn.and.returnValue(of(true));
    await TestBed.configureTestingModule({
      declarations: [FileItemMenuInMindMapComponent,UserPanelComponent],
      providers: [
        {provide: MindMapService, useValue: mindMapServiceMock},
        provideRouter(routes),
        {provide:Location,useClass:SpyLocation},
        {provide:AuthorisationService, useValue:authorizationServiceMock},
        { provide: LoginService, useValue: getLoginServiceMock() },
        { provide: UserPanelService, useValue: getUserPanelServiceMock()},
        { provide: UserService, useValue: getUserServiceMock() },
        { provide: DirectoryManagerService, useValue: getDirectoryServiceMock() },
        { provide: MoveFileItemService, useValue: getMoveFileItemServiceMock() },
        { provide: RenameFileItemService, useValue: getRenameServiceMock() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileItemMenuInMindMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking on save button should trigger saveMindMap method from mind map service', ()=>{
    //arrange
    let btnFileItem=getElementByTestId(fixture,"btnFileItem" )
    btnFileItem.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    fixture.detectChanges();
    let saveButton=getElementByTestId(fixture,"btnSave" )


    //act
    saveButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    //assert
    expect(mindMapServiceMock.saveMindMap).toHaveBeenCalled();
  })

  it('clicking on close mind map button should open userPanel component',fakeAsync (()=>{
    //arrange
    let btnFileItem=getElementByTestId(fixture,"btnFileItem" )
    btnFileItem.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    fixture.detectChanges();
    let closeMindMapBtn=getElementByTestId(fixture,"btnCloseMindMap")
    let location=TestBed.inject(Location);

    //act
    closeMindMapBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    tick();
    fixture.detectChanges();
    

    //assert
    expect(location.path()).toBe('/userPanel');
  }))
});

