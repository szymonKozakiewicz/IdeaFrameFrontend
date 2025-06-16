import { NodeCoordinates } from "./node-coordinates";

export class BranchCoordinates
{



    constructor(public startPoint:NodeCoordinates,public lenght:number,public angle:number)
    {
  
    }

    public static buildDefault():BranchCoordinates
    { 
        let startPosition=new NodeCoordinates(0,0);
        return new BranchCoordinates(startPosition,1,1);
    }

}