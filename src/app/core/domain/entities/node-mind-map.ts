import { NodeMindMapDTO } from "../../dto/node-mind-map.dto";
import { NodeMindMapLoadDTO } from "../../dto/node-mindmap-load.dto";
import { NodeCoordinates } from "./node-coordinates";
import { v4 as uuidv4 } from 'uuid';

export class NodeMindMap{

    uiId:string=uuidv4();

    constructor(public id:string,public name:string,public color:string,public coordinates: NodeCoordinates, public wasEdited:boolean)
    {


    }

    public convertToNodeMindMapDTO()
    {
        return new NodeMindMapDTO(this.id,this.name,this.color,this.coordinates,this.wasEdited);
    }

    public static build(nodeDTO:NodeMindMapLoadDTO): NodeMindMap {
        let coordinates=new NodeCoordinates(nodeDTO.coordinates.x,nodeDTO.coordinates.y);
        let node=new NodeMindMap(nodeDTO.id,nodeDTO.name,nodeDTO.color,coordinates,false)
        return node;
    }

 
    public static buildDefault(): NodeMindMap {
        let defultCordinates=new NodeCoordinates(0,0)
        return new NodeMindMap("","","",defultCordinates,false);
    }

    public clone()
    {
        let coordinatesCopy=this.coordinates.clone();
        return new NodeMindMap(this.id,this.name,this.color,coordinatesCopy,this.wasEdited)
    }
}