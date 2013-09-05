uniform sampler2D map;

varying vec2 vUv;

void main() {

	vec4 color = texture2D( map, vUv );
    
    // If color is all black, we want to make it transparent
    // to remove the "background wall" from the projection
    if ((color.r == 0.0) && (color.g == 0.0) && (color.b == 0.0)) {
        color.a = 1.0;
    } else {
        // as we were
        color.a = smoothstep( 8000.0, -8000.0, gl_FragCoord.z / gl_FragCoord.w );
    }
    
	gl_FragColor = vec4( color.r, color.g, color.b, color.a);

}