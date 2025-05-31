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
import { NodeMindMapDTO } from "../dto/node-mind-map.dto";
import { FileItemDTO } from "../dto/file-item.dto";
import { NodeMindMapLoadDTO } from "../dto/node-mindmap-load.dto";
import { OperationStatus } from "../enum/operation.status";

@Injectable({providedIn:'root'})
export class MindMapService
{



    public mindMapUpdated$:Subject<void>=new Subject<void>();
    public updateSelectedNodeInSettings$:Subject<NodeMindMap>=new Subject<NodeMindMap>();
    public updateSelectedNodeInNodeComponent$:Subject<void>=new Subject<void>();
    public diselectAllNodes$:Subject<void>=new Subject<void>();
    public mindMapSaveStatus$:Subject<OperationStatus>=new Subject<OperationStatus>();
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
        let newNode=new NodeMindMap("","default name","#fffaf0",coordinates,false);
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
        this.setNodeAsUpdated();
        this.updateSelectedNodeInNodeComponent$.next();

    }


    private setNodeAsUpdated() {
        if (this.selectedNode.id.length > 0)
            this.selectedNode.wasEdited = true;
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
        this.setNodeAsUpdated();
        this.updateSelectedNodeInNodeComponent$.next();
    }

    updateSelectedNodeColor(newValue: string) {
        this.selectedNode.color=newValue;
        this.setNodeAsUpdated();
        this.updateSelectedNodeInNodeComponent$.next();
    }

    updateMapAfterTranslation(){
        this.mindMapUpdated$.next();
    }

    getFileItemName(): string {
        return this.currentFileItem.name;
    }

    saveMindMap() {
        
        let fileItemDto=this.currentFileItem.convertWithPathToFileItemDTO();
        let nodesDTO=this.nodes.map(node => node.convertToNodeMindMapDTO());
        let mindMapSaveDTO= new MindMapSaveDto(fileItemDto,nodesDTO);
        this.setWasEditedPropertyToFalseForAllNodes();
        this.mindMapSaveStatus$.next(OperationStatus.IN_PROGRESS);
        
        this.clientHttp.post<NodeMindMapLoadDTO[]>(ApiEndpoints.SAVE_MINDMAP, mindMapSaveDTO).subscribe({
            next:this.finaliseSavingMindMap.bind(this),
            error:(error)=>{
                console.error("Error saving mind map", error);
            }
        })
        
    }

    private setWasEditedPropertyToFalseForAllNodes() {
        for (let node of this.nodes) {
            node.wasEdited = false;
        }
    }

    loadMindMapFromBakcend() {
        let fileItemDto=this.currentFileItem.convertWithPathToFileItemDTO();
        this.clientHttp.post<NodeMindMapLoadDTO[]>(ApiEndpoints.LOAD_MINDMAP, fileItemDto).subscribe({
            next: this.saveNodesFromBackend.bind(this),
            error:(error)=>{
                console.error("Error loading minamap data from backend", error);
            }
        })
    }

    private finaliseSavingMindMap(nodesDTO: NodeMindMapLoadDTO[]){
        this.saveNodesFromBackend(nodesDTO);
        this.mindMapSaveStatus$.next(OperationStatus.SUCCESS);
    }

    private saveNodesFromBackend(nodesDTO: NodeMindMapLoadDTO[]) {
        this.nodes=nodesDTO.map(nodeDTO=> NodeMindMap.build(nodeDTO));
        this.mindMapUpdated$.next();
    }


        

}