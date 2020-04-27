import React, { Component } from 'react';

class MessageBox extends Component {

    constructor(props) {
      super(props);
      this.state = {
        messageType:this.props.messageType,
        message:this.props.message
      }
    }

    render()
    {
        return(
            <div className={`col-md-11 ml-5 mb-10 border alert rounded-right border-left-10 ${this.state.messageType === 'success' ? "border-success" : "border-danger"} ${this.state.message ? "show" : "hide"}`}><label className="col-md-12">{this.state.message}</label></div>
        )
    }
}

export default MessageBox;