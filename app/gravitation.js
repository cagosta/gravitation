/**
 * gravitation version: "0.0.3" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/gravitation for details
 */

define([
    './Body',
    './Univers',
    './sampleProject/SampleGravitationProject',
    './sampleProject/SampleGravitationThreeScene',
    './sampleProject/sampleGravitationProject'
], function( Body, Univers, SampleGravitationProject, SampleGravitationThreeScene, sampleGravitationProject ){

    return {
        Body: Body,
        Univers: Univers,
        SampleGravitationProject: SampleGravitationProject,
        SampleGravitationThreeScene: SampleGravitationThreeScene
    }

})