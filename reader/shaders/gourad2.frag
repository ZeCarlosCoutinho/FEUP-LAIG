#ifdef GL_ES
precision highp float;
#endif

varying vec4 vFinalColor;

void main() {
	gl_FragColor = vFinalColor;
	/*gl_FragColor[0] *= 0.5;
	gl_FragColor[1] *= 0.5;*/
}