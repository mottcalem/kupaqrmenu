'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapPin, Search, Sparkles, X } from 'lucide-react';
import type { PopupSettings, PublicMenuItem, SiteSettings } from '@/lib/menu-repository';

const money = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });
type Category = { id: string; name: string; icon: string };

export function MenuClient({ categories, items, settings, popup }: { categories: Category[]; items: PublicMenuItem[]; settings: SiteSettings; popup: PopupSettings }) {
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    if (!popup.enabled) return;
    const timer = window.setTimeout(() => setPopupOpen(true), popup.delaySeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [popup.enabled, popup.delaySeconds]);
  useEffect(() => {
    if (!popupOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeWithEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setPopupOpen(false); };
    window.addEventListener('keydown', closeWithEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', closeWithEscape); };
  }, [popupOpen]);
  const results = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR');
    return items.filter((item) => (active === 'all' || item.categoryId === active) && (!query || `${item.name} ${item.description ?? ''} ${item.categoryName}`.toLocaleLowerCase('tr-TR').includes(query)));
  }, [active, search, items]);

  return <main className="min-h-screen bg-background pb-20 text-foreground">
    {popupOpen && <div className="popup-backdrop fixed inset-0 z-50 grid place-items-center bg-[#071713]/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.currentTarget === event.target) setPopupOpen(false); }}><section role="dialog" aria-modal="true" aria-label={popup.title || 'Duyuru'} className="popup-card relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[26px] bg-white p-2 shadow-2xl"><button onClick={() => setPopupOpen(false)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/60 bg-[#102a25]/85 text-white shadow-lg backdrop-blur" aria-label="Reklamı kapat"><X size={20}/></button>{popup.imageUrl && <img src={popup.imageUrl} alt={popup.title || 'Kupa Game Cafe duyurusu'} className="max-h-[65vh] w-full rounded-[20px] object-contain"/>}{(popup.title || popup.body || (popup.ctaLabel && popup.ctaUrl)) && <div className="px-4 pb-4 pt-5 text-center">{popup.title && <h2 className="font-serif text-2xl font-semibold text-[#17322b]">{popup.title}</h2>}{popup.body && <p className="mx-auto mt-2 max-w-md whitespace-pre-line text-sm leading-6 text-[#647a73]">{popup.body}</p>}{popup.ctaLabel && popup.ctaUrl && <a href={popup.ctaUrl} target="_blank" rel="noopener noreferrer" className="admin-primary mt-4">{popup.ctaLabel}</a>}</div>}</section></div>}
    <section className="hero relative overflow-hidden px-5 pb-7 pt-6 text-white"><div className="absolute inset-0 bg-[linear-gradient(110deg,#0d2823_10%,#0d2823e8_58%,#0d2823a8)]" /><div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[42px] border-[#38d29f]/10" /><div className="relative mx-auto max-w-4xl">
      <div className="mb-9 flex items-center"><div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/10 font-serif text-xl font-black backdrop-blur">{settings.brandName.charAt(0)}</div><div><p className="font-serif text-xl font-bold tracking-wide">{settings.brandName}</p><p className="text-[10px] uppercase tracking-[.28em] text-[#77e8bf]">{settings.brandSubtitle}</p></div></div></div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[.22em] text-[#77e8bf]">{settings.eyebrow}</p><h1 className="max-w-md font-serif text-4xl font-semibold leading-[1.08] sm:text-5xl">{settings.headline}</h1><p className="mt-3 max-w-md text-sm leading-6 text-white/65">{settings.description}</p>
      <label className="mt-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-[#52645f] shadow-xl shadow-black/15"><Search size={19} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Menüde ara..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7c8d88]" />{search && <button onClick={() => setSearch('')} aria-label="Aramayı temizle"><X size={17} /></button>}</label>
    </div></section>
    <nav aria-label="Menü kategorileri" className="sticky top-0 z-20 border-b border-[#dbe7e2] bg-[#f8fbf9]/95 py-3 backdrop-blur"><div className="no-scrollbar mx-auto flex max-w-4xl gap-2 overflow-x-auto px-5"><button onClick={() => setActive('all')} className={`category-chip ${active === 'all' ? 'category-chip-active' : ''}`}>Tümü</button>{categories.map((category) => <button key={category.id} onClick={() => setActive(category.id)} className={`category-chip ${active === category.id ? 'category-chip-active' : ''}`}><span aria-hidden>{category.icon}</span>{category.name}</button>)}</div></nav>
    <section className="mx-auto max-w-4xl px-5 pt-7"><div className="mb-5 flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#159875]">{active === 'all' ? 'Tüm menü' : categories.find((category) => category.id === active)?.name}</p><h2 className="mt-1 font-serif text-2xl font-semibold">{search ? `“${search}” sonuçları` : 'Afiyetle seç'}</h2></div><span className="whitespace-nowrap rounded-full bg-[#e6f7f0] px-3 py-1 text-xs font-bold text-[#117b60]">{results.length} ürün</span></div>
      {results.length ? <div className="grid gap-3 sm:grid-cols-2">{results.map((item) => <article key={item.id} className="menu-card group"><div className="flex min-w-0 flex-1 gap-3">{item.imageUrl ? <img src={item.imageUrl} alt="" className="h-14 w-14 shrink-0 rounded-2xl object-cover" /> : <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[radial-gradient(circle_at_top_right,#77e8bf_0,transparent_40%),linear-gradient(145deg,#eef8f4,#d8ede5)] text-2xl" aria-hidden>{item.icon}</div>}<div className="min-w-0"><div className="flex items-center gap-2"><h3 className="font-semibold leading-5">{item.name}</h3>{item.popular && <Sparkles size={14} className="shrink-0 text-[#e7a72f]" aria-label="Popüler" />}</div><p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{item.description ?? item.categoryName}</p></div></div><strong className={`self-center text-right text-sm ${item.price ? 'text-[#117b60]' : 'max-w-16 text-[10px] leading-3 text-[#82928d]'}`}>{item.price ? money.format(item.price) : 'Fiyat için sorunuz'}</strong></article>)}</div> : <div className="rounded-[24px] border border-dashed border-[#b7ccc4] bg-white p-9 text-center"><span className="text-4xl" aria-hidden>♣</span><h3 className="mt-3 font-serif text-xl font-semibold">Eşleşen ürün yok</h3><p className="mt-1 text-sm text-muted-foreground">Başka bir ürün veya kategori deneyebilirsin.</p><button onClick={() => { setActive('all'); setSearch(''); }} className="mt-4 rounded-full bg-[#153a31] px-4 py-2 text-sm font-bold text-white">Tüm menüyü göster</button></div>}
      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#dce7e2] bg-[#f0f7f4] px-4 py-4 text-sm text-[#39554d]"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#159875]"><MapPin size={17} /></span><div><strong className="block text-[#17322b]">{settings.brandName} {settings.brandSubtitle}</strong><span>{settings.venueNote}</span></div></div><p className="mt-5 text-center text-xs font-semibold tracking-wide text-[#73867f]">Fiyatlara KDV dahildir.</p><p className="mt-3 text-center text-xs text-[#8a9a95]"><a href="https://dijitalpanter.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#159875] hover:underline">Dijitalpanter tarafından geliştirilmiştir.</a></p>
    </section>
  </main>;
}
