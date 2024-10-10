uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uShadowRepetitions;
uniform vec3 uShadowColor;

uniform float uLightRepetitions;
uniform vec3 uLightColor;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;
varying vec2 vUv;

#include ../includes/ambientLight.glsl;
#include ../includes/directionalLight.glsl;
#include ../includes/halftone.glsl;


void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    // vec3 color = mix(vColor, uColor, vUv.y);
    vec3 color = uColor;
    

    //Lights
    vec3 light = vec3(0.0);

    //Ambient
    light += ambientLight(
        vec3(1.0), //Light Color,
        1.0 //Light intensity
    );

    //Directional 
    light += directionalLight(
        vec3(1.0, 1.0, 1.0), //Light Color
        1.0, //Light intensity
        normal, //Normal
        vec3(1.0, 1.0, 1.0), //Light Position
        viewDirection, //View Direction
        1.0 //Specular Power
    );

    color *= light;

    color = halftone(
        color,
        uShadowRepetitions,
        vec3(-1.0, -1.0, -0.2),
        -0.8,
        0.64, 
        uShadowColor,
        normal
    );

    color = halftone(
        color,
        uLightRepetitions,
        vec3(1.0, 1.0, 0.2),
        0.5,
        1.35,
        uLightColor,
        normal
    );

    // color = halftone(
    //     color,
    //     uLightRepetitions,
    //     vec3(0.8, 1.0, 0.45),
    //     0.5,
    //     1.5,
    //     uShadowColor,
    //     normal
    // );



    // color = mix(vColor, color, vUv.y);

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}