import { Injectable } from "@angular/core";
import { NodeCoordinates } from "../domain/entities/node-coordinates";
import { Subject } from "rxjs";
import { MindMapService } from "./mind-map.service";

@Injectable({providedIn:'root'})
export class MapPanningService{





    public updateCursor$=new Subject<string>()
    public updateMapAfterTranslation$=new Subject<void>();
    private isMapPanningModeActive:boolean=false;
    private currentMapTranslation: { x: number; y: number } = { x: 0, y: 0 };   
    private mapTranslationWhenPanningStarted: { x: number; y: number } = { x: 0, y: 0 }; 


    constructor() {
        
        
    }

    getMapPanningMode(): boolean {
        return this.isMapPanningModeActive;
    }


    getTranslatedNodeCoordinates(coordinates: NodeCoordinates) {
        let translatedX=coordinates.x+this.currentMapTranslation.x;
        let translatedy=coordinates.y+this.currentMapTranslation.y;
        let translatedNodeCordinates=new NodeCoordinates(translatedX,translatedy);
        return translatedNodeCordinates;
    }
    
    setMapPanningMode(newValue: boolean) {

        this.isMapPanningModeActive=newValue;

    }

    setNewCursorMode(newCursorMode: string) {
        this.updateCursor$.next(newCursorMode);
    }

    initPanning()
    {
        this.mapTranslationWhenPanningStarted={ x: this.currentMapTranslation.x, y: this.currentMapTranslation.y };
    }

    updateCurrentMapTranslation(panningStartPoint: { x: number; y: number; }, currentPoint: { x: number; y: number; }) {
       
        let translationX=currentPoint.x-panningStartPoint.x;
       let translationY=currentPoint.y-panningStartPoint.y;
       this.currentMapTranslation.x=this.mapTranslationWhenPanningStarted.x+translationX;
       this.currentMapTranslation.y=this.mapTranslationWhenPanningStarted.y+translationY;
       this.updateMapAfterTranslation$.next();
    
    }

    finishTranslation(panningStartPoint: { x: number; y: number; }, currentPoint: { x: number; y: number; }) {
        this.updateCurrentMapTranslation(panningStartPoint, currentPoint);
        this.mapTranslationWhenPanningStarted=this.currentMapTranslation;

    }

    getReversedTranlationOfCoordinates(coordinates: NodeCoordinates): NodeCoordinates {
        let reversedX=coordinates.x-this.currentMapTranslation.x;
        let reversedY=coordinates.y-this.currentMapTranslation.y;
        return new NodeCoordinates(reversedX,reversedY);
    }

    resetTranslation() {
        this.currentMapTranslation = { x: 0, y: 0 };
    }

}