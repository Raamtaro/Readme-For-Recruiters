precision highp float;

uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uShadowRepetitions;
uniform vec3 uShadowColor;

uniform float uLightRepetitions;
uniform vec3 uLightColor;
uniform vec2 uMouse;


varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;

void main()
{
    float distanceToCenter = length(gl_PointCoord - 0.5);
    float alpha = 0.05 / distanceToCenter - 0.1;
    if(distanceToCenter > 0.5)
        discard;

  
    
    gl_FragColor = vec4(vColor, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}