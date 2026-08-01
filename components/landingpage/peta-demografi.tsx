'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2 } from 'lucide-react';
import {
  TIDORE_CENTER,
  TIDORE_ZOOM,
  geoForWilayah,
} from '@/lib/tidore-geo';

interface Row {
  kode: string;
  wilayah: string;
  data: Record<string, number>;
}

interface Marker {
  wilayah: string;
  lat: number;
  lng: number;
  penduduk: number;
  laki: number;
  perempuan: number;
}

const fmt = (n: number) => (n ?? 0).toLocaleString('id-ID');

export default function PetaDemografi() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/demografi?kategori=jenis-kelamin')
      .then((r) => r.json())
      .then((j) => !cancelled && setRows(j.data?.items ?? []))
      .catch(() => !cancelled && setRows([]))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const markers = useMemo<Marker[]>(() => {
    const out: Marker[] = [];
    for (const r of rows) {
      const geo = geoForWilayah(r.wilayah);
      if (!geo) continue;
      out.push({
        wilayah: r.wilayah,
        lat: geo.lat,
        lng: geo.lng,
        penduduk: r.data.JML ?? (r.data.L ?? 0) + (r.data.P ?? 0),
        laki: r.data.L ?? 0,
        perempuan: r.data.P ?? 0,
      });
    }
    return out;
  }, [rows]);

  const maxPop = Math.max(1, ...markers.map((m) => m.penduduk));
  const radiusOf = (pop: number) => 8 + 26 * Math.sqrt(pop / maxPop);

  if (loading) {
    return (
      <div className="flex h-[520px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative h-[520px] overflow-hidden rounded-2xl border border-slate-200 ring-1 ring-primary/10 z-0">
        <MapContainer
          center={TIDORE_CENTER}
          zoom={TIDORE_ZOOM}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((m) => (
            <CircleMarker
              key={m.wilayah}
              center={[m.lat, m.lng]}
              radius={radiusOf(m.penduduk)}
              pathOptions={{
                color: '#3a4b45',
                weight: 1.5,
                fillColor: '#495E57',
                fillOpacity: 0.45,
              }}
            >
              <Tooltip direction="top" offset={[0, -4]} opacity={1}>
                <span className="font-semibold">{m.wilayah}</span>: {fmt(m.penduduk)} jiwa
              </Tooltip>
              <Popup>
                <div className="min-w-40">
                  <p className="mb-1 text-sm font-bold text-slate-900">{m.wilayah}</p>
                  <table className="text-xs text-slate-600">
                    <tbody>
                      <tr>
                        <td className="pr-3">Jumlah Penduduk</td>
                        <td className="text-right font-semibold tabular-nums">{fmt(m.penduduk)}</td>
                      </tr>
                      <tr>
                        <td className="pr-3">Laki-laki</td>
                        <td className="text-right tabular-nums">{fmt(m.laki)}</td>
                      </tr>
                      <tr>
                        <td className="pr-3">Perempuan</td>
                        <td className="text-right tabular-nums">{fmt(m.perempuan)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {markers.length === 0 && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Belum ada data penduduk yang cocok dengan kecamatan Tidore Kepulauan. Import data
          <b> Jenis Kelamin</b> di dashboard (atau dari beranda) agar peta terisi.
        </p>
      )}
      <p className="text-xs text-slate-400">
        Ukuran lingkaran sebanding dengan jumlah penduduk. Posisi titik bersifat perkiraan.
      </p>
    </div>
  );
}
