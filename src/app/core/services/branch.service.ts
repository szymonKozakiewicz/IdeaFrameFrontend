import { Injectable } from "@angular/core";
import { BranchMindMap } from "../domain/entities/branch-mind-map";
import { NodeMindMap } from "../domain/entities/node-mind-map";
import { Subject } from "rxjs";
import { BranchCoordinates } from "../domain/entities/branch-coordinates";
import { NodeCoordinates } from "../domain/entities/node-coordinates";

@Injectable({providedIn:'root'})
export class BranchService{
    
    public branchCreateModeChanged$=new Subject<boolean>();
    public branchChanged$=new Subject<void>();
    private branches:BranchMindMap[]=[];
    private isBranchCreateModeActive:boolean=false;
    
    private newBranchSource:NodeMindMap=NodeMindMap.buildDefault();
    private createBranch=BranchMindMap.buildDefault();

    public activateBranchCreateMode(newBranchSource:NodeMindMap)
    {
        this.isBranchCreateModeActive=true;
        this.newBranchSource=newBranchSource;
        this.branchCreateModeChanged$.next(true)
    }

    public updateBranchCreateTargetCoordinates(coordinates:NodeCoordinates)
    {
        let tempBranchTarget=NodeMindMap.buildDefault();
        tempBranchTarget.coordinates=coordinates;
        this.createBranch.target=tempBranchTarget;
        this.branchChanged$.next();
        
    }


    public isBranchModeActive()
    {
        return this.isBranchCreateModeActive;
    }

    public getInitialCreateBranch(): BranchMindMap
    {
        
        let branch=new BranchMindMap("",this.newBranchSource,this.newBranchSource,"#446eff");
        this.createBranch=branch
        return branch;
    }
}