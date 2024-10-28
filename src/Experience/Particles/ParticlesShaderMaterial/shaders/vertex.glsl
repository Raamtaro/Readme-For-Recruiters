uniform float uSize;
attribute float aScale;

void main()
{
    /*
        * Positioning
    */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /*
        * Sizing
    */
    gl_PointSize = uSize;
    gl_PointSize *= (1.0 / - viewPosition.z);
}