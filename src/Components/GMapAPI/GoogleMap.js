import GoogleMapReact from "google-map-react";
import { useState, useRef } from "react";
import useSwr from "swr";
import "./MapStyles.css";
import useSupercluster from "use-supercluster";

// * returning a promise
const fetcher = (...args) => fetch(...args).then((response) => response.json());

const Marker = ({ children }) => children;

function GoogleMap() {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);

  const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
  const { data, error } = useSwr(url, fetcher);
  const crimes = data && !error ? data : [];
  const points = crimes.map((crime) => ({
    type: "Feature",
    properties: {
      cluster: false,
      crimeId: 78212911,
      category: crime.category,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(crime.location.longitude),
        parseFloat(crime.location.latitude),
      ],
    },
  }));

  const { clusters,supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={{ lat: 52.623341, lng: -1.135171 }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          if (isCluster) {
            return (
              <Marker key={cluster.id} lat={latitude} lng={longitude}>
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 30}px`,
                    height: `${10 + (pointCount / points.length) * 30}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({lat: latitude, lng: longitude});
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
          return (
            <Marker
              key={cluster.properties.crimeId}
              lat={latitude}
              lng={longitude}
            >
              <button className="crime-marker">
                <img src="./pin.svg" />
              </button>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;
