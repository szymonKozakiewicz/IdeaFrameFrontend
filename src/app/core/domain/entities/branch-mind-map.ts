import { BranchMindMapDTO } from "../../dto/branch.dto";
import { BranchCoordinates } from "./branch-coordinates";
import { NodeCoordinates } from "./node-coordinates";
import { NodeMindMap } from "./node-mind-map";
import { v4 as uuidv4 } from 'uuid';

export class BranchMindMap{
    uiId:string=uuidv4();

    constructor(public id:string,public source:NodeMindMap,public target:NodeMindMap,public wasEdited:boolean, public isDeleted:boolean=false) {

    }

    public static buildDefault()
    {
        let defaultSource=NodeMindMap.buildDefault();
        let defaultSource2=NodeMindMap.buildDefault();
        defaultSource2.coordinates=new NodeCoordinates(500,500);
        return new BranchMindMap("", defaultSource,defaultSource2,false)
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

    public clone()
    {
        let source=this.source.clone()
        let target=this.target.clone()
        return new BranchMindMap(this.id,source,target,this.wasEdited)
    }

    public convertToBranchMindMapDTO()
    {
        let targetDTO=this.target.convertToNodeForBranchSaveDTO()
        let sourceDTO=this.source.convertToNodeForBranchSaveDTO();
        return new BranchMindMapDTO(this.id,sourceDTO,targetDTO,this.wasEdited, this.isDeleted);
    }
}


