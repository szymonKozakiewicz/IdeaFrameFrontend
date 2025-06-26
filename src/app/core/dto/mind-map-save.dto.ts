import { FileSystemItem } from "../domain/entities/file-item";
import { NodeMindMap } from "../domain/entities/node-mind-map";
import { BranchMindMapDTO } from "./branch.dto";
import { FileItemDTO } from "./file-item.dto";
import { NodeMindMapDTO } from "./node-mind-map.dto";

export class MindMapSaveDto{

    fileItem: FileItemDTO;
    nodes: NodeMindMapDTO[];
    branches: BranchMindMapDTO[];
    constructor(fileItem: FileItemDTO, nodes: NodeMindMapDTO[], branches:BranchMindMapDTO[]) {
        this.fileItem = fileItem;
        this.nodes = nodes;
        this.branches = branches;
    }

}