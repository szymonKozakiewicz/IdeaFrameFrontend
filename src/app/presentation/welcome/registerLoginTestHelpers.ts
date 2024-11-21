import { ComponentFixture } from "@angular/core/testing";

export function getTagByTestId(fixture: ComponentFixture<any>,tagId:string): any {

    return fixture.debugElement.nativeElement.querySelector(`[data-testid="${tagId}"]`);
}
export function getPasswordRequiredError(fixture: ComponentFixture<any>): any {
    return getTagByTestId(fixture,"passwordRequiredError");
  }
  
export function getLoginRequiredError(fixture: ComponentFixture<any>): any {
  return fixture.debugElement.nativeElement.querySelector('[data-testid="loginRequiredError"]');
}