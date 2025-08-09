"use client";
import { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import Button from "@/app/components/Button";
import { TypographyBody } from "@/app/components/Typography";
import { RxCross1 } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

type Place = {
  placeId: string;
  name?: string;
  address?: string;
  location?: google.maps.LatLngLiteral;
};

export default function FirmMap() {
  const [err, setErr] = useState<string | null>(null);
  const [place, setPlace] = useState<Place>({
    placeId: "ChIJf48-GkyfCEcRw2ZLwDluQ5s",
  });
  const [infoOpen, setInfoOpen] = useState(true);

  useEffect(() => {
    (window as any).gm_authFailure = () =>
      setErr("AuthFailure: zły klucz / restrykcje / billing.");
    const onError = (e: ErrorEvent) => {
      const m = String(e?.message || "").match(
        /Google Maps JavaScript API error: ([A-Za-z]+)/
      );
      if (m) setErr(m[1]);
    };
    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "gmap-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const fallbackCenter = useMemo(() => ({ lat: 51.64, lng: 15.137 }), []);

  useEffect(() => {
    if (!isLoaded || !place.placeId) return;
    const svc = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const req: google.maps.places.PlaceDetailsRequest = {
      placeId: place.placeId,
      fields: ["name", "formatted_address", "geometry", "place_id"],
    };
    svc.getDetails(req, (res, status) => {
      if (
        status !== google.maps.places.PlacesServiceStatus.OK ||
        !res?.geometry?.location
      ) {
        setErr(`Places error: ${status}`);
        return;
      }
      const loc = {
        lat: res.geometry.location.lat(),
        lng: res.geometry.location.lng(),
      };
      setPlace({
        placeId: res.place_id!,
        name: res.name ?? undefined,
        address: res.formatted_address ?? undefined,
        location: loc,
      });
    });
  }, [isLoaded, place.placeId]);

  if (err) return <ErrorBox msg={`❌ Google Maps error: ${err}`} />;
  if (loadError)
    return <ErrorBox msg={`❌ Loader error: ${loadError.message}`} />;
  if (!isLoaded) return <ErrorBox msg="Ładowanie mapy…" muted />;

  const center = place.location ?? fallbackCenter;

  const mapsPlaceUrl = `https://www.google.com/maps/place//data=!4m2!3m1!1s0x47089f4c1a3e8f7f:0x9b436e39c04b66c3?sa=X&ved=1t:8290&ictx=111`;
  const openInNew = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="w-full h-full">
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {place.location && (
          <Marker
            position={place.location}
            onClick={() => setInfoOpen(true)}
            icon={{
              url: "/images/icon.png",
              scaledSize: new google.maps.Size(48, 48), // rozmiar w px
              origin: new google.maps.Point(0, 0), // punkt początkowy w obrazie
              anchor: new google.maps.Point(20, 40), // punkt zakotwiczenia (środek dolnej krawędzi)
            }}
          />
        )}

        {place.location && infoOpen && (
          <OverlayView
            position={place.location}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -Math.round(width + 112),
              y: -Math.round(height + 212),
            })}
          >
            <div className="flex flex-col gap-4 w-56 bg-white shadow-lg rounded-xl p-4 text-sm">
              <div className="flex items-baseline justify-between">
                <div className="flex flex-col gap-1">
                  <TypographyBody className="text-gray-900 font-bold text-base">
                    {place.name}
                  </TypographyBody>
                  <TypographyBody className="text-sm">
                    {(() => {
                      const [first, rest] = place.address?.split(/,(.+)/) ?? [];
                      return (
                        <>
                          {first}
                          <br />
                          {rest}
                        </>
                      );
                    })()}
                  </TypographyBody>
                </div>
                <button
                  onClick={() => setInfoOpen(false)}
                  className=" cursor-pointer text-gray-700 hover:text-black text-lg"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              </div>
              <Button
                variant="outlineSecondary"
                onClick={() => openInNew(mapsPlaceUrl)}
                label="Otwórz w Mapach"
              />
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  );
}

function ErrorBox({ msg, muted }: { msg: string; muted?: boolean }) {
  return (
    <div className="w-full h-[500px] rounded-lg bg-gray-100 grid place-items-center">
      <div className={`text-sm ${muted ? "text-gray-500" : "text-red-600"}`}>
        {msg}
        <div className="text-xs opacity-60 mt-1">
          key prefix:{" "}
          {(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "").slice(0, 8)}
        </div>
      </div>
    </div>
  );
}
