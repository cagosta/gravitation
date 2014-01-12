var Deployer = function( o ) {

    this.grunt = o.grunt

    this.ghPagesDeploy = this.grunt.config.get( 'config.deploy.gh_pages' )
    this.privateHostDeploy = this.grunt.config.get( 'config.deploy.private_host' )

    this.setExecGruntConfig()
    this.skipBuild = this.grunt.option( 'skipBuild' )
    this.run()

}


Deployer.prototype = {

    setExecGruntConfig: function() {

        var command = this.grunt.config.process( 'rsync -e ssh -avzO ./dist/build/ cyril@mangrove.dk:/var/www/mangrove.dk/<%= config.name.raw %>' )

        this.grunt.config.set( 'exec.send', {
            command: command
        } )

    },

    run: function() {

        var tasks = []

        if ( this.ghPagesDeploy )
            tasks.push( 'publish_gh_pages' )

        if ( this.privateHostDeploy )
            tasks.push( 'exec:send' )

        this.grunt.task.run( tasks )
    }

}

module.exports = function( grunt ) {

    grunt.registerTask( 'deploy', function() {

        new Deployer( {
            grunt: grunt,
        } )

    } )

}