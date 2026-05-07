"use client";

import { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import mapboxgl, { type LngLatLike, type MapMouseEvent } from "mapbox-gl";

import type { PendingLocation, Pin } from "@/lib/fulbrightmap/types";
import PinPopup from "./PinPopup";

const NEW_TAIPEI_CENTER: LngLatLike = [121.4657, 25.012];
const NEW_TAIPEI_BOUNDS: [[number, number], [number, number]] = [
  [120.95, 24.52],
  [122.15, 25.42],
];

type MarkerEntry = {
  marker: mapboxgl.Marker;
  root?: Root;
};

export default function MapView({
  token,
  pins,
  selectedPinId,
  highlightedPinId,
  canAddPin,
  loadingPins,
  onMapClick,
  onSelectPin,
}: {
  token: string;
  pins: Pin[];
  selectedPinId: string | null;
  highlightedPinId: string | null;
  canAddPin: boolean;
  loadingPins: boolean;
  onMapClick: (location: PendingLocation) => void;
  onSelectPin: (pinId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const popupRootRef = useRef<Root | null>(null);
  const markerEntriesRef = useRef<MarkerEntry[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: NEW_TAIPEI_CENTER,
      zoom: 10,
      minZoom: 8,
      maxZoom: 18,
      maxBounds: NEW_TAIPEI_BOUNDS,
      attributionControl: false,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");

    const handleLoad = () => setMapReady(true);
    const handleError = () => {
      setMapError("The map could not load. Check that your Mapbox token is valid.");
    };

    map.on("load", handleLoad);
    map.on("error", handleError);

    return () => {
      const popup = popupRef.current;
      const popupRoot = popupRootRef.current;
      popupRef.current = null;
      popupRootRef.current = null;
      popup?.remove();
      popupRoot?.unmount();
      markerEntriesRef.current.forEach(({ marker, root }) => {
        root?.unmount();
        marker.remove();
      });
      map.remove();
      mapRef.current = null;
    };
  }, [token]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleClick = (event: MapMouseEvent) => {
      onMapClick({ lat: event.lngLat.lat, lng: event.lngLat.lng });
    };

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [onMapClick]);

  function openPopup(pin: Pin, fly: boolean) {
    const map = mapRef.current;
    if (!map) return;

    const previousPopup = popupRef.current;
    const previousRoot = popupRootRef.current;
    popupRef.current = null;
    popupRootRef.current = null;
    previousPopup?.remove();
    previousRoot?.unmount();

    if (fly) {
      map.flyTo({
        center: [pin.lng, pin.lat],
        zoom: Math.max(map.getZoom(), 13.2),
        speed: 0.75,
        curve: 1.25,
        essential: true,
      });
    }

    const popupNode = document.createElement("div");
    const root = createRoot(popupNode);
    root.render(<PinPopup pin={pin} />);

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: true,
      offset: 30,
      maxWidth: "340px",
      className: "fulbright-pin-popup",
    })
      .setLngLat([pin.lng, pin.lat])
      .setDOMContent(popupNode)
      .addTo(map);

    popup.on("close", () => {
      if (popupRootRef.current === root) {
        root.unmount();
        popupRootRef.current = null;
      }
      if (popupRef.current === popup) {
        popupRef.current = null;
      }
    });

    popupRootRef.current = root;
    popupRef.current = popup;
  }

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    markerEntriesRef.current.forEach(({ marker, root }) => {
      root?.unmount();
      marker.remove();
    });

    markerEntriesRef.current = pins.map((pin) => {
      const element = document.createElement("button");
      element.type = "button";
      element.setAttribute("aria-label", `Open ${pin.placeName}`);
      element.className = [
        "group relative h-12 w-12 rounded-full border-2 bg-neutral-900 shadow-xl transition",
        "border-white/95 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300/60",
        highlightedPinId === pin.id ? "scale-125 ring-4 ring-orange-300/80" : "",
      ].join(" ");
      element.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.2)), url("${pin.imageUrl}")`;
      element.style.backgroundSize = "cover";
      element.style.backgroundPosition = "center";

      const tail = document.createElement("span");
      tail.className =
        "absolute -bottom-1 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-[4px] border-b-2 border-r-2 border-white/95 bg-inherit";
      element.appendChild(tail);

      const dot = document.createElement("span");
      dot.className =
        "absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-[#f97316] shadow";
      element.appendChild(dot);

      element.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        onSelectPin(pin.id);
      });

      const marker = new mapboxgl.Marker({
        element,
        anchor: "bottom",
      })
        .setLngLat([pin.lng, pin.lat])
        .addTo(map);

      return { marker };
    });
  }, [highlightedPinId, mapReady, onSelectPin, pins]);

  useEffect(() => {
    if (!selectedPinId || !mapReady) return;

    const pin = pins.find((candidate) => candidate.id === selectedPinId);
    if (pin) openPopup(pin, true);
  }, [mapReady, pins, selectedPinId]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#0d1412]">
      <div ref={containerRef} className="h-full w-full" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.24),transparent_32%,rgba(0,0,0,0.28))]" />

      {!mapReady || loadingPins || mapError ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-5">
          <div className="max-w-sm rounded-[1.25rem] border border-white/15 bg-neutral-950/70 p-5 text-center text-white shadow-2xl backdrop-blur-xl">
            <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-orange-400/80 shadow-lg shadow-orange-900/30" />
            <div className="mt-4 text-lg font-semibold">
              {mapError ? "Map setup needs attention" : "Preparing the map"}
            </div>
            <p className="mt-1 text-sm leading-5 text-white/65">
              {mapError ??
                "Loading New Taipei and the favorite spots people have shared."}
            </p>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-20 flex justify-center sm:justify-start">
        <div className="rounded-full border border-white/15 bg-neutral-950/55 px-3 py-2 text-xs text-white/70 shadow-xl backdrop-blur-xl">
          {canAddPin
            ? "Click the map to add a favorite spot."
            : "Browse the map or try a random spot."}
        </div>
      </div>
    </div>
  );
}
