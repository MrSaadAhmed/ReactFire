function newPost(){

	var newName   = document.forms["postAdd"]["pro_name"].value;
	var newDes  = document.forms["postAdd"]["pro_des"].value;
	var newPrice   = document.forms["postAdd"]["pro_price"].value;

	if(newName != "" && newDes != "" && newPrice != ""){

		document.getElementById('pName').innerHTML = 'new paragraph.....';
	
	} else {

		alert('All Fields Are Required!');
		return false;
	}
}

