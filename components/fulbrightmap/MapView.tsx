"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import mapboxgl, { type LngLatLike, type MapMouseEvent } from "mapbox-gl";

import { canDeletePin } from "@/lib/fulbrightmap/storage";
import type { PendingLocation, Pin } from "@/lib/fulbrightmap/types";
import PinPopup from "./PinPopup";

const NEW_TAIPEI_CENTER: LngLatLike = [121.4657, 25.012];
const NEW_TAIPEI_BOUNDS: [[number, number], [number, number]] = [
  [120.95, 24.52],
  [122.15, 25.42],
];

type MarkerEntry = {
  marker: mapboxgl.Marker;
  element: HTMLButtonElement;
};

function stopMarkerEvent(event: Event) {
  event.stopPropagation();
}

export default function MapView({
  token,
  pins,
  selectedPinId,
  highlightedPinId,
  loadingPins,
  anonymousUserId,
  onMapClick,
  onSelectPin,
  onDeletePin,
}: {
  token: string;
  pins: Pin[];
  selectedPinId: string | null;
  highlightedPinId: string | null;
  loadingPins: boolean;
  anonymousUserId: string;
  onMapClick: (location: PendingLocation) => void;
  onSelectPin: (pinId: string) => void;
  onDeletePin: (pinId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const popupRootRef = useRef<Root | null>(null);
  const suppressMapClickRef = useRef(false);
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

    const handleLoad = () => {
      setMapReady(true);
    };
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
      markerEntriesRef.current.forEach(({ marker }) => {
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
      if (suppressMapClickRef.current) {
        suppressMapClickRef.current = false;
        return;
      }

      if (popupRef.current) {
        popupRef.current.remove();
        suppressMapClickRef.current = false;
        return;
      }
      onMapClick({ lat: event.lngLat.lat, lng: event.lngLat.lng });
    };

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [onMapClick]);

  const openPopup = useCallback((pin: Pin, fly: boolean) => {
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
    root.render(
      <PinPopup
        pin={pin}
        canDelete={canDeletePin(pin, anonymousUserId)}
        onDelete={() => {
          popup.remove();
          onDeletePin(pin.id);
        }}
      />,
    );

    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
      offset: 30,
      maxWidth: "340px",
      className: "fulbright-pin-popup",
    })
      .setLngLat([pin.lng, pin.lat])
      .setDOMContent(popupNode)
      .addTo(map);

    popup.on("close", () => {
      suppressMapClickRef.current = true;
      window.setTimeout(() => {
        suppressMapClickRef.current = false;
      }, 120);

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
  }, [anonymousUserId, onDeletePin]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    markerEntriesRef.current.forEach(({ marker }) => {
      marker.remove();
    });

    markerEntriesRef.current = pins.map((pin) => {
      const element = document.createElement("button");
      element.type = "button";
      element.setAttribute("aria-label", `Open ${pin.placeName}`);
      element.dataset.pinId = pin.id;
      element.className =
        "group relative h-12 w-12 rounded-full border-2 border-white/95 bg-neutral-900 shadow-xl hover:border-white focus:outline-none focus:ring-4 focus:ring-white/70";
      element.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.2)), url("${pin.imageUrl}")`;
      element.style.backgroundSize = "cover";
      element.style.backgroundPosition = "center";

      const tail = document.createElement("span");
      tail.className =
        "absolute -bottom-1 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-[4px] border-b-2 border-r-2 border-white/95 bg-inherit";
      element.appendChild(tail);

      const dot = document.createElement("span");
      dot.className =
        "absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-neutral-950 shadow";
      element.appendChild(dot);

      element.addEventListener("pointerdown", stopMarkerEvent);
      element.addEventListener("mousedown", stopMarkerEvent);
      element.addEventListener("touchstart", stopMarkerEvent, { passive: true });

      element.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        suppressMapClickRef.current = true;
        openPopup(pin, false);
        onSelectPin(pin.id);
        window.setTimeout(() => {
          suppressMapClickRef.current = false;
        }, 120);
      });

      const marker = new mapboxgl.Marker({
        element,
        anchor: "bottom",
        clickTolerance: 8,
      })
        .setLngLat([pin.lng, pin.lat])
        .addTo(map);

      return { marker, element };
    });
  }, [mapReady, onSelectPin, openPopup, pins]);

  useEffect(() => {
    markerEntriesRef.current.forEach(({ element }) => {
      const isHighlighted = element.dataset.pinId === highlightedPinId;
      element.classList.toggle("ring-4", isHighlighted);
      element.classList.toggle("ring-white/80", isHighlighted);
      element.classList.toggle("shadow-2xl", isHighlighted);
      element.style.zIndex = isHighlighted ? "10" : "1";
    });
  }, [highlightedPinId]);

  useEffect(() => {
    if (!selectedPinId || !mapReady) return;

    const pin = pins.find((candidate) => candidate.id === selectedPinId);
    if (pin) openPopup(pin, true);
  }, [mapReady, openPopup, pins, selectedPinId]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#0d1412]">
      <div ref={containerRef} className="h-full w-full" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.24),transparent_32%,rgba(0,0,0,0.28))]" />

      {!mapReady || loadingPins || mapError ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-5">
          <div className="max-w-sm rounded-[1.25rem] border border-white/15 bg-neutral-950/70 p-5 text-center text-white shadow-2xl backdrop-blur-xl">
            <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-white/80 shadow-lg shadow-black/30" />
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
    </div>
  );
}
