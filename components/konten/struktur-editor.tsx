'use client';

import { useEffect, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ImagePickerField } from '@/components/media/image-picker-field';
import { refreshStaticContent } from '@/lib/use-static-content';
import { getStaticBlock } from '@/lib/static-content-registry';
import { cn } from '@/lib/utils';
import {
  gayaTingkat,
  tingkatEfektif,
  tingkatAnak,
  TINGKAT_OPSI,
  GRADIEN_PIMPINAN,
  type OrgNode,
  type Tingkat,
} from '@/lib/struktur';
import {
  Plus,
  Trash2,
  Check,
  X,
  Loader2,
  UserPlus,
  CornerLeftUp,
  Network,
  ImageIcon,
} from 'lucide-react';

const KUNCI = 'profil.struktur';

// ─── Model kerja editor ─────────────────────────────────────────────────────
// Data publik menyimpan {jabatan, nama, parent, tingkat} (parent = string
// jabatan atasan). Di editor kita pakai id transien supaya rename jabatan tidak
// memutus garis ke bawahannya; diserialisasi balik saat simpan.

interface Row {
  _id: string;
  jabatan: string;
  nama: string;
  parentId: string | null;
  tingkat: Tingkat;
}

let idSeq = 0;
const nextId = () => `n${Date.now().toString(36)}_${idSeq++}`;

function parse(organisasi: OrgNode[]): Row[] {
  const rows: Row[] = organisasi.map((o) => ({
    _id: nextId(),
    jabatan: String(o?.jabatan ?? ''),
    nama: String(o?.nama ?? ''),
    parentId: null,
    // Tebak tingkat dari data (isi apa adanya bila sudah ada, else dari kedalaman).
    tingkat: tingkatEfektif(o, organisasi),
  }));
  // Resolusi parent (string jabatan) → id baris pertama yang cocok.
  const jabatanToId = new Map<string, string>();
  organisasi.forEach((o, i) => {
    const j = String(o?.jabatan ?? '');
    if (j && !jabatanToId.has(j)) jabatanToId.set(j, rows[i]._id);
  });
  organisasi.forEach((o, i) => {
    const p = String(o?.parent ?? '');
    rows[i].parentId = p ? jabatanToId.get(p) ?? null : null;
  });
  return rows;
}

function serialize(rows: Row[]): OrgNode[] {
  const idToJabatan = new Map(rows.map((r) => [r._id, r.jabatan]));
  return rows.map((r) => ({
    jabatan: r.jabatan.trim() || 'Tanpa Nama',
    nama: r.nama.trim() || '-',
    parent: r.parentId ? idToJabatan.get(r.parentId) ?? '' : '',
    tingkat: r.tingkat,
  }));
}

// ─── Kotak jabatan di dalam editor ──────────────────────────────────────────

function EditorBox({
  row,
  selected,
  onSelect,
  onAddChild,
  onDelete,
}: {
  row: Row;
  selected: boolean;
  onSelect: () => void;
  onAddChild: () => void;
  onDelete: () => void;
}) {
  const hasNama = row.nama && row.nama !== '-';
  const g = gayaTingkat(row.tingkat);
  return (
    <div className="group relative inline-flex flex-col items-center">
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          'rounded-xl border px-3.5 py-2.5 text-center w-[190px] shrink-0 transition-all',
          g.box,
          selected && 'ring-2 ring-primary ring-offset-2',
        )}
        style={g.gradien ? { background: GRADIEN_PIMPINAN } : undefined}
      >
        <p className={cn('font-semibold text-xs leading-tight', g.jabatan)}>
          {row.jabatan || <span className="italic opacity-60">Jabatan…</span>}
        </p>
        {hasNama && <p className={cn('text-[0.68rem] mt-0.5', g.nama)}>{row.nama}</p>}
      </button>

      {/* Aksi cepat — muncul saat hover / terpilih */}
      <div
        className={cn(
          'absolute -top-2.5 right-1 flex gap-1 transition-opacity',
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
      >
        <button
          type="button"
          onClick={onAddChild}
          title="Tambah bawahan"
          className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          title="Hapus jabatan"
          className="w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center shadow hover:opacity-90"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Editor dialog ──────────────────────────────────────────────────────────

export function StrukturEditor({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const block = getStaticBlock(KUNCI);
  const [mode, setMode] = useState<'bagan' | 'gambar'>('bagan');
  const [gambar, setGambar] = useState('');
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setSelectedId(null);
    fetch(`/api/static-content?keys=${encodeURIComponent(KUNCI)}`)
      .then((r) => r.json())
      .then((j) => {
        const current = j.data?.items?.[KUNCI] ?? (block?.defaults as Record<string, unknown> | undefined);
        const org = Array.isArray(current?.organisasi)
          ? (current!.organisasi as OrgNode[])
          : ((block?.defaults as { organisasi?: OrgNode[] })?.organisasi ?? []);
        setMode(current?.mode === 'gambar' ? 'gambar' : 'bagan');
        setGambar(typeof current?.gambar === 'string' ? current.gambar : '');
        setRows(parse(org));
      })
      .catch(() => {
        setMode('bagan');
        setGambar('');
        setRows(parse((block?.defaults as { organisasi?: OrgNode[] })?.organisasi ?? []));
      })
      .finally(() => setLoading(false));
  }, [open, block]);

  const childrenOf = (id: string | null) => rows.filter((r) => r.parentId === id);
  const roots = childrenOf(null);
  const selected = rows.find((r) => r._id === selectedId) ?? null;

  const patch = (id: string, part: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r._id === id ? { ...r, ...part } : r)));

  const addChild = (parentId: string | null) => {
    const parent = parentId ? rows.find((r) => r._id === parentId) ?? null : null;
    const row: Row = {
      _id: nextId(),
      jabatan: '',
      nama: '-',
      parentId,
      tingkat: tingkatAnak(parent ? parent.tingkat : null),
    };
    setRows((rs) => [...rs, row]);
    setSelectedId(row._id);
  };

  // Hapus jabatan → bawahannya dinaikkan ke atasan jabatan tsb (tidak ikut hilang).
  const remove = (id: string) => {
    setRows((rs) => {
      const target = rs.find((r) => r._id === id);
      if (!target) return rs;
      return rs
        .filter((r) => r._id !== id)
        .map((r) => (r.parentId === id ? { ...r, parentId: target.parentId } : r));
    });
    setSelectedId((cur) => (cur === id ? null : cur));
  };

  const save = async () => {
    setSaving(true);
    // Selalu kirim ketiga field — supaya berganti mode tidak menghapus data
    // mode lain (mis. beralih ke Gambar tak menghilangkan bagan manual).
    const konten = {
      mode,
      gambar: gambar || '',
      organisasi: serialize(rows),
    };
    const res = await fetch('/api/admin/static-content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kunci: KUNCI, konten }),
    });
    const j = await res.json().catch(() => ({}));
    setSaving(false);
    if (j.error?.length) {
      toast.error(j.error[0]);
      return;
    }
    toast.success('Struktur organisasi diperbarui');
    refreshStaticContent();
    onOpenChange(false);
  };

  const renderNodes = (nodes: Row[]) => (
    <>
      {nodes.map((n) => (
        <TreeNode
          key={n._id}
          label={
            <div className="inline-flex">
              <EditorBox
                row={n}
                selected={selectedId === n._id}
                onSelect={() => setSelectedId(n._id)}
                onAddChild={() => addChild(n._id)}
                onDelete={() => remove(n._id)}
              />
            </div>
          }
        >
          {renderNodes(childrenOf(n._id))}
        </TreeNode>
      ))}
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Struktur Organisasi</DialogTitle>
          <DialogDescription>
            Pilih <b>Bagan Manual</b> untuk menyusun kotak jabatan sendiri (dengan warna per tingkat),
            atau <b>Gambar</b> untuk mengunggah satu bagan jadi.
          </DialogDescription>
        </DialogHeader>

        {/* Pemilih mode */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setMode('bagan')}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
                mode === 'bagan' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700',
              )}
            >
              <Network className="h-4 w-4" /> Bagan Manual
            </button>
            <button
              type="button"
              onClick={() => setMode('gambar')}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
                mode === 'gambar' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700',
              )}
            >
              <ImageIcon className="h-4 w-4" /> Gambar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : mode === 'gambar' ? (
          /* ── Mode gambar ── */
          <div className="flex-1 overflow-auto rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
            <div className="mx-auto max-w-xl space-y-3">
              <p className="text-sm text-slate-500">
                Unggah bagan struktur sebagai satu gambar (mis. hasil ekspor infografis). Gambar
                ditampilkan apa adanya di halaman publik.
              </p>
              <ImagePickerField
                label="Bagan Struktur"
                title="Pilih / Unggah Bagan Struktur"
                value={gambar}
                onChange={setGambar}
                className="aspect-[16/10] w-full"
              />
              <p className="text-xs text-slate-400">
                {gambar
                  ? 'Klik gambar untuk mengganti, atau hapus untuk kembali memakai bagan manual.'
                  : 'Belum ada gambar — bila dikosongkan, halaman memakai bagan manual di tab sebelah.'}
              </p>
            </div>
          </div>
        ) : (
          /* ── Mode bagan manual ── */
          <>
            {/* Kanvas bagan */}
            <div className="flex-1 overflow-auto rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
              {rows.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <p className="text-sm text-slate-400">Belum ada jabatan.</p>
                  <Button size="sm" onClick={() => addChild(null)}>
                    <Plus className="h-4 w-4 mr-1.5" /> Tambah Jabatan Puncak
                  </Button>
                </div>
              ) : (
                <div className="min-w-max flex flex-col items-center gap-10">
                  {roots.map((root) => (
                    <Tree
                      key={root._id}
                      lineWidth="1px"
                      lineColor="rgba(202,138,4,0.25)"
                      lineBorderRadius="8px"
                      label={
                        <div className="inline-flex">
                          <EditorBox
                            row={root}
                            selected={selectedId === root._id}
                            onSelect={() => setSelectedId(root._id)}
                            onAddChild={() => addChild(root._id)}
                            onDelete={() => remove(root._id)}
                          />
                        </div>
                      }
                    >
                      {renderNodes(childrenOf(root._id))}
                    </Tree>
                  ))}
                </div>
              )}
            </div>

            {/* Panel bawah: edit baris terpilih + tambah puncak */}
            <div className="mt-3 rounded-xl border border-slate-100 bg-white p-3">
              {selected ? (
                <div className="flex flex-wrap items-end gap-3">
                  <div className="min-w-[160px] flex-1 space-y-1.5">
                    <Label className="text-xs">Jabatan</Label>
                    <Input
                      autoFocus
                      value={selected.jabatan}
                      onChange={(e) => patch(selected._id, { jabatan: e.target.value })}
                      placeholder="mis. Kepala Dinas"
                    />
                  </div>
                  <div className="min-w-[160px] flex-1 space-y-1.5">
                    <Label className="text-xs">Nama Pejabat</Label>
                    <Input
                      value={selected.nama === '-' ? '' : selected.nama}
                      onChange={(e) => patch(selected._id, { nama: e.target.value })}
                      placeholder="mis. Budi Santoso"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Tingkat</Label>
                    <div className="flex rounded-lg border border-slate-200 p-0.5">
                      {TINGKAT_OPSI.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => patch(selected._id, { tingkat: opt.value })}
                          className={cn(
                            'rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
                            selected.tingkat === opt.value
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-slate-500 hover:bg-slate-100',
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addChild(selected._id)}
                    title="Tambah bawahan"
                  >
                    <UserPlus className="h-4 w-4 mr-1.5" /> Bawahan
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => remove(selected._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-1 items-center gap-2 text-sm text-slate-400">
                  <CornerLeftUp className="h-4 w-4" />
                  Pilih kotak di bagan untuk mengedit, atau tombol
                  <Plus className="inline h-3.5 w-3.5" /> pada kotak untuk menambah bawahan.
                </div>
              )}
            </div>
          </>
        )}

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            <X className="h-4 w-4 mr-1.5" /> Batal
          </Button>
          <Button onClick={save} disabled={saving || loading}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-1.5" />}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
