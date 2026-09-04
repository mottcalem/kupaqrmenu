'use client';

import { useMemo, useState } from 'react';
import { MapPin, Search, Sparkles, X } from 'lucide-react';
import { allMenuItems, menuCategories } from '@/data/menu';

const money = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });

export function MenuClient() {
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('tr-TR');
    return allMenuItems.filter((item) => (active === 'all' || item.categoryId === active) && (!normalized || `${item.name} ${item.description ?? ''} ${item.categoryName}`.toLocaleLowerCase('tr-TR').includes(normalized)));
  }, [active, query]);

  return (
    <main className="min-h-screen bg-background pb-20 text-foreground">
      <section className="hero relative overflow-hidden px-5 pb-7 pt-6 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#0d2823_10%,#0d2823e8_58%,#0d2823a8)]" />
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[42px] border-[#38d29f]/10" />
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-9 flex items-center">
            <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/10 font-serif text-xl font-black backdrop-blur">K</div><div><p className="font-serif text-xl font-bold tracking-wide">KUPA</p><p className="text-[10px] uppercase tracking-[.28em] text-[#77e8bf]">Game Cafe</p></div></div>
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.22em] text-[#77e8bf]">Mola ver, lezzeti seç</p>
          <h1 className="max-w-md font-serif text-4xl font-semibold leading-[1.08] sm:text-5xl">Masadaki en iyi hamle.</h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/65">Kahveden atıştırmalığa, aradığın her şey bir dokunuş uzağında.</p>
          <label className="mt-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-[#52645f] shadow-xl shadow-black/15"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Menüde ara..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7c8d88]" />{query && <button onClick={() => setQuery('')} aria-label="Aramayı temizle"><X size={17} /></button>}</label>
        </div>
      </section>

      <nav aria-label="Menü kategorileri" className="sticky top-0 z-20 border-b border-[#dbe7e2] bg-[#f8fbf9]/95 py-3 backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-4xl gap-2 overflow-x-auto px-5">
          <button onClick={() => setActive('all')} className={`category-chip ${active === 'all' ? 'category-chip-active' : ''}`}>Tümü</button>
          {menuCategories.map((category) => <button key={category.id} onClick={() => setActive(category.id)} className={`category-chip ${active === category.id ? 'category-chip-active' : ''}`}><span aria-hidden>{category.icon}</span>{category.name}</button>)}
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-5 pt-7">
        <div className="mb-5 flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#159875]">{active === 'all' ? 'Tüm menü' : menuCategories.find((category) => category.id === active)?.name}</p><h2 className="mt-1 font-serif text-2xl font-semibold">{query ? `“${query}” sonuçları` : 'Afiyetle seç'}</h2></div><span className="whitespace-nowrap rounded-full bg-[#e6f7f0] px-3 py-1 text-xs font-bold text-[#117b60]">{results.length} ürün</span></div>
        {results.length ? <div className="grid gap-3 sm:grid-cols-2">
          {results.map((item) => <article key={item.id} className="menu-card group"><div className="flex min-w-0 flex-1 gap-3"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[radial-gradient(circle_at_top_right,#77e8bf_0,transparent_40%),linear-gradient(145deg,#eef8f4,#d8ede5)] text-2xl" aria-hidden>{item.icon}</div><div className="min-w-0"><div className="flex items-center gap-2"><h3 className="font-semibold leading-5">{item.name}</h3>{item.popular && <Sparkles size={14} className="shrink-0 text-[#e7a72f]" aria-label="Popüler" />}</div><p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{item.description ?? item.categoryName}</p></div></div><strong className={`self-center text-right text-sm ${item.price ? 'text-[#117b60]' : 'max-w-16 text-[10px] leading-3 text-[#82928d]'}`}>{item.price ? money.format(item.price) : 'Fiyat için sorunuz'}</strong></article>)}
        </div> : <div className="rounded-[24px] border border-dashed border-[#b7ccc4] bg-white p-9 text-center"><span className="text-4xl" aria-hidden>♣</span><h3 className="mt-3 font-serif text-xl font-semibold">Eşleşen ürün yok</h3><p className="mt-1 text-sm text-muted-foreground">Başka bir ürün veya kategori deneyebilirsin.</p><button onClick={() => { setActive('all'); setQuery(''); }} className="mt-4 rounded-full bg-[#153a31] px-4 py-2 text-sm font-bold text-white">Tüm menüyü göster</button></div>}
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#dce7e2] bg-[#f0f7f4] px-4 py-4 text-sm text-[#39554d]"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#159875]"><MapPin size={17} /></span><div><strong className="block text-[#17322b]">Kupa Game Cafe</strong><span>Siparişini garsonumuza iletebilirsin. Afiyet olsun!</span></div></div>
        <p className="mt-5 text-center text-xs font-semibold tracking-wide text-[#73867f]">Fiyatlara KDV dahildir.</p>
      </section>
    </main>
  );
}
