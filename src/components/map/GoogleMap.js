import {Map, Marker, GoogleApiWrapper} from "google-maps-react"
import listRestaurant from '../../data/listRestaurant'
import {Fragment} from "react";

export class GoogleMap extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            userLocation: null,
            isReady: false,
            restaurants: listRestaurant

        }
    }


    fetchPlaces = (mapProps,map) => {
        this.setState = ({isReady: true})
        this.searchNearby(map , map.center)

    };

    searchNearby = (map, center) =>{
        const { google, dispatchPlaces } = this.props;
        this.props.searchNearby(google, dispatchPlaces, map, center);
    };

    movedCenter = (mapProps, map) =>{
        const { isReady } = this.state;
        if(isReady){
            this.searchNearby(map, map.center);

        }
    };

    handleClick = () => {
        this.props.handleClick();
    };

    render(){
        const { google , places } = this.props
        const { userLocation , restaurants } = this.state

        return (
            <Fragment>
                { userLocation && google ?
                <Map
                    className='map'
                    google={google}
                    initialCenter={userLocation}
                    zoom={12}
                    onReady={this.fetchPlaces}
                    onClick={this.handleClick}
                    onDragend={this.movedCenter}
                />



                }
            </Fragment>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAsakCEzvOI-oJ_nKH9AsfceepJu57gbC0"
})(MapContainer)