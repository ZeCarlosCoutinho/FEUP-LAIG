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

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

struct MaterialProperties {
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    vec4 emission;
    float shininess;
}; 
  
uniform MaterialProperties uFrontMaterial;

void main() {
		vec4 textureColor = texture2D(uSampler, vTextureCoord);
		//gl_FragColor = uFrontMaterial.specular + uFrontMaterial.ambient + uFrontMaterial.diffuse;
		gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);  

}

