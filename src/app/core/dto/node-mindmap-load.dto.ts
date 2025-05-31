import { NodeCoordinates } from "../domain/entities/node-coordinates";


export class NodeMindMapLoadDTO{

   

    constructor(public id:string,public name:string,public color:string,public coordinates: NodeCoordinates)
    {


    }
    

 
}