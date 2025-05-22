import { Directive, ElementRef, HostListener } from "@angular/core";
@Directive({
    selector: '[adjustTextArea]'
})
export class AdjustTextAreaDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const target = this.elementRef.nativeElement as HTMLTextAreaElement;
    target.style.height = 'auto'; 
    target.style.height = `${target.scrollHeight}px`; 
  }
}