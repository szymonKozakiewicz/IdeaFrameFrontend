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
    private currentFileItem:FileSystemItemWithPath=new FileSystemItemWithPath("",FileItemType.FILE,"");
    private nodes:Array<NodeMindMap>=[];

    
    

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

}