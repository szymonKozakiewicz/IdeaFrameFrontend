import { BranchLoadDTO } from "./branch-load.dto";
import { NodeMindMapLoadDTO } from "./node-mindmap-load.dto";

export class MindMapLoadDto {

    nodes: NodeMindMapLoadDTO[];
    branches: BranchLoadDTO[];

    constructor( nodes: NodeMindMapLoadDTO[], branches: BranchLoadDTO[]) {

        this.nodes = nodes;
        this.branches = branches;
    }
}