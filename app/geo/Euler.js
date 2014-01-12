define( [
    'threejs'
 ], function( threejs ) {

    threejs.Euler.prototype.add = function( v ){
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    return threejs.Euler

} )