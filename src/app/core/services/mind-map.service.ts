import { Injectable } from "@angular/core";
import { FileSystemItemWithPath } from "../domain/entities/file-item-with-path";
import { FileItemType } from "../enum/fileItem.enum";
import { NodeMindMap } from "../domain/entities/node-mind-map";
import { NodeCoordinates } from "../domain/entities/node-coordinates";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class MindMapService
{


    public mindMapUpdated$:Subject<void>=new Subject<void>();
    public updateSelectedNodeInSettings$:Subject<NodeMindMap>=new Subject<NodeMindMap>();
    public updateSelectedNodeInNodeComponent$:Subject<void>=new Subject<void>();
    public diselectAllNodes$:Subject<void>=new Subject<void>();
     currentFileItem:FileSystemItemWithPath=new FileSystemItemWithPath("",FileItemType.FILE,"");
    private nodes:Array<NodeMindMap>=[];
    private defaultSelectedNode:NodeMindMap=new NodeMindMap("","",new NodeCoordinates(0,0),true);
    private selectedNode:NodeMindMap=this.defaultSelectedNode;

    
    

    public setCurrentFileItem(fileItem:FileSystemItemWithPath)
    {
        this.currentFileItem=fileItem;
    }

    public addNewNode(coordinates:NodeCoordinates)
    {
        let newNode=new NodeMindMap("","default name",coordinates,true);
        this.nodes.push(newNode);
        this.mindMapUpdated$.next();
    }

    public getNodes()
    {
        return this.nodes;
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
  

}