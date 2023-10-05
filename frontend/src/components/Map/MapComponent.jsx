import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (e) => {
    setSelectedLocation(e.latlng);
    onLocationSelect(e.latlng);
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "500px", width: "500px", cursor: "pointer" }}
      onClick={handleMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedLocation && (
        <Marker position={selectedLocation}>
          <Popup>You selected this location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
