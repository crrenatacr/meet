import { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  // Method to define the styles of the alert
  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

// Subclass InfoAlert extends Alert
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 0, 255)'; // blue
    this.bgColor = 'rgb(220, 220, 255)'; // light blue
  }
}


//Subclass ErrorAlert extends Alert
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)'; // red
    this.bgColor = 'rgb(255, 220, 220)'; // light red
  }
}

//Subclass WarningAlert extends Alert
class WarningAlert extends Alert {
   constructor(props) {
    super(props);
    this.color = 'rgb(255, 255, 0)'; // yellow
    this.bgColor = 'rgb(255, 255, 220)'; // Light yellow
   }
}

export { InfoAlert, ErrorAlert, WarningAlert };