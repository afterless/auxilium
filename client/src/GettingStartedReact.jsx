import React, {Component} from 'react';
import logo from './logo.svg';
import './AboutPage.css'

class GettingStarted extends Component{
	render(){
		return (
			<div className="GettingStarted">
				<br>
				<h1>Let's Start Using Auxilium!</h1>
				<script src="javascriptCode.js"></script>
				<br/>
				<br/>
				<p> Enter Hours in the format: (Hour)am - (Hour)pm. If closed on that day, leave blank. Example: 9am - 5pm</p>
				<p> Enter Menu items in the format: item:$cost, item:$cost. Example: Chicken Nuggets:$10, Pasta:$5 </p>
				<p> ** DO NOT USE ":" or "," CHARACTERS IN ITEM NAME OR PRICE ** </p>
				<form>
					<label for="restName">Restaraunt Name</label><br/>
					<input type="text" id="name" name ="restName"><br/>
					<br/>
					<label for="mondayHours">Hours on Monday</label><br/>
					<input type="text" id="monHours" name="mondayHours"><br/>
					<br/>
					<label for="tuesdayHours">Hours on Tuesday</label><br/>
					<input type="text" id="tuesHours" name="tuesdayHours"><br/>
					<br/>
					<label for="wednesdayHours">Hours on Wednesday</label><br/>
					<input type="text" id="wedHours" name="wednesdayHours"><br/>
					<br/>
					<label for="thursdayHours">Hours on Thursday</label><br/>
					<input type="text" id="thursHours" name="thursdayHours"><br/>
					<br/>
					<label for="fridayHours">Hours on Friday</label><br/>
					<input type="text" id="friHours" name="fridayHours"><br/>
					<br/>
					<label for="saturdayHours">Hours on Saturday</label><br/>
					<input type="text" id="satHours" name="saturdayHours"><br/>
					<br/>
					<label for="sundayHours">Hours on Sunday</label><br/>
					<input type="text" id="sunHours" name="sundayHours"><br/>
					<br/>
					<label for="numberItems">Enter Items on the Menu</label><br/>
					<input type="text" id="menuItems" name="numberItems"><br/>
					<br/>
					<button onclick="grabHours()">Enter Answers</button>
				</form>
			</div>
			);
	}
}

export default GettingStarted;