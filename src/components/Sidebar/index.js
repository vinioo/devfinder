import React, { Component } from 'react';

import User from '../User';
import './Sidebar.css';

export default class Sidebar extends Component {
  render() {
    const { users } = this.props
    return (
      <div className="Sidebar">
        {users && users.map(user => (
        <User user={user} />
        ))}

      </div>
    );
  }
}
