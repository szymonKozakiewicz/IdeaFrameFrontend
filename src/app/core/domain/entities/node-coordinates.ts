export class NodeCoordinates{
    constructor(public x:number, public y:number)
    {

    }

    public clone()
    {
        return new  NodeCoordinates(this.x,this.y);
    }
}