import { useState, useEffect, useRef } from "react";
import * as recharts from "recharts";

const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } = recharts;

// ═══════════════════════════════════════════════
// MONGOLIAN COAL MINES DATABASE
// ═══════════════════════════════════════════════
const MINES_DATA = [
  {
    id: 1, name: "Таван Толгой", nameEn: "Tavan Tolgoi", region: "Өмнөговь", sum: "Цогтцэций",
    type: "Коксжих / Эрчим хүчний", lat: 43.56, lng: 105.77,
    reserve: 6420, unit: "сая тн", annualOutput: 20,
    quality: { calorific: 6500, ash: 21.7, moisture: 8.5, volatile: 28, sulfur: 0.6, carbon: 58 },
    distanceFromUB: 550, operator: "Эрдэнэс Таван Толгой ХХК",
    description: "Монголын хамгийн том нүүрсний орд. Коксжих болон эрчим хүчний нүүрс.",
    transport: ["Авто зам", "Төмөр зам (баригдаж буй)"], border: "Гашуунсухайт"
  },
  {
    id: 2, name: "Ухаа Худаг", nameEn: "Ukhaa Khudag", region: "Өмнөговь", sum: "Цогтцэций",
    type: "Коксжих", lat: 43.31, lng: 106.01,
    reserve: 1800, unit: "сая тн", annualOutput: 15,
    quality: { calorific: 7200, ash: 10.5, moisture: 3.5, volatile: 22, sulfur: 0.5, carbon: 65 },
    distanceFromUB: 580, operator: "Энержи Ресурс ХХК",
    description: "Таван Толгойн бүлэг ордын нэг. Өндөр чанарын коксжих нүүрс.",
    transport: ["Авто зам"], border: "Гашуунсухайт"
  },
  {
    id: 3, name: "Нарийн Сухайт", nameEn: "Nariin Sukhait", region: "Өмнөговь", sum: "Гурвантэс",
    type: "Коксжих", lat: 43.15, lng: 107.15,
    reserve: 125, unit: "сая тн", annualOutput: 7,
    quality: { calorific: 7000, ash: 12, moisture: 4, volatile: 24, sulfur: 0.55, carbon: 62 },
    distanceFromUB: 849, operator: "МАК ХХК",
    description: "Коксжих нүүрсний том орд. Шивээхүрэн боомтоор экспорт.",
    transport: ["Авто зам"], border: "Шивээхүрэн"
  },
  {
    id: 4, name: "Багануур", nameEn: "Baganuur", region: "Төв", sum: "Баяндэлгэр",
    type: "Эрчим хүчний (Хүрэн нүүрс)", lat: 47.73, lng: 108.35,
    reserve: 600, unit: "сая тн", annualOutput: 4,
    quality: { calorific: 3400, ash: 15, moisture: 30, volatile: 42, sulfur: 0.8, carbon: 38 },
    distanceFromUB: 110, operator: "Багануур ХК",
    description: "УБ хотод хамгийн ойр. Дотоодын эрчим хүчний гол нүүрс.",
    transport: ["Төмөр зам", "Авто зам"], border: null
  },
  {
    id: 5, name: "Шивээ-Овоо", nameEn: "Shivee-Ovoo", region: "Говьсүмбэр", sum: "Шивээговь",
    type: "Эрчим хүчний (Хүрэн нүүрс)", lat: 46.1, lng: 108.15,
    reserve: 646, unit: "сая тн", annualOutput: 3.5,
    quality: { calorific: 3100, ash: 18, moisture: 32, volatile: 40, sulfur: 1.0, carbon: 35 },
    distanceFromUB: 280, operator: "Шивээ-Овоо ХК",
    description: "Эрчим хүчний нүүрсний том орд.",
    transport: ["Төмөр зам", "Авто зам"], border: null
  },
  {
    id: 6, name: "Шарын Гол", nameEn: "Sharyn Gol", region: "Дархан-Уул", sum: "Шарынгол",
    type: "Эрчим хүчний (Чулуун нүүрс)", lat: 48.96, lng: 106.36,
    reserve: 190, unit: "сая тн", annualOutput: 1.5,
    quality: { calorific: 4200, ash: 22, moisture: 12, volatile: 35, sulfur: 0.9, carbon: 45 },
    distanceFromUB: 320, operator: "Шарын Гол ХК",
    description: "Монголын анхны нүүрсний уурхай (1965). Хойд бүсийн хангамж.",
    transport: ["Төмөр зам", "Авто зам"], border: null
  },
  {
    id: 7, name: "Адуунчулуун", nameEn: "Aduunchuluun", region: "Дорнод", sum: "Чойбалсан",
    type: "Эрчим хүчний (Хүрэн нүүрс)", lat: 48.1, lng: 114.5,
    reserve: 231, unit: "сая тн", annualOutput: 0.5,
    quality: { calorific: 2800, ash: 12, moisture: 35, volatile: 44, sulfur: 0.7, carbon: 32 },
    distanceFromUB: 655, operator: "Адуунчулуун ХХК",
    description: "Дорнод бүсийн эрчим хүчний хангамж.",
    transport: ["Авто зам"], border: null
  },
  {
    id: 8, name: "Овоот Толгой", nameEn: "Ovoot Tolgoi", region: "Өмнөговь", sum: "Гурвантэс",
    type: "Коксжих", lat: 43.2, lng: 107.5,
    reserve: 150, unit: "сая тн", annualOutput: 5,
    quality: { calorific: 6800, ash: 14, moisture: 5, volatile: 26, sulfur: 0.45, carbon: 60 },
    distanceFromUB: 900, operator: "Саусгоби Сэндс ХХК",
    description: "Коксжих нүүрсний орд. Хариуцлагатай уурхайн жишиг.",
    transport: ["Авто зам"], border: "Шивээхүрэн"
  },
  {
    id: 9, name: "Хөшөөт", nameEn: "Khoshuut", region: "Ховд", sum: "Дарви",
    type: "Коксжих / Эрчим хүчний", lat: 46.25, lng: 93.5,
    reserve: 300, unit: "сая тн", annualOutput: 2,
    quality: { calorific: 5800, ash: 16, moisture: 7, volatile: 30, sulfur: 0.65, carbon: 52 },
    distanceFromUB: 1200, operator: "МоЭнКо ХХК",
    description: "Баруун бүсийн нүүрсний том орд.",
    transport: ["Авто зам"], border: "Ярант"
  },
  {
    id: 10, name: "Тавантолгойн баруун цанхи", nameEn: "TT West Tsankhi", region: "Өмнөговь", sum: "Цогтцэций",
    type: "Коксжих", lat: 43.58, lng: 105.68,
    reserve: 2000, unit: "сая тн", annualOutput: 10,
    quality: { calorific: 7500, ash: 9.5, moisture: 3, volatile: 20, sulfur: 0.4, carbon: 68 },
    distanceFromUB: 555, operator: "Эрдэнэс Таван Толгой ХХК",
    description: "Хамгийн өндөр чанартай коксжих нүүрсний бүлэг.",
    transport: ["Авто зам", "Төмөр зам (баригдаж буй)"], border: "Гашуунсухайт"
  },
  {
    id: 11, name: "Баянгол", nameEn: "Bayangol", region: "Сэлэнгэ", sum: "Баянгол",
    type: "Эрчим хүчний", lat: 49.2, lng: 106.8,
    reserve: 80, unit: "сая тн", annualOutput: 0.8,
    quality: { calorific: 3600, ash: 20, moisture: 28, volatile: 38, sulfur: 0.85, carbon: 40 },
    distanceFromUB: 350, operator: "Баянгол Уурхай ХХК",
    description: "Орон нутгийн эрчим хүчний нүүрс.",
    transport: ["Авто зам"], border: null
  },
  {
    id: 12, name: "Төмөртэй Овоо", nameEn: "Tomortei Ovoo", region: "Дорноговь", sum: "Сайншанд",
    type: "Эрчим хүчний", lat: 44.89, lng: 110.14,
    reserve: 100, unit: "сая тн", annualOutput: 0.6,
    quality: { calorific: 3800, ash: 17, moisture: 25, volatile: 36, sulfur: 0.75, carbon: 42 },
    distanceFromUB: 460, operator: "Төмөртэй Овоо ХХК",
    description: "Дорноговь бүсийн эрчим хүчний нүүрс.",
    transport: ["Төмөр зам", "Авто зам"], border: null
  }
];

// Coal price data from MRPAM
const PRICE_DATA = [
  { month: "2024.01", thermal: 89.3, coking: 102.5 },
  { month: "2024.02", thermal: 87.1, coking: 99.8 },
  { month: "2024.03", thermal: 85.5, coking: 98.2 },
  { month: "2024.04", thermal: 83.2, coking: 95.6 },
  { month: "2024.05", thermal: 81.0, coking: 93.4 },
  { month: "2024.06", thermal: 79.8, coking: 91.2 },
  { month: "2024.07", thermal: 78.5, coking: 88.7 },
  { month: "2024.08", thermal: 76.3, coking: 86.1 },
  { month: "2024.09", thermal: 74.8, coking: 84.5 },
  { month: "2024.10", thermal: 72.1, coking: 82.3 },
  { month: "2024.11", thermal: 70.5, coking: 80.1 },
  { month: "2024.12", thermal: 68.9, coking: 78.4 },
  { month: "2025.01", thermal: 67.2, coking: 76.8 },
  { month: "2025.02", thermal: 65.8, coking: 75.2 },
  { month: "2025.03", thermal: 64.5, coking: 73.6 },
  { month: "2025.04", thermal: 63.1, coking: 72.1 },
  { month: "2025.05", thermal: 62.0, coking: 70.8 },
  { month: "2025.06", thermal: 61.2, coking: 69.5 },
  { month: "2025.07", thermal: 60.5, coking: 68.2 },
  { month: "2025.08", thermal: 59.8, coking: 67.0 },
  { month: "2025.09", thermal: 59.1, coking: 65.8 },
  { month: "2025.10", thermal: 58.5, coking: 64.5 },
  { month: "2025.11", thermal: 58.0, coking: 63.2 },
  { month: "2025.12", thermal: 57.5, coking: 62.0 },
  { month: "2026.01", thermal: 57.0, coking: 60.5 },
  { month: "2026.02", thermal: 57.2, coking: 59.8 },
  { month: "2026.03", thermal: 56.8, coking: 59.2 },
];

const DELIVERY_LOCATIONS = [
  { name: "Улаанбаатар", lat: 47.92, lng: 106.92 },
  { name: "Дархан", lat: 49.47, lng: 106.07 },
  { name: "Эрдэнэт", lat: 49.06, lng: 104.15 },
  { name: "Чойбалсан", lat: 48.07, lng: 114.53 },
  { name: "Сайншанд", lat: 44.89, lng: 110.12 },
  { name: "Замын-Үүд", lat: 43.72, lng: 111.90 },
  { name: "Гашуунсухайт (Хил)", lat: 42.74, lng: 106.64 },
  { name: "Шивээхүрэн (Хил)", lat: 42.66, lng: 107.97 },
  { name: "БНХАУ (Эрээн)", lat: 43.65, lng: 111.97 },
  { name: "Ховд", lat: 48.01, lng: 91.64 },
];

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)*Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  return (
    <div style={{
      fontFamily: "'Noto Sans', 'Segoe UI', system-ui, sans-serif",
      background: "#0a0a0a",
      color: "#e8e4de",
      minHeight: "100vh",
      overflow: "hidden"
    }}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 0 && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 1 && <PricePage />}
      {currentPage === 2 && <CustomerPage />}
    </div>
  );
}

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════
function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.85) 100%)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(212,175,55,0.15)",
      padding: "0 24px",
      height: 64, display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 8,
          background: "linear-gradient(135deg, #d4af37 0%, #8B6914 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 12px rgba(212,175,55,0.3)",
          fontSize: 10, fontWeight: 900, color: "#0a0a0a", lineHeight: 1.1, textAlign: "center",
          letterSpacing: -0.5
        }}>CT<br/>LLC</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d4af37", letterSpacing: 1.5, lineHeight: 1 }}>
            COAL TECHNOLOGIES
          </div>
          <div style={{ fontSize: 9, letterSpacing: 3, color: "#888", marginTop: 2 }}>LLC</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {[
          { label: "Нүүр", icon: "◆" },
          { label: "Үнийн мэдээ", icon: "◈" },
          { label: "Хэрэглэгч", icon: "◇" }
        ].map((item, i) => (
          <button key={i} onClick={() => setCurrentPage(i)} style={{
            background: currentPage === i ? "rgba(212,175,55,0.15)" : "transparent",
            border: currentPage === i ? "1px solid rgba(212,175,55,0.3)" : "1px solid transparent",
            color: currentPage === i ? "#d4af37" : "#888",
            padding: "8px 16px", borderRadius: 6, cursor: "pointer",
            fontSize: 13, fontWeight: currentPage === i ? 700 : 400,
            transition: "all 0.3s ease", letterSpacing: 0.5
          }}>
            <span style={{ marginRight: 6, fontSize: 8 }}>{item.icon}</span>{item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════
function HomePage({ setCurrentPage }) {
  const [selectedMine, setSelectedMine] = useState(null);

  return (
    <div style={{ paddingTop: 64 }}>
      {/* HERO */}
      <div style={{
        position: "relative", minHeight: "92vh",
        background: `
          linear-gradient(135deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.95) 100%),
          linear-gradient(45deg, #1a1207 0%, #0d1a0d 30%, #0a0a1a 60%, #1a0a0a 100%)
        `,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 48px", overflow: "hidden"
      }}>
        {/* Animated background particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.3 }}>
          {Array.from({length: 20}).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 2 + Math.random() * 4, height: 2 + Math.random() * 4,
              background: "#d4af37", borderRadius: "50%",
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }} />
          ))}
        </div>

        <style>{`
          @keyframes pulse { 0%,100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        `}</style>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <div style={{
            fontSize: 11, letterSpacing: 6, color: "#d4af37", marginBottom: 20,
            fontWeight: 600, animation: "slideUp 0.8s ease-out"
          }}>
            MONGOLIAN COAL INDUSTRY SOLUTIONS
          </div>

          <h1 style={{
            fontSize: 56, fontWeight: 900, lineHeight: 1.1, margin: 0,
            animation: "slideUp 0.8s ease-out 0.1s both",
            background: "linear-gradient(135deg, #d4af37 0%, #f5e6a3 40%, #d4af37 60%, #8B6914 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            COAL TECHNOLOGIES LLC
          </h1>

          <p style={{
            fontSize: 18, lineHeight: 1.7, color: "#999", maxWidth: 650, marginTop: 24,
            animation: "slideUp 0.8s ease-out 0.2s both"
          }}>
            Монголын нүүрсний уурхайнуудын нэгдсэн мэдээллийн платформ.
            Нүүрсний чанар, нөөц, тээвэрлэлт, үнийн мэдээллийг нэг дороос авах боломж.
          </p>

          <div style={{
            display: "flex", gap: 16, marginTop: 36,
            animation: "slideUp 0.8s ease-out 0.3s both"
          }}>
            <button onClick={() => setCurrentPage(2)} style={{
              background: "linear-gradient(135deg, #d4af37 0%, #8B6914 100%)",
              color: "#0a0a0a", border: "none", padding: "14px 32px",
              borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer",
              letterSpacing: 1, boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
              transition: "all 0.3s ease"
            }}>
              НҮҮРС ЗАХИАЛАХ →
            </button>
            <button onClick={() => setCurrentPage(1)} style={{
              background: "transparent", color: "#d4af37",
              border: "1px solid rgba(212,175,55,0.4)",
              padding: "14px 32px", borderRadius: 8, fontSize: 14,
              fontWeight: 600, cursor: "pointer", letterSpacing: 1,
              transition: "all 0.3s ease"
            }}>
              ҮНИЙН МЭДЭЭ
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(20,20,20,0.9)", borderTop: "1px solid rgba(212,175,55,0.1)",
          display: "flex", justifyContent: "center", gap: 60, padding: "24px 0",
          animation: "fadeIn 1s ease-out 0.5s both"
        }}>
          {[
            { val: "12+", label: "Бүртгэлтэй уурхай" },
            { val: "10.2B", label: "Нийт нөөц (тн)" },
            { val: "57.22$", label: "Эрч. хүчний нүүрс/тн" },
            { val: "59.80$", label: "Коксжих нүүрс/тн" }
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#d4af37" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#777", letterSpacing: 1, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div style={{
        background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
        padding: "60px 48px", borderTop: "1px solid rgba(212,175,55,0.08)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: "#d4af37", marginBottom: 8 }}>ХОЛБОГДОХ МЭДЭЭЛЭЛ</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: "#e8e4de" }}>Бидэнтэй холбогдох</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
          {[
            { title: "Б. Дэмбэрэл", role: "CEO - Гүйцэтгэх захирал", phone: "86823646", icon: "👔" },
            { title: "Б. Алтанхундага", role: "Engineer - Инженер", phone: "85443201", icon: "⚙️" },
            { title: "И-мэйл", role: "Байгууллагын цахим шуудан", phone: "coaltechnologiesllc@must.edu.mn", icon: "✉️" }
          ].map((c, i) => (
            <div key={i} style={{
              background: "rgba(30,30,30,0.8)", borderRadius: 12,
              border: "1px solid rgba(212,175,55,0.1)", padding: 28,
              transition: "all 0.3s ease"
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#d4af37" }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "#777", margin: "6px 0 12px" }}>{c.role}</div>
              <div style={{ fontSize: 14, color: "#ccc", fontWeight: 600 }}>{c.phone}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MINES TABLE */}
      <div style={{ padding: "60px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: "#d4af37", marginBottom: 8 }}>МЭДЭЭЛЛИЙН САН</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Монголын нүүрсний уурхайнууд</h2>
          <p style={{ color: "#777", marginTop: 8, fontSize: 14 }}>Нийт {MINES_DATA.length} уурхайн дэлгэрэнгүй мэдээлэл</p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%", borderCollapse: "separate", borderSpacing: "0 4px",
            fontSize: 13
          }}>
            <thead>
              <tr>
                {["№","Уурхай","Бүс нутаг","Төрөл","Нөөц (сая тн)","Илчлэг (ккал/кг)","Үнслэг %","Чийглэг %","Хүхэр %","УБ-с зай (км)","Оператор"].map((h, i) => (
                  <th key={i} style={{
                    padding: "12px 10px", textAlign: "left",
                    color: "#d4af37", fontWeight: 600, fontSize: 11,
                    letterSpacing: 0.5, borderBottom: "2px solid rgba(212,175,55,0.2)",
                    whiteSpace: "nowrap"
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MINES_DATA.map((m, i) => (
                <tr key={m.id} onClick={() => setSelectedMine(selectedMine === m.id ? null : m.id)}
                    style={{
                      background: selectedMine === m.id ? "rgba(212,175,55,0.08)" : i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                      cursor: "pointer", transition: "all 0.2s"
                    }}>
                  <td style={{ padding: "10px", color: "#666" }}>{i + 1}</td>
                  <td style={{ padding: "10px", fontWeight: 700, color: "#e8e4de" }}>{m.name}</td>
                  <td style={{ padding: "10px", color: "#999" }}>{m.region}</td>
                  <td style={{ padding: "10px" }}>
                    <span style={{
                      background: m.type.includes("Коксжих") ? "rgba(255,149,0,0.15)" : "rgba(100,149,237,0.15)",
                      color: m.type.includes("Коксжих") ? "#ff9500" : "#6495ed",
                      padding: "3px 8px", borderRadius: 4, fontSize: 11
                    }}>{m.type.split("(")[0].trim()}</span>
                  </td>
                  <td style={{ padding: "10px", fontWeight: 600, color: "#d4af37" }}>{m.reserve.toLocaleString()}</td>
                  <td style={{ padding: "10px", fontWeight: 600 }}>{m.quality.calorific.toLocaleString()}</td>
                  <td style={{ padding: "10px" }}>{m.quality.ash}%</td>
                  <td style={{ padding: "10px" }}>{m.quality.moisture}%</td>
                  <td style={{ padding: "10px" }}>{m.quality.sulfur}%</td>
                  <td style={{ padding: "10px" }}>{m.distanceFromUB}</td>
                  <td style={{ padding: "10px", color: "#999", fontSize: 11 }}>{m.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedMine && (() => {
          const m = MINES_DATA.find(x => x.id === selectedMine);
          return (
            <div style={{
              marginTop: 24, background: "rgba(30,30,30,0.9)", borderRadius: 12,
              border: "1px solid rgba(212,175,55,0.15)", padding: 32
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: "#d4af37", margin: 0 }}>{m.name}</h3>
                  <p style={{ color: "#888", margin: "6px 0 0", fontSize: 12 }}>{m.nameEn} — {m.region}, {m.sum} сум</p>
                </div>
                <button onClick={() => setSelectedMine(null)} style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#888", padding: "6px 12px", borderRadius: 6, cursor: "pointer"
                }}>✕</button>
              </div>
              <p style={{ color: "#aaa", lineHeight: 1.6, margin: "16px 0" }}>{m.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {[
                  { l: "Нөөц", v: `${m.reserve} сая тн` },
                  { l: "Жилийн олборлолт", v: `${m.annualOutput} сая тн` },
                  { l: "Илчлэг", v: `${m.quality.calorific} ккал/кг` },
                  { l: "Үнслэг", v: `${m.quality.ash}%` },
                  { l: "Чийглэг", v: `${m.quality.moisture}%` },
                  { l: "Дэгдэмхий", v: `${m.quality.volatile}%` },
                  { l: "Хүхэр", v: `${m.quality.sulfur}%` },
                  { l: "Нүүрстөрөгч", v: `${m.quality.carbon}%` }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 14,
                    border: "1px solid rgba(212,175,55,0.05)"
                  }}>
                    <div style={{ fontSize: 10, color: "#666", letterSpacing: 1 }}>{item.l}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#e8e4de", marginTop: 4 }}>{item.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: "#888" }}>
                <strong style={{ color: "#d4af37" }}>Тээвэрлэлт:</strong> {m.transport.join(", ")}
                {m.border && <> · <strong style={{ color: "#d4af37" }}>Хилийн боомт:</strong> {m.border}</>}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Footer */}
      <footer style={{
        background: "#080808", borderTop: "1px solid rgba(212,175,55,0.08)",
        padding: "32px 48px", textAlign: "center"
      }}>
        <div style={{ color: "#d4af37", fontWeight: 800, fontSize: 14, letterSpacing: 2 }}>COAL TECHNOLOGIES LLC</div>
        <div style={{ color: "#555", fontSize: 11, marginTop: 8 }}>© 2026 Бүх эрх хуулиар хамгаалагдсан</div>
        <div style={{ color: "#444", fontSize: 11, marginTop: 4 }}>
          Эх сурвалж: АМГТГ (mrpam.gov.mn) — Ашигт Малтмал, Газрын Тосны Газар
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════
// PRICE PAGE
// ═══════════════════════════════════════════════
function PricePage() {
  const [viewMode, setViewMode] = useState("line");

  return (
    <div style={{ paddingTop: 88, padding: "88px 32px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 10, letterSpacing: 5, color: "#d4af37", marginBottom: 8 }}>MRPAM.GOV.MN МЭДЭЭЛЭЛ</div>
        <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>Нүүрсний олон улсын зах зээлийн үнэ</h2>
        <p style={{ color: "#777", marginTop: 8, fontSize: 14 }}>
          Эх сурвалж: <a href="https://mrpam.gov.mn/news/type/price" target="_blank" rel="noopener" 
          style={{ color: "#d4af37" }}>mrpam.gov.mn/news/type/price</a> — Ам.доллар/тонн
        </p>
      </div>

      {/* Latest stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 900, margin: "0 auto 32px" }}>
        {[
          { label: "Эрчим хүчний нүүрс (2026.II)", val: "$57.22", color: "#6495ed" },
          { label: "Коксжих нүүрс (2026.II)", val: "$59.80", color: "#ff9500" },
          { label: "Олборлолт (2026.II)", val: "9,629.3 мян.тн", color: "#4ecdc4" },
          { label: "Экспорт (2026.II)", val: "6,175.3 мян.тн", color: "#e8554e" }
        ].map((s, i) => (
          <div key={i} style={{
            background: "rgba(30,30,30,0.8)", borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.05)", padding: 20, textAlign: "center"
          }}>
            <div style={{ fontSize: 10, color: "#777", letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Chart toggle */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
        {[{k:"line",l:"Шугаман"},{k:"area",l:"Талбайт"},{k:"bar",l:"Баганан"}].map(v => (
          <button key={v.k} onClick={() => setViewMode(v.k)} style={{
            background: viewMode === v.k ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.03)",
            border: viewMode === v.k ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.06)",
            color: viewMode === v.k ? "#d4af37" : "#888",
            padding: "8px 20px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600
          }}>{v.l}</button>
        ))}
      </div>

      {/* Main chart */}
      <div style={{
        background: "rgba(20,20,20,0.8)", borderRadius: 16,
        border: "1px solid rgba(212,175,55,0.08)", padding: "24px 16px"
      }}>
        <ResponsiveContainer width="100%" height={420}>
          {viewMode === "bar" ? (
            <BarChart data={PRICE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#555" fontSize={10} angle={-45} textAnchor="end" height={60} />
              <YAxis stroke="#555" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 8, fontSize: 12 }} />
              <Legend />
              <Bar dataKey="thermal" name="Эрчим хүчний нүүрс" fill="#6495ed" radius={[3,3,0,0]} />
              <Bar dataKey="coking" name="Коксжих нүүрс" fill="#ff9500" radius={[3,3,0,0]} />
            </BarChart>
          ) : viewMode === "area" ? (
            <AreaChart data={PRICE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#555" fontSize={10} angle={-45} textAnchor="end" height={60} />
              <YAxis stroke="#555" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 8, fontSize: 12 }} />
              <Legend />
              <Area type="monotone" dataKey="thermal" name="Эрчим хүчний нүүрс" stroke="#6495ed" fill="rgba(100,149,237,0.15)" strokeWidth={2} />
              <Area type="monotone" dataKey="coking" name="Коксжих нүүрс" stroke="#ff9500" fill="rgba(255,149,0,0.15)" strokeWidth={2} />
            </AreaChart>
          ) : (
            <LineChart data={PRICE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#555" fontSize={10} angle={-45} textAnchor="end" height={60} />
              <YAxis stroke="#555" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 8, fontSize: 12 }} />
              <Legend />
              <Line type="monotone" dataKey="thermal" name="Эрчим хүчний нүүрс" stroke="#6495ed" strokeWidth={2.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="coking" name="Коксжих нүүрс" stroke="#ff9500" strokeWidth={2.5} dot={{ r: 2 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Monthly price table */}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#d4af37" }}>Сарын үнийн дэлгэрэнгүй хүснэгт</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 3px", fontSize: 12 }}>
            <thead>
              <tr>
                {["Сар", "Эрчим хүчний ($/тн)", "Өөрчлөлт", "Коксжих ($/тн)", "Өөрчлөлт"].map((h, i) => (
                  <th key={i} style={{
                    padding: "10px 12px", textAlign: "left", color: "#d4af37",
                    fontWeight: 600, fontSize: 11, borderBottom: "1px solid rgba(212,175,55,0.15)"
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRICE_DATA.slice().reverse().slice(0, 12).map((p, i, arr) => {
                const prev = arr[i + 1];
                const tDiff = prev ? (p.thermal - prev.thermal).toFixed(1) : "—";
                const cDiff = prev ? (p.coking - prev.coking).toFixed(1) : "—";
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                    <td style={{ padding: "8px 12px", fontWeight: 600 }}>{p.month}</td>
                    <td style={{ padding: "8px 12px" }}>${p.thermal}</td>
                    <td style={{ padding: "8px 12px", color: tDiff > 0 ? "#4ecdc4" : tDiff < 0 ? "#e8554e" : "#666" }}>
                      {tDiff !== "—" ? (tDiff > 0 ? `+${tDiff}` : tDiff) : "—"}
                    </td>
                    <td style={{ padding: "8px 12px" }}>${p.coking}</td>
                    <td style={{ padding: "8px 12px", color: cDiff > 0 ? "#4ecdc4" : cDiff < 0 ? "#e8554e" : "#666" }}>
                      {cDiff !== "—" ? (cDiff > 0 ? `+${cDiff}` : cDiff) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// CUSTOMER PAGE
// ═══════════════════════════════════════════════
function CustomerPage() {
  const [form, setForm] = useState({
    companyName: "", contactName: "", phone: "", email: "",
    coalType: "any", minCalorific: 3000, maxAsh: 25, maxMoisture: 35, maxSulfur: 1.0,
    budget: 100000, quantity: 1000, deliveryLocation: ""
  });
  const [results, setResults] = useState(null);

  const handleSubmit = () => {
    const delivery = DELIVERY_LOCATIONS.find(d => d.name === form.deliveryLocation);
    if (!delivery) return alert("Тээвэрлэх байршлаа сонгоно уу!");

    const matched = MINES_DATA.filter(m => {
      if (form.coalType === "coking" && !m.type.includes("Коксжих")) return false;
      if (form.coalType === "thermal" && !m.type.includes("Эрчим")) return false;
      if (m.quality.calorific < form.minCalorific) return false;
      if (m.quality.ash > form.maxAsh) return false;
      if (m.quality.moisture > form.maxMoisture) return false;
      if (m.quality.sulfur > form.maxSulfur) return false;
      return true;
    }).map(m => {
      const dist = Math.round(calculateDistance(m.lat, m.lng, delivery.lat, delivery.lng) * 1.3);
      const pricePerTon = m.type.includes("Коксжих") ? 59.8 : 57.22;
      const transportCost = dist * 0.05;
      const totalPerTon = pricePerTon + transportCost;
      const maxAffordable = Math.floor(form.budget / totalPerTon);
      return { ...m, distance: dist, pricePerTon, transportCost, totalPerTon, maxAffordable };
    }).sort((a, b) => a.totalPerTon - b.totalPerTon);

    setResults(matched);
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(212,175,55,0.15)", borderRadius: 8,
    color: "#e8e4de", fontSize: 13, outline: "none", boxSizing: "border-box"
  };
  const labelStyle = { fontSize: 11, color: "#d4af37", letterSpacing: 1, fontWeight: 600, marginBottom: 6, display: "block" };

  return (
    <div style={{ paddingTop: 88, padding: "88px 32px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 10, letterSpacing: 5, color: "#d4af37", marginBottom: 8 }}>ХЭРЭГЛЭГЧИЙН ХЭСЭГ</div>
        <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>Нүүрсний захиалга өгөх</h2>
        <p style={{ color: "#777", marginTop: 8, fontSize: 14 }}>Таны шаардлагад нийцэх уурхайг автоматаар сонгон санал болгоно</p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Company Info Section */}
        <div style={{
          background: "rgba(20,20,20,0.8)", borderRadius: 16,
          border: "1px solid rgba(212,175,55,0.08)", padding: 32, marginBottom: 24
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#d4af37", margin: "0 0 20px", letterSpacing: 1 }}>
            ▸ БАЙГУУЛЛАГЫН МЭДЭЭЛЭЛ
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>БАЙГУУЛЛАГЫН НЭР</label>
              <input style={inputStyle} placeholder="Жишээ: Монгол Цахилгаан ХХК"
                value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>ХОЛБОГДОХ ХҮНИЙ НЭР</label>
              <input style={inputStyle} placeholder="Овог нэр"
                value={form.contactName} onChange={e => setForm({...form, contactName: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>УТАСНЫ ДУГААР</label>
              <input style={inputStyle} placeholder="99xxxxxx"
                value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>И-МЭЙЛ</label>
              <input style={inputStyle} placeholder="email@company.mn"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Coal Quality Requirements */}
        <div style={{
          background: "rgba(20,20,20,0.8)", borderRadius: 16,
          border: "1px solid rgba(212,175,55,0.08)", padding: 32, marginBottom: 24
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#d4af37", margin: "0 0 20px", letterSpacing: 1 }}>
            ▸ НҮҮРСНИЙ ЧАНАРЫН ШААРДЛАГА
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>НҮҮРСНИЙ ТӨРӨЛ</label>
              <select style={{...inputStyle, cursor: "pointer"}}
                value={form.coalType} onChange={e => setForm({...form, coalType: e.target.value})}>
                <option value="any">Бүгд</option>
                <option value="coking">Коксжих нүүрс</option>
                <option value="thermal">Эрчим хүчний нүүрс</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>ХАМГИЙН БАГА ИЛЧЛЭГ (ккал/кг)</label>
              <input type="range" min={2000} max={8000} step={100}
                value={form.minCalorific} onChange={e => setForm({...form, minCalorific: +e.target.value})}
                style={{ width: "100%", accentColor: "#d4af37" }} />
              <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: "#e8e4de", marginTop: 4 }}>
                {form.minCalorific.toLocaleString()} ккал/кг
              </div>
            </div>
            <div>
              <label style={labelStyle}>ХАМГИЙН ИХ ҮНСЛЭГ (%)</label>
              <input type="range" min={5} max={35} step={0.5}
                value={form.maxAsh} onChange={e => setForm({...form, maxAsh: +e.target.value})}
                style={{ width: "100%", accentColor: "#d4af37" }} />
              <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: "#e8e4de", marginTop: 4 }}>
                {form.maxAsh}%
              </div>
            </div>
            <div>
              <label style={labelStyle}>ХАМГИЙН ИХ ЧИЙГЛЭГ (%)</label>
              <input type="range" min={1} max={40} step={0.5}
                value={form.maxMoisture} onChange={e => setForm({...form, maxMoisture: +e.target.value})}
                style={{ width: "100%", accentColor: "#d4af37" }} />
              <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: "#e8e4de", marginTop: 4 }}>
                {form.maxMoisture}%
              </div>
            </div>
            <div>
              <label style={labelStyle}>ХАМГИЙН ИХ ХҮХЭР (%)</label>
              <input type="range" min={0.1} max={2} step={0.05}
                value={form.maxSulfur} onChange={e => setForm({...form, maxSulfur: +e.target.value})}
                style={{ width: "100%", accentColor: "#d4af37" }} />
              <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: "#e8e4de", marginTop: 4 }}>
                {form.maxSulfur}%
              </div>
            </div>
          </div>
        </div>

        {/* Budget & Delivery */}
        <div style={{
          background: "rgba(20,20,20,0.8)", borderRadius: 16,
          border: "1px solid rgba(212,175,55,0.08)", padding: 32, marginBottom: 24
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#d4af37", margin: "0 0 20px", letterSpacing: 1 }}>
            ▸ ТӨСӨВ, ХЭМЖЭЭ & ТЭЭВЭРЛЭЛТ
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>ТӨСӨВ (АМ.ДОЛЛАР)</label>
              <input type="number" style={inputStyle} placeholder="100,000"
                value={form.budget} onChange={e => setForm({...form, budget: +e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>АВАХ ХЭМЖЭЭ (ТОНН)</label>
              <input type="number" style={inputStyle} placeholder="1,000"
                value={form.quantity} onChange={e => setForm({...form, quantity: +e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>ТЭЭВЭРЛЭХ БАЙРШИЛ</label>
              <select style={{...inputStyle, cursor: "pointer"}}
                value={form.deliveryLocation} onChange={e => setForm({...form, deliveryLocation: e.target.value})}>
                <option value="">— Сонгох —</option>
                {DELIVERY_LOCATIONS.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} style={{
          width: "100%", padding: "16px", background: "linear-gradient(135deg, #d4af37 0%, #8B6914 100%)",
          border: "none", borderRadius: 12, color: "#0a0a0a", fontSize: 16,
          fontWeight: 800, letterSpacing: 2, cursor: "pointer",
          boxShadow: "0 4px 24px rgba(212,175,55,0.3)", transition: "all 0.3s"
        }}>
          БОЛОМЖИТ УУРХАЙГ ХАЙХ →
        </button>

        {/* RESULTS */}
        {results !== null && (
          <div style={{ marginTop: 40 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#d4af37", marginBottom: 20 }}>
              Боломжит уурхайнууд ({results.length})
            </h3>

            {results.length === 0 ? (
              <div style={{
                background: "rgba(232,85,78,0.1)", border: "1px solid rgba(232,85,78,0.2)",
                borderRadius: 12, padding: 32, textAlign: "center"
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#e8554e" }}>
                  Таны шаардлагад нийцэх уурхай олдсонгүй
                </div>
                <div style={{ color: "#888", marginTop: 8, fontSize: 13 }}>
                  Чанарын шаардлагаа өөрчлөхийг оролдоно уу
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {results.map((m, i) => (
                  <div key={m.id} style={{
                    background: i === 0 ? "rgba(212,175,55,0.05)" : "rgba(20,20,20,0.8)",
                    borderRadius: 16, border: i === 0 ? "2px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    padding: 28, position: "relative", overflow: "hidden"
                  }}>
                    {i === 0 && (
                      <div style={{
                        position: "absolute", top: 12, right: 12,
                        background: "#d4af37", color: "#0a0a0a",
                        padding: "4px 12px", borderRadius: 20, fontSize: 10,
                        fontWeight: 800, letterSpacing: 1
                      }}>ХАМГИЙН ТОХИРОМЖТОЙ</div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: i === 0 ? "#d4af37" : "#e8e4de" }}>
                          {m.name}
                        </div>
                        <div style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
                          {m.region} · {m.operator} · {m.type}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 10, color: "#888" }}>Нийт зардал/тонн</div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: "#4ecdc4" }}>
                          ${m.totalPerTon.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: 20 }}>
                      {[
                        { l: "Илчлэг", v: `${m.quality.calorific} ккал/кг`, c: "#d4af37" },
                        { l: "Үнслэг", v: `${m.quality.ash}%`, c: "#6495ed" },
                        { l: "Чийглэг", v: `${m.quality.moisture}%`, c: "#6495ed" },
                        { l: "Хүхэр", v: `${m.quality.sulfur}%`, c: "#6495ed" },
                        { l: "Нүүрстөрөгч", v: `${m.quality.carbon}%`, c: "#4ecdc4" }
                      ].map((item, j) => (
                        <div key={j} style={{
                          background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 10, textAlign: "center"
                        }}>
                          <div style={{ fontSize: 9, color: "#666", letterSpacing: 0.5 }}>{item.l}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: item.c, marginTop: 3 }}>{item.v}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 12,
                      background: "rgba(212,175,55,0.03)", borderRadius: 10, padding: 14
                    }}>
                      <div>
                        <div style={{ fontSize: 9, color: "#888" }}>Тээвэрлэлтийн зай</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#ff9500" }}>{m.distance} км</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, color: "#888" }}>Нүүрсний үнэ</div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>${m.pricePerTon}/тн</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, color: "#888" }}>Тээврийн зардал</div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>${m.transportCost.toFixed(1)}/тн</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, color: "#888" }}>Төсвөөр авах боломжтой</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: m.maxAffordable >= form.quantity ? "#4ecdc4" : "#e8554e" }}>
                          {m.maxAffordable.toLocaleString()} тн
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {m.transport.map((t, j) => (
                        <span key={j} style={{
                          background: "rgba(100,149,237,0.1)", color: "#6495ed",
                          padding: "4px 10px", borderRadius: 4, fontSize: 11
                        }}>{t}</span>
                      ))}
                      {m.border && (
                        <span style={{
                          background: "rgba(255,149,0,0.1)", color: "#ff9500",
                          padding: "4px 10px", borderRadius: 4, fontSize: 11
                        }}>Хилийн боомт: {m.border}</span>
                      )}
                      <span style={{
                        background: "rgba(78,205,196,0.1)", color: "#4ecdc4",
                        padding: "4px 10px", borderRadius: 4, fontSize: 11
                      }}>Нөөц: {m.reserve} сая тн</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
