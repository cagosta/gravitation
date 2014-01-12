define( [
	'Seed/Seed',
	'Array.nocomplex/all',
	'mangrove-utils/bindPolyfill',
	'./SampleGravitationThreeScene',
	'./SampleUnivers',
	'requestAnimationFrame/requestAnimationFrame'
 ], function( Seed, all, bind, ThreeView, Univers, requestAnimationFrame ) {

	return Seed.extend( {

		'+options': {
			bodyCount: 12
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
			requestAnimationFrame(this.animate.bind( this ))

		}


	} )


} )