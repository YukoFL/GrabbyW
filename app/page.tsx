"use client";

import { useEffect, useRef, useState } from "react";

const GRAB_GREEN = "#00B14F";
const GRAB_DARK = "#0A0A0A";

const services = [
  {
    id: "grabcar",
    icon: "🚗",
    label: "GrabCar",
    color: "#00B14F",
    tagline: "Ride in comfort, arrive in style",
    detail: {
      description:
        "Book a private car with upfront fixed fares. GrabCar connects you with professional driver-partners for a safe, comfortable ride across Southeast Asia.",
      types: [
        { name: "JustGrab", desc: "Fastest pickup auto-assigns nearest taxi or private car at a fixed upfront fare.", eta: "2-5 min", price: "From Rp 15,000" },
        { name: "GrabCar", desc: "Standard 4-seater private car. Fixed price, air-conditioned comfort.", eta: "4-8 min", price: "From Rp 18,000" },
        { name: "GrabCar Plus", desc: "Newer vehicles with higher-rated drivers. Premium comfort for everyday journeys.", eta: "5-10 min", price: "From Rp 25,000" },
        { name: "GrabCar Premium", desc: "Executive sedans and SUVs. Perfect for business meetings and airport transfers.", eta: "8-12 min", price: "From Rp 45,000" },
        { name: "GrabCar 6", desc: "Spacious 6-seater for groups or families. More room, same reliability.", eta: "6-12 min", price: "From Rp 35,000" },
        { name: "GrabBike", desc: "Beat the traffic on a motorcycle. Fastest option for short distances.", eta: "2-4 min", price: "From Rp 8,000" },
        { name: "GrabFamily", desc: "4-seater with child safety seats included. Safe rides for little ones.", eta: "5-10 min", price: "From Rp 22,000" },
        { name: "GrabHitch", desc: "Carpooling share a ride with someone going your way. Eco-friendly and affordable.", eta: "10-20 min", price: "From Rp 10,000" },
      ],
      mapNote: "Grab operates in 200+ cities across 8 Southeast Asian countries",
    },
  },
  {
    id: "grabfood",
    icon: "🍜",
    label: "GrabFood",
    color: "#FF6B35",
    tagline: "Your favourite food, at your door",
    detail: {
      description:
        "Order from thousands of restaurants and hawker stalls. Real-time tracking, 30-minute delivery, and exclusive promos every day.",
      types: [
        { name: "GrabFood Delivery", desc: "Order from your favourite restaurants from local warungs to premium dining.", eta: "20-35 min", price: "Free delivery with GrabUnlimited" },
        { name: "GrabFood Express", desc: "Priority delivery for when you need it fast. Dedicated courier, direct route.", eta: "15-20 min", price: "Rp 5,000 express fee" },
        { name: "GrabMart", desc: "Groceries, essentials, beauty products delivered from convenience stores.", eta: "25-40 min", price: "From Rp 8,000 delivery" },
        { name: "GrabKitchen", desc: "Cloud kitchen exclusive brands with restaurant-quality meals made fresh.", eta: "20-30 min", price: "Menu prices vary" },
      ],
      mapNote: "Available in 200+ cities. 150,000+ restaurant partners across Southeast Asia.",
    },
  },
  {
    id: "grabexpress",
    icon: "📦",
    label: "GrabExpress",
    color: "#6C63FF",
    tagline: "Send anything, anywhere, instantly",
    detail: {
      description:
        "Reliable same-day courier service for documents, parcels, and gifts. Track every delivery in real-time with proof of delivery.",
      types: [
        { name: "Instant Delivery", desc: "Send documents and small packages. Driver picks up within minutes.", eta: "Real-time pickup", price: "From Rp 12,000" },
        { name: "Same-Day Delivery", desc: "Schedule pickup and deliver within the day. Perfect for business parcels.", eta: "Within the day", price: "From Rp 15,000" },
        { name: "GrabExpress Sameday", desc: "Flexible scheduling with insurance coverage up to Rp 5,000,000.", eta: "Scheduled", price: "From Rp 18,000" },
        { name: "Business Bulk Send", desc: "API-integrated bulk delivery for e-commerce and businesses.", eta: "Batch scheduling", price: "Custom pricing" },
      ],
      mapNote: "Insured deliveries in 50+ cities. Proof of delivery with every order.",
    },
  },
  {
    id: "grabpay",
    icon: "💳",
    label: "GrabPay",
    color: "#00B14F",
    tagline: "One wallet for everything",
    detail: {
      description:
        "Southeast Asia's leading digital wallet. Pay for rides, food, groceries, and at 600,000+ merchants. GrabPay is accepted online and offline across the region.",
      types: [
        { name: "GrabPay Wallet", desc: "Store credits, top up, send and receive money instantly with friends and family.", eta: "Instant", price: "Free" },
        { name: "GrabPay Card", desc: "Virtual and physical Mastercard linked to your GrabPay wallet. Use anywhere Mastercard is accepted.", eta: "Instant", price: "Free issuance" },
        { name: "PayLater", desc: "Buy now, consolidate into a monthly bill. Smart instalment payment for eligible users.", eta: "Instant approval", price: "Flexible repayment" },
        { name: "OVO Integration", desc: "Seamlessly link your OVO wallet for expanded payment options in Indonesia.", eta: "Instant", price: "Free linking" },
        { name: "GrabRewards", desc: "Earn points on every transaction and redeem for vouchers, discounts, and cashback.", eta: "Instant earn", price: "Earn 1pt per Rp 1,000" },
        { name: "GrabInsurance", desc: "Personal accident, device, and travel insurance directly in-app.", eta: "Instant coverage", price: "From Rp 5,000/month" },
      ],
      mapNote: "600,000+ merchant partners. First fintech with e-money licenses in 6 ASEAN economies.",
    },
  },
  {
    id: "grabtravel",
    icon: "✈️",
    label: "GrabTravel",
    color: "#0099CC",
    tagline: "Journeys made seamless",
    detail: {
      description:
        "From airport transfers to hotel bookings, plan your entire trip within the Grab app. Reliable, pre-scheduled rides to major airports with luggage-friendly vehicles.",
      types: [
        { name: "Airport Transfer", desc: "Pre-book your ride to Soekarno-Hatta (CGK), Changi (SIN), KLIA, or any regional airport. Fixed fare, no surge pricing.", eta: "Pre-scheduled", price: "Fixed fare from Rp 120,000" },
        { name: "Hotel Bookings", desc: "Book curated hotels across Southeast Asia. Earn GrabRewards points on stays.", eta: "Instant confirmation", price: "Best rate guarantee" },
        { name: "GrabCoach", desc: "Comfortable inter-city bus and minibus bookings for longer journeys.", eta: "Scheduled departures", price: "From Rp 50,000" },
        { name: "GrabExec", desc: "Luxury limousine service for business travel, events, and VIP airport pickups.", eta: "15-20 min", price: "From Rp 150,000" },
      ],
      airports: [
        { name: "Soekarno-Hatta International", code: "CGK", city: "Jakarta, Indonesia", terminal: "T1, T2, T3" },
        { name: "Changi Airport", code: "SIN", city: "Singapore", terminal: "T1, T2, T3, T4" },
        { name: "Kuala Lumpur International", code: "KUL", city: "Kuala Lumpur, Malaysia", terminal: "KLIA, KLIA2" },
        { name: "Ninoy Aquino International", code: "MNL", city: "Manila, Philippines", terminal: "T1, T2, T3, T4" },
      ],
      mapNote: "Airport transfer service available at 30+ major airports across Southeast Asia.",
    },
  },
];

const reviews = [
  { name: "Artoria", city: "Camelot", avatar: "AR", rating: 5, text: "GrabFood has helped me a lotI’m basically hungry all the time. Whenever I’m running low on food (which is… often), I end up ordering multiple portions of rice Honestly, without GrabFood, I’d probably be in a constant state of “what do I eat now?” panic. It’s been a lifesaver", service: "GrabFood" },
  { name: "Perlica", city: "Dijang", avatar: "PE", rating: 5, text: "Quick, efficient, and wonderful I use it to travel between Dijang and Wuling because Tang Tang keeps messing up one of our sub-packs, and I still have a lot of work to handle in Dijang. Overall, it’s been great.", service: "GrabCar" },
  { name: "Roland", city: "District 9", avatar: "RO", rating: 5, text: "Haha, I’ve been pretty busy with fixer work lately, while my wife takes care of our baby. I constantly need to send baby supplies to her from another district, so this service has been incredibly helpful. Honestly, it’s been wonderful and makes everything so much easier.", service: "GrabExpress" },
  { name: "Phainon", city: "Aedes Elysiae", avatar: "PH", rating: 5, text: "Honestly, I’ve had quite a bit of trouble with payments since I keep losing my wallet Cypher is always messing with me. That’s why, when I found out I could secure my money without the risk of it being stolen, I felt incredibly relieved. Thanks, GrabPay!", service: "GrabPay" },
  { name: "Gojo", city: "Kyoto", avatar: "GJ", rating: 5, text: "Wonderful service it gets me around with hardly any delays. That’s exactly why I’ll be relying on it for an important event in Shinjuku. Overall, really good service.", service: "GrabTravel" },
  { name: "Shiroko", city: "Abyddos", avatar: "SH", rating: 4, text: "Sensei has been very hungry lately, and I haven’t been able to properly cook his daily meals. That’s why I’ve been relying on GrabFood to make sure he still gets the nutrients he needs. I’m really grateful that I can continue taking care of him this way.", service: "GrabFood" },
];

const stats = [
  { value: "75%+", label: "Market Share in SEA ride-hailing" },
  { value: "200+", label: "Cities across Southeast Asia" },
  { value: "2.8M+", label: "Driver and delivery partners" },
  { value: "8", label: "Countries of operation" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function AnimatedNumber({ target }: { target: string }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  const num = parseFloat(target);

  useEffect(() => {
    if (!inView || Number.isNaN(num)) return;

    let current = 0;
    const duration = 1800;
    const steps = 60;
    const increment = num / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, num]);

  const display = target.includes(".") ? count.toFixed(1) : Math.floor(count).toString();
  return <span ref={ref}>{target.replace(/[\d.]+/, display)}</span>;
}

function ServiceModal({
  service,
  onClose,
}: {
  service: (typeof services)[number] | null;
  onClose: () => void;
}) {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!service) return null;

  const d = service.detail;
  const hasAirports = "airports" in d && Array.isArray(d.airports);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#111",
          border: `1px solid ${service.color}30`,
          borderRadius: 24,
          maxWidth: 760,
          width: "100%",
          maxHeight: "88vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity:0; transform:scale(0.88) translateY(20px); }
            to { opacity:1; transform:scale(1) translateY(0); }
          }
        `}</style>

        <div
          style={{
            padding: "28px 32px 20px",
            background: `linear-gradient(135deg, ${service.color}18, transparent)`,
            borderBottom: "1px solid #222",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 40 }}>{service.icon}</div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{service.label}</div>
              <div style={{ color: service.color, fontSize: 14, marginTop: 2 }}>{service.tagline}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#222",
              border: "none",
              color: "#888",
              width: 36,
              height: 36,
              borderRadius: "50%",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: "20px 32px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Service Types", ...(hasAirports ? ["Airport Hubs"] : []), "Coverage"].map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: `1px solid ${tab === i ? service.color : "#333"}`,
                background: tab === i ? service.color : "transparent",
                color: tab === i ? "#000" : "#888",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ overflowY: "auto", padding: "20px 32px 28px" }}>
          <p style={{ color: "#aaa", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{d.description}</p>

          {tab === 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {d.types.map((t, i) => (
                <div
                  key={i}
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: 16,
                    padding: "16px 18px",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${service.color}60`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
                >
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 15, marginBottom: 6 }}>{t.name}</div>
                  <div style={{ color: "#888", fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{t.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: service.color, fontSize: 12, fontWeight: 600 }}>⏱ {t.eta}</span>
                    <span style={{ color: "#666", fontSize: 12 }}>{t.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 1 && hasAirports && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
             {(d as any).airports.map((a: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: 16,
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      background: service.color,
                      color: "#000",
                      fontWeight: 900,
                      fontSize: 18,
                      borderRadius: 12,
                      padding: "8px 14px",
                      minWidth: 64,
                      textAlign: "center",
                    }}
                  >
                    {a.code}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{a.name}</div>
                    <div style={{ color: "#888", fontSize: 13 }}>
                      {a.city} · Terminals: {a.terminal}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", color: service.color, fontSize: 13, fontWeight: 600 }}>
                    Grab Available ✓
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === (hasAirports ? 2 : 1) && (
            <div style={{ background: "#1a1a1a", borderRadius: 16, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Coverage Area</div>
              <div style={{ color: "#aaa", fontSize: 14 }}>{d.mapNote}</div>
              <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                {["Indonesia", "Singapore", "Malaysia", "Philippines", "Thailand", "Vietnam", "Myanmar", "Cambodia"].map((c) => (
                  <span
                    key={c}
                    style={{
                      background: `${service.color}20`,
                      color: service.color,
                      padding: "4px 14px",
                      borderRadius: 20,
                      fontSize: 13,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavBar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #1a1a1a" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <img src="/Grab_Logo_svg.png" alt="Grab" style={{ height: 28, objectFit: "contain" }} />
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["Services", "About", "Careers", "Blog"].map((l) => (
          <a
            key={l}
            href="#"
            style={{ color: "#aaa", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GRAB_GREEN)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
          >
            {l}
          </a>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          style={{
            padding: "9px 20px",
            background: "transparent",
            border: "1px solid #333",
            color: "#fff",
            borderRadius: 8,
            fontSize: 14,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Log in
        </button>
        <button
          style={{
            padding: "9px 20px",
            background: GRAB_GREEN,
            border: "none",
            color: "#000",
            borderRadius: 8,
            fontSize: 14,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Download App
        </button>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  };

  return (
    <section
      onMouseMove={handleMouse}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: GRAB_DARK,
        paddingTop: 80,
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, #00B14F18, transparent 70%)" }} />
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#00B14F08",
          filter: "blur(80px)",
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: "transform 0.1s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "#00B14F10",
          filter: "blur(60px)",
          transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`,
          transition: "transform 0.1s",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div style={{ textAlign: "center", maxWidth: 900, padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#00B14F15",
            border: "1px solid #00B14F30",
            borderRadius: 30,
            padding: "6px 18px",
            marginBottom: 32,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.1s",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: GRAB_GREEN,
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          <span style={{ color: GRAB_GREEN, fontSize: 13, fontWeight: 600 }}>Now serving 200+ cities in Southeast Asia</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(52px, 8vw, 96px)",
            fontWeight: 900,
            lineHeight: 1.0,
            color: "#fff",
            margin: "0 0 24px",
            letterSpacing: "-3px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease 0.2s",
          }}
        >
          Everywhere
          <br />
          <span style={{ color: GRAB_GREEN, position: "relative" }}>Grab</span>
          <br />
          Got you
        </h1>

        <p
          style={{
            color: "#888",
            fontSize: "clamp(16px, 2vw, 20px)",
            lineHeight: 1.7,
            maxWidth: 580,
            margin: "0 auto 40px",
            opacity: loaded ? 1 : 0,
            transition: "all 0.9s ease 0.35s",
            transform: loaded ? "translateY(0)" : "translateY(20px)",
          }}
        >
          Rides, food, deliveries, payments, and more. One app that powers daily life across Southeast Asia for over 35 million users.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transition: "all 0.9s ease 0.5s",
            transform: loaded ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <button
            style={{
              padding: "16px 36px",
              background: GRAB_GREEN,
              border: "none",
              color: "#000",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              letterSpacing: 0.3,
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 0 40px #00B14F40",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 0 60px #00B14F60";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 40px #00B14F40";
            }}
          >
            Download App
          </button>
          <button
            style={{
              padding: "16px 36px",
              background: "transparent",
              border: "1px solid #333",
              color: "#fff",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = GRAB_GREEN;
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#333";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Learn More
          </button>
        </div>

        <div
          style={{
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
            gap: "clamp(32px, 6vw, 80px)",
            opacity: loaded ? 1 : 0,
            transition: "all 1s ease 0.7s",
            flexWrap: "wrap",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#fff" }}>
                <AnimatedNumber target={s.value} />
              </div>
              <div style={{ color: "#555", fontSize: "clamp(11px, 1.2vw, 13px)", marginTop: 4, maxWidth: 120 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:0.6;transform:scale(1.3)}
        }
      `}</style>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  inView,
  onSelect,
}: {
  service: (typeof services)[number];
  index: number;
  inView: boolean;
  onSelect: (service: (typeof services)[number]) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(service)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1a1a1a" : "#141414",
        border: `1px solid ${hovered ? `${service.color}50` : "#1f1f1f"}`,
        borderRadius: 20,
        padding: "32px 28px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: inView ? (hovered ? "translateY(-6px) scale(1.01)" : "translateY(0)") : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `${service.color}${hovered ? "15" : "08"}`,
          transition: "all 0.3s",
        }}
      />
      <div style={{ fontSize: 40, marginBottom: 20 }}>{service.icon}</div>
      <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 10px", letterSpacing: -0.5 }}>{service.label}</h3>
      <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>{service.tagline}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: service.color, fontSize: 13, fontWeight: 600 }}>
        <span>Explore service</span>
        <span style={{ transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "none" }}>→</span>
      </div>
    </div>
  );
}

function ServicesSection({ onSelect }: { onSelect: (service: (typeof services)[number]) => void }) {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} id="services" style={{ padding: "120px 48px", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 70,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <div style={{ color: GRAB_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
            Our Platform
          </div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: -2 }}>
            Services Built for
            <br />
            Southeast Asia
          </h2>
          <p style={{ color: "#666", fontSize: 16, marginTop: 20, maxWidth: 480, margin: "20px auto 0" }}>
            Click any service to explore details, types, pricing, and coverage.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} inView={inView} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewSection() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % reviews.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} style={{ padding: "120px 48px", background: GRAB_DARK, overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 70,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
            transition: "all 0.8s",
          }}
        >
          <div style={{ color: GRAB_GREEN, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
            Social Proof
          </div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: -2 }}>
            Loved Across
            <br />
            Southeast Asia
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {reviews.map((r, i) => (
            <div
              key={i}
              style={{
                background: "#111",
                border: `1px solid ${i === active ? `${GRAB_GREEN}40` : "#1f1f1f"}`,
                borderRadius: 20,
                padding: "28px 26px",
                transition: "all 0.4s ease",
                transform: inView ? "none" : "translateY(40px)",
                opacity: inView ? 1 : 0,
                transitionDelay: `${i * 0.1}s`,
                boxShadow: i === active ? `0 0 30px ${GRAB_GREEN}15` : "none",
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${GRAB_GREEN}, #006b30)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 15,
                    color: "#000",
                  }}
                >
                  {r.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{r.name}</div>
                  <div style={{ color: "#555", fontSize: 12 }}>
                    {r.city} · {r.service}
                  </div>
                </div>
                <div style={{ marginLeft: "auto", color: "#FFB800", fontSize: 13 }}>{"★".repeat(r.rating)}</div>
              </div>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} style={{ padding: "100px 48px", background: "#0d0d0d" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
          background: "linear-gradient(135deg, #00B14F18, #006b3010)",
          border: "1px solid #00B14F25",
          borderRadius: 32,
          padding: "72px 48px",
          opacity: inView ? 1 : 0,
          transform: inView ? "scale(1)" : "scale(0.95)",
          transition: "all 0.9s cubic-bezier(0.34,1.56,0.64,1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -80, left: -80, width: 250, height: 250, borderRadius: "50%", background: "#00B14F10", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "#00B14F08", filter: "blur(50px)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🚀</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#fff", margin: "0 0 20px", letterSpacing: -2 }}>
            Start Your Grab Journey
          </h2>
          <p style={{ color: "#777", fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px" }}>
            Join 35 million users who trust Grab for rides, food, deliveries, and payments every single day across Southeast Asia.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                padding: "16px 40px",
                background: GRAB_GREEN,
                border: "none",
                color: "#000",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 0 40px #00B14F40",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Get the App
            </button>
            <button
              style={{
                padding: "16px 40px",
                background: "transparent",
                border: "1px solid #333",
                color: "#fff",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = GRAB_GREEN)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#333")}
            >
              Become a Partner
            </button>
          </div>

          <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {["🍎 App Store", "▶ Google Play"].map((s) => (
              <div key={s} style={{ color: "#666", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#080808", borderTop: "1px solid #1a1a1a", padding: "60px 48px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <img src="/Grab_Logo_svg.png" alt="Grab" style={{ height: 24, marginBottom: 20, objectFit: "contain" }} />
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              Southeast Asia's everyday everything app. Driving the region forward, one ride at a time.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {["𝕏", "f", "in", "📸"].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    border: "1px solid #222",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = GRAB_GREEN;
                    e.currentTarget.style.color = GRAB_GREEN;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#222";
                    e.currentTarget.style.color = "#666";
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {[
            { title: "Services", links: ["GrabCar", "GrabFood", "GrabExpress", "GrabPay", "GrabTravel"] },
            { title: "Company", links: ["About Us", "Newsroom", "Careers", "Sustainability"] },
            { title: "Support", links: ["Help Center", "Safety", "Driver Partners", "Merchant Partners"] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 20 }}>{col.title}</div>
              {col.links.map((l) => (
                <div
                  key={l}
                  style={{ color: "#555", fontSize: 14, marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GRAB_GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                >
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ color: "#444", fontSize: 13 }}>2025 Grab Holdings Inc. All rights reserved to SilverWolf Lv 999.</div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
              <span key={l} style={{ color: "#444", fontSize: 13, cursor: "pointer" }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<(typeof services)[number] | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: GRAB_DARK, minHeight: "100vh", color: "#fff" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      `}</style>

      <NavBar scrolled={scrolled} />
      <HeroSection />
      <ServicesSection onSelect={setSelectedService} />
      <ReviewSection />
      <CTASection />
      <Footer />
      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
    </div>
  );
}