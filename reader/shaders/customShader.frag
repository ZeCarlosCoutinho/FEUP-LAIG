#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];
uniform vec2 dimensions;
uniform vec2 selected;
uniform vec4 c1;
uniform vec4 c2;
uniform vec4 cs;

varying vec2 vTextureCoord;
uniform sampler2D texture;



void main() {
		vec2 currentPosition = vec2(vTextureCoord[0] * dimensions[0], vTextureCoord[1] * dimensions[1]);
		currentPosition = ceil(currentPosition);
		if (	mod((currentPosition[0] + currentPosition[1]), 2.0) <= 0.1)
			gl_FragColor =  c1;
		else
			gl_FragColor =  c2;
		if ( currentPosition[0] == selected[0] && currentPosition[1] == selected[1])
			gl_FragColor =  cs;
		vec4 color = texture2D(texture,vTextureCoord);
		gl_FragColor =  vec4(color[0] * gl_FragColor[0], color[1] * gl_FragColor[1], color[2] * gl_FragColor[2], color[3] * gl_FragColor[3] );
}

