'use client';

// Bagan struktur organisasi. Diisolasi dari profile-tabs karena
// react-organizational-chart menyentuh `document` saat modul di-import,
// sehingga hanya boleh dimuat di client (dynamic import ssr:false).

import { Tree, TreeNode } from 'react-organizational-chart';
import { cn } from '@/lib/utils';
import {
  gayaTingkat,
  tingkatEfektif,
  GRADIEN_PIMPINAN,
  type OrgNode,
  type StrukturData,
} from '@/lib/struktur';

/** Satu kotak jabatan, gayanya mengikuti tingkat (pimpinan/kabid/staff). */
function OrgBox({ node, org }: { node: OrgNode; org: OrgNode[] }) {
  const hasNama = node.nama && node.nama !== '-';
  const g = gayaTingkat(tingkatEfektif(node, org));
  return (
    <div
      className={cn('rounded-xl border px-3.5 py-2.5 text-center w-[190px] shrink-0', g.box)}
      style={g.gradien ? { background: GRADIEN_PIMPINAN } : undefined}
    >
      <p className={cn('font-semibold text-xs leading-tight', g.jabatan)}>{node.jabatan}</p>
      {hasNama && <p className={cn('text-[0.68rem] mt-0.5', g.nama)}>{node.nama}</p>}
    </div>
  );
}

/** Node rekursif: satu jabatan + turunannya, dipetakan ke <TreeNode>. */
function OrgTreeNodes({
  nodes,
  org,
  childrenOf,
}: {
  nodes: OrgNode[];
  org: OrgNode[];
  childrenOf: (j: string) => OrgNode[];
}) {
  return (
    <>
      {nodes.map((n) => (
        <TreeNode
          key={n.jabatan}
          label={<div className="inline-flex"><OrgBox node={n} org={org} /></div>}
        >
          <OrgTreeNodes nodes={childrenOf(n.jabatan)} org={org} childrenOf={childrenOf} />
        </TreeNode>
      ))}
    </>
  );
}

export function StrukturChart({ data }: { data: StrukturData }) {
  // Mode gambar: satu gambar unggahan admin (dimensi tak diketahui → <img> polos).
  if (data?.mode === 'gambar' && data?.gambar) {
    return (
      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- bagan diunggah admin, dimensi tidak diketahui di sini */}
        <img
          src={data.gambar}
          alt="Bagan struktur organisasi"
          className="h-auto max-w-full rounded-xl border border-slate-200 shadow-sm dark:border-slate-700"
        />
      </div>
    );
  }

  const org: OrgNode[] = Array.isArray(data?.organisasi) ? data.organisasi : [];
  const childrenOf = (jab: string) => org.filter((o) => (o.parent ?? '') === jab);
  // Root = jabatan tanpa atasan (atau atasannya tidak ada di daftar).
  const roots = org.filter((o) => !o.parent || !org.some((x) => x.jabatan === o.parent));

  if (org.length === 0) {
    return <p className="text-sm text-slate-400 py-10 text-center">Struktur organisasi belum diisi.</p>;
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-max flex flex-col items-center gap-8 px-4">
        {roots.map((root) => (
          <Tree
            key={root.jabatan}
            lineWidth="1px"
            lineColor="rgba(202,138,4,0.25)"
            lineBorderRadius="8px"
            label={<div className="inline-flex"><OrgBox node={root} org={org} /></div>}
          >
            <OrgTreeNodes nodes={childrenOf(root.jabatan)} org={org} childrenOf={childrenOf} />
          </Tree>
        ))}
      </div>
    </div>
  );
}

export default StrukturChart;
