import { NodeCoordinates } from "src/app/core/domain/entities/node-coordinates";

export class CoordinatesConverterHelper
{
    public static convertClientToOffset(x:number,y:number,element:HTMLElement)
    {
        const rect = element.getBoundingClientRect();

        const offsetX = Math.round(x - rect.left);
        const offsetY =Math.round( y - rect.top);
        
        return new NodeCoordinates(offsetX,offsetY)
        
    }

    public static getCenteredCoordinates(coordinates:NodeCoordinates, element:HTMLElement)
    {
        let rect=element.getBoundingClientRect();
        const width=rect.width;
        const height=rect.height;

        const adjustedX = coordinates.x - width / 2.0;
        const adjustedY = coordinates.y - height / 2.0;
        return new NodeCoordinates(adjustedX,adjustedY)
    }
}