"use client";

import { restaurantData } from "@/lib/restaurant-data";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

type Props = {};

const Map = (props: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      // INITIALIZE MAP
      const { Map } = await loader.importLibrary("maps");

      const position = { lat: 42.47205, lng: -70.92541 };

      // map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 15,
        mapId: "one-bite-map",
      };

      // create the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // ADD MARKERS
      const { Marker } = await loader.importLibrary("marker");

      for (const restaurant of restaurantData) {
        const position = {
          lat: restaurant.location.coordinates[1],
          lng: restaurant.location.coordinates[0],
        };

        const marker = new Marker({
          position: position,
          map,
          title: restaurant.name,
        });

        const contentString = `
        <div class="text-black pr-4">
          <p class="scroll-m-20 text-xl font-semibold tracking-tight">
            ${restaurant.name}
          </p>
          <p class="leading-7 pb-2">
              ${restaurant.address1}, ${restaurant.city}, ${restaurant.state}
            </p>
          <div class="pl-1">
            
            <p>Dave gave ${restaurant.name} a <span class="font-bold">${restaurant.dave_review_stats.totalScore}</span></p>
            <div class="pt-3 pb-2">
              <a href="${restaurant.href}" target="_blank" rel="noopener noreferrer" class="text-blue-500">Watch the review</a>
            </div>
          </div>
        </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      }
    };

    initMap();
  }, []);

  return (
    <div className="h-full w-full md:w-5/6 md:mb-12 rounded-xl" ref={mapRef} />
  );
};

export default Map;