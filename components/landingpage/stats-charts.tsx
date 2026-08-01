'use client';

/**
 * Grafik Highcharts untuk kartu "Total Pelayanan" di beranda:
 *  - TrenChart      : kolom tren permohonan 6 bulan (bulan terakhir disorot kuning)
 *  - TopLayananChart: bar horizontal layanan terpopuler (data label = jumlah)
 *
 * Dimuat via next/dynamic({ ssr:false }) dari stats.tsx → aman dari `window`
 * saat SSR dan tidak membebani bundle awal.
 */

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

if (typeof Highcharts === 'object') {
  Highcharts.setOptions({ lang: { thousandsSep: '.', decimalPoint: ',' } });
}

const FONT =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

// Palet DAGA
const TEAL = '#495E57';
const YELLOW = '#F4CE14';
const CHARCOAL = '#45474B';
const MUTED = '#94a3b8';

const base: Highcharts.Options = {
  credits: { enabled: false },
  title: { text: undefined },
  accessibility: { enabled: false },
  legend: { enabled: false },
  chart: {
    backgroundColor: 'transparent',
    style: { fontFamily: FONT },
    spacing: [6, 2, 2, 2],
  },
  tooltip: {
    backgroundColor: CHARCOAL,
    borderWidth: 0,
    borderRadius: 8,
    shadow: false,
    style: { color: '#ffffff', fontSize: '12px' },
    useHTML: true,
  },
};

export function TrenChart({ data }: { data: { label: string; count: number }[] }) {
  const last = data.length - 1;
  const options: Highcharts.Options = {
    ...base,
    chart: { ...base.chart, type: 'column', height: 134 },
    xAxis: {
      categories: data.map((d) => d.label),
      lineColor: '#e2e6e9',
      tickLength: 0,
      labels: { style: { color: MUTED, fontSize: '10px', fontWeight: '600' } },
    },
    yAxis: {
      min: 0,
      title: { text: undefined },
      gridLineColor: '#eef1f3',
      gridLineDashStyle: 'Dash',
      labels: { enabled: false },
    },
    plotOptions: {
      column: {
        borderRadius: 5,
        borderWidth: 0,
        pointPadding: 0.06,
        groupPadding: 0.14,
        states: { hover: { brightness: -0.06 } },
      },
    },
    tooltip: { ...base.tooltip, pointFormat: '<b>{point.y}</b> permohonan' },
    series: [
      {
        type: 'column',
        name: 'Permohonan',
        data: data.map((d, i) => ({ y: d.count, color: i === last ? YELLOW : TEAL })),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export function TopLayananChart({ data }: { data: { nama: string; count: number }[] }) {
  const options: Highcharts.Options = {
    ...base,
    chart: { ...base.chart, type: 'bar', height: Math.max(132, data.length * 38 + 10) },
    xAxis: {
      categories: data.map((d) => d.nama),
      lineWidth: 0,
      tickLength: 0,
      labels: {
        style: {
          color: CHARCOAL,
          fontSize: '11px',
          // Highcharts mengetikkan width label sumbu sebagai ANGKA piksel;
          // '150px' membuat tsc gagal walau di runtime terlihat baik.
          width: 150,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
    },
    yAxis: {
      min: 0,
      title: { text: undefined },
      gridLineWidth: 0,
      labels: { enabled: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderWidth: 0,
        pointWidth: 10,
        color: YELLOW,
        dataLabels: {
          enabled: true,
          style: {
            color: CHARCOAL,
            fontSize: '11px',
            fontWeight: '700',
            textOutline: 'none',
          },
          format: '{point.y}',
        },
      },
    },
    tooltip: {
      ...base.tooltip,
      headerFormat: '',
      pointFormat: '{point.category}: <b>{point.y}</b>',
    },
    series: [{ type: 'bar', name: 'Permohonan', data: data.map((d) => d.count) }],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
