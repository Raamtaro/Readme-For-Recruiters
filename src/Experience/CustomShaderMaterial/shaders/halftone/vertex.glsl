attribute vec4 _vertexcolor;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;
varying vec2 vUv;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Model normal
    vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

    // Varyings
    vNormal = modelNormal;
    vPosition = modelPosition.xyz;
    vColor = _vertexcolor.rgb;
    vUv = uv;
}