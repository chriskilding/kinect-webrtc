uniform sampler2D map;

varying vec2 vUv;

void main() {

	vec4 color = texture2D( map, vUv );
	gl_FragColor = vec4( color.r, color.g, color.b, smoothstep( 8000.0, -8000.0, gl_FragCoord.z / gl_FragCoord.w ) );

}