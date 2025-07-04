import { Injectable } from "@angular/core";
import { BranchMindMap } from "../domain/entities/branch-mind-map";
import { NodeMindMap } from "../domain/entities/node-mind-map";
import { Subject } from "rxjs";
import { BranchCoordinates } from "../domain/entities/branch-coordinates";
import { NodeCoordinates } from "../domain/entities/node-coordinates";
import { MapPanningService } from "./map-panning.service";
import { BranchLoadDTO } from "../dto/branch-load.dto";

@Injectable({providedIn:'root'})
export class BranchService{


    
    public branchCreateModeChanged$=new Subject<boolean>();
    public branchChanged$=new Subject<void>();
    private branches:BranchMindMap[]=[];
    private isBranchCreateModeActive:boolean=false;
    
    private newBranchSource:NodeMindMap=NodeMindMap.buildDefault();
    private createBranch=BranchMindMap.buildDefault();
    private createBranchForUi=BranchMindMap.buildDefault();
    private selectedBranch:BranchMindMap=BranchMindMap.buildDefault();



    constructor(private panningService:MapPanningService)
    {}

    public activateBranchCreateMode(newBranchSource:NodeMindMap)
    {
        this.isBranchCreateModeActive=true;
        this.newBranchSource=newBranchSource;
        this.createBranch=new BranchMindMap("",this.newBranchSource,this.newBranchSource.clone(),false);
        this.branchCreateModeChanged$.next(true)
    }

    public deactivateBranchCreateMode()
    {
        this.isBranchCreateModeActive=false;
        this.branchCreateModeChanged$.next(false)
    }

    public removeBrenchesConnectedToNode(nodeUiId: string) {
        let branchesConnectedToNode: BranchMindMap[]=this.branches.filter(branch => branch.source.uiId === nodeUiId || branch.target.uiId === nodeUiId);

        this.removeNotSavedBranches(branchesConnectedToNode);
        this.setSavedBranchesAsToDelete(branchesConnectedToNode);
    }

    public setSelectedBranch(newSelectedBranch: BranchMindMap) {
        this.selectedBranch=newSelectedBranch;
    }

    public removeSelectedBranch() {
        if(this.selectedBranch.id === "")
            this.branches = this.branches.filter(branch => branch.uiId !== this.selectedBranch.uiId);
        else {
            this.selectedBranch.isDeleted = true;
        }
    }

    public updateSelectedBranchColor(newColorValue: string, selectedNode:NodeMindMap) {
        
        let nodesInBranch:NodeMindMap[]=this.getAllNodesInBranch(selectedNode);
        for( const node of nodesInBranch) {
            node.color = newColorValue;
        }


    }

    private getAllNodesInBranch(selectedNode: NodeMindMap) {
        const previousBranchColor= selectedNode.color;
        let nodesInBranch: NodeMindMap[] = [];
        let nodesToCheckWhichCanHaveChildren: NodeMindMap[] = [];
        nodesToCheckWhichCanHaveChildren.push(selectedNode);
        while (nodesToCheckWhichCanHaveChildren.length > 0) {
            this.collectChildsOfNextNodeInList(nodesToCheckWhichCanHaveChildren, nodesInBranch,previousBranchColor);
        }
        return nodesInBranch;
    }

    private collectChildsOfNextNodeInList(nodesWhichCanHaveChildrenToCheck: NodeMindMap[], nodesInBranch: NodeMindMap[],previousBranchColor:string) {
        let nodeToCheckForChildren = nodesWhichCanHaveChildrenToCheck.pop();
        if (!nodeToCheckForChildren) {
            return;
        }
        let childNodes: NodeMindMap[] = this.getChildNodesOfNode(nodeToCheckForChildren);
        let childrenWhichCanBeAddedToBranch = this.filterChildrenWhichCanBeAddedToBranch(childNodes, nodesInBranch,previousBranchColor);
        nodesWhichCanHaveChildrenToCheck.push(...childrenWhichCanBeAddedToBranch);
        nodesInBranch.push(...childrenWhichCanBeAddedToBranch);
    }

    private getChildNodesOfNode(selectedNode: NodeMindMap) {
        let branchesComingFromNode: BranchMindMap[] = this.branches.filter(branch => branch.source.uiId === selectedNode.uiId);
        let childNodes: NodeMindMap[] = branchesComingFromNode.map(branch => branch.target);
        return childNodes;
    }

    private filterChildrenWhichCanBeAddedToBranch(childNodes: NodeMindMap[],  nodesInBranch: NodeMindMap[],previousBranchColor:string) {
        let setOfKeysOfNocdesInBranch:Set<string> =new Set<string>(nodesInBranch.map(node => node.uiId));
        let resultNodes: NodeMindMap[] = [];
        for (const childNode of childNodes) {
            if (!setOfKeysOfNocdesInBranch.has(childNode.uiId) && childNode.color === previousBranchColor) {
                resultNodes.push(childNode);
            }
        }
        return resultNodes;
    }

    public saveBranchesFromBackend(branches: BranchLoadDTO[], nodes: NodeMindMap[]) {
        this.branches = [];
        for (const branch of branches) {
            const sourceNode = nodes.find(node => node.id === branch.sourceId);
            const targetNode = nodes.find(node => node.id === branch.targetId);
            if (sourceNode && targetNode) {
                const newBranch = new BranchMindMap(branch.id, sourceNode, targetNode, false);
                this.branches.push(newBranch);
            }
        }
    }

    public updateBranchCreateTargetCoordinates(coordinates:NodeCoordinates)
    {
        let tempBranchTarget=NodeMindMap.buildDefault();
        tempBranchTarget.coordinates=coordinates;
        this.createBranch.target=tempBranchTarget;
        this.updateCreateBranchForUi();
        this.branchChanged$.next();
        
    }

    public getBranches()
    {
        return this.branches;
    }

    public isBranchModeActive()
    {
        return this.isBranchCreateModeActive;
    }

    public getInitialCreateBranch(): BranchMindMap
    {
   
        this.createBranchForUi=this.createBranch.clone();
        return this.createBranchForUi;

    }



    public finaliseBranchCreation(targetNode:NodeMindMap)
    {
        const sourceSameAsTarget = this.newBranchSource.uiId === targetNode.uiId;
        if(sourceSameAsTarget)
            return;
        this.deactivateBranchCreateMode()
        let newBranch=new BranchMindMap("",this.newBranchSource,targetNode,false)
        this.branches.push(newBranch)

    }




    private setSavedBranchesAsToDelete(branchesConnectedToNode: BranchMindMap[]) {
        for (const branch of branchesConnectedToNode) {
            branch.isDeleted = true;
        }
    }

    private removeNotSavedBranches(branchesConnectedToNode: BranchMindMap[]) {
        let notSavedBranchesToRemove: BranchMindMap[] = branchesConnectedToNode.filter(branch => branch.id === "");
        const idsToRemove = new Set(notSavedBranchesToRemove.map(b => b.id));
        this.branches = this.branches.filter(branch => !idsToRemove.has(branch.id));
    }



    
    private updateCreateBranchForUi() {
        this.createBranchForUi.target.coordinates = this.panningService.getReversedTranlationOfCoordinates(this.createBranch.target.coordinates);
    }
}