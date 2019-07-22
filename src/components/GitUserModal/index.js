import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UsersActions } from '../../store/ducks/users';

import './GitUserModal.css';

class GitUserModal extends Component {
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
        <h4>Adicionar novo usuário</h4>
        <input
          type="text"
          name="user"
          value={this.state.user}
          onChange={this.handleInput}
          placeholder="Usuario no Github"
        />
        <div className="buttons">
          <button onClick={this.props.closeModal}>Cancelar</button>
          <button
            onClick={() =>
              this.props.handleAdd(this.state.user, this.props.mapState.coords)
            }>
            Adicionar
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { mapState: state[0] };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GitUserModal);
