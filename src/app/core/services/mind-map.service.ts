import { Injectable, OnInit } from "@angular/core";
import { FileSystemItemWithPath } from "../domain/entities/file-item-with-path";
import { FileItemType } from "../enum/fileItem.enum";
import { NodeMindMap } from "../domain/entities/node-mind-map";
import { NodeCoordinates } from "../domain/entities/node-coordinates";
import { Subject } from "rxjs";
import { Point } from "@angular/cdk/drag-drop";
import { MapPanningService } from "./map-panning.service";
import { MindMapSaveDto } from "../dto/mind-map-save.dto";
import { HttpClient } from "@angular/common/http";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";

@Injectable({providedIn:'root'})
export class MindMapService
{


    public mindMapUpdated$:Subject<void>=new Subject<void>();
    public updateSelectedNodeInSettings$:Subject<NodeMindMap>=new Subject<NodeMindMap>();
    public updateSelectedNodeInNodeComponent$:Subject<void>=new Subject<void>();
    public diselectAllNodes$:Subject<void>=new Subject<void>();
    private currentFileItem:FileSystemItemWithPath=new FileSystemItemWithPath("",FileItemType.FILE,"");
    private nodes:Array<NodeMindMap>=[];
  
    private defaultSelectedNode:NodeMindMap=new NodeMindMap("","","#fffaf0",new NodeCoordinates(0,0),true);
    private selectedNode:NodeMindMap=this.defaultSelectedNode;


    constructor(private panningService:MapPanningService, private clientHttp:CustomHttpClient) {

        this.panningService.updateMapAfterTranslation$.subscribe({
            next: this.updateMapAfterTranslation.bind(this)
        });
    }



    public setCurrentFileItem(fileItem:FileSystemItemWithPath)
    {
        this.currentFileItem=fileItem;
    }

    public addNewNode(coordinates:NodeCoordinates)
    {
        coordinates=this.panningService.getReversedTranlationOfCoordinates(coordinates);
        let newNode=new NodeMindMap("","default name","#fffaf0",coordinates,true);
        this.nodes.push(newNode);
        this.mindMapUpdated$.next();
    }

    public getNodes()
    {
        return this.nodes;
        
    }


    public updateSelectedNodePosition(finalPostion: Readonly<Point>) {
        this.selectedNode.coordinates.x+=finalPostion.x;
        this.selectedNode.coordinates.y+=finalPostion.y;
        this.updateSelectedNodeInNodeComponent$.next();

    }


    diselectAllNodes() {
       this.diselectAllNodes$.next();
    }

    public selectNode(node:NodeMindMap)
    {
        this.diselectAllNodes$.next();
        this.selectedNode=node;
        this.updateSelectedNodeInSettings$.next(node);
    }

    


    updateSelectedNodeName(nameInputValue: string) {
        this.selectedNode.name=nameInputValue;
        this.updateSelectedNodeInNodeComponent$.next();
    }

    updateSelectedNodeColor(newValue: string) {
        this.selectedNode.color=newValue;
        this.updateSelectedNodeInNodeComponent$.next();
    }

    updateMapAfterTranslation(){
        console.log("updateMapAfterTranslation called");
        this.mindMapUpdated$.next();
    }

    getFileItemName(): string {
        return this.currentFileItem.name;
    }

    saveMindMap() {
        
        let mindMapSaveDTO= new MindMapSaveDto(this.currentFileItem,this.nodes);
        this.clientHttp.post<MindMapSaveDto>(ApiEndpoints.SAVE_MINDMAP, mindMapSaveDTO).subscribe({
            next:()=>{
                console.log("Mind map saved successfully");
            },
            error:(error)=>{
                console.error("Error saving mind map", error);
            }
        })
        
    }


        

}