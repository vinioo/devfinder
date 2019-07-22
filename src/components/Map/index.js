import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import GitUserModal from '../GitUserModal';
import Sidebar from '../Sidebar';
import MarkIcon from '../MarkIcon'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UsersActions } from '../../store/ducks/users';

import './Map.css';

class Map extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '100vh',
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    },
    modalOpen: false
  };

  handleClick = e => {
    const user = {
      id: Math.random(),
      lat: e.lngLat[0],
      long: e.lngLat[1]
    };
    this.props.addUserLocation(user);
    this.setState({
      modalOpen: true,
      userLocation: user
    });
  };
  handleAdd = async (user, coords) => {
    await this.props.findUserRequest(user, coords);
    this.closeModal()
  };
  closeModal = () => {
    this.setState(() => ({
      modalOpen: false
    }));
  };
  render() {
    const { users } = this.props.mapState;
    return (
      <div>
        {this.state.modalOpen && (
          <GitUserModal handleAdd={this.handleAdd} closeModal={this.closeModal} coords={this.state.coords} />
        )}
        <Sidebar users={users}/>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1IjoidmluaW9vIiwiYSI6ImNqeWVsZGU0ZTEydHgzY3J3aTRrZDRpaW8ifQ.ACsp1W1GknItbv1nwATJ7g"
          mapStyle="mapbox://styles/mapbox/streets-v10"
          onViewportChange={viewport => this.setState({ viewport })}
          onClick={this.handleClick}
          className="map">
            
          {users && users.map(user => (
            <Marker
              latitude={user.long}
              longitude={user.lat}
              offsetLeft={-20}
              offsetTop={-10}
              key={user.id}>
              <MarkIcon img={user.data.avatar_url}></MarkIcon>
            </Marker>
          ))}
        </ReactMapGL>
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
)(Map);
