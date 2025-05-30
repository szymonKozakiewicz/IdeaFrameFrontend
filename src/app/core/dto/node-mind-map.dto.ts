import { NodeCoordinates } from "../domain/entities/node-coordinates";


export class NodeMindMapDTO{

   

    constructor(public id:string,public name:string,public color:string,public coordinates: NodeCoordinates, public wasEdited:boolean)
    {


    }
    

 
}