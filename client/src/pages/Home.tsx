import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CarFront,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Fuel,
  Gauge,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { vehicles, type Vehicle } from "@/data/vehicles";
import { calculateFinancing, formatBRL } from "@/lib/financing";
import {
  isFormspreeConfigured,
  WHATSAPP_NUMBER,
  whatsappLink,
} from "@/lib/config";
import { submitContactForm } from "@/lib/formspree";
import { assetPath } from "@/lib/assetPath";

const navItems = [
  ["Início", "inicio"],
  ["Veículos", "veiculos"],
  ["Financiamento", "financiamento"],
  ["Como funciona", "como-funciona"],
  ["Clientes", "clientes"],
  ["Sobre", "sobre"],
  ["Contato", "contato"],
] as const;

function Logo({ small = false }: { small?: boolean }) {
  return (
    <a
      className={`brand-lockup${small ? " brand-lockup--small" : ""}`}
      href="#inicio"
      aria-label="SunCar Multimarcas — início"
    >
      <img src={assetPath("logo.png")} alt="SunCar" />
      <span className="brand-caption">
        <span>MULTIMARCAS</span> <i />
      </span>
    </a>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow${light ? " eyebrow--light" : ""}`}>
      <span className="eyebrow-line" />
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  light = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading${light ? " section-heading--light" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function VehicleCard({
  vehicle,
  onInterest,
  onSimulate,
}: {
  vehicle: Vehicle;
  onInterest: (vehicle: Vehicle) => void;
  onSimulate: (vehicle: Vehicle) => void;
}) {
  return (
    <article className="vehicle-card">
      <div className="vehicle-image-wrap">
        <img
          src={vehicle.image}
          alt={`Imagem ilustrativa de um ${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
        />
        <span className="vehicle-badge">
          <span />
          {vehicle.badge}
        </span>
        <button
          className="vehicle-arrow"
          type="button"
          onClick={() => onInterest(vehicle)}
          aria-label={`Tenho interesse no ${vehicle.brand} ${vehicle.model}`}
        >
          <ArrowUpRight size={19} strokeWidth={1.8} />
        </button>
      </div>
      <div className="vehicle-card-body">
        <div className="vehicle-name-line">
          <div>
            <span className="vehicle-brand">{vehicle.brand}</span>
            <h3>{vehicle.model}</h3>
          </div>
          <span className="vehicle-year">{vehicle.year}</span>
        </div>
        <p className="vehicle-version">{vehicle.version}</p>
        <div className="vehicle-specs">
          <span>
            <Gauge size={14} />
            {vehicle.mileage.toLocaleString("pt-BR")} km
          </span>
          <span>
            <CreditCard size={14} />
            {vehicle.transmission}
          </span>
          <span>
            <Fuel size={14} />
            {vehicle.fuel}
          </span>
        </div>
        <div className="vehicle-price-label">Valor demonstrativo</div>
        <strong className="vehicle-price">{formatBRL(vehicle.price)}</strong>
        <div className="vehicle-actions">
          <button
            className="button button--dark button--small"
            type="button"
            onClick={() => onInterest(vehicle)}
          >
            Tenho interesse <ArrowUpRight size={15} />
          </button>
          <button
            className="button button--text button--small"
            type="button"
            onClick={() => onSimulate(vehicle)}
          >
            Simular financiamento <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function BrazilRouteGraphic() {
  return (
    <div
      className="route-visual"
      aria-label="Ilustração conceitual do percurso de entrega a partir de Arapiraca"
    >
      <svg
        className="brazil-outline"
        viewBox="0 0 300 340"
        role="img"
        aria-labelledby="map-title"
      >
        <title id="map-title">
          Mapa estilizado do Brasil, com origem em Alagoas
        </title>
        <path
          d="M107 14 139 23 157 38 184 39 197 57 216 64 224 89 248 102 241 125 260 144 249 167 262 184 245 204 250 227 230 238 228 263 207 272 195 298 174 291 159 318 142 311 132 288 111 281 106 261 86 256 80 239 61 233 51 215 35 203 40 182 28 169 37 148 30 130 43 109 42 84 57 70 60 47 82 43 94 24Z"
          fill="rgba(255,255,255,.035)"
          stroke="rgba(255,255,255,.22)"
          strokeWidth="1.4"
        />
        <path
          className="route-dash"
          d="M169 94 C178 124 146 140 148 172 S166 215 130 241"
          fill="none"
          stroke="#d80e15"
          strokeWidth="2"
          strokeDasharray="4 6"
        />
        <circle cx="169" cy="94" r="4.5" fill="#fff" />
        <circle
          cx="169"
          cy="94"
          r="9"
          fill="none"
          stroke="rgba(255,255,255,.32)"
        />
        <circle cx="130" cy="241" r="5" fill="#d80e15" />
        <circle cx="130" cy="241" r="11" fill="rgba(216,14,21,.17)" />
        <text
          x="183"
          y="91"
          fill="rgba(255,255,255,.72)"
          fontSize="8"
          fontFamily="sans-serif"
        >
          NORTE / NORDESTE
        </text>
        <text
          x="62"
          y="260"
          fill="rgba(255,255,255,.72)"
          fontSize="8"
          fontFamily="sans-serif"
        >
          ARAPIRACA · AL
        </text>
      </svg>
      <div className="route-caption">
        <span className="route-pulse" />
        Origem: Arapiraca, Alagoas
      </div>
      <div className="route-tag route-tag--top">
        <MapPin size={14} /> ALAGOAS
      </div>
      <div className="route-tag route-tag--bottom">
        <Truck size={14} /> DESTINO: VOCÊ
      </div>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [floatingContactVisible, setFloatingContactVisible] = useState(true);
  const [selectedId, setSelectedId] = useState(vehicles[0]?.id ?? "");
  const [downPayment, setDownPayment] = useState(25000);
  const [months, setMonths] = useState(48);
  const [railIndex, setRailIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const [contactVehicle, setContactVehicle] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [phone, setPhone] = useState("");
  const railRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const selectedVehicle = vehicles.find(vehicle => vehicle.id === selectedId);
  const selectedPrice = selectedVehicle?.price ?? 0;
  const estimate = useMemo(
    () => calculateFinancing(selectedPrice, downPayment, months),
    [selectedPrice, downPayment, months]
  );
  const whatsAppConfigured = WHATSAPP_NUMBER.replace(/\D/g, "").length >= 12;
  const formspreeConfigured = isFormspreeConfigured();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    const node = railRef.current;
    if (!node) return;
    const update = () => {
      const firstCard = node.querySelector<HTMLElement>(".vehicle-card");
      if (!firstCard) return;
      const gap =
        Number.parseFloat(getComputedStyle(node).columnGap || "20") || 20;
      const index = Math.round(node.scrollLeft / (firstCard.offsetWidth + gap));
      setRailIndex(Math.max(0, Math.min(vehicles.length - 1, index)));
    };
    node.addEventListener("scroll", update, { passive: true });
    return () => node.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const section = document.getElementById("contato");
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFloatingContactVisible(!entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function scrollRail(direction: -1 | 1) {
    const node = railRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>(".vehicle-card");
    const gap = Number.parseFloat(getComputedStyle(node).columnGap || "0") || 0;
    const step = (card?.offsetWidth ?? 340) + gap;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  function closeMobileMenu() {
    setMobileOpen(false);
    window.requestAnimationFrame(() =>
      mobileMenuButtonRef.current?.focus({ preventScroll: true })
    );
  }

  function goToFinancing(vehicle: Vehicle) {
    setSelectedId(vehicle.id);
    setDownPayment(Math.min(25000, Math.round(vehicle.price * 0.2)));
    document
      .getElementById("financiamento")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToContact(vehicle: Vehicle) {
    setContactVehicle(vehicle.id);
    document
      .getElementById("contato")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function contactByWhatsApp(message: string) {
    if (!whatsAppConfigured) {
      setNotice(
        "O número oficial do WhatsApp ainda não foi cadastrado. Use o formulário para solicitar contato."
      );
      window.setTimeout(() => setNotice(""), 5200);
      return;
    }
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : "";
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setFormError("Confira o DDD e o número do WhatsApp.");
      return;
    }
    if (!formspreeConfigured) {
      setFormStatus("error");
      setFormError(
        "O Formspree ainda não está configurado. Copie o Form ID do painel para VITE_FORMSPREE_FORM_ID em .env.local e gere o site novamente. Nenhum dado foi enviado."
      );
      return;
    }
    const formData = new FormData(form);
    formData.set("phone", phone);
    formData.set(
      "_subject",
      `Novo contato SunCar — ${String(formData.get("name") || "Cliente")}`
    );
    formData.set("source", "Landing page SunCar Multimarcas");
    setFormStatus("loading");
    try {
      await submitContactForm(formData);
      setSuccessMessage(
        "Sua mensagem foi aceita pelo Formspree. A equipe da SunCar poderá responder usando os dados de contato informados."
      );
      setFormStatus("success");
      form.reset();
      setPhone("");
      setContactVehicle("");
    } catch (error) {
      setFormStatus("error");
      setFormError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar agora. Tente novamente em instantes."
      );
    }
  }

  const selectedContactOption = contactVehicle;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header
        className={`site-header${scrolled ? " site-header--scrolled" : ""}`}
      >
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#financiamento">
            Simular financiamento <ArrowUpRight size={16} />
          </a>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            ref={mobileMenuButtonRef}
            onClick={() => setMobileOpen(open => !open)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          className={`mobile-menu${mobileOpen ? " mobile-menu--open" : ""}`}
          aria-hidden={!mobileOpen}
        >
          <nav aria-label="Navegação mobile">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={closeMobileMenu}
              >
                {label}
                <ArrowUpRight size={15} />
              </a>
            ))}
            <a
              className="mobile-menu-cta"
              href="#financiamento"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={closeMobileMenu}
            >
              Simular financiamento <ArrowRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero-section" id="inicio">
          <div
            className="hero-photo"
            style={
              {
                "--hero-image": `url("${assetPath("hero-editorial-opt.jpg")}")`,
              } as React.CSSProperties
            }
            aria-hidden="true"
          />
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="kicker-dot" /> SUNCAR MULTIMARCAS{" "}
                <span className="kicker-divider" /> <MapPin size={13} />{" "}
                ARAPIRACA — AL
              </div>
              <h1>
                Seu próximo carro
                <br />
                <span>começa aqui.</span>
              </h1>
              <p className="hero-subtitle">
                Veículos, atendimento próximo e orientação para você comprar com
                mais clareza — de onde estiver.
              </p>
              <div className="hero-location">
                <span className="location-pin">
                  <MapPin size={15} />
                </span>
                <span>
                  <strong>Uma nova sede em Arapiraca</strong>
                  <br />
                  Alagoas. Um novo jeito de comprar.
                </span>
              </div>
              <div className="hero-actions">
                <a className="button button--red" href="#veiculos">
                  Explorar veículos <ArrowRight size={17} />
                </a>
                <a
                  className="button button--outline-light"
                  href="#financiamento"
                >
                  Simular financiamento <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="hero-proof-row">
                <div>
                  <span className="proof-icon">
                    <ShieldCheck size={17} />
                  </span>
                  <span>
                    Atendimento
                    <br />
                    <strong>humanizado</strong>
                  </span>
                </div>
                <i />
                <div>
                  <span className="proof-icon">
                    <CreditCard size={17} />
                  </span>
                  <span>
                    Financiamento
                    <br />
                    <strong>sob consulta</strong>
                  </span>
                </div>
                <i />
                <div>
                  <span className="proof-icon">
                    <Truck size={17} />
                  </span>
                  <span>
                    Entrega para
                    <br />
                    <strong>todo o Brasil</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="hero-aside">
              <span>
                ESCOLHAS QUE
                <br />
                MOVEM VOCÊ
              </span>
              <div className="hero-aside-line" />
              <ArrowDownRight size={20} />
            </div>
            <div className="hero-index">
              <b>01</b>
              <span>— 07</span>
              <i />
            </div>
          </div>
          <div className="hero-bottom-line" aria-hidden="true">
            <span>BUILT AROUND YOUR NEXT MOVE</span>
            <span>
              ALAGOAS · BRASIL <ArrowDownRight size={14} />
            </span>
          </div>
        </section>

        <section className="trust-strip" aria-label="Compromissos SunCar">
          <div className="container trust-strip-inner">
            <span>
              <Check size={14} /> Transparência em cada etapa
            </span>
            <span>
              <Check size={14} /> Compra assistida à distância
            </span>
            <span>
              <Check size={14} /> Condições sob consulta
            </span>
            <span>
              <Check size={14} /> Uma equipe do início à entrega
            </span>
          </div>
        </section>

        <section className="section vehicles-section" id="veiculos">
          <div className="container">
            <div className="vehicles-heading-row">
              <SectionHeading
                eyebrow="01 / SELEÇÃO SUNCAR"
                title="Escolha o carro que combina com você"
                copy="Uma vitrine demonstrativa para você conhecer a experiência SunCar. Consulte disponibilidade e condições com a equipe."
              />
              <div
                className="carousel-controls"
                aria-label="Controles da vitrine"
              >
                <button
                  type="button"
                  onClick={() => scrollRail(-1)}
                  aria-label="Veículo anterior"
                >
                  <ChevronLeft size={19} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail(1)}
                  aria-label="Próximo veículo"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>
            <div className="inventory-disclaimer">
              <Sparkles size={14} /> Veículos, imagens e valores são exemplos
              demonstrativos — confirme o estoque real antes de publicar.
            </div>
            <div
              className="vehicle-rail"
              ref={railRef}
              role="region"
              aria-roledescription="carrossel"
              aria-label="Carrossel de veículos demonstrativos"
              tabIndex={0}
            >
              {vehicles.length ? (
                vehicles.map(vehicle => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onInterest={goToContact}
                    onSimulate={goToFinancing}
                  />
                ))
              ) : (
                <p className="inventory-empty">
                  Em breve, novos veículos estarão disponíveis. Fale com a
                  equipe para consultar opções.
                </p>
              )}
            </div>
            <div className="carousel-footer">
              <div
                className="carousel-dots"
                aria-label="Navegação do carrossel"
              >
                {vehicles.map((vehicle, index) => (
                  <button
                    key={vehicle.id}
                    type="button"
                    className={railIndex === index ? "active" : ""}
                    aria-label={`Ir para o veículo ${index + 1}`}
                    aria-current={railIndex === index ? "true" : undefined}
                    onClick={() => {
                      const node = railRef.current;
                      const card =
                        node?.querySelector<HTMLElement>(".vehicle-card");
                      if (node && card)
                        node.scrollTo({
                          left:
                            index *
                            (card.offsetWidth +
                              (Number.parseFloat(
                                getComputedStyle(node).columnGap || "0"
                              ) || 0)),
                          behavior: "smooth",
                        });
                    }}
                  />
                ))}
              </div>
              <a className="text-link" href="#contato">
                Quer outro modelo? Fale com a gente <ArrowUpRight size={15} />
              </a>
              <span className="carousel-count">
                <b>
                  {String(vehicles.length ? railIndex + 1 : 0).padStart(2, "0")}
                </b>{" "}
                / {String(vehicles.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </section>

        <section className="section financing-section" id="financiamento">
          <div className="container financing-layout">
            <div className="financing-intro">
              <SectionHeading
                eyebrow="02 / PLANEJE SUA COMPRA"
                title="Uma parcela que cabe no seu plano."
                copy="Veja o saldo financiado e uma divisão matemática simples pelo prazo escolhido — sem juros ou tarifas."
              />
              <div className="financing-points">
                <div>
                  <span className="point-icon">
                    <ShieldCheck size={18} />
                  </span>
                  <span>
                    <strong>Conversa clara, sem pressão.</strong>
                    <small>Entenda cada etapa antes de decidir.</small>
                  </span>
                </div>
                <div>
                  <span className="point-icon">
                    <CircleHelp size={18} />
                  </span>
                  <span>
                    <strong>Seu perfil é único.</strong>
                    <small>Consulte opções adequadas ao seu momento.</small>
                  </span>
                </div>
              </div>
              <p className="credit-note">
                Analisamos diferentes perfis de crédito. As condições dependem
                do veículo, do perfil da pessoa e da instituição financeira.
              </p>
            </div>
            <div className="calculator-card">
              <div className="calculator-topline">
                <span>
                  <span className="live-dot" /> SIMULADOR ILUSTRATIVO
                </span>
                <span>01 — 03</span>
              </div>
              <div className="calc-vehicle-field">
                <label htmlFor="vehicle-select">Veículo de interesse</label>
                <div className="select-wrap">
                  <CarFront size={17} />
                  <select
                    id="vehicle-select"
                    disabled={!selectedVehicle}
                    value={selectedId}
                    onChange={event => {
                      const vehicle = vehicles.find(
                        item => item.id === event.target.value
                      );
                      if (!vehicle) return;
                      setSelectedId(vehicle.id);
                      setDownPayment(
                        Math.min(downPayment, Math.round(vehicle.price * 0.7))
                      );
                    }}
                  >
                    {vehicles.length ? (
                      vehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.brand} {vehicle.model} · {vehicle.year}
                        </option>
                      ))
                    ) : (
                      <option value="">Nenhum veículo cadastrado</option>
                    )}
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>
              <div className="calc-price-row">
                <span>Valor do veículo</span>
                <strong>{formatBRL(selectedPrice)}</strong>
              </div>
              <div className="calc-input-block">
                <div className="calc-field-top">
                  <label htmlFor="entry-number">Valor de entrada</label>
                  <div className="currency-input">
                    <span>R$</span>
                    <input
                      id="entry-number"
                      inputMode="numeric"
                      type="number"
                      min="0"
                      max={selectedPrice}
                      step="500"
                      value={downPayment}
                      disabled={!selectedVehicle}
                      onChange={event =>
                        setDownPayment(
                          Math.max(
                            0,
                            Math.min(
                              selectedPrice,
                              Number(event.target.value) || 0
                            )
                          )
                        )
                      }
                    />
                  </div>
                </div>
                <input
                  className="range-control"
                  aria-label="Ajustar valor de entrada"
                  type="range"
                  min="0"
                  max={Math.round(selectedPrice * 0.7)}
                  step="500"
                  value={Math.min(downPayment, Math.round(selectedPrice * 0.7))}
                  disabled={!selectedVehicle}
                  onChange={event => setDownPayment(Number(event.target.value))}
                  style={
                    {
                      "--range-progress": selectedPrice
                        ? `${Math.min(100, (downPayment / (selectedPrice * 0.7)) * 100)}%`
                        : "0%",
                    } as React.CSSProperties
                  }
                />
                <div className="range-hints">
                  <span>R$ 0</span>
                  <span>Até 70% do veículo</span>
                </div>
              </div>
              <div className="term-block">
                <span className="field-label">Prazo estimado</span>
                <div className="term-options">
                  {[12, 24, 36, 48, 60].map(term => (
                    <button
                      type="button"
                      key={term}
                      className={months === term ? "selected" : ""}
                      aria-pressed={months === term}
                      onClick={() => setMonths(term)}
                    >
                      {term}x
                    </button>
                  ))}
                </div>
              </div>
              <div className="calc-result">
                <div className="calc-result-label">
                  <span>Parcela estimada</span>
                  <span className="estimate-tag">ESTIMATIVA</span>
                </div>
                <strong>
                  {formatBRL(estimate.monthlyPayment)}
                  <small>/mês</small>
                </strong>
                <div className="calc-summary">
                  <span>
                    Saldo estimado <b>{formatBRL(estimate.financedAmount)}</b>
                  </span>
                  <span>
                    Prazo <b>{months} parcelas</b>
                  </span>
                  <span>
                    Soma das parcelas <b>{formatBRL(estimate.totalAmount)}</b>
                  </span>
                </div>
              </div>
              <button
                className="button button--red button--wide"
                type="button"
                disabled={!selectedVehicle}
                onClick={() => {
                  if (!selectedVehicle) return;
                  setContactVehicle(selectedVehicle.id);
                  document
                    .getElementById("contato")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Quero receber uma proposta <ArrowRight size={17} />
              </button>
              <p className="calc-legal">
                Divisão aritmética do saldo pelo prazo, sem juros, tarifas,
                seguros ou outros custos. Não é proposta de crédito, parcela
                bancária ou garantia de aprovação. Consulte condições reais.
              </p>
            </div>
          </div>
        </section>

        <section className="section delivery-section" id="como-funciona">
          <div className="container">
            <div className="delivery-header">
              <SectionHeading
                eyebrow="03 / DA ESCOLHA À SUA CASA"
                title="Você escolhe o carro. A SunCar cuida do resto."
                copy="Uma jornada acompanhada de perto, esteja você em Arapiraca ou em outra parte do Brasil."
              />
              <div className="delivery-stamp">
                <Truck size={17} />
                <span>
                  Atendimento
                  <br />
                  <strong>remoto, sob consulta</strong>
                </span>
              </div>
            </div>
            <div className="delivery-grid">
              <div className="steps-list">
                {[
                  [
                    "01",
                    "Escolha seu veículo",
                    "Conheça as opções e tire suas dúvidas.",
                  ],
                  [
                    "02",
                    "Faça sua simulação",
                    "Explore uma estimativa de entrada e prazo.",
                  ],
                  [
                    "03",
                    "Converse com a equipe",
                    "Negocie com apoio e informações claras.",
                  ],
                  [
                    "04",
                    "Organize a documentação",
                    "Acompanhe cada etapa da negociação.",
                  ],
                  [
                    "05",
                    "Prepare e confira",
                    "Confirme detalhes do veículo e da negociação com a equipe.",
                  ],
                  [
                    "06",
                    "Combine o transporte",
                    "Consulte disponibilidade, prazo e custo para o seu destino.",
                  ],
                ].map(([number, title, copy], index) => (
                  <div className="process-step" key={number}>
                    <div className="step-num">{number}</div>
                    <div className="step-copy">
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                    {index < 5 && <div className="step-connector" />}
                  </div>
                ))}
              </div>
              <div className="delivery-map-card">
                <div className="map-card-heading">
                  <Eyebrow light>UMA COMPRA, ONDE VOCÊ ESTIVER</Eyebrow>
                  <p>
                    Do primeiro contato
                    <br />
                    ao endereço combinado.
                  </p>
                </div>
                <BrazilRouteGraphic />
                <div className="map-card-footer">
                  <span>
                    <ShieldCheck size={15} /> Acompanhamento em cada etapa
                  </span>
                  <span>BR · 01</span>
                </div>
              </div>
            </div>
            <div className="delivery-bottom">
              <div className="delivery-bottom-title">
                <span className="bottom-symbol">↗</span>
                <div>
                  <strong>Comprou de outro estado?</strong>
                  <p>Consulte como organizar o transporte.</p>
                </div>
              </div>
              <div className="delivery-features">
                <span>
                  <Check size={15} /> Atendimento remoto
                </span>
                <span>
                  <Check size={15} /> Fotos e vídeos sob consulta
                </span>
                <span>
                  <Check size={15} /> Documentação acompanhada
                </span>
                <span>
                  <Check size={15} /> Transporte sob consulta
                </span>
              </div>
              <a
                className="round-link"
                href="#contato"
                aria-label="Fale sobre uma compra à distância"
              >
                <ArrowUpRight size={20} />
              </a>
            </div>
            <p className="delivery-note">
              Distâncias, prazos, custos e condições de transporte são
              confirmados caso a caso antes de qualquer negociação.
            </p>
          </div>
        </section>

        <section className="section testimonials-section" id="clientes">
          <div className="container">
            <div className="testimonials-top">
              <SectionHeading
                eyebrow="04 / CONFIANÇA SE CONSTRÓI JUNTO"
                title="Histórias reais merecem espaço."
                copy="Queremos mostrar experiências verdadeiras de quem comprou com a SunCar. Esta área aguarda os primeiros relatos autorizados."
              />
              <div className="testimonial-mark">
                <span>“</span>
                <small>
                  ESPAÇO
                  <br />
                  PARA A VOZ
                  <br />
                  DOS CLIENTES
                </small>
              </div>
            </div>
            <article className="story-placeholder">
              <div className="story-placeholder-copy">
                <span className="placeholder-pill">
                  <span /> ESPAÇO RESERVADO
                </span>
                <h3>Experiências reais, contadas por quem viveu.</h3>
                <p>
                  Ainda não há relatos autorizados para publicar. Nenhum
                  depoimento, avaliação ou compra foi inventado para preencher
                  esta seção.
                </p>
                <a className="text-link" href="#contato">
                  Fale com a equipe <ArrowUpRight size={15} />
                </a>
              </div>
              <div
                className="distance-flow"
                aria-label="Etapas ilustrativas de uma consulta à distância: cliente, equipe SunCar, transporte sob consulta e destino combinado"
              >
                <div>
                  <span className="distance-flow-icon">
                    <MapPin size={17} />
                  </span>
                  <small>ETAPA 01</small>
                  <strong>Você</strong>
                </div>
                <ArrowRight aria-hidden="true" />
                <div>
                  <span className="distance-flow-icon">
                    <MessageCircle size={17} />
                  </span>
                  <small>ETAPA 02</small>
                  <strong>SunCar</strong>
                </div>
                <ArrowRight aria-hidden="true" />
                <div>
                  <span className="distance-flow-icon">
                    <Truck size={17} />
                  </span>
                  <small>ETAPA 03</small>
                  <strong>Transporte a consultar</strong>
                </div>
                <ArrowRight aria-hidden="true" />
                <div>
                  <span className="distance-flow-icon">
                    <MapPin size={17} />
                  </span>
                  <small>ETAPA 04</small>
                  <strong>Destino combinado</strong>
                </div>
              </div>
            </article>
            <div className="states-ribbon">
              <div>
                <span className="states-icon">
                  <MapPin size={17} />
                </span>
                <span>
                  <strong>Atendimento remoto</strong>
                  <small>Consulte a equipe sobre sua cidade.</small>
                </span>
              </div>
              <span className="states-note">
                Consulte a equipe sobre seu destino.
              </span>
            </div>
          </div>
        </section>

        <section className="about-section" id="sobre">
          <div
            className="about-image"
            style={
              {
                "--about-image": `url("${assetPath("showroom-editorial-opt.jpg")}")`,
              } as React.CSSProperties
            }
            role="img"
            aria-label="Imagem conceitual de showroom moderno de veículos"
          />
          <div className="about-overlay" />
          <div className="container about-layout">
            <div className="about-copy">
              <Eyebrow light>05 / NOVA SEDE · MESMA ESSÊNCIA</Eyebrow>
              <h2>
                Uma nova sede.
                <br />A mesma paixão
                <br />
                por bons negócios.
              </h2>
              <div className="about-accent" />
              <p>
                A SunCar Multimarcas está em sua nova sede em Arapiraca com uma
                proposta simples: tornar a compra do seu próximo veículo mais
                fácil, transparente e humana.
              </p>
              <a className="button button--outline-light" href="#contato">
                Conheça a SunCar <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="about-coordinate">
              <span>ARAPIRACA</span>
              <i />
              <span>ALAGOAS</span>
              <small>NOVA SEDE · MULTIMARCAS</small>
            </div>
            <div className="about-label">
              <span className="about-label-dot" /> SUNCAR MULTIMARCAS{" "}
              <span>ARAPIRACA · AL</span>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contato">
          <div className="container contact-layout">
            <div className="contact-copy">
              <SectionHeading
                eyebrow="06 / SUA PRÓXIMA CONVERSA"
                title="Encontrou seu próximo carro?"
                copy="Conte um pouco do que você procura. Nossa equipe está pronta para conversar com você."
              />
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <MessageCircle size={19} />
                </div>
                <div>
                  <strong>Atendimento próximo, sem complicação.</strong>
                  <p>
                    Preencha o formulário para solicitar um retorno
                    personalizado.
                  </p>
                </div>
              </div>
              <div className="contact-address">
                <MapPin size={16} />
                <span>
                  <strong>SunCar Multimarcas</strong>
                  <br />
                  Arapiraca — Alagoas
                </span>
              </div>
              <div className="contact-availability">
                <span /> Atendimento mediante contato · transporte sob consulta
              </div>
            </div>
            <div className="contact-form-card">
              {formStatus === "success" ? (
                <div className="form-success" role="status" aria-live="polite">
                  <span className="success-check">
                    <CheckCircle2 size={29} />
                  </span>
                  <Eyebrow>MENSAGEM RECEBIDA</Eyebrow>
                  <h3>Obrigado por falar com a SunCar.</h3>
                  <p>{successMessage}</p>
                  <button
                    className="button button--dark"
                    type="button"
                    onClick={() => {
                      setFormStatus("idle");
                      setFormError("");
                      setSuccessMessage("");
                    }}
                  >
                    Enviar outra mensagem <ArrowLeft size={15} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-heading">
                    <div>
                      <span className="form-overline">FALE COM A GENTE</span>
                      <h3>Vamos conversar?</h3>
                    </div>
                    <span className="form-step">
                      01 <i /> 03
                    </span>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    aria-busy={formStatus === "loading"}
                  >
                    <div className="form-honeypot" aria-hidden="true">
                      <label htmlFor="contact-website">
                        Não preencha este campo
                      </label>
                      <input
                        id="contact-website"
                        name="_gotcha"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="name">
                          Seu nome <span>*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          autoComplete="name"
                          placeholder="Como podemos chamar você?"
                          required
                          minLength={2}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="phone">
                          WhatsApp <span>*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="(82) 99999-0000"
                          value={phone}
                          onChange={event =>
                            setPhone(formatPhone(event.target.value))
                          }
                          required
                          aria-describedby={
                            formError ? "form-error" : undefined
                          }
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="email">
                          E-mail <span>*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="voce@email.com"
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="city">
                          Cidade / Estado <span>*</span>
                        </label>
                        <input
                          id="city"
                          name="city"
                          autoComplete="address-level2"
                          placeholder="Ex.: Arapiraca — AL"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="contact-vehicle">
                          Veículo de interesse
                        </label>
                        <select
                          id="contact-vehicle"
                          name="vehicle"
                          value={selectedContactOption}
                          onChange={event =>
                            setContactVehicle(event.target.value)
                          }
                        >
                          <option value="">Ainda estou pesquisando</option>
                          {vehicles.map(vehicle => (
                            <option key={vehicle.id} value={vehicle.id}>
                              {vehicle.brand} {vehicle.model}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="contact-type">
                          Como podemos ajudar? <span>*</span>
                        </label>
                        <select
                          id="contact-type"
                          name="type"
                          defaultValue=""
                          required
                        >
                          <option value="" disabled>
                            Selecione uma opção
                          </option>
                          <option>Quero comprar</option>
                          <option>Quero financiar</option>
                          <option>Quero avaliar meu veículo</option>
                          <option>Quero saber sobre entrega</option>
                          <option>Tenho dúvidas</option>
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="message">
                        Mensagem <span className="optional">opcional</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="Conte um pouco mais sobre o que você procura..."
                      />
                    </div>
                    <label
                      className="privacy-consent"
                      htmlFor="privacy-consent"
                    >
                      <input
                        id="privacy-consent"
                        name="privacy_consent"
                        type="checkbox"
                        value="Autorizo o contato sobre esta solicitação"
                        required
                      />
                      <span>
                        Autorizo a SunCar a usar meus dados para responder a
                        esta solicitação. O envio passa pelo Formspree; evite
                        incluir informações sensíveis.
                      </span>
                    </label>
                    {formError && (
                      <p className="form-error" id="form-error" role="alert">
                        {formError}
                      </p>
                    )}
                    <div className="form-submit-row">
                      <button
                        className="button button--red button--wide"
                        type="submit"
                        disabled={formStatus === "loading"}
                      >
                        {formStatus === "loading" ? (
                          <>
                            <span className="button-spinner" /> Enviando…
                          </>
                        ) : (
                          <>
                            Enviar mensagem <ArrowRight size={17} />
                          </>
                        )}
                      </button>
                      <button
                        className="whatsapp-secondary"
                        type="button"
                        onClick={() =>
                          contactByWhatsApp(
                            "Olá, SunCar! Gostaria de conversar sobre a compra de um veículo."
                          )
                        }
                      >
                        <MessageCircle size={16} /> Falar pelo WhatsApp
                      </button>
                    </div>
                    <p className="form-legal">
                      <ShieldCheck size={13} />
                      {formspreeConfigured
                        ? "Ao enviar, seus dados serão transmitidos e armazenados pelo Formspree e acessados pela SunCar para responder. Configure o aviso de privacidade da empresa antes de publicar; não inclua dados sensíveis."
                        : "Envio desativado até configurar o Form ID do Formspree. Nenhum dado será enviado enquanto a configuração estiver vazia."}
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Logo small />
            <p>Mais perto do seu próximo caminho.</p>
            <div className="footer-service">
              <span /> Transporte sob consulta para todo o Brasil
            </div>
          </div>
          <div className="footer-links">
            <span className="footer-label">EXPLORE</span>
            <div>
              {navItems.slice(0, 6).map(([label, id]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-location">
            <span className="footer-label">VISITE</span>
            <p>
              <MapPin size={15} /> SunCar Multimarcas
              <br />
              <span>Arapiraca — AL</span>
            </p>
            <span className="footer-label footer-contact-label">CONTATO</span>
            <button
              type="button"
              onClick={() =>
                contactByWhatsApp(
                  "Olá, SunCar! Gostaria de falar com a equipe."
                )
              }
            >
              <MessageCircle size={14} /> WhatsApp <ArrowUpRight size={12} />
            </button>
            <small>Número oficial a cadastrar</small>
          </div>
          <a className="back-top" href="#inicio" aria-label="Voltar ao topo">
            <ArrowUpRight size={19} />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} SunCar Multimarcas. Arapiraca · AL.
          </span>
          <span>
            Financiamento sujeito à análise e aprovação da instituição
            financeira.
          </span>
          <span className="footer-signature">
            FEITO PARA IR MAIS LONGE <MoveUpRight size={13} />
          </span>
        </div>
      </footer>

      <button
        className="floating-contact"
        type="button"
        hidden={!floatingContactVisible}
        aria-label="Falar com a SunCar pelo WhatsApp"
        onClick={() =>
          contactByWhatsApp(
            "Olá, SunCar! Vim pelo site e gostaria de conversar sobre um veículo."
          )
        }
      >
        <MessageCircle size={19} />
        <span>WhatsApp</span>
      </button>
      {notice && (
        <div className="notice-toast" role="status" aria-live="polite">
          <CircleHelp size={17} />
          <span>{notice}</span>
          <button
            type="button"
            aria-label="Fechar aviso"
            onClick={() => setNotice("")}
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
