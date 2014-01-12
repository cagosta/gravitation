define( [
    '../Body'
 ], function( Body ) {

    return Body.extend( {

        '+options': {

        },

        '+updatePosition': function() {
            this.rotate()
        },


        rotate: function() {

            if ( !this.fix )
                this.rotation.add( this.velocity.clone().divideScalar( 800 ) )

        },


    } )


} )