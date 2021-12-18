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
        GLOBALS.context.fillStyle = "yellow";
        GLOBALS.context.ellipse(0,-35, 100,50,0,0,2 * Math.PI);
        GLOBALS.context.fill();
        GLOBALS.context.fillStyle = "black";
        GLOBALS.context.font = "42px"
        GLOBALS.context.fillText(`${this.points}`, 0, 0);
        GLOBALS.context.resetTransform();
    }
}

export default PointsDisplay;