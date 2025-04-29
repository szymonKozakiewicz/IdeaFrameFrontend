export function getErrorMessageElement(fixture:any)
{
   return fixture.debugElement.nativeElement.querySelector('[data-testid="nameInputError"]')
}