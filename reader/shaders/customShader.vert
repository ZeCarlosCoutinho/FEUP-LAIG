attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform vec2 dimensions;
uniform vec2 selected;

varying vec2 vTextureCoord;
varying vec2 currentPosition;

void main() {
	vec2 currentPosition = vec2(aTextureCoord[0] * dimensions[0], aTextureCoord[1] * dimensions[1]);
	currentPosition = ceil(currentPosition);
	if ( currentPosition[0] == selected[0] && currentPosition[1] == selected[1])
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition[0], aVertexPosition[1], aVertexPosition[2]+0.02, 1.0);
	else
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;
}
