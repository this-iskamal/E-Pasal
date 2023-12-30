import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Button, useToast } from "@chakra-ui/react";
import L from "leaflet";

function MapComponent({onSaveAddress}) {
  const mapRef = useRef(null); // Ref to store the map instance
  const markerRef = useRef(null); // Ref to store the marker instance
  const [isMapClicked, setIsMapClicked] = useState(false);
  const [userlocation, setUserLocation] = useState("");

  useEffect(() => {
    // Create a Leaflet map
    const map = L.map("my-map").setView(
      [27.61613612496916, 85.54911078965529],
      15
    );

    // Save the map instance to the ref
    mapRef.current = map;

    // Marker to save the position of the found address
    let marker;

    // The API Key provided is restricted to JSFiddle website
    // Get your own API Key on https://myprojects.geoapify.com
    const myAPIKey = "8bb75f8b79734c259fea6abcded29388";

    // Retina displays require different map tiles quality
    const isRetina = L.Browser.retina;
    const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
    const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

    // Add Geoapify attribution
    map.attributionControl.setPrefix(
      'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a>'
    );

    // Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
    L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution:
        '<a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: myAPIKey,
      maxZoom: 20,
      id: "osm-bright",
    }).addTo(map);

    // Move zoom controls to the bottom right
    map.zoomControl.remove();
    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(map);

    // Handle map click event
    function onMapClick(e) {
      setIsMapClicked(true);

      if (markerRef.current) {
        markerRef.current.remove();
      }

      const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&apiKey=${myAPIKey}`;

      // Call Reverse Geocoding API - https://www.geoapify.com/reverse-geocoding-api/
      fetch(reverseGeocodingUrl)
        .then((result) => result.json())
        .then((featureCollection) => {
          if (featureCollection?.features?.length === 0) {
            document.getElementById("status").textContent =
              "The address is not found";
            return;
          }

          const foundAddress = featureCollection.features[0];

          setUserLocation(foundAddress.properties.formatted);
          document.getElementById(
            "status"
          ).textContent = `Found address: ${foundAddress.properties.formatted}`;

          marker = L.marker(
            new L.LatLng(
              foundAddress.properties.lat,
              foundAddress.properties.lon
            )
          ).addTo(map);
          // Save the marker instance to the ref
          markerRef.current = marker;
        })
        .catch((error) => {
          console.error("Error fetching reverse geocoding data:", error);
        });
    }

    map.on("click", onMapClick);

    // Cleanup function to remove the map when the component is unmounted
    return () => {
      map.remove();
    };
  }, []); // Ensure the effect runs only once on mount


  const toast = useToast();
  const handleSave = () => {
    if (!isMapClicked) {
      toast({
        title: 'Address not set on the map',
        status: 'warning',
        isClosable: true,
      });
      return;
    }
    onSaveAddress(userlocation);

   
  };

  return (
    <div className="main">
      <div className="controls">
        {isMapClicked ? (
          <div className="results bg-blue-500 text-white p-2 rounded-md shadow-lg">
            {userlocation}
          </div>
        ) : (
          <div className="status">
            <span id="status">Set Shipping Address on the map</span>
          </div>
        )}
      </div>
      <div
        id="my-map"
        style={{
          height: '400px',
          width: '100%',
          maxWidth: '900px',
          backgroundColor: 'lightblue',
          padding: '20px',
        }}
      >
        {/* Your map content goes here */}
      </div>
      <Button colorScheme="teal" size="sm" mt={2} onClick={handleSave}>
        Save Address
      </Button>
    </div>
  );
}

export default MapComponent;
