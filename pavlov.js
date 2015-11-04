    var taskArr= [];
	var compArr=[];
	var isCompleted = 0;
	var myDataRef = new Firebase('https://hackathon-lock.firebaseio.com/');

	document.getElementById('submit').addEventListener('click',addTask);
	document.getElementById('unlock').addEventListener('click',findComp);
    function myFunction(e) {
        //accessing checked value of the textbox
        var val = e.target.checked;
        var classname = document.getElementsByClassName("texts");
		compArr = [];
		for (var i = 0; i < classname.length; i++) {
			compArr.push(classname[i].checked);
		}
		progressBar();
		//do whatever you want with "val"
    }
	
	function progressBar(){
		var complete = 0;
		for(i =0; i<compArr.length;i++){
			if(compArr[i] == 1){
			complete = complete+1;
			}
		}
		var percent = complete/compArr.length*100;
		percent = percent.toFixed(2);
		document.getElementById("proBar").value = Math.round(percent);
		document.getElementById("pb").innerHTML = percent+'%';
	
	}
	function addTask(){
		if(compArr.length > 20){
			alert("Stop it. Too many tasks.");
		}
		else{
			var check = document.getElementById('compInput').checked;
			var task = document.getElementById('taskInput').value;		
			taskArr.push(task);
			compArr.push(check);
			update();
		}
	}
	function update(){
		if(taskArr.length !=0){
			var tasks = '<h4><u>Tasks</u></h4><ul>';
			for(i =0; i< taskArr.length;i++){
				if(compArr[i] == 0){
					tasks = tasks.concat('<li>'+taskArr[i]+'<input type="checkbox" class="texts" placeholder="Done?"/></li>');
					
				}
				else{
					tasks = tasks.concat('<li>'+taskArr[i]+'<input type="checkbox" class="texts" checked placeholder="Done?"/></li>');
				}
			}
			tasks = tasks.concat('</ul>');		
			document.getElementById('list').innerHTML = tasks;	
			var classname = document.getElementsByClassName("texts");
			for (var i = 0; i < classname.length; i++) {
				classname[i].addEventListener('click', myFunction);
			}
		}
	
		progressBar();
	}
	function findComp(){
		var isComp = 1;
		var classname = document.getElementsByClassName("texts");
		compArr = [];
		for (var i = 0; i < classname.length; i++) {
			compArr.push(classname[i].checked);
			if(classname[i].checked == 0){
				isComp =0;
			}
		}
		
		if(isComp == 1){
			if(isCompleted == 1){
				alert("Already unlocked");
				myDataRef.push({name:"lock", value:2});
			}
			else{
			unlock();
			isCompleted = 1;
			}
		}
		else{
			if(isCompleted ==0){
				alert("Already locked");
				myDataRef.push({name:"lock", value:2});
			}
			else{
				locked();
				isCompleted =0;
			}
		}
	}
	function locked(){
		alert("Locking.");
		myDataRef.push({name:"lock", value:0});
	}
	function unlock(){
		alert("Successful unlock");
		myDataRef.push({name:"lock", value:1});
	}	
    
