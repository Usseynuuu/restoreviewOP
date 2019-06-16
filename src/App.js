import React, {Component} from 'react';
import GoogleMap from './components/map/GoogleMap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Listing from "./components/restaurantList/Listing";



export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      userLocation:null

    }


  }

  componentDidMount() {
    const getPosition = position =>{
      this.setState({
        userLocation:{
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    };

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getPosition, handleError.bind(this));

      function handleError(error){
        if(error.code && error.PERMISSION_DENIED){
          this.setState({
            userLocation:{
              lat:'14.669777',
              lng: '-17.433411'
            }
          })
        }

      }
    }
  }






  render(){
    const { userLocation , service } = this.state;
    return(

          <div className="row">

              <GoogleMap
                  handleClick={this.handleClick}
                  userLocation={userLocation}
                  searchNearby={this.searchNearby}
              />

            <Listing
                service={service}
                userLocation={userLocation}
            />

          </div>




    );
  }

}
