import { v4 as uuidv4 } from 'uuid';
import { NodeMindMap } from '../domain/entities/node-mind-map';
import { NodeMindMapDTO } from './node-mind-map.dto';
import { NodeMindMapLoadDTO } from './node-mindmap-load.dto';
import { NodeForBranchSaveDto } from './node-branch-save.dto';

export class BranchMindMapDTO{


    constructor(public id:string,public source:NodeForBranchSaveDto,public target:NodeForBranchSaveDto,public wasEdited:boolean, public isDeleted:boolean) {  

    }


}