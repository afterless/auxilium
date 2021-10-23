//grabHours() - Takes the Hours and Number of Items on Menu
//hours[] - String array of Hours (Strings), length of 7
//name - Restaraunt Name
//menu - Hashmap of Menu Items with 2 Strings, Length of menuItems
//menuItems - int of number of items on menu
//send the values to the API
const hours = [];
var name = "";
const menuItems = new Map();
function grabHours() {
	name = document.getElementById("name").value;
	hours[0] = document.getElementById("monHours").value;
	hours[1] = document.getElementById("tuesHours").value;
	hours[2] = document.getElementById("wedHours").value;
	hours[3] = document.getElementById("thursHours").value;
	hours[4] = document.getElementById("friHours").value;
	hours[5] = document.getElementById("satHours").value;
	hours[6] = document.getElementById("sunHours").value;
	value = ""; //Cost
	key = ""; //Menu Item
	for(let i = 0; i < document.getElementById("menuItems").value.length; i++) {
		while(document.getElementById("menuItems").value.charAt(i) != ':') {
			key += document.getElementById("menuItems").value.charAt(i)
			i += 1;
		}
		i += 1;
		while(i < document.getElementById("menuItems").value.length && document.getElementById("menuItems").value.charAt(i) != ',') {
			value += document.getElementById("menuItems").value.charAt(i)
			i += 1;
		}
		i += 1;
		menuItems.set(key, value);
		key = "";
		value = "";
	} //end for 
	alert(menuItems.get("Chicken Nuggets"));
}
