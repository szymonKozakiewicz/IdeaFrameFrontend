import { Injectable } from "@angular/core";
import { BranchMindMap } from "../domain/entities/branch-mind-map";
import { NodeMindMap } from "../domain/entities/node-mind-map";
import { Subject } from "rxjs";
import { BranchCoordinates } from "../domain/entities/branch-coordinates";
import { NodeCoordinates } from "../domain/entities/node-coordinates";
import { MapPanningService } from "./map-panning.service";

@Injectable({providedIn:'root'})
export class BranchService{
    
    public branchCreateModeChanged$=new Subject<boolean>();
    public branchChanged$=new Subject<void>();
    private branches:BranchMindMap[]=[];
    private isBranchCreateModeActive:boolean=false;
    
    private newBranchSource:NodeMindMap=NodeMindMap.buildDefault();
    private createBranch=BranchMindMap.buildDefault();
    private createBranchForUi=BranchMindMap.buildDefault();

    constructor(private panningService:MapPanningService)
    {}

    public activateBranchCreateMode(newBranchSource:NodeMindMap)
    {
        this.isBranchCreateModeActive=true;
        this.newBranchSource=newBranchSource;
        this.branchCreateModeChanged$.next(true)
    }

    public deactivateBranchCreateMode()
    {
        this.isBranchCreateModeActive=false;
        this.branchCreateModeChanged$.next(false)
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
        
        let branch=new BranchMindMap("",this.newBranchSource,this.newBranchSource.clone());
        this.createBranch=branch
   
        this.createBranchForUi=this.createBranch.clone();
        return this.createBranchForUi;

    }

    public finaliseBranchCreation(targetNode:NodeMindMap)
    {
        const sourceSameAsTarget = this.newBranchSource.uiId === targetNode.uiId;
        if(sourceSameAsTarget)
            return;
        this.deactivateBranchCreateMode()
        let newBranch=new BranchMindMap("",this.newBranchSource,targetNode)
        this.branches.push(newBranch)

    }

    
    private updateCreateBranchForUi() {
        this.createBranchForUi.target.coordinates = this.panningService.getReversedTranlationOfCoordinates(this.createBranch.target.coordinates);
    }
}