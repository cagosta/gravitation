define( [
	'Seed/Seed',
	'Array.nocomplex/all',
	'mangrove-utils/bindPolyfill',
	'./SampleGravitationThreeScene',
	'./SampleUnivers'
 ], function( Seed, all, bind, ThreeView, Univers ) {

	return Seed.extend( {

		'+options': {
			bodyCount: 12,
			fps: 60
		},

		'+constructor': function() {

			this._a = this // todo, remove this
			this.buildUnivers( {
				bodyCount: this.bodyCount
			} )
			this.buildThreeView()

			this.animate()

		},

		buildUnivers: function() {

			this.univers = this.sub( Univers )

		},

		buildThreeView: function() {

			this.threeView = this.sub( ThreeView, {
				bodies: this.univers.bodies
			} )

		},

		animate: function() {

			this.univers.step()
			this.threeView.render( this.univers.bodies )
			setTimeout( this.animate.bind( this ), 1000 / this.fps )

		}


	} )


} )