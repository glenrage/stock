let CURRENCY = '$';

let Helpers = {
    currency: (value = 0) => {
        return (CURRENCY + value.toLocaleString());
    },

    angleInRadians: (angleInDegrees) => -angleInDegrees * Math.PI / 180.0,

    arcXY: (cx, cy, r, radians) => ({
        x: cx + r * Math.cos(radians),
        y: cy + r * Math.sin(radians)
    })
};

export default Helpers;
