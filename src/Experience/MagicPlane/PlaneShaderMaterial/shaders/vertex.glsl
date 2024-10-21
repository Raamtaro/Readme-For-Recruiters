varying vec2 vUv;
uniform vec2 uOffset;

void main() {


    vec3 newPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

    //varyings
    vUv = uv;
}