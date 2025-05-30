import { NodeMindMapDTO } from "../../dto/node-mind-map.dto";
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

 
}