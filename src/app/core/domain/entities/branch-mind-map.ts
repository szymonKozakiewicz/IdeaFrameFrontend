import { BranchCoordinates } from "./branch-coordinates";
import { NodeCoordinates } from "./node-coordinates";
import { NodeMindMap } from "./node-mind-map";
import { v4 as uuidv4 } from 'uuid';

export class BranchMindMap{
    uiId:string=uuidv4();

    constructor(public id:string,public source:NodeMindMap,public target:NodeMindMap) {

    }

    public static buildDefault()
    {
        let defaultSource=NodeMindMap.buildDefault();
        let defaultSource2=NodeMindMap.buildDefault();
        defaultSource2.coordinates=new NodeCoordinates(500,500);
        return new BranchMindMap("", defaultSource,defaultSource2)
    }

    public getColor()
    {
        return this.target.color;
    }

    public getBranchCoordinates():BranchCoordinates
    {

        const deltaX = this.target.coordinates.x - this.source.coordinates.x;
        const deltaY = this.target.coordinates.y - this.source.coordinates.y;
        const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        let coordinates=new BranchCoordinates(this.source.coordinates,length,angle);
        return coordinates

    }
}


