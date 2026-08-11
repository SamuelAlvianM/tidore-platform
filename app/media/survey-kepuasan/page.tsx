import { redirect } from 'next/navigation';

/**
 * Alamat warisan portal lama. Rumah resmi survei sekarang `/survei-kepuasan`
 * (formulir internal, jawabannya masuk rekap SKM & IKM di dashboard).
 * Redirect dipertahankan supaya tautan & bookmark lama tidak mati.
 */
export default function SurveyKepuasanPage() {
  redirect('/survei-kepuasan');
}
