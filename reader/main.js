//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 

serialInclude(['../lib/CGF.js', 'XMLscene.js', 'MySceneGraph.js',
	'parser/View.js',
	'parser/Illumination.js',
	'parser/OmniLight.js',
	'parser/SpotLight.js',
	'parser/Texture.js',
	'parser/Material.js',
	'parser/Transformation.js',
	'parser/Component.js',
	'parser/Prim_Rectangle.js',
	'parser/Prim_Triangle.js',
	'parser/Prim_Cylinder.js',
	'parser/Prim_Sphere.js',
	'parser/Prim_Torus.js',
	'parser/Prim_Patch.js',
	'parser/Prim_Plane.js',
	'parser/Prim_Vehicle.js',
	'parser/Prim_ChessBoard.js',
	'parser/LinearAnimationParsed.js',
	'parser/CircularAnimationParsed.js',
	'parser/Prim_Tile.js',
	'primitives/MyRectangle.js',
	'primitives/MyTriangle.js',
	'primitives/MyCircle.js',
	'primitives/MySphere.js',
	'primitives/MyCylinder.js',
	'primitives/MyCylinderWithTops.js',
	'primitives/MyTorus.js',
	'primitives/MyComponent.js',
	'primitives/MyPlane.js',
	'primitives/MyPatch.js',
	'primitives/MyChessBoard.js',
	'primitives/MyBoat.js',
	'animations/Animation.js',
	'animations/LinearAnimation.js',
	'animations/CircularAnimation.js',
	'animations/CompoundAnimation.js',
	'MyInterface.js',
	'primitives/MyPiece.js',
	'primitives/MyBoard.js',
	'primitives/MyGameBoard.js',
	'primitives/MyTile.js',
	'prologConnection/prologConnection.js',

	
main=function()
{
	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myScene = new XMLscene();
    //var myInterface = new CGFinterface();
    var myInterface = new MyInterface();

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);
	myScene.setInterface(myInterface);
	
    myInterface.setActiveCamera(myScene.camera);

	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 
	
	//var filename=getUrlVars()['file'] || "demo.xml";
    var filename=getUrlVars()['file'] || "game.dsx";

	// create and load graph, and associate it to scene. 
	// Check console for loading errors
	var myGraph = new MySceneGraph(filename, myScene);
	
	// start
    app.run();
}

]);