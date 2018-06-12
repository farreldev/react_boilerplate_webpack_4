import React, {Component} from "react";
import img from '../images/logo.png';

class App extends Component {
	render() {
		return (
			<div className="container">
				<Welcome greeting="Simple React Boilerplate" txt="Author By Ricky A Titaley" />
			</div>
		);
	}
}

const Welcome = (props) => {
	return (
		<article>
			<span className="logo">
				<img src={img} />
			</span>
			<span className="iconBel"></span>
				<h1>{props.greeting}</h1>
			<p>{props.txt}</p>
		</article>
	);
}

export default App;
