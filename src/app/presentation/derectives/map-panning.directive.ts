import { Directive, ElementRef, HostBinding, HostListener, OnInit } from "@angular/core";
import { MapPanningService } from "src/app/core/services/map-panning.service";
import { MindMapService } from "src/app/core/services/mind-map.service";

@Directive({
    selector: '[mapPanning]'
})
export class MapPanningDirective implements OnInit
{

    panningStartPoint= { x: 0, y: 0 };
    translationStarted: boolean = false;

    constructor(private panningService: MapPanningService) {

    }

    ngOnInit(): void {
        this.panningService.updateCursor$.subscribe({
            next: this.updateCursorStyle.bind(this)
        })
    }

    @HostBinding("style.cursor") cursorStyle = 'default';

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent): void {
        let isInPanningmode=this.panningService.getMapPanningMode()
        if (!isInPanningmode) {
            return;
        }
        this.panningStartPoint = { x: event.offsetX, y: event.offsetY };
        this.panningService.initPanning();
        this.translationStarted = true;
        this.cursorStyle = 'grabbing !important';
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        if (!this.translationStarted) {
            return;
        }
        const currentPoint = { x: event.offsetX, y: event.offsetY };
        this.panningService.updateCurrentMapTranslation(this.panningStartPoint,currentPoint)
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: MouseEvent): void {
        this.finalizeTranslation(event);
    }



    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event: MouseEvent): void {
        this.finalizeTranslation(event);
    }

    finalizeTranslation(event: MouseEvent){

        if (!this.translationStarted) {
            return;
        }
        const currentPoint = { x: event.offsetX, y: event.offsetY };
        this.panningService.finishTranslation(this.panningStartPoint,currentPoint)
        this.translationStarted = false;
        this.panningService.setNewCursorMode('grab');

    }


    updateCursorStyle(cursorStyle: string) {
        
        this.cursorStyle = cursorStyle+ ' !important';
    }

    
    

}