import React, {Component} from "react";
import ReactDOM from "react-dom";
import './styles/main.sass';
import App from "./js/components/App";

class Main extends Component {
	render() {
		return (
			<div>
				<App />
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.querySelector("#root"));
