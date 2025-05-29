import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './presentation/app-routing/app-routing.module';
import { LogoComponent } from './presentation/logo/logo.component';
import { WelcomeComponent } from './presentation/welcome/welcome.component';
import { LoginComponent } from './presentation/welcome/login/login.component';
import { FormFrameRegisterLoginComponent } from './presentation/welcome/form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from './presentation/welcome/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperationResultComponent } from './presentation/operations-results/operation-result/operation-result.component';
import { RegisterOperationResultComponent } from './presentation/operations-results/register-operation-result/register-operation-result.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UserPanelComponent } from './presentation/user-panel/user-panel.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { UserMenuComponent } from './presentation/user-panel/user-menu/user-menu.component';
import { UserAvatarComponent } from './presentation/user-panel/user-avatar/user-avatar.component';
import { DirectoryManagagerComponent } from './presentation/user-panel/directory-managager/directory-managager.component';
import { AddFolderFileComponent } from './presentation/user-panel/directory-managager/add-folder-file/add-folder-file.component';
import { ModalOperationResultComponent } from './presentation/operations-results/modal-operation-result/modal-operation-result.component';
import { DirectoryManagerPanelComponent } from './presentation/user-panel/directory-managager/directory-manager-panel/directory-manager-panel.component';
import { FileItemComponent } from './presentation/user-panel/directory-managager/directory-manager-panel/file-item/file-item.component';
import { FileItemMenuComponent } from './presentation/user-panel/directory-managager/directory-manager-panel/file-item-menu/file-item-menu.component';
import { SetFileitemNameComponent } from './presentation/user-panel/directory-managager/set-fileitem-name/set-fileitem-name.component';
import { MindmapPanelComponent } from './presentation/mindmap-panel/mindmap-panel.component';
import { NodeSettingsComponent } from './presentation/mindmap-panel/node-settings/node-settings.component';
import { NodeContextMenuComponent } from './presentation/mindmap-panel/node-context-menu/node-context-menu.component';
import { MindMapComponent } from './presentation/mindmap-panel/mind-map/mind-map.component';
import { NodeComponent } from './presentation/mindmap-panel/mind-map/node/node.component';
import { AdjustTextAreaDirective } from './presentation/derectives/adjust-text-area.directive';
import { CdkDragDrop, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MapPanningDirective } from './presentation/derectives/map-panning.directive';
import { FileItemMenuInMindMapComponent } from './presentation/mindmap-panel/mind-map/file-item-menu-in-mind-map/file-item-menu-in-mind-map.component';


@NgModule({
  declarations: [OperationResultComponent,
    AppComponent,
    LogoComponent,
    WelcomeComponent,
    LoginComponent, 
    FormFrameRegisterLoginComponent, 
    RegisterComponent,
    RegisterOperationResultComponent,
    UserPanelComponent,
    UserMenuComponent,
    UserAvatarComponent,
    DirectoryManagagerComponent,
    AddFolderFileComponent,
    ModalOperationResultComponent,
    DirectoryManagerPanelComponent,
    FileItemComponent,
    FileItemMenuComponent,
    SetFileitemNameComponent,
    MindmapPanelComponent,
    NodeSettingsComponent,
    NodeContextMenuComponent,
    MindMapComponent,
    NodeComponent,
    AdjustTextAreaDirective,
    MapPanningDirective,
    FileItemMenuInMindMapComponent
  ],
  imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule,HttpClientModule,CdkDrag, CdkDropList],
  bootstrap:[AppComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
    , 
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class AppModule { }

