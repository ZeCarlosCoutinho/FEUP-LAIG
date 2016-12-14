var lastResponse = "";

function getPrologRequest(requestString, onSuccess, onError, port)
{
	lastResponse = "";
	var requestPort = port || 8081;
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);
	request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
	request.onerror = onError || function(){console.log("Error waiting for response");};
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
}
/*
function makeRequest()
{
	// Get Parameter Values
	var requestString = document.querySelector("#query_field").value;				
	
	// Make Request
	getPrologRequest(requestString, handleReply);
}*/
function requestScore(board)
{
	// Get Parameter Values
	var requestString = "score(" + board.toString() + ")";				
	
	// Make Request
	getPrologRequest(requestString, handleReply);
}

function requestMove(board, player, difficulty)
{
	// Get Parameter Values
	var requestString = "thinkMove(" + board.toString() + "," + player + "," + difficulty + ")";				
	
	// Make Request
	getPrologRequest(requestString, handleReply);
}

function requestPossibleMoves(board, player, coords)
{
	// Get Parameter Values
	var requestString = "getAllValidMoves(" + board.toString() + "," + player + "," + coords[1] +  "-" + coords[0] + ")";				
	
	// Make Request
	getPrologRequest(requestString, handleReply);
}


//Handle the Reply
function handleReply(data){
	//document.querySelector("#query_result").innerHTML=data.target.response;
	console.log("Request successful. Reply: " + data.target.response);
	lastResponse = data.target.response;

}