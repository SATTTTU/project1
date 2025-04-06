import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ waypoints }) => {
  console.log(waypoints);

  const instance = L.Routing.control({
    waypoints: waypoints.map(({ latitude, longitude }) =>
      L.latLng(latitude, longitude)
    ),
    lineOptions: {
      styles: [{ color: "blue", opacity: 1, weight: 5 }],
    },
    draggableWaypoints: true,
    addWaypoints: false,
    createMarker: function () {
      return false;
    },
    show: false, // 👈 This disables the direction/instruction panel
  });

  return instance;
};

const RoutingMAchine = createControlComponent(createRoutineMachineLayer);

export default RoutingMAchine;
