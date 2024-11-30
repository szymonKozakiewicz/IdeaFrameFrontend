import { ComponentFixture } from "@angular/core/testing";

export function getElementByTestId<T>(fixture:ComponentFixture<T>, id:string):HTMLElement
{
    return fixture.debugElement.nativeElement.querySelector(`[data-testid=${id}`);
}