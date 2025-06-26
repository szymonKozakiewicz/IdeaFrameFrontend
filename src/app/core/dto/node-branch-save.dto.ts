export class NodeForBranchSaveDto{
    id:string;
    uiId:string;

    constructor(id: string, uiId: string) {
        this.id = id;
        this.uiId = uiId;
    }
}