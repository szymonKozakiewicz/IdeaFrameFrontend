import { FileSystemItem } from "../domain/entities/file-item";
import { NodeMindMap } from "../domain/entities/node-mind-map";

export class MindMapSaveDto{

    fileItem: FileSystemItem;
    nodes: NodeMindMap[];
    constructor(fileItem: FileSystemItem, nodes: NodeMindMap[]) {
        this.fileItem = fileItem;
        this.nodes = nodes;
    }

}