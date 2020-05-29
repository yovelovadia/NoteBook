import { useState } from "react";

function GetLocation() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    return;
  }

  function showPosition(position) {
    const latx = position.coords.latitude;
    const lony = position.coords.longitude;
    setLat(latx);
    setLon(lony);
  }
  return [lat, lon];
}

export default GetLocation;
