// ===== Book Data =====
const BOOKS = {
    recommended: [
        { title: "思考の整理学", author: "外山滋比古", price: 572, genre: "エッセイ", rating: 4.5, stock: "in", cover: "linear-gradient(135deg, #1e3a5f, #4a90d9)", initial: "思" },
        { title: "コンビニ人間", author: "村田沙耶香", price: 650, genre: "文学・小説", rating: 4.3, stock: "in", cover: "linear-gradient(135deg, #e8927c, #f4c542)", initial: "コ" },
        { title: "ファクトフルネス", author: "ハンス・ロスリング", price: 1980, originalPrice: 2420, genre: "ビジネス", rating: 4.6, stock: "in", cover: "linear-gradient(135deg, #2d6a4f, #52b788)", initial: "F", sale: 18 },
        { title: "嫌われる勇気", author: "岸見一郎・古賀史健", price: 1650, genre: "自己啓発", rating: 4.7, stock: "in", cover: "linear-gradient(135deg, #7b2cbf, #c77dff)", initial: "嫌" },
        { title: "サピエンス全史 上", author: "ユヴァル・ノア・ハラリ", price: 2090, genre: "サイエンス", rating: 4.4, stock: "low", cover: "linear-gradient(135deg, #bc4749, #f08080)", initial: "S" },
        { title: "人を動かす", author: "D・カーネギー", price: 1650, genre: "ビジネス", rating: 4.5, stock: "in", cover: "linear-gradient(135deg, #264653, #2a9d8f)", initial: "人" },
        { title: "火花", author: "又吉直樹", price: 550, genre: "文学・小説", rating: 4.0, stock: "in", cover: "linear-gradient(135deg, #e76f51, #f4a261)", initial: "火" },
        { title: "ノルウェイの森", author: "村上春樹", price: 780, genre: "文学・小説", rating: 4.2, stock: "in", cover: "linear-gradient(135deg, #023047, #219ebc)", initial: "ノ" },
        { title: "21 Lessons", author: "ユヴァル・ノア・ハラリ", price: 2200, originalPrice: 2640, genre: "サイエンス", rating: 4.3, stock: "in", cover: "linear-gradient(135deg, #3d348b, #7678ed)", initial: "21", sale: 17 },
        { title: "夜と霧", author: "ヴィクトール・フランクル", price: 1650, genre: "エッセイ", rating: 4.8, stock: "in", cover: "linear-gradient(135deg, #1d3557, #457b9d)", initial: "夜" },
        { title: "銃・病原菌・鉄 上", author: "ジャレド・ダイアモンド", price: 1100, genre: "サイエンス", rating: 4.4, stock: "in", cover: "linear-gradient(135deg, #6b705c, #a5a58d)", initial: "銃" },
        { title: "LIFE SHIFT", author: "リンダ・グラットン", price: 1980, genre: "ビジネス", rating: 4.1, stock: "low", cover: "linear-gradient(135deg, #ff6d00, #ff9e00)", initial: "L" }
    ],
    new: [
        { title: "街とその不確かな壁", author: "村上春樹", price: 2970, genre: "文学・小説", rating: 4.1, stock: "in", cover: "linear-gradient(135deg, #4a4e69, #9a8c98)", initial: "街", isNew: true },
        { title: "AIの未来と人類", author: "松尾豊", price: 1760, genre: "テクノロジー・IT", rating: 4.2, stock: "in", cover: "linear-gradient(135deg, #0077b6, #00b4d8)", initial: "AI", isNew: true },
        { title: "成瀬は天下を取りにいく", author: "宮島未奈", price: 1650, genre: "文学・小説", rating: 4.5, stock: "in", cover: "linear-gradient(135deg, #ff477e, #ff7096)", initial: "成", isNew: true },
        { title: "生成AIで世界はこう変わる", author: "今井翔太", price: 1100, genre: "テクノロジー・IT", rating: 4.0, stock: "in", cover: "linear-gradient(135deg, #38b000, #70e000)", initial: "生", isNew: true },
        { title: "黄色い家", author: "川上未映子", price: 2035, genre: "文学・小説", rating: 4.3, stock: "low", cover: "linear-gradient(135deg, #e9c46a, #f4a261)", initial: "黄", isNew: true },
        { title: "教養としてのAI講義", author: "メラニー・ミッチェル", price: 2640, genre: "テクノロジー・IT", rating: 4.4, stock: "in", cover: "linear-gradient(135deg, #6930c3, #5390d9)", initial: "教", isNew: true },
        { title: "ハンチバック", author: "市川沙央", price: 1540, genre: "文学・小説", rating: 4.2, stock: "in", cover: "linear-gradient(135deg, #780000, #c1121f)", initial: "ハ", isNew: true },
        { title: "可燃物", author: "米澤穂信", price: 1760, genre: "文学・小説", rating: 4.1, stock: "in", cover: "linear-gradient(135deg, #3c096c, #7b2cbf)", initial: "可", isNew: true },
        { title: "Web3の教科書", author: "のぶめい", price: 1980, genre: "テクノロジー・IT", rating: 3.9, stock: "in", cover: "linear-gradient(135deg, #00296b, #003f88)", initial: "W", isNew: true },
        { title: "存在のすべてを", author: "塩田武士", price: 1980, genre: "文学・小説", rating: 4.0, stock: "in", cover: "linear-gradient(135deg, #495057, #adb5bd)", initial: "存", isNew: true }
    ],
    sale: [
        { title: "独学大全", author: "読書猿", price: 1980, originalPrice: 3080, genre: "自己啓発", rating: 4.3, stock: "in", cover: "linear-gradient(135deg, #d62828, #f77f00)", initial: "独", sale: 36 },
        { title: "アウトプット大全", author: "樺沢紫苑", price: 1078, originalPrice: 1595, genre: "ビジネス", rating: 4.2, stock: "in", cover: "linear-gradient(135deg, #003049, #669bbc)", initial: "ア", sale: 32 },
        { title: "世界一やさしい問題解決の授業", author: "渡辺健介", price: 924, originalPrice: 1320, genre: "ビジネス", rating: 4.0, stock: "in", cover: "linear-gradient(135deg, #f9c74f, #90be6d)", initial: "世", sale: 30 },
        { title: "1分で話せ", author: "伊藤羊一", price: 1100, originalPrice: 1540, genre: "ビジネス", rating: 4.1, stock: "low", cover: "linear-gradient(135deg, #ff5400, #ff6d00)", initial: "1", sale: 29 },
        { title: "超筋トレが最強のソリューション", author: "Testosterone", price: 880, originalPrice: 1320, genre: "自己啓発", rating: 4.4, stock: "in", cover: "linear-gradient(135deg, #dc2f02, #e85d04)", initial: "超", sale: 33 },
        { title: "メモの魔力", author: "前田裕二", price: 1078, originalPrice: 1540, genre: "ビジネス", rating: 3.9, stock: "in", cover: "linear-gradient(135deg, #240046, #5a189a)", initial: "メ", sale: 30 },
        { title: "反応しない練習", author: "草薙龍瞬", price: 990, originalPrice: 1430, genre: "自己啓発", rating: 4.5, stock: "in", cover: "linear-gradient(135deg, #2b2d42, #8d99ae)", initial: "反", sale: 31 },
        { title: "学びを結果に変えるアウトプット大全", author: "樺沢紫苑", price: 1100, originalPrice: 1760, genre: "ビジネス", rating: 4.0, stock: "out", cover: "linear-gradient(135deg, #006d77, #83c5be)", initial: "学", sale: 38 },
        { title: "イシューからはじめよ", author: "安宅和人", price: 1386, originalPrice: 1980, genre: "ビジネス", rating: 4.6, stock: "in", cover: "linear-gradient(135deg, #370617, #9d0208)", initial: "イ", sale: 30 },
        { title: "エッセンシャル思考", author: "グレッグ・マキューン", price: 1232, originalPrice: 1760, genre: "ビジネス", rating: 4.3, stock: "in", cover: "linear-gradient(135deg, #582f0e, #bb9457)", initial: "エ", sale: 30 }
    ],
    literature: [
        { title: "百年の孤独", author: "G・ガルシア=マルケス", price: 1100, genre: "文学・小説", rating: 4.6, stock: "in", cover: "linear-gradient(135deg, #606c38, #283618)", initial: "百" },
        { title: "カラマーゾフの兄弟 上", author: "ドストエフスキー", price: 1056, genre: "文学・小説", rating: 4.7, stock: "in", cover: "linear-gradient(135deg, #3d405b, #81b29a)", initial: "カ" },
        { title: "人間失格", author: "太宰治", price: 308, genre: "文学・小説", rating: 4.3, stock: "in", cover: "linear-gradient(135deg, #2b2d42, #ef233c)", initial: "人" },
        { title: "こころ", author: "夏目漱石", price: 407, genre: "文学・小説", rating: 4.5, stock: "in", cover: "linear-gradient(135deg, #001219, #005f73)", initial: "こ" },
        { title: "罪と罰 上", author: "ドストエフスキー", price: 990, genre: "文学・小説", rating: 4.5, stock: "low", cover: "linear-gradient(135deg, #3a0ca3, #4895ef)", initial: "罪" },
        { title: "源氏物語 上", author: "紫式部 (角田光代訳)", price: 825, genre: "文学・小説", rating: 4.2, stock: "in", cover: "linear-gradient(135deg, #7f5539, #ddb892)", initial: "源" },
        { title: "雪国", author: "川端康成", price: 440, genre: "文学・小説", rating: 4.4, stock: "in", cover: "linear-gradient(135deg, #caf0f8, #ade8f4)", initial: "雪" },
        { title: "変身", author: "フランツ・カフカ", price: 484, genre: "文学・小説", rating: 4.1, stock: "in", cover: "linear-gradient(135deg, #333533, #b5838d)", initial: "変" },
        { title: "走れメロス", author: "太宰治", price: 308, genre: "文学・小説", rating: 4.3, stock: "in", cover: "linear-gradient(135deg, #d00000, #6a040f)", initial: "走" },
        { title: "吾輩は猫である", author: "夏目漱石", price: 660, genre: "文学・小説", rating: 4.2, stock: "in", cover: "linear-gradient(135deg, #073b4c, #118ab2)", initial: "猫" }
    ],
    tech: [
        { title: "リーダブルコード", author: "Dustin Boswell", price: 2640, genre: "テクノロジー・IT", rating: 4.5, stock: "in", cover: "linear-gradient(135deg, #0d1b2a, #1b263b)", initial: "R" },
        { title: "プログラマが知るべき97のこと", author: "Kevlin Henney", price: 2090, genre: "テクノロジー・IT", rating: 4.2, stock: "in", cover: "linear-gradient(135deg, #003566, #006d77)", initial: "97" },
        { title: "Clean Architecture", author: "Robert C. Martin", price: 3520, originalPrice: 4180, genre: "テクノロジー・IT", rating: 4.6, stock: "in", cover: "linear-gradient(135deg, #00296b, #0077b6)", initial: "CA", sale: 16 },
        { title: "ゼロから作るDeep Learning", author: "斎藤康毅", price: 3740, genre: "テクノロジー・IT", rating: 4.7, stock: "in", cover: "linear-gradient(135deg, #7209b7, #3a0ca3)", initial: "DL" },
        { title: "Webを支える技術", author: "山本陽平", price: 2827, genre: "テクノロジー・IT", rating: 4.3, stock: "low", cover: "linear-gradient(135deg, #0b132b, #3a506b)", initial: "W" },
        { title: "データ指向アプリケーションデザイン", author: "Martin Kleppmann", price: 4180, genre: "テクノロジー・IT", rating: 4.8, stock: "in", cover: "linear-gradient(135deg, #14213d, #fca311)", initial: "DA" },
        { title: "プロになるJava", author: "きしだなおき", price: 3278, genre: "テクノロジー・IT", rating: 4.1, stock: "in", cover: "linear-gradient(135deg, #b5179e, #7209b7)", initial: "Jv" },
        { title: "達人プログラマー", author: "David Thomas", price: 3520, genre: "テクノロジー・IT", rating: 4.5, stock: "in", cover: "linear-gradient(135deg, #1a535c, #4ecdc4)", initial: "達" },
        { title: "マスタリングTCP/IP", author: "竹下隆史 他", price: 2420, genre: "テクノロジー・IT", rating: 4.4, stock: "in", cover: "linear-gradient(135deg, #22223b, #4a4e69)", initial: "TC" },
        { title: "Docker実践ガイド", author: "古賀政純", price: 3960, originalPrice: 4620, genre: "テクノロジー・IT", rating: 4.0, stock: "in", cover: "linear-gradient(135deg, #0096c7, #023e8a)", initial: "Do", sale: 14 }
    ],
    art: [
        { title: "ノンデザイナーズ・デザインブック", author: "Robin Williams", price: 2398, genre: "アート・デザイン", rating: 4.5, stock: "in", cover: "linear-gradient(135deg, #ff006e, #fb5607)", initial: "ND" },
        { title: "なるほどデザイン", author: "筒井美希", price: 2200, genre: "アート・デザイン", rating: 4.6, stock: "in", cover: "linear-gradient(135deg, #ffbe0b, #fb5607)", initial: "な" },
        { title: "配色デザイン見本帳", author: "伊達千代", price: 2860, genre: "アート・デザイン", rating: 4.2, stock: "in", cover: "linear-gradient(135deg, #9b5de5, #f15bb5)", initial: "配" },
        { title: "タイポグラフィの基本ルール", author: "大崎善治", price: 2090, genre: "アート・デザイン", rating: 4.1, stock: "low", cover: "linear-gradient(135deg, #2b2d42, #8d99ae)", initial: "タ" },
        { title: "デザインの教室", author: "佐藤好彦", price: 1980, genre: "アート・デザイン", rating: 4.3, stock: "in", cover: "linear-gradient(135deg, #006466, #65a30d)", initial: "デ" },
        { title: "けっきょく、よはく。", author: "ingectar-e", price: 1980, genre: "アート・デザイン", rating: 4.4, stock: "in", cover: "linear-gradient(135deg, #fefae0, #ccd5ae)", initial: "余" },
        { title: "色の辞典", author: "新井美樹", price: 1760, genre: "アート・デザイン", rating: 4.0, stock: "in", cover: "linear-gradient(135deg, #ff7b00, #ff9500)", initial: "色" },
        { title: "Photoshop & Illustrator 操作大全", author: "ふじのひろみ", price: 2420, originalPrice: 2860, genre: "アート・デザイン", rating: 4.1, stock: "in", cover: "linear-gradient(135deg, #001233, #023e7d)", initial: "PS", sale: 15 },
        { title: "UIデザインの教科書", author: "原田秀司", price: 2618, genre: "アート・デザイン", rating: 4.3, stock: "in", cover: "linear-gradient(135deg, #5f0f40, #9a031e)", initial: "UI" },
        { title: "世界一わかりやすい Illustrator 操作", author: "ピクセルハウス", price: 1848, genre: "アート・デザイン", rating: 3.9, stock: "out", cover: "linear-gradient(135deg, #0466c8, #7209b7)", initial: "Ai" }
    ]
};

// ===== Render Functions =====
function createStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "★".repeat(full) + (half ? "☆" : "") + "☆".repeat(empty);
}

function formatPrice(n) {
    return "¥" + n.toLocaleString();
}

function stockHTML(status) {
    const map = {
        in: { dot: "stock-in", cls: "stock-text-in", label: "在庫あり" },
        low: { dot: "stock-low", cls: "stock-text-low", label: "残りわずか" },
        out: { dot: "stock-out", cls: "stock-text-out", label: "在庫なし" }
    };
    const s = map[status];
    return `<span class="stock-dot ${s.dot}"></span><span class="${s.cls}">${s.label}</span>`;
}

function bookCardHTML(book) {
    const saleBadge = book.sale ? `<span class="sale-badge">${book.sale}% OFF</span>` : "";
    const newBadge = book.isNew ? `<span class="new-badge">NEW</span>` : "";
    const priceClass = book.sale ? "book-price sale" : "book-price";
    const originalPrice = book.originalPrice ? `<span class="book-original-price">${formatPrice(book.originalPrice)}</span>` : "";

    return `
    <article class="book-card">
      <div class="book-cover">
        <div class="book-cover-img" style="background:${book.cover}">${book.initial}</div>
        <button class="fav-btn" aria-label="お気に入りに追加" title="お気に入りに追加">
          <svg class="fav-icon-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <svg class="fav-icon-filled" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        ${saleBadge}
        ${newBadge}
        <span class="genre-tag">${book.genre}</span>
      </div>
      <div class="book-info">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <div class="book-rating">
          <span class="stars">${createStars(book.rating)}</span>
          <span class="rating-num">(${book.rating})</span>
        </div>
        <div class="book-price-row">
          <span class="${priceClass}">${formatPrice(book.price)}</span>
          ${originalPrice}
        </div>
        <div class="book-stock">${stockHTML(book.stock)}</div>
      </div>
    </article>`;
}

function renderShelf(trackId, books) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.innerHTML = books.map(bookCardHTML).join("");
}

// ===== Favorite Button Toggle =====
function initFavoriteButtons() {
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".fav-btn");
        if (!btn) return;
        e.stopPropagation();
        btn.classList.toggle("favorited");
    });
}

// ===== Scroll Buttons =====
function initScrollButtons() {
    document.querySelectorAll(".shelf-wrapper").forEach(wrapper => {
        const track = wrapper.querySelector(".shelf-track");
        const leftBtn = wrapper.querySelector(".scroll-left");
        const rightBtn = wrapper.querySelector(".scroll-right");
        if (!track || !leftBtn || !rightBtn) return;

        const scrollAmount = 400;

        leftBtn.addEventListener("click", () => {
            track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
}

// ===== Header Scroll Effect =====
function initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle("scrolled", window.scrollY > 40);
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===== Genre Chip Toggle =====
function initGenreChips() {
    document.querySelectorAll(".genre-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            document.querySelector(".genre-chip.active")?.classList.remove("active");
            chip.classList.add("active");
        });
    });
}

// ===== Search Placeholder Animation =====
function initSearchAnimation() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const placeholders = [
        "タイトルで検索...",
        "著者名で検索...",
        "ISBNで検索...",
        "ジャンルで検索..."
    ];
    let idx = 0;

    setInterval(() => {
        if (document.activeElement === input) return;
        idx = (idx + 1) % placeholders.length;
        input.setAttribute("placeholder", placeholders[idx]);
    }, 3000);
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
    renderShelf("shelf-recommended", BOOKS.recommended);
    renderShelf("shelf-new", BOOKS.new);
    renderShelf("shelf-sale", BOOKS.sale);
    renderShelf("shelf-literature", BOOKS.literature);
    renderShelf("shelf-tech", BOOKS.tech);
    renderShelf("shelf-art", BOOKS.art);

    initScrollButtons();
    initHeaderScroll();
    initGenreChips();
    initSearchAnimation();
    initFavoriteButtons();
});
