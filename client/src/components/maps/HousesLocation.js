import React, { useState, useRef,useEffect } from "react";
import useSwr from "swr";
import axios from "axios";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSupercluster from "use-supercluster";
const fetcher = (...args) => fetch(...args).then(response => response.json());

const HousesLocation = () => {
  const [houses,setHouses] = useState([])
  const getMultipleFiles = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/getMultipleFiles');
      return data;
    } catch (error) {
      throw error;
    }
  }
  const getMultipleFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setHouses(fileslist);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMultipleFilesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  // const houses = data.data.map(house => {
  //   return {
  //     type: 'Feature',
  //     geometry: {
  //       type: 'Point',
  //       coordinates: [
  //         house.location.coordinates[0],
  //         house.location.coordinates[1]
  //       ]
  //     },
  //     properties: {
  //       icon: 'house'
  //     }
  //   };
  // });
  // console.log(houses)
  const [viewport, setViewport] = useState({
    latitude: 9.034129,
    longitude: 38.753259,
    width: "100vw",
    height: "90vh",
    zoom: 12
  });
  const mapRef = useRef();
/* 
  const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
  const { data, error } = useSwr(url, { fetcher });
  const crimes = data && !error ? data.slice(0, 2000) : []; */
  const points = houses.map(house => ({

    type: "Feature",
    properties: {
      icon: 'house'
    },
    geometry: {
      type: "Point",
      coordinates: [
        9.0340534,38.7644412
       ]
    }
  }));
  console.log(points)

  const bounds = mapRef.current
    ? mapRef.current
      .getMap()
      .getBounds()
      .toArray()
      .flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        maxZoom={20}
        mapboxApiAccessToken={'pk.eyJ1IjoieW9oYW5uaXN3ZWRlIiwiYSI6ImNrc2x5dXNnYTA5cm4ybnAwdjM4MXI0MnAifQ.isUCw64XCoBGOAaEpDUPLw'}
        onViewportChange={newViewport => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`crime-${cluster.properties.crimeId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button className="crime-marker">
                <img src="/house.svg" alt="crime doesn't pay" />
              </button>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  )
}

export default HousesLocation
