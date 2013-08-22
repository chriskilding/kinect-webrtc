uniform sampler2D map;

// @kcmic's shared variable for passing color
// used in the initial color extraction from the texture map
varying vec2 vUv;

// @themasterchef's shared variable for passing computed color
varying vec4 vertex_color;


void main() {

	vec4 color = texture2D( map, vUv );
    
    // tweaking color to replace RGB with computed values
    // but use the gl_FragCoord to set Alpha
	gl_FragColor = vec4( vertex_color.r, vertex_color.g, vertex_color.b, smoothstep( 8000.0, -8000.0, gl_FragCoord.z / gl_FragCoord.w ) );

}