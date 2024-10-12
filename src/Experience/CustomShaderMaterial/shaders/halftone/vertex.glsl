attribute vec4 _vertexcolor;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;
varying vec2 vUv;

#ifdef USE_SKINNING
  uniform mat4 bindMatrix;
  uniform mat4 bindMatrixInverse;

  uniform highp sampler2D boneTexture;
  uniform int boneTextureSize;

//   attribute vec4 skinIndex;
//   attribute vec4 skinWeight;

  mat4 getBoneMatrix(const in float i) {
    float j = i * 4.0;
    float x = mod(j, float(boneTextureSize));
    float y = floor(j / float(boneTextureSize));
    float dx = 1.0 / float(boneTextureSize);
    float dy = 1.0 / float(boneTextureSize);
    y = dy * (y + 0.5);
    vec4 v1 = texture2D(boneTexture, vec2(dx * (x + 0.5), y));
    vec4 v2 = texture2D(boneTexture, vec2(dx * (x + 1.5), y));
    vec4 v3 = texture2D(boneTexture, vec2(dx * (x + 2.5), y));
    vec4 v4 = texture2D(boneTexture, vec2(dx * (x + 3.5), y));
    return mat4(v1, v2, v3, v4);
  }
#endif

void main()
{
    vec4 transformed = vec4(position, 1.0);

    #ifdef USE_SKINNING
        mat4 boneMatX = getBoneMatrix(skinIndex.x);
        mat4 boneMatY = getBoneMatrix(skinIndex.y);
        mat4 boneMatZ = getBoneMatrix(skinIndex.z);
        mat4 boneMatW = getBoneMatrix(skinIndex.w);

        mat4 skinMatrix = mat4(0.0);
        skinMatrix += skinWeight.x * boneMatX;
        skinMatrix += skinWeight.y * boneMatY;
        skinMatrix += skinWeight.z * boneMatZ;
        skinMatrix += skinWeight.w * boneMatW;

        transformed = bindMatrixInverse * skinMatrix * bindMatrix * transformed;
    #endif
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // gl_Position = projectionMatrix * viewMatrix * modelPosition;
    gl_Position = projectionMatrix * modelViewMatrix * transformed;

    // Model normal
    vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

    // Varyings
    vNormal = modelNormal;
    vPosition = modelPosition.xyz;
    vColor = _vertexcolor.rgb;
    vUv = uv;
}