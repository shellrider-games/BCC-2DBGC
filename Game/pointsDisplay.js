import GameObject from "./gameObject.js";
import GLOBALS from "./globalStorage.js";

class PointsDisplay extends GameObject {
    points;

    constructor (){
        super(GLOBALS.WORLD.width - 16, 32, 0, 0);
        this.points = 0;
    }

    increase() {
        this.points++;
    }

    render() {
        GLOBALS.context.translate(this.x, this.y);
        GLOBALS.context.textAlign = "right";
        GLOBALS.context.fillStyle = "black";
        GLOBALS.context.font = "42px"
        GLOBALS.context.fillText(`Points: ${this.points}`, 0, 0);
        GLOBALS.context.resetTransform();
    }
}

export default PointsDisplay;