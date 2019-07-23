import React, { Component } from 'react';

import './DeleteModal.css';

class DeleteModal extends Component {
  state = {
    user: ''
  };
  handleInput = e => {
    this.setState({
      user: e.target.value
    });
  };
  clearInput = () => {
    this.setState({
      user: ''
    });
  };

  render() {
    return (
      <div className="GitUserModal">
        <h4>Do you really want to remove this user?</h4>
        <div className="buttons">
          <button onClick={this.props.closeModal}>Cancel</button>
          <button
            onClick={
              this.props.confirmDelete
            }>
            Confirm
          </button>
        </div>
      </div>
    );
  }
}


export default DeleteModal;
