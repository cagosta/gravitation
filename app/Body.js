define( [
	'Seed/Seed',
	'./geo/Vector3'
 ], function( Seed, Vector3 ) {

	return Seed.extend( {

		'+options': {
			mass: null,
			position: null, // Vector3
			velocity: null, // Vector3
			acceleration: null, // Vector3
			maxMass: 1e10,
			minMass: 1e4,
			fix: false,
			size: 10,
			rotation: 0
		},

		'+constructor': function() { // todo, clean this shit

			var r =  0.1
			if ( !this.fix ) {
				this.mass = r * ( this.maxMass - this.minMass ) + this.minMass
			}

			this.size = 200 * ( this.mass - this.minMass ) / ( this.maxMass - this.minMass )
			if ( this.fix ) {
				this.size *= 0.1
			}

			if ( !this.acceleration ) {
				this.resetAcceleration()
			}

		},

		updatePosition: function( dt ) {

			if ( !this.fix )
				this.position.add( this.velocity.clone().multiplyScalar( dt ) )

		},

		updateVelocity: function( dt ) {

			this.velocity.add( this.acceleration.clone().multiplyScalar( dt ) )

		},

		resetAcceleration: function() {

			this.acceleration = new Vector3( 0, 0, 0 )

		},

		setAccelerationWithForce: function( F ) {

			this.acceleration.sub( F.divideScalar( this.mass ) )

		}

	} )

} )