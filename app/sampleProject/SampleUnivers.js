define([
    '../Univers',
    './SampleBody'
], function( Univers, SampleBody ){


    return Univers.extend({

        '+options': {
            Body: SampleBody
        },

        '+constructor': function( ){

            this.buildFixBodies()
        },


        buildFixBodies: function() {
            var exc = 200
            this.buildBody( {
                fix: true,
                position: [ 150, 0, 0 ].divide( 2 ),
                velocity: [ 0, 0, 0 ],
                rotation: [ 45, 0, 0 ],
                mass: 1e10
            } )
            this.buildBody( {
                fix: true,
                position: [ -200, 0, 0 ].divide( 2 ),
                velocity: [ 0, 0, 0 ],
                rotation: [ 0, 45, 0 ],
                mass: 1e10
            } )
            this.buildBody( {
                fix: true,
                position: [ 0, 0, 300 ].divide( 2 ),
                velocity: [ 0, 0, 0 ],
                rotation: [ 0, 0, 45 ],
                mass: 1e10
            } )
        },

    })


})