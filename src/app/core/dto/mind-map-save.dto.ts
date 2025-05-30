import { FileSystemItem } from "../domain/entities/file-item";
import { NodeMindMap } from "../domain/entities/node-mind-map";
import { FileItemDTO } from "./file-item.dto";
import { NodeMindMapDTO } from "./node-mind-map.dto";

export class MindMapSaveDto{

    fileItem: FileItemDTO;
    nodes: NodeMindMapDTO[];
    constructor(fileItem: FileItemDTO, nodes: NodeMindMapDTO[]) {
        this.fileItem = fileItem;
        this.nodes = nodes;
    }

}