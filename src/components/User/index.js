import React, { Component } from 'react';

import DeleteModal from '../DeleteModal';

import CloseIcon from '../../assets/icons8-close-window-30.png';
import MoreIcon from '../../assets/icons8-more-than-30.png';

import './User.css';

export default class User extends Component {
  state = {
    deleteModal: false
  };
  openDelete = () => {
    this.setState({
      deleteModal: true
    });
  };
  confirmDelete = () => {
    console.log(this.props)
    this.props.removeUser(this.props.user.id);
    this.setState({
      deleteModal: false
    })
  };
  render() {
    const { user } = this.props;
    return (
      <>
        {this.state.deleteModal && (
          <DeleteModal confirmDelete={this.confirmDelete}/>
        )}

        <div className="User">
          <a href={user.data.avatar_url} class="UserUrl">
            <img src={user.data.avatar_url} alt="" srcset="" />
          </a>
          <div className="UserName">
            <h1>{user.data.name}</h1>
            <p>{user.data.login}</p>
          </div>
          <div className="close">
            <img src={CloseIcon} alt="" srcset="" onClick={this.openDelete} />
          </div>
          <div className="find">
            <img
              src={MoreIcon}
              alt=""
              srcset=""
              onClick={() =>
                this.props.goToLocation(
                  this.props.user.lat,
                  this.props.user.long
                )
              }
            />
          </div>
        </div>
      </>
    );
  }
}
