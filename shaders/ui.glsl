/*	
    @preserve

    ATON 2.0 UI Vertex + Fragment Shaders
	bruno.fanini_AT_gmail.com
=========================================================*/
// COMMON
//========================================================

//#define MOBILE_DEVICE 1

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

varying vec2 osg_TexCoord0;
//varying vec3 osg_FragVertex;
//varying vec3 osg_FragEye;
//varying vec3 osg_FragNormal;
//varying vec3 osg_FragNormalWorld;
//varying vec4 pColor;


//=========================================================
// VERTEX SHADER
//=========================================================
#ifdef VERTEX_SH

attribute vec3 Normal;
attribute vec3 Vertex;
//attribute Material;

attribute vec2 TexCoord0;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;


void main(){
	osg_TexCoord0 = TexCoord0;

    gl_Position = uProjectionMatrix * (uModelViewMatrix * vec4(Vertex, 1.0));
}

#endif




//=========================================================
// FRAGMENT SHADER
//=========================================================
#ifdef FRAGMENT_SH

uniform sampler2D BaseSampler; // 0
uniform float time;

// MAIN
//==============
void main(){
    vec4 baseAlbedo = texture2D(BaseSampler, osg_TexCoord0);
	gl_FragColor = baseAlbedo;
}
#endif