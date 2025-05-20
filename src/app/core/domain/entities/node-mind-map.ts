import { NodeCoordinates } from "./node-coordinates";
import { v4 as uuidv4 } from 'uuid';

export class NodeMindMap{

    uiId:string=uuidv4();

    constructor(public id:string,public name:string,public coordinates: NodeCoordinates, public wasEdited:boolean)
    {


    }
}