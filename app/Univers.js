define( [
	'Seed/Seed',
	'./Body',
	'./geo/Vector3',
	'./geo/Euler'
	], function( Seed, Body, Vector3, Euler ) {

	return Seed.extend( {

		'+options': {
			Body: Body, // default Body constructor
			bodyCount: 12, // how many bodies do I instanciate
			viewportSize: [ 1000, 1000, 1000 ],
			dt: 0.1, 
			G: 1e-5, // gravitational constant
			ETA: 10, // softening constant
			DISTANCE_MULTIPLE: 2,
			GFACTOR: 2 // higher means distance has more effect (3 is reality)
		},

		'+constructor': function() {

			this.bodies = []
			this.buildBodies()
			this.fixBodies = []

		},

		buildBodies: function() {

			for ( var i = 0; i < this.bodyCount; i++ ) {
				this.buildBody( i )
			}

		},

		buildBody: function( o ) {

			if ( typeof o === 'number' ) {
				body = this.buildRandomBody( o )
			} else {
				body = this.sub( this.Body, {
					position: new Vector3( o.position[ 0 ], o.position[ 1 ], o.position[ 2 ] ),
					velocity: new Vector3( o.velocity[ 0 ], o.velocity[ 1 ], o.velocity[ 2 ] ),
					rotation: new Euler( o.rotation[ 0 ], o.velocity[ 1 ], o.rotation[ 2 ] ),
					fix: o.fix,
					mass: o.mass
				} )
			}

			this.bodies.push( body )

		},

		buildRandomBody: function( i ) { // dirty, todo clean this

			var random = Math.random,
				r = 100,
				group = ( i % 3 ),
				center = [ [ 100, 0, 0 ], [ 0, 100, 0 ], [ 0, 0, 100 ] ][ group ],
				theta = ( 360 / this.bodyCount ) * i,
				positionRandom = function() {
					return ( i ) * 8 - 400
				},
				velocityRandom = function() { 
					return ( i / 10 ) - 5
				},
				positionInit = [ r * Math.cos( theta ), r * Math.sin( theta ), r * Math.cos( theta ) + r * Math.sin( theta ) ].add( center ),
				position = new Vector3( positionInit[ 0 ], positionInit[ 1 ], positionInit[ 2 ] ),
				velocity = new Vector3( velocityRandom(), velocityRandom(), velocityRandom() ),
				rotation = new Euler( velocityRandom(), velocityRandom(), velocityRandom() );

			return this.sub( this.Body, {
				position: position,
				velocity: velocity,
				rotation: rotation
			} )

		},

		step: function() {

			this.updatePositions( 0.5 * this.dt ) // Move half step
			this.doForces() // Update accelerations
			this.updateVelocities( this.dt ) // Move Velocities full step
			this.updatePositions( 0.5 * this.dt ) // Move half step

		},

		updatePositions: function( dt ) {

			this.bodies.send( 'updatePosition', dt )

		},

		updateVelocities: function( dt ) {

			this.bodies.send( 'updateVelocity', dt )

		},

		doForces: function() {

			this.bodies.send( 'resetAcceleration' )
			this.forceBrute()

		},

		forceBrute: function() {

			var n = this.bodies.length
			for ( var i = n; i--; ) {
				for ( var j = n; j--; ) {
					this.setAcceleration( i, j )
				}
			}

		},

		setAcceleration: function( i, j ) {

			var bodyI = this.bodies[ i ], // Get Force Vector between bodies i, j
				bodyJ = this.bodies[ j ],
				F = this.getForceVec( bodyI, bodyJ ) // F force between bodyI and bodyJ
				bodyI.setAccelerationWithForce( F.clone() )

		},

		getForceVec: function( bI, bJ ) {

			if ( bI && bJ ) {
				var dPosition = bI.position.clone().sub( bJ.position ),
					distance = bI.position.distanceTo( bJ.position ),
					r = ( distance + this.ETA ) * this.DISTANCE_MULTIPLE,
					F = this.G * bI.mass * bJ.mass / Math.pow( r, this.GFACTOR ),
					factor = F / r
			}
			return dPosition.multiplyScalar( factor )

		},

		detroyBody: function( body ) {

			this.bodies.removeOneValue( body )

		}

	} )

} )