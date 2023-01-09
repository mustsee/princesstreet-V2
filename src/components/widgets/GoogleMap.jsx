import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { memo, useState } from "react";

// Waverley station
const mapCenter = {
  lat: 55.9524,
  lng: -3.1883,
};

const hostelPosition = {
  lat: 55.953629537991795,
  lng: -3.190308129447752,
};

const GoogleMapWidget = ({ apiKey, mapWidth }) => {
  const [containerStyle, setContainerStyle] = useState({
    width: "300px",
    height: "400px",
  });

  const resize = () => {
    setContainerStyle({ ...containerStyle, width: mapWidth });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={resize}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={14}
      >
        <Marker position={hostelPosition} shape="MarkerShapeRect" />
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(GoogleMapWidget);
