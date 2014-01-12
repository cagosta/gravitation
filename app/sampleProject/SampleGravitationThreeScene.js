define( [
	'Seed/Seed',
 ], function( Seed ) {

	return Seed.extend( {

		'+options': {
			bodies: null
		},

		'+constructor': function() {

			this.buildEl()
			this.initializeWindowSize()
			this.buildCamera()
			this.scene = new THREE.Scene()
			this.buildObjects()
			this.projector = new THREE.Projector()

			this.buildRenderer()

			this.appendEls()
			
			this.accelerate = 0.1
			this.mousePosition = [ 0, 0 ]
			this.theta = 0
			this.radius = 600

			this.initEvents()
		},

		appendEls: function( ){

			this.el.appendChild( this.renderer.domElement )
			document.body.appendChild( this.el )

		},

		initializeWindowSize: function( ){

			this.windowSize = [ window.innerWidth, window.innerHeight ]

		},

		initEvents: function() {

			document.addEventListener( 'mousemove', this.onDocumentMouseMove.bind( this ), false )
			document.addEventListener( 'mousedown', this.onDocumentMouseDown.bind( this ), false )
			window.addEventListener( 'resize', this.onWindowResize.bind( this ), false )

		},

		buildEl: function() {
			this.el = document.createElement( 'div' )
			this.el.className = 'gravitation'
			
		},

		buildRenderer: function( ){

			this.renderer = new THREE.CanvasRenderer()
			this.renderer.setSize( this.windowSize[ 0 ], this.windowSize[ 1 ] )

		},

		buildCamera: function() {

			this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 )
			this.camera.position.y = 300
			this.camera.position.z = -300

		},

		buildObjects: function() {

			this.views = []
			for ( var i = 0; i < this.bodies.length; i++ ) {
				this.views.push( this.buildView( i ) )
			}

		},

		buildView: function( i ) {

			var body = this.bodies[ i ],
				cubeSize = 20,
				geometry = new THREE.TetrahedronGeometry(),
				isFix = body.fix,
				objectOptions,
				object,
				sMax = 30,
				sMin = 20,
				scale = function( o ) { 
					return o.model.size
				}

			if ( isFix ) {
				objectOptions = {
					color: '#000',
					opacity: 0.95
				}
			} else {
				objectOptions = {
					wireframe: true,
					color: '#000',
					opacity: 0.5
				}
			}
			object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( objectOptions ) )
			object.position = body.position
			object.rotation = body.rotation
			object.model = body
			body.view = object

			object.scale.x = scale( object )
			object.scale.y = scale( object )
			object.scale.z = scale( object )
			this.views.push( object )
			this.scene.add( object )

		},




		onDocumentMouseMove: function( event ) {

			this.accelerate++
			this.views.each( this.updateBodyMass.bind( this ) )
			setTimeout( function() {
				this.accelerate--
				this.views.each( this.updateBodyMass.bind( this ) )
			}.bind( this ), 25 * this.accelerate )
			this.mousePosition = [ event.clientX, event.clientY ].minus( this.windowSize.divide( 2 ) )

		},

		updateBodyMass: function( view ) {
			this._a.univers.dt = this.accelerate / 500 + 0.1 // dirty
		},

		render: function() {
			this.updateCameraWithMouse()
			this.camera.lookAt( this.scene.position )
			this.renderer.render( this.scene, this.camera )
		},

		updateCameraWithMouse: function() {

			if ( this.mousePosition ) {
				this.camera.position.x += ( this.mousePosition[ 0 ] - this.camera.position.x ) * .05
				this.camera.position.y += ( -this.mousePosition[ 1 ] + 200 - this.camera.position.y ) * .05
				// this.camera.position.z += ( - this.mousePosition[1] + 200 - this.camera.position.z ) * .05
			}

		},

		rotateCamera: function() {

			this.camera.position.x = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) )
			this.camera.position.y = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) )
			this.camera.position.z = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) )

		},

		onDocumentMouseDown: function( event ) {

			var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5 ),
				raycaster,
				intersects

			this.projector.unprojectVector( vector, this.camera )
			raycaster = new THREE.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() )
			intersects = raycaster.intersectObjects( this.scene.children )
			event.preventDefault()

		},

		onWindowResize: function() {

			this.camera.aspect = window.innerWidth / window.innerHeight
			this.camera.updateProjectionMatrix()
			this.renderer.setSize( window.innerWidth, window.innerHeight )

		}


	} )


} )