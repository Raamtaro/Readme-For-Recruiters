uniform float uSize;
uniform float uTime;
attribute float aScale;

void main()
{
    /*
        * Positioning
    */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //Rotation
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    modelPosition.x = cos(angle);
    modelPosition.z = sin(angle);


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    



    gl_Position = projectedPosition;

    /*
    * Sizing
    */
    gl_PointSize = uSize;
    gl_PointSize *= (1.0 / - viewPosition.z);
}