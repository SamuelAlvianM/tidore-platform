'use client';

import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

/**
 * Grafik statistik dashboard berbasis Highcharts.
 *
 * Halaman dashboard adalah Server Component; komponen ini ('use client')
 * menerima data yang sudah diagregasi lewat props dan menggambarnya di sisi
 * klien. Semua grafik interaktif — arahkan kursor ke titik/batang untuk melihat
 * nilai persisnya lewat tooltip.
 */

// Pemisah ribuan gaya Indonesia (1.234) untuk seluruh grafik.
if (typeof Highcharts === 'object') {
  Highcharts.setOptions({
    lang: { thousandsSep: '.', decimalPoint: ',' },
  });
}

const FONT =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

/** Opsi dasar yang dipakai semua grafik (tanpa kredit, font mengikuti tema). */
const dasar: Highcharts.Options = {
  credits: { enabled: false },
  title: { text: undefined },
  accessibility: { enabled: false },
  chart: {
    backgroundColor: 'transparent',
    style: { fontFamily: FONT },
    spacing: [8, 4, 6, 4],
  },
  tooltip: {
    backgroundColor: '#0f172a',
    borderWidth: 0,
    borderRadius: 8,
    shadow: false,
    style: { color: '#f8fafc', fontSize: '12px' },
    useHTML: true,
  },
};

/**
 * Highcharts menyentuh `window` saat menggambar, jadi grafik hanya dirender
 * setelah komponen terpasang di klien. Sebelum itu tampilkan kotak kosong
 * setinggi grafik supaya tata letak tidak melompat.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function Rangka({ tinggi }: { tinggi: number }) {
  return <div style={{ height: tinggi }} className="w-full animate-pulse rounded-lg bg-slate-100/60" />;
}

interface Kategori {
  label: string;
  value: number;
  color: string;
}

/** Progress permohonan per status — donat komposisi. */
export function ProgressPermohonanChart({ data }: { data: Kategori[] }) {
  const mounted = useMounted();
  const tinggi = 210;
  if (!mounted) return <Rangka tinggi={tinggi} />;

  const options: Highcharts.Options = {
    ...dasar,
    chart: { ...dasar.chart, type: 'pie', height: tinggi },
    plotOptions: {
      pie: {
        innerSize: '62%',
        borderWidth: 2,
        borderColor: '#ffffff',
        dataLabels: { enabled: false },
        showInLegend: true,
      },
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: { fontSize: '11px', fontWeight: '500', color: '#475569' },
      symbolRadius: 6,
    },
    tooltip: {
      ...dasar.tooltip,
      pointFormat:
        '<b>{point.y}</b> permohonan (<b>{point.percentage:.0f}%</b>)',
      headerFormat: '<span style="font-weight:600">{point.key}</span><br/>',
    },
    series: [
      {
        type: 'pie',
        name: 'Permohonan',
        data: data.map((d) => ({ name: d.label, y: d.value, color: d.color })),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

interface TitikLabel {
  label: string;
  count: number;
}

/** Tren permohonan 6 bulan — kolom, bulan berjalan ditonjolkan. */
export function TrenBulananChart({ data }: { data: TitikLabel[] }) {
  const mounted = useMounted();
  const tinggi = 200;
  if (!mounted) return <Rangka tinggi={tinggi} />;

  const options: Highcharts.Options = {
    ...dasar,
    chart: { ...dasar.chart, type: 'column', height: tinggi },
    xAxis: {
      categories: data.map((d) => d.label),
      lineColor: '#e2e8f0',
      labels: { style: { color: '#64748b', fontSize: '11px' } },
      tickWidth: 0,
    },
    yAxis: {
      title: { text: undefined },
      gridLineColor: '#eef2f6',
      labels: { style: { color: '#94a3b8', fontSize: '10px' } },
      allowDecimals: false,
    },
    tooltip: {
      ...dasar.tooltip,
      headerFormat: '<span style="font-weight:600">{point.key}</span><br/>',
      pointFormat: '<b>{point.y}</b> permohonan',
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        pointPadding: 0.08,
        groupPadding: 0.12,
      },
    },
    series: [
      {
        type: 'column',
        name: 'Permohonan',
        // Bulan terakhir (berjalan) pakai warna lebih pekat.
        data: data.map((d, i) => ({
          y: d.count,
          color: i === data.length - 1 ? '#3a4b45' : '#495E57',
        })),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

interface Layanan {
  nama: string;
  count: number;
}

/** Layanan terpopuler — batang horizontal. */
export function LayananPopulerChart({ data }: { data: Layanan[] }) {
  const mounted = useMounted();
  const tinggi = Math.max(160, data.length * 40);
  if (!mounted) return <Rangka tinggi={tinggi} />;

  const options: Highcharts.Options = {
    ...dasar,
    chart: { ...dasar.chart, type: 'bar', height: tinggi },
    xAxis: {
      categories: data.map((d) => d.nama),
      lineWidth: 0,
      labels: { style: { color: '#475569', fontSize: '11px' } },
    },
    yAxis: {
      title: { text: undefined },
      gridLineColor: '#eef2f6',
      labels: { enabled: false },
      allowDecimals: false,
    },
    tooltip: {
      ...dasar.tooltip,
      headerFormat: '<span style="font-weight:600">{point.key}</span><br/>',
      pointFormat: '<b>{point.y}</b> permohonan',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        color: '#d9b400',
        dataLabels: {
          enabled: true,
          style: { fontSize: '11px', fontWeight: '700', color: '#334155', textOutline: 'none' },
        },
      },
    },
    series: [
      { type: 'bar', name: 'Permohonan', data: data.map((d) => d.count) },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

/** Permohonan per tanggal (30 hari) — area mulus + garis rata-rata. */
export function PermohonanHarianChart({
  data,
  rataRata,
}: {
  data: TitikLabel[];
  rataRata: number;
}) {
  const mounted = useMounted();
  const tinggi = 220;
  if (!mounted) return <Rangka tinggi={tinggi} />;

  const options: Highcharts.Options = {
    ...dasar,
    chart: { ...dasar.chart, type: 'areaspline', height: tinggi },
    xAxis: {
      categories: data.map((d) => d.label),
      lineColor: '#e2e8f0',
      tickWidth: 0,
      // Label padat (30 hari) → tampilkan tiap 5 hari saja.
      labels: {
        step: 5,
        style: { color: '#94a3b8', fontSize: '10px' },
      },
      crosshair: { color: '#495E57', dashStyle: 'Dash', width: 1 },
    },
    yAxis: {
      title: { text: undefined },
      gridLineColor: '#eef2f6',
      labels: { style: { color: '#94a3b8', fontSize: '10px' } },
      allowDecimals: false,
      plotLines: [
        {
          value: rataRata,
          color: '#495E57',
          dashStyle: 'Dash',
          width: 1,
          zIndex: 3,
          label: {
            text: `rata² ${rataRata.toFixed(1)}`,
            align: 'right',
            style: { color: '#d9b400', fontSize: '10px', fontWeight: '600' },
          },
        },
      ],
    },
    tooltip: {
      ...dasar.tooltip,
      headerFormat: '<span style="font-weight:600">{point.key}</span><br/>',
      pointFormat: '<b>{point.y}</b> permohonan',
    },
    plotOptions: {
      areaspline: {
        color: '#d9b400',
        lineWidth: 2.25,
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(202,138,4,0.28)'],
            [1, 'rgba(202,138,4,0)'],
          ],
        },
        marker: { enabled: false, symbol: 'circle', radius: 3 },
        states: { hover: { lineWidth: 2.25 } },
      },
    },
    series: [
      { type: 'areaspline', name: 'Permohonan', data: data.map((d) => d.count) },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
