"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import AddPinForm, {
  type AddPinFormValues,
} from "@/components/fulbrightmap/AddPinForm";
import MapView from "@/components/fulbrightmap/MapView";
import SetupScreen from "@/components/fulbrightmap/SetupScreen";
import Toast, { type ToastMessage } from "@/components/fulbrightmap/Toast";
import TopPanel from "@/components/fulbrightmap/TopPanel";
import {
  createPin,
  deletePin,
  getPins,
  getStorageMode,
  uploadImage,
} from "@/lib/fulbrightmap/storage";
import type { PendingLocation, Pin } from "@/lib/fulbrightmap/types";
import { getAnonymousUserId } from "@/lib/fulbrightmap/user";

export default function FulbrightMapApp({ mapboxToken }: { mapboxToken: string }) {
  const [anonymousUserId, setAnonymousUserId] = useState("");
  const [pins, setPins] = useState<Pin[]>([]);
  const [pendingLocation, setPendingLocation] = useState<PendingLocation | null>(
    null,
  );
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [highlightedPinId, setHighlightedPinId] = useState<string | null>(null);
  const [loadingPins, setLoadingPins] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastIdRef = useRef(0);

  const storageMode = getStorageMode();

  const showToast = useCallback(
    (message: Omit<ToastMessage, "id">) => {
      const id = toastIdRef.current + 1;
      toastIdRef.current = id;
      setToast({ id, ...message });
      window.setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, 4200);
    },
    [setToast],
  );

  useEffect(() => {
    const userId = getAnonymousUserId();
    setAnonymousUserId(userId);

    let active = true;
    getPins()
      .then((nextPins) => {
        if (!active) return;
        setPins(nextPins);
      })
      .catch((error) => {
        if (!active) return;
        showToast({
          tone: "error",
          title: "Could not load spots",
          detail: error instanceof Error ? error.message : "Please try again.",
        });
      })
      .finally(() => {
        if (active) setLoadingPins(false);
      });

    return () => {
      active = false;
    };
  }, [showToast]);

  const handleMapClick = useCallback(
    (location: PendingLocation) => {
      setPendingLocation(location);
    },
    [],
  );

  async function handleSubmit(values: AddPinFormValues) {
    if (!pendingLocation || !values.image) return;

    setSubmitting(true);

    try {
      const imageUrl = await uploadImage(values.image, anonymousUserId);
      const pin = await createPin({
        ...pendingLocation,
        authorName: values.authorName,
        placeName: values.placeName,
        caption: values.caption,
        imageUrl,
        anonymousUserId,
      });

      setPins((current) => [pin, ...current]);
      setPendingLocation(null);
      setSelectedPinId(pin.id);
      setHighlightedPinId(pin.id);
      window.setTimeout(() => setHighlightedPinId(null), 1800);
      showToast({
        tone: "success",
        title: "Spot added",
        detail:
          storageMode === "local"
            ? "Saved in this browser for local demo mode."
            : "Shared on the map.",
      });
    } catch (error) {
      showToast({
        tone: "error",
        title: "Could not add this spot",
        detail: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeletePin(pinId: string) {
    const pin = pins.find((candidate) => candidate.id === pinId);
    if (!pin) return;

    try {
      await deletePin(pinId, anonymousUserId);
      setPins((current) => current.filter((candidate) => candidate.id !== pinId));
      setSelectedPinId((current) => (current === pinId ? null : current));
      setHighlightedPinId((current) => (current === pinId ? null : current));
      showToast({
        tone: "success",
        title: "Spot deleted",
        detail: `${pin.placeName} was removed from the map.`,
      });
    } catch (error) {
      showToast({
        tone: "error",
        title: "Could not delete this spot",
        detail: error instanceof Error ? error.message : "Please try again.",
      });
    }
  }

  function chooseRandomSpot() {
    if (pins.length === 0) {
      showToast({
        tone: "info",
        title: "No spots yet",
        detail: "Add the first favorite place whenever you're ready.",
      });
      return;
    }

    const pin = pins[Math.floor(Math.random() * pins.length)];
    setSelectedPinId(null);
    window.setTimeout(() => setSelectedPinId(pin.id), 0);
    setHighlightedPinId(pin.id);
    window.setTimeout(() => setHighlightedPinId(null), 1800);
  }

  if (!mapboxToken) return <SetupScreen />;

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-neutral-950">
      <MapView
        token={mapboxToken}
        pins={pins}
        selectedPinId={selectedPinId}
        highlightedPinId={highlightedPinId}
        loadingPins={loadingPins}
        anonymousUserId={anonymousUserId}
        onMapClick={handleMapClick}
        onSelectPin={setSelectedPinId}
        onDeletePin={handleDeletePin}
      />

      <TopPanel
        totalPins={pins.length}
        storageMode={storageMode}
        loading={loadingPins}
        onRandomSpot={chooseRandomSpot}
      />

      {pendingLocation ? (
        <AddPinForm
          location={pendingLocation}
          submitting={submitting}
          onDismiss={() => setPendingLocation(null)}
          onSubmit={handleSubmit}
        />
      ) : null}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </main>
  );
}
