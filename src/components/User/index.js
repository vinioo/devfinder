import React, { Component } from 'react';

import './User.css';

export default class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="User">
        <a href={user.data.avatar_url} class="UserUrl">
          <img src={user.data.avatar_url} alt="" srcset="" />
        </a>
        <div className="UserName">
          <h1>{user.data.name}</h1>
          <p>{user.data.login}</p>
        </div>
        <div className="close">x</div>
        <div className="find">></div>
      </div>
    );
  }
}
