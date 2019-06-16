import React, {Component, Fragment} from 'react';
import { Map,Marker, GoogleApiWrapper } from 'google-maps-react';
import listRestaurant from '../../data/listRestaurant'
import isEqual from 'lodash.isequal'


const mapStyles = {
    width: '100%',
    height: '100%'
};

export class GoogleMap extends Component {

    constructor(props){
        super(props);

        this.state = {
            userLocation : null,
            isReady : false,
            sampleRestos : listRestaurant
        }


    }

    componentWillReceiveProps(nextProps){
        const { userLocation } = this.props;
        if(!isEqual(nextProps.userLocation, userLocation)){
            this.setState({ userLocation: nextProps.userLocation});
        }


    }






    movedCenter = (mapProps, map) =>{
        const { isReady } = this.state;
        if(isReady){
            this.searchNearby(map, map.center);

        }
    };

    handleClick = () => {
        this.props.handleClick();
    };


    render() {
        const{ google, places} = this.props;
        const { userLocation,sampleRestos} = this.state;

        return (
            <Fragment>
                {  google ?
                <Map
                    google={google}
                    zoom={12}
                    style={mapStyles}
                    initialCenter={{
                        lat: 14.669777,
                        lng: -17.433411
                    }}
                    onClick={this.handleClick}
                    onDragend={this.movedCenter}
                >

                    <Marker
                        title={'Your location!'}
                        name={'currentLocation'}
                        position={userLocation}
                        icon={{
                            url: userLocation,
                            anchor: new google.maps.Point(20,20),
                            scaledSize: new google.maps.Size(40,40)
                        }}
                    />

                    {
                        sampleRestos[0] &&
                        sampleRestos.map((place, i) => {
                            return (
                                <Marker
                                    visible={true}
                                    key={i}
                                    title={place.restaurantName}
                                    name={place.restaurantName}
                                    position={{
                                        lat: place.lat,
                                        lng: place.long
                                    }}
                                    icon={{
                                        anchor: new google.maps.Point(20,20),
                                        scaledSize: new google.maps.Size(40, 40)
                                    }}
                                />

                            );
                        })
                    }



                </Map> : <div>Map loading...</div>
                }
            </Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAsakCEzvOI-oJ_nKH9AsfceepJu57gbC0'
})(GoogleMap);