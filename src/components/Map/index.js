import React, { PureComponent } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { ToastContainer, toast } from 'react-toastify';

import GitUserModal from '../GitUserModal';
import Sidebar from '../Sidebar';
import MarkIcon from '../MarkIcon';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UsersActions } from '../../store/ducks/users';
import { Creators as ErrorActions } from '../../store/ducks/error'

import './Map.css';
import 'react-toastify/dist/ReactToastify.css';

class Map extends PureComponent {
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
  goToLocation = (lat, long) => {
    const viewport = {
      ...this.state.viewport,
      longitude: lat,
      latitude: long
    };
    this.setState({ viewport });
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
      this.closeModal();
      if (this.props.error.visible) {
      toast(`${this.props.error.message}`)
      }
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
        <ToastContainer />
        {this.state.modalOpen && (
          <GitUserModal
            handleAdd={this.handleAdd}
            closeModal={this.closeModal}
            coords={this.state.coords}
          />
        )}
        <Sidebar
          users={users}
          goToLocation={this.goToLocation}
          removeUser={this.props.removeUser}
        />
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1IjoidmluaW9vIiwiYSI6ImNqeWVsZGU0ZTEydHgzY3J3aTRrZDRpaW8ifQ.ACsp1W1GknItbv1nwATJ7g"
          mapStyle="mapbox://styles/mapbox/streets-v10"
          onViewportChange={viewport => this.setState({ viewport })}
          onClick={this.handleClick}
          className="map">
          {users &&
            users.map(user => (
              <Marker
                latitude={user.long}
                longitude={user.lat}
                offsetLeft={-20}
                offsetTop={-10}
                key={user.id}>
                <MarkIcon img={user.data.avatar_url} />
              </Marker>
            ))}
        </ReactMapGL>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { mapState: state[0], error: state[1] };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({...UsersActions,...ErrorActions}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
