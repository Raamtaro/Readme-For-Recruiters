uniform vec2 uResolution;
uniform float uSize;
uniform sampler2D uParticlesTexture;
uniform vec3 uColor;
uniform vec3 uLightColor;
uniform vec3 uShadowColor;
uniform vec2 uMouse;
// uniform vec3 uColor;


attribute vec2 aParticlesUv;
attribute float aSize;
attribute vec3 aColor;

varying vec3 vColor;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

#define M_PI 3.1415926535897932384626433832795;


void main()
{

    vec4 particle = texture(uParticlesTexture, aParticlesUv);
    // Final position
    vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);



    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    //Model Normal
    vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;


    
    gl_Position = projectedPosition;

    // Point size
    float sizeIn = smoothstep(0.0, 0.1, particle.a);
    float sizeOut = smoothstep(0.7, 1.0, particle.a);
    float size = min(sizeIn, sizeOut);

    gl_PointSize = uSize  * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings
    vUv = uv;

    vColor = uColor;
    // vColor = particle.xyz;
    

    vNormal = modelNormal;
    vPosition = modelPosition.xyz;
}