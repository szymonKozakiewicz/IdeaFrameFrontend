import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css'
})
export class UserAvatarComponent {
  @Output("toggleUserMenu") toggleMenu = new EventEmitter<void>();
  @Input("userName")userName:string="defaultValue";

  emitToggleUserMenuEvent()
  {
    this.toggleMenu.emit();

  }

  getFirstLetterOfUserName():string
  {
    return this.userName.charAt(0).toUpperCase();
  }

}
