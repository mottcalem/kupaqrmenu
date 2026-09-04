export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  popular?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  { id: 'tostlar', name: 'Tostlar', icon: '🥪', items: [
    { id: 'kasarli-tost', name: 'Kaşarlı Tost', price: 170, popular: true },
    { id: 'sucuklu-tost', name: 'Sucuklu Tost', price: 180 },
    { id: 'karisik-tost', name: 'Karışık Tost', description: 'Kaşar ve sucuk', price: 210, popular: true },
    { id: 'bazlama-tost', name: 'Bazlama Tost' },
    { id: 'sosisli', name: 'Sosisli' },
  ]},
  { id: 'hamburger', name: 'Hamburger', icon: '🍔', items: [
    { id: 'chicken-burger', name: 'Chicken Burger', description: '200 gr tavuk eti', popular: true },
    { id: 'klasik-burger', name: 'Klasik Burger', description: '150 gr köfte' },
    { id: 'soguk-sandwich', name: 'Soğuk Sandwich' },
  ]},
  { id: 'tabaklar', name: 'Tabaklar', icon: '🍟', items: [
    { id: 'patates-tabagi', name: 'Patates Tabağı', price: 200, popular: true },
    { id: 'mix-tabagi', name: 'Mix Tabağı', description: 'Patates, soğan halkası ve sosis', price: 300 },
    { id: 'citir-tavuklu', name: 'Çıtır Tavuklu', description: 'Patates ve çıtır tavuk' },
    { id: 'kupa-tabak', name: 'Kupa Tabak', description: 'Patates, soğan halkası, çıtır tavuk, sosis ve sigara böreği' },
  ]},
  { id: 'gozlemeler', name: 'Gözlemeler', icon: '🫓', items: [
    { id: 'kasarli-gozleme', name: 'Kaşarlı Gözleme' }, { id: 'patatesli-gozleme', name: 'Patatesli Gözleme' },
    { id: 'karisik-gozleme', name: 'Karışık Gözleme', description: 'Patates ve kaşar' }, { id: 'peynirli-gozleme', name: 'Peynirli Gözleme' },
  ]},
  { id: 'tatlilar', name: 'Tatlılar', icon: '🍰', items: [
    { id: 'magnolia', name: 'Magnolia' }, { id: 'spangle', name: 'Spangle' }, { id: 'sutlac', name: 'Sütlaç' },
    { id: 'tiramisu', name: 'Tiramisu' }, { id: 'cheesecake', name: 'Cheesecake', description: 'Limonlu veya frambuazlı', popular: true },
    { id: 'fistik-ruyasi', name: 'Fıstık Rüyası' }, { id: 'trilice', name: 'Triliçe', description: 'Karamelli veya frambuazlı' },
    { id: 'mono-latte', name: 'Mono Latte' }, { id: 'suffle', name: 'Sufle' }, { id: 'san-sebastian', name: 'San Sebastian' },
  ]},
  { id: 'patso-menu', name: 'Patso Menü', icon: '🌭', items: [
    { id: 'sade-patso', name: 'Sade Patso', price: 250 }, { id: 'sosisli-patso', name: 'Sosisli Patso', price: 270 },
    { id: 'kasarli-patso', name: 'Kaşarlı Patso', price: 260 }, { id: 'karisik-patso', name: 'Karışık Patso', description: 'Patates, kaşar ve sosis', price: 280, popular: true },
  ]},
  { id: 'soguk-kahveler', name: 'Soğuk Kahveler', icon: '🧊', items: [
    { id: 'ice-americano', name: 'Ice Americano', price: 140 }, { id: 'ice-latte', name: 'Ice Latte', price: 160 },
    { id: 'ice-caramel-latte', name: 'Ice Caramel Latte', price: 180 }, { id: 'ice-mocha', name: 'Ice Mocha', price: 180 },
    { id: 'ice-white-mocha', name: 'Ice White Mocha', price: 180 },
  ]},
  { id: 'dunya-kahveleri', name: 'Dünya Kahveleri', icon: '☕', items: [
    { id: 'espresso', name: 'Espresso', price: 120 }, { id: 'espresso-double', name: 'Espresso Double', price: 170 },
    { id: 'macchiato', name: 'Macchiato', price: 150 }, { id: 'caramel-macchiato', name: 'Caramel Macchiato', price: 170 },
    { id: 'cappuccino', name: 'Cappuccino', price: 170 }, { id: 'americano', name: 'Americano', price: 150 },
    { id: 'latte', name: 'Latte', price: 170, popular: true }, { id: 'mocha', name: 'Mocha', price: 170 }, { id: 'white-mocha', name: 'White Mocha', price: 170 },
  ]},
  { id: 'nescafeler', name: 'Klasik Nescafeler', icon: '🥄', items: [
    { id: 'sade-nescafe', name: 'Sade Nescafe', price: 100 }, { id: 'sutlu-nescafe', name: 'Sütlü Nescafe', price: 120 }, { id: 'filtre', name: 'Filtre Kahve', price: 120 },
  ]},
  { id: 'geleneksel', name: 'Geleneksel Kahveler', icon: '🫖', items: [
    { id: 'turk-kahvesi', name: 'Türk Kahvesi', price: 100 }, { id: 'dibek-kahvesi', name: 'Dibek Kahvesi', price: 120 }, { id: 'menengic-kahvesi', name: 'Menengiç Kahvesi', price: 120 },
  ]},
  { id: 'soguk-icecekler', name: 'Soğuk İçecekler', icon: '🥤', items: [
    { id: 'milkshake', name: 'Milkshake', description: 'Çilek, karamel, orman meyveli, fındık, vanilya, beyaz çikolata veya frambuaz' },
    { id: 'frappe', name: 'Frappe', description: 'Çilek, karamel, orman meyveli, fındık, vanilya, beyaz çikolata veya frambuaz' },
    { id: 'frozen', name: 'Frozen', description: 'Çilek, karamel, orman meyveli, fındık, vanilya, beyaz çikolata veya frambuaz' },
    { id: 'limonata', name: 'Limonata', price: 90 }, { id: 'aromali-limonata', name: 'Aromalı Limonata' },
    { id: 'enerji-icecegi', name: 'Enerji İçeceği', price: 150 }, { id: 'cola', name: 'Coca-Cola', price: 100 },
    { id: 'sprite', name: 'Sprite', price: 100 }, { id: 'fanta', name: 'Fanta', price: 100 }, { id: 'churchill', name: 'Churchill', price: 120 },
    { id: 'sade-soda', name: 'Sade Soda', price: 50 }, { id: 'meyveli-soda', name: 'Meyveli Soda', description: 'Limon, elma, nar, kivi veya karpuz-çilek', price: 70 },
    { id: 'meyve-suyu', name: 'Meyve Suyu', description: 'Şeftali, kayısı, vişne, karışık veya ballı karışık', price: 100 },
    { id: 'soguk-cay', name: 'Soğuk Çaylar', description: 'Mango, ananas, limon, karpuz veya şeftali', price: 100 },
    { id: 'ayran', name: 'Ayran', price: 50 }, { id: 'su', name: 'Su', price: 30 },
  ]},
  { id: 'sicak-icecekler', name: 'Sıcak İçecekler', icon: '♨️', items: [
    { id: 'cay', name: 'Çay', price: 35 }, { id: 'fincan-cay', name: 'Fincan Çay', price: 60 },
    { id: 'meyveli-caylar', name: 'Meyveli Çaylar', description: 'Çilek, karadut, oralet, muz, kivi, kuşburnu, elma, kakao veya nane-limon', price: 40 },
    { id: 'bitki-caylari', name: 'Bitki Çayları', description: 'Ihlamur, yeşil çay, ada çayı veya kış çayı', price: 110 },
  ]},
  { id: 'milk-bar', name: 'Milk Bar', icon: '🥛', items: [
    { id: 'balli-sut', name: 'Ballı Süt', price: 100 }, { id: 'sicak-cikolata', name: 'Sıcak Çikolata', price: 150 }, { id: 'salep', name: 'Salep', price: 150 },
  ]},
  { id: 'nargile', name: 'Nargile', icon: '💨', items: [
    { id: 'nargile', name: 'Nargile', description: 'Adalya, Pismis, Şeftali, Love 66, İzmir Romantik, Dominik Melon, Cappuccino, Yaban Mersini, Elma, Delavü veya Mango', price: 500 },
    { id: 'nargile-menu', name: 'Nargile Menü', description: 'Nargile, karışık çerez ve 4 çay' },
  ]},
  { id: 'cerezler', name: 'Çerezler', icon: '🥜', items: [
    { id: 'cips-tabagi', name: 'Cips Tabağı', price: 180 }, { id: 'antep-fistigi', name: 'Antep Fıstığı' },
    { id: 'karisik-cerez', name: 'Karışık Çerez' }, { id: 'lux-cerez', name: 'Lüks Karışık Çerez' }, { id: 'misir-tabagi', name: 'Mısır Tabağı' },
  ]},
];

export const allMenuItems = menuCategories.flatMap((category) => category.items.map((item) => ({ ...item, categoryId: category.id, categoryName: category.name, icon: category.icon })));
