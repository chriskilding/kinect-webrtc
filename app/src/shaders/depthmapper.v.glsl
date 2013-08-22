uniform sampler2D map;

uniform float width;
uniform float height;
uniform float nearClipping, farClipping;

varying vec2 vUv;

const float XtoZ = 1.11146; // tan( 1.0144686 / 2.0 ) * 2.0;
const float YtoZ = 0.83359; // tan( 0.7898090 / 2.0 ) * 2.0;

void main() {

    vUv = vec2( position.x / width, 1.0 - ( position.y / height ) );

    vec4 color = texture2D( map, vUv );

    // Original Projection code by @kcmic
    // Need to tweak this projection code for a grayscale stream - @themasterchef
    //
    // First thing. As it's grayscale, all 3 channels will have the same intensity
    float rawDepth = (color.r + color.g + color.b) / 3.0;
    
    // The original color range which the vertex shader was created for
    // was white (near) through cyan (mid) to blue (far).
    // white = (255, 255, 255), cyan = (0, 255, 255), blue = (0, 0, 255)
    //
    // So, if we want to translate our grayscale map to a blue one,
    // blue is always 1.0
    color.b = 1.0;
    
    // then we have a scale from 0.0 to 2.0 - 16 bits - to fill
    // so first expand rawDepth to the 0-2 scale
    float processedDepth = rawDepth * 2.0;

    // now for the slightly clever bit        
    // up to the mid point, depth should increase the green channel
    // then up to the nearest point, depth should increase red channel.
    
    // if we have a nearer point (> 1)
    if (processedDepth > 1.0) {
        color.g = 1.0;
        color.r = processedDepth - 1.0;
    // we have a farther point (< 1)
    } else {
        color.g = processedDepth;
        color.r = 0.0;
    }
    
    // --- continue with @kcmic code ---

    float z = ( 1.0 - rawDepth ) * (farClipping - nearClipping) + nearClipping;

    vec4 pos = vec4(
        ( position.x / width - 0.5 ) * z * XtoZ,
        ( position.y / height - 0.5 ) * z * YtoZ,
        - z + 1000.0,
        1.0);

    gl_PointSize = 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * pos;
    
    // Once we move on to the fragment shader,
    // the adjusted color scheme will have taken effect

}