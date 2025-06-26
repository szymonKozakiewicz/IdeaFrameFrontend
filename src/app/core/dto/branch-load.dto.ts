export class BranchLoadDTO{
    id: string;
    targetId:string;
    sourceId:string;
    constructor(id: string, targetId: string, sourceId: string) {
        this.id = id;
        this.targetId = targetId;
        this.sourceId = sourceId;
    }
}