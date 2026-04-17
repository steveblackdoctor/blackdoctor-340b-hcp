import { useState, useRef, useEffect } from "react";

// BlackDoctor Pro brand tokens
const B = {
  bg: "#000000",
  panel: "#0b0b0b",
  panelAlt: "#141414",
  offwhite: "#F4F1ED",
  teal: "#1A8A8F",
  tealDark: "#116064",
  border: "#2a2a2a",
  text: "#f4f1ed",
  textMuted: "#9aa0a3",
  accent: "#1A8A8F",
};

const STATE_INFO = {
  "Alabama": { protections: "AL safety-net hospitals and FQHCs participate broadly in 340B. No state-specific PBM reform laws yet, but federal protections apply.", resources: "https://www.alabamapublichealth.gov" },
  "Alaska": { protections: "AK rural and critical access hospitals have strong 340B participation. Tribal health programs are key covered entities.", resources: "https://health.alaska.gov" },
  "Arizona": { protections: "AZ covers 340B entities under Medicaid managed care with carve-in policies for most covered entity types.", resources: "https://www.azdhs.gov" },
  "Arkansas": { protections: "AR rural referral centers and critical access hospitals are significant 340B participants. State is expanding FQHC networks.", resources: "https://www.healthy.arkansas.gov" },
  "California": { protections: "CA requires 340B contract pharmacies to be honored by all PBMs. The state also funds additional drug assistance through the California Drug Price Relief Act.", resources: "https://www.dhcs.ca.gov" },
  "Colorado": { protections: "CO has enacted PBM transparency and reform legislation protecting 340B contract pharmacy access for covered entities.", resources: "https://cdphe.colorado.gov" },
  "Connecticut": { protections: "CT prohibits PBMs from reimbursing 340B covered entities at lower rates than non-340B pharmacies.", resources: "https://portal.ct.gov/dph" },
  "Delaware": { protections: "DE has PBM reform laws requiring equal reimbursement for 340B claims and prohibiting discriminatory practices.", resources: "https://dhss.delaware.gov" },
  "Florida": { protections: "FL has enacted PBM reform legislation protecting 340B contract pharmacy access. FQHCs have broad network access.", resources: "https://www.floridahealth.gov" },
  "Georgia": { protections: "GA has introduced PBM transparency laws. Safety-net hospitals and FQHCs have strong 340B participation.", resources: "https://dph.georgia.gov" },
  "Hawaii": { protections: "HI community health centers and Native Hawaiian health systems are key 340B covered entities with broad Medicaid coverage.", resources: "https://health.hawaii.gov" },
  "Idaho": { protections: "ID rural hospitals and critical access hospitals have strong 340B participation. PBM reform legislation is pending.", resources: "https://healthandwelfare.idaho.gov" },
  "Illinois": { protections: "IL requires health plans to reimburse 340B drugs at the same rate as non-340B drugs and prohibits discriminatory PBM policies.", resources: "https://www.dph.illinois.gov" },
  "Indiana": { protections: "IN has enacted legislation requiring PBMs to reimburse 340B covered entities at non-discriminatory rates.", resources: "https://www.in.gov/isdh" },
  "Iowa": { protections: "IA rural health clinics and FQHCs are key 340B participants. State has PBM oversight legislation in place.", resources: "https://idph.iowa.gov" },
  "Kansas": { protections: "KS critical access hospitals and rural referral centers participate broadly in 340B. PBM reform efforts are ongoing.", resources: "https://www.kdhe.ks.gov" },
  "Kentucky": { protections: "KY has strong FQHC and rural health clinic 340B participation. State Medicaid includes 340B carve-in provisions.", resources: "https://chfs.ky.gov" },
  "Louisiana": { protections: "LA safety-net hospitals and FQHCs have significant 340B access. State has enacted some PBM transparency requirements.", resources: "https://ldh.la.gov" },
  "Maine": { protections: "ME has enacted strong PBM reform protecting 340B contract pharmacy access and prohibiting discriminatory reimbursement.", resources: "https://www.maine.gov/dhhs" },
  "Maryland": { protections: "MD prohibits PBMs from restricting 340B covered entities and requires equivalent reimbursement for 340B claims.", resources: "https://health.maryland.gov" },
  "Massachusetts": { protections: "MA has robust 340B participation among safety-net hospitals and community health centers. Strong PBM oversight laws.", resources: "https://www.mass.gov/orgs/department-of-public-health" },
  "Michigan": { protections: "MI has enacted legislation prohibiting discriminatory PBM practices against 340B entities and requiring transparency.", resources: "https://www.michigan.gov/mdhhs" },
  "Minnesota": { protections: "MN has strong PBM reform laws protecting 340B contract pharmacy access and requiring equal reimbursement.", resources: "https://www.health.state.mn.us" },
  "Mississippi": { protections: "MS safety-net hospitals and rural health centers are major 340B participants. PBM reform legislation is in progress.", resources: "https://msdh.ms.gov" },
  "Missouri": { protections: "MO has enacted PBM transparency requirements. FQHCs and disproportionate share hospitals have broad 340B access.", resources: "https://health.mo.gov" },
  "Montana": { protections: "MT critical access hospitals and tribal health programs are key 340B covered entities. Rural access is a priority.", resources: "https://dphhs.mt.gov" },
  "Nebraska": { protections: "NE rural hospitals and FQHCs participate broadly in 340B. State is pursuing PBM reform legislation.", resources: "https://dhhs.ne.gov" },
  "Nevada": { protections: "NV has enacted PBM reform laws protecting 340B access. Safety-net hospitals have broad covered entity status.", resources: "https://dpbh.nv.gov" },
  "New Hampshire": { protections: "NH has enacted legislation prohibiting discriminatory PBM reimbursement practices targeting 340B covered entities.", resources: "https://www.dhhs.nh.gov" },
  "New Jersey": { protections: "NJ prohibits PBMs from reimbursing 340B entities at lower rates and has strong safety-net hospital participation.", resources: "https://www.nj.gov/health" },
  "New Mexico": { protections: "NM has strong tribal health program and FQHC 340B participation. State Medicaid includes 340B-friendly carve-in provisions.", resources: "https://www.nmhealth.org" },
  "New York": { protections: "NY has strong Medicaid 340B carve-in policies and requires insurers to reimburse 340B claims at standard rates.", resources: "https://www.health.ny.gov" },
  "North Carolina": { protections: "NC has enacted legislation prohibiting PBMs from discriminating against 340B entities. FQHCs have broad coverage.", resources: "https://www.ncdhhs.gov" },
  "North Dakota": { protections: "ND critical access hospitals and rural health clinics are key 340B participants. Tribal programs also participate.", resources: "https://www.health.nd.gov" },
  "Ohio": { protections: "OH prohibits PBMs from restricting 340B covered entity access to contract pharmacies.", resources: "https://odh.ohio.gov" },
  "Oklahoma": { protections: "OK has enacted PBM reform protecting 340B contract pharmacy access. Tribal health systems are major participants.", resources: "https://oklahoma.gov/health.html" },
  "Oregon": { protections: "OR has strong PBM oversight laws and robust FQHC and safety-net hospital 340B participation.", resources: "https://www.oregon.gov/oha" },
  "Pennsylvania": { protections: "PA has enacted PBM transparency laws and has broad safety-net hospital participation in 340B.", resources: "https://www.health.pa.gov" },
  "Rhode Island": { protections: "RI has enacted PBM reform prohibiting discriminatory reimbursement for 340B covered entities.", resources: "https://health.ri.gov" },
  "South Carolina": { protections: "SC safety-net hospitals and FQHCs have significant 340B participation. PBM reform legislation is advancing.", resources: "https://www.scdhec.gov" },
  "South Dakota": { protections: "SD critical access hospitals and tribal health programs are key 340B participants in rural communities.", resources: "https://doh.sd.gov" },
  "Tennessee": { protections: "TN has enacted PBM transparency requirements. Safety-net hospitals and FQHCs have broad 340B access.", resources: "https://www.tn.gov/health.html" },
  "Texas": { protections: "TX has legislative protections limiting PBM restrictions on 340B contract pharmacies. Safety-net hospitals have expanded covered entity access.", resources: "https://www.dshs.texas.gov" },
  "Utah": { protections: "UT has enacted PBM reform legislation. FQHCs and rural health clinics have broad 340B participation.", resources: "https://health.utah.gov" },
  "Vermont": { protections: "VT has strong PBM oversight and community health center 340B participation. State Medicaid is 340B-friendly.", resources: "https://www.healthvermont.gov" },
  "Virginia": { protections: "VA prohibits PBMs from restricting 340B covered entities and requires equal reimbursement for 340B claims.", resources: "https://www.vdh.virginia.gov" },
  "Washington": { protections: "WA prohibits PBMs from imposing restrictions on 340B covered entities and requires equal reimbursement.", resources: "https://www.doh.wa.gov" },
  "West Virginia": { protections: "WV has strong safety-net hospital and FQHC 340B participation. Rural and critical access hospitals are key participants.", resources: "https://dhhr.wv.gov" },
  "Wisconsin": { protections: "WI has enacted PBM reform protecting 340B contract pharmacy access and prohibiting discriminatory practices.", resources: "https://www.dhs.wisconsin.gov" },
  "Wyoming": { protections: "WY critical access hospitals and rural health clinics are key 340B covered entities. Tribal programs also participate.", resources: "https://health.wyo.gov" },
};
const STATES = Object.keys(STATE_INFO).sort();

const buildSystem = (lang) => `You are a 340B Drug Pricing Program expert assistant embedded in "BlackDoctor Pro 340B HCP" — a tool designed for physicians, pharmacists, and other healthcare providers (HCPs).

${lang === "es" ? "Always respond in Spanish, using clinically precise but accessible language for healthcare professionals." : "Always respond in English."}

Your audience: clinicians and HCPs. They already understand medicine — your job is to help them (1) navigate 340B policy, transparency, accountability, and equity debates, (2) evaluate how 340B shapes patient access in their communities, and (3) identify concrete advocacy levers at the state and federal level.

Key context:
- 340B requires drug manufacturers to sell outpatient drugs at discounted prices to covered entities (FQHCs, DSH hospitals, CAHs, children's hospitals, Ryan White clinics, sole community hospitals, rural referral centers).
- Ongoing national debate centers on transparency, contract pharmacy arrangements, PBM reimbursement practices, manufacturer restrictions, hospital revenue use, and whether savings are reaching the vulnerable patients the program was designed to serve.
- State legislatures are actively shaping 340B: anti-discrimination laws, PBM transparency, Medicaid carve-in/carve-out rules.

When answering:
- Clinical/policy tone — respectful of the HCP's expertise, no oversimplification.
- Cite the mechanism when relevant (HRSA, 42 U.S.C. §256b, state statute type).
- Surface both sides where the debate is genuinely contested.
- End with an actionable next step the HCP can take (contact rep, join coalition, document impact, use print brief, etc.).
- 3–5 focused paragraphs.`;

const STARTERS = {
  en: [
    "How can we tell whether 340B is truly expanding care for vulnerable patients today?",
    "What would meaningful 340B transparency actually look like from a clinician and patient perspective?",
    "Why is there growing national debate about 340B accountability?",
    "How might greater 340B spending transparency impact patient access in my community?",
    "What role should HCPs play in shaping how 340B evolves at the state and federal level?",
    "What unintended consequences of the current 340B structure affect care delivery?",
    "What questions should clinicians be asking lawmakers to keep 340B patient-centered?",
    "How are different states approaching 340B oversight — and how can HCPs engage?",
    "What would stronger 340B accountability standards mean for health equity?",
    "If I wanted to start 340B advocacy tomorrow, what are the most effective first steps?",
  ],
  es: [
    "¿Cómo sabemos si 340B realmente está ampliando la atención a pacientes vulnerables hoy?",
    "¿Cómo sería una transparencia significativa en 340B desde la perspectiva del clínico y del paciente?",
    "¿Por qué crece el debate nacional sobre la rendición de cuentas del programa 340B?",
    "¿Cómo podría una mayor transparencia del gasto 340B afectar el acceso de los pacientes en mi comunidad?",
    "¿Qué papel deben tener los HCPs en la evolución del 340B a nivel estatal y federal?",
    "¿Qué consecuencias no deseadas de la estructura actual del 340B afectan la atención?",
    "¿Qué preguntas deberían hacer los clínicos a los legisladores para mantener el 340B centrado en el paciente?",
    "¿Cómo están abordando la supervisión del 340B los diferentes estados?",
    "¿Qué significarían estándares más sólidos de rendición de cuentas del 340B para la equidad en salud?",
    "Si quisiera comenzar a abogar por el 340B mañana, ¿cuáles son los primeros pasos más efectivos?",
  ],
};

const ENTITY_TYPES = { "CAH":"Critical Access Hospital","DSH":"Disproportionate Share Hospital","CHC":"Community Health Center","RRC":"Rural Referral Center","PED":"Children's Hospital","FP":"Family Planning","SCH":"Sole Community Hospital","LCA":"Look-Alike FQHC","MHC":"Migrant Health Center" };

const DEFAULT_EMAIL_SUBJECT = "Protect and strengthen the 340B program for the patients I serve";

const DEFAULT_EMAIL_BODY = `Dear [Representative/Senator Last Name],

I am a healthcare provider practicing in [City, State], and I am writing to share my direct clinical perspective on the 340B Drug Pricing Program and urge you to protect and strengthen it.

The 340B program is essential infrastructure for the safety-net hospitals, federally qualified health centers, and specialty clinics that care for my patients — many of whom are uninsured, underinsured, or facing the financial toxicity of cancer, HIV, and other chronic conditions. Without 340B, the access I provide today would not be financially sustainable for my institution.

At the same time, I support meaningful transparency and accountability so that 340B savings demonstrably reach the vulnerable patients the program was designed to serve. I respectfully ask you to:

1. Oppose manufacturer restrictions on contract pharmacy arrangements that limit patient access.
2. Support PBM reform that prohibits discriminatory reimbursement against 340B covered entities.
3. Advance transparency standards — for covered entities, manufacturers, and PBMs — that show how 340B savings translate into patient care and community benefit.
4. Protect FQHCs, critical access hospitals, disproportionate share hospitals, and Ryan White clinics from efforts to narrow eligibility in ways that would harm care delivery in underserved communities.

I would welcome the opportunity to share specific examples from my practice and to serve as a clinical resource to your office on this issue. Please feel free to reach me at [Your Email] or [Your Phone].

Thank you for your leadership and for protecting access to care for the patients who need it most.

Respectfully,

[Your Full Name, Credentials]
[Your Title / Specialty]
[Institution]
[City, State]`;

const ADVOCACY_ACTIONS = [
  { title: "Contact your federal representatives", body: "Call or email your U.S. Senators and House Representative about 340B. Direct constituent contact from clinicians carries unique weight. Use the template email in this app as a starting point." },
  { title: "Engage your state legislature", body: "State-level PBM reform, Medicaid carve-in rules, and anti-discrimination laws are where a lot of 340B policy actually happens. Identify your state reps and committee chairs on health and insurance." },
  { title: "Join or support a 340B coalition", body: "340B Health, the American Hospital Association's 340B Coalition, NACHC (community health centers), the Ryan White Clinics for 340B Access, and state hospital associations all coordinate HCP advocacy." },
  { title: "Document and share impact data", body: "Quantify what 340B funds at your institution — oncology infusion chairs, insulin programs, translator services, financial navigation, care for uninsured patients. Specific, local stories move lawmakers far more than national talking points." },
  { title: "Write an op-ed or letter to the editor", body: "Local newspapers and medical society publications are read by staffers. A 600-word clinician op-ed tying 340B to a specific patient population in your community is high leverage." },
  { title: "Engage your state medical or specialty society", body: "Ask your county medical society, state medical association, or specialty society (ASCO, ASH, AAFP, ACP, etc.) to adopt a 340B policy position and testify at hearings." },
  { title: "Educate colleagues and trainees", body: "Most clinicians receive zero training on 340B. Grand rounds, noon conferences, and resident teaching sessions are opportunities to build a broader clinician advocacy base." },
  { title: "Testify at a public hearing", body: "State insurance, health, and Medicaid committees regularly hold hearings on PBM and 340B legislation. A 3-minute clinician testimony describing one patient can change a vote." },
  { title: "Use the print brief", body: "The Policy brief tab produces a one-page clinical summary you can hand a lawmaker, a patient advocate, or a hospital board. Keep a stack in your clinic." },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');

* { box-sizing: border-box; }
html, body { background: ${B.bg}; margin: 0; }
.app { font-family: 'Inter', system-ui, sans-serif; background: ${B.bg}; color: ${B.text}; max-width: 820px; margin: 0 auto; padding: 0 1rem 3rem; min-height: 100vh; }
.serif { font-family: 'Cormorant Garamond', Georgia, serif; }

input, select, textarea { font-family: 'Inter', system-ui, sans-serif; font-size: 14px; color: ${B.text}; }
button { font-family: 'Inter', system-ui, sans-serif; cursor: pointer; }

.brand-header {
  background: ${B.bg};
  border-bottom: 1px solid ${B.border};
  margin: 0 -1rem;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.brand-mark {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: ${B.offwhite};
  line-height: 1;
}
.brand-mark .pro { font-weight: 300; color: ${B.offwhite}; opacity: 0.75; margin-left: 2px; }
.brand-mark .sep { color: ${B.teal}; margin: 0 10px; font-weight: 300; }
.brand-mark .sub { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: ${B.teal}; }

.teal-banner {
  background: ${B.teal};
  color: #fff;
  margin: 0 -1rem 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 13px;
  letter-spacing: 0.02em;
}

.pill { display: inline-block; font-size: 11px; padding: 2px 10px; border-radius: 20px; letter-spacing: 0.04em; }
.chip-btn { display: inline-block; padding: 11px 20px; font-size: 13px; border-radius: 999px; border: 1px solid ${B.teal}; background: ${B.teal}; color: #fff; transition: all 0.15s; text-align: center; max-width: 100%; line-height: 1.35; cursor: pointer; font-weight: 500; line-height: 1.35; font-weight: 500; max-width: 100%; white-space: normal; }
.chip-btn:hover { background: ${B.tealDark}; border-color: ${B.tealDark}; color: #fff; transform: translateY(-1px); box-shadow: 0 3px 10px rgba(26,138,143,0.25); }
.more-btn { display: inline-block; padding: 11px 20px; font-size: 12px; border-radius: 999px; border: 1px dashed ${B.teal}; background: transparent; color: ${B.teal}; cursor: pointer; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; transition: all 0.15s; }
.more-btn:hover { background: rgba(26,138,143,0.12); }
.starter-banner { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; background: linear-gradient(90deg, ${B.teal} 0%, ${B.tealDark} 100%); color: #fff; padding: 14px 20px; border-radius: 6px; margin-bottom: 14px; box-shadow: 0 2px 10px rgba(26,138,143,0.25); flex-wrap: wrap; }
.starter-banner-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; font-weight: 500; letter-spacing: 0.01em; }
.starter-banner-sub { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.85); font-weight: 500; }

.tab-btn { padding: 10px 18px; font-size: 13px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; border-radius: 0; border: none; background: transparent; color: ${B.textMuted}; border-bottom: 2px solid transparent; transition: all 0.15s; }
.tab-btn.active { color: #fff; border-bottom: 2px solid ${B.teal}; }

.card { background: ${B.panel}; border: 1px solid ${B.border}; border-radius: 4px; padding: 1rem 1.25rem; }
.card-light { background: ${B.offwhite}; color: #000; border-radius: 4px; padding: 1rem 1.25rem; }

.input-base { width: 100%; padding: 10px 14px; font-size: 14px; border: 1px solid #d4d4d4; border-radius: 6px; background: #ffffff; color: #1a1a1a; outline: none; }
.input-base:focus { border-color: ${B.teal}; box-shadow: 0 0 0 3px rgba(26,138,143,0.15); }
.input-base::placeholder { color: #888; }

.btn-primary { padding: 9px 20px; font-size: 13px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; border: 1px solid ${B.teal}; border-radius: 3px; background: ${B.teal}; color: #fff; transition: background 0.15s; }
.btn-primary:hover { background: ${B.tealDark}; }

.btn-ghost { padding: 7px 14px; font-size: 12px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; border: 1px solid ${B.border}; border-radius: 3px; background: transparent; color: ${B.textMuted}; transition: all 0.15s; }
.btn-ghost:hover { border-color: ${B.teal}; color: #fff; }

.btn-teal-outline { padding: 7px 14px; font-size: 12px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; border: 1px solid ${B.teal}; border-radius: 3px; background: transparent; color: ${B.teal}; transition: all 0.15s; }
.btn-teal-outline:hover { background: ${B.teal}; color: #fff; }

.state-banner { background: ${B.panel}; border-left: 3px solid ${B.teal}; border-radius: 0; padding: 0.75rem 1rem; margin-bottom: 1rem; font-size: 13px; color: ${B.text}; }

.bubble-user { background: ${B.teal}; color: #fff; border-radius: 14px 14px 2px 14px; padding: 0.65rem 0.9rem; font-size: 14px; line-height: 1.6; max-width: 76%; white-space: pre-wrap; }
.bubble-ai { background: ${B.panel}; border: 1px solid ${B.border}; border-radius: 14px 14px 14px 2px; padding: 0.65rem 0.9rem; font-size: 14px; line-height: 1.6; max-width: 82%; white-space: pre-wrap; color: ${B.text}; }
.avatar { width: 32px; height: 32px; border-radius: 50%; background: ${B.teal}; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; color: #fff; flex-shrink: 0; margin-top: 2px; letter-spacing: 0.04em; }

.stat-card { background: #ffffff; border: 1px solid ${B.border}; border-radius: 6px; padding: 1.15rem 1rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
.stat-card .stat-label { color: #4a4a4a; }
.stat-card .stat-value { color: ${B.tealDark}; }
.stat-card .stat-sub { color: #6a6a6a; }
@media (max-width: 820px) { .advocacy-grid { grid-template-columns: 1fr !important; } .advocacy-grid > div:nth-child(2) { position: static !important; } }

.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: flex-start; justify-content: center; z-index: 1000; padding: 1.5rem 1rem; overflow-y: auto; }
.modal { background: ${B.bg}; border: 1px solid ${B.border}; width: 100%; max-width: 680px; padding: 1.75rem; }
.divider { border: none; border-top: 1px solid ${B.border}; margin: 1rem 0; }

.print-only { display: none; }
@media print {
  .no-print { display: none !important; }
  .print-only { display: block; }
  .modal-overlay { position: static; background: #fff; padding: 0; }
  .modal { background: #fff; color: #000; border: none; max-width: none; padding: 2rem; }
  .modal * { color: #000 !important; background: #fff !important; border-color: #ccc !important; }
}

select { background-color: ${B.panel}; color: ${B.text}; }
select option { background-color: ${B.panel}; color: ${B.text}; }

a { color: ${B.teal}; }
`;

function PharmacyLookup({ lang }) {
  const t = lang === "es";
  const [zip, setZip] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const search = async () => {
    if (!/^\d{5}$/.test(zip)) { setError(t ? "Ingrese un código postal de 5 dígitos." : "Please enter a valid 5-digit zip code."); return; }
    setError(""); setLoading(true); setResults(null);
    try {
      const res = await fetch(`/api/pharmacy?zip=${zip}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setResults({ ai: data.source === "ai", items: data.items || [] });
    } catch { setError(t ? "No se pudo conectar. Visite hrsa.gov/opa." : "Could not connect. Visit hrsa.gov/opa to search directly."); }
    setLoading(false);
  };
  const items = results?.items || [];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
        <input className="input-base" value={zip} onChange={e => setZip(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder={t ? "Código postal (5 dígitos)" : "Zip code (5 digits)"} maxLength={5} style={{ maxWidth: 180 }} />
        <button className="btn-primary" onClick={search}>{loading ? (t ? "Buscando..." : "Searching...") : (t ? "Buscar" : "Search")}</button>
      </div>
      {error && <p style={{ fontSize: 13, color: "#d06b6b", margin: "0 0 0.75rem" }}>{error}</p>}
      {results?.ai && items.length > 0 && (
        <div style={{ background: B.panel, border: `1px solid ${B.teal}`, padding: "0.5rem 0.85rem", marginBottom: "0.75rem", fontSize: 12, color: B.textMuted }}>
          {t ? "Resultados aproximados generados por IA — confirme en hrsa.gov/opa." : "Approximate AI-generated results — verify at hrsa.gov/opa."}
        </div>
      )}
      {items.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1rem" }}>
          {items.map((e, i) => {
            const name = e.entityName || e.name || "Unknown";
            const type = e.entityTypeCd ? (ENTITY_TYPES[e.entityTypeCd] || e.entityTypeCd) : (e.type || "");
            const city = e.city || "";
            const st = e.stateCode || e.state || "";
            const addr = e.address1 || e.address || "";
            const phone = e.phone || e.phoneNumber || "";
            return (
              <div key={i} className="card" style={{ padding: "0.75rem 1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 2px" }}>{name}</p>
                  {type && <span className="pill" style={{ background: `${B.teal}22`, color: B.teal, border: `1px solid ${B.teal}`, flexShrink: 0 }}>{type}</span>}
                </div>
                {(addr || city) && <p style={{ fontSize: 13, color: B.textMuted, margin: "2px 0 0" }}>{[addr, city, st].filter(Boolean).join(", ")}</p>}
                {phone && <p style={{ fontSize: 13, color: B.textMuted, margin: "2px 0 0" }}>{phone}</p>}
              </div>
            );
          })}
        </div>
      )}
      {results && items.length === 0 && !error && <p style={{ fontSize: 14, color: B.textMuted }}>{t ? "No se encontraron entidades cercanas." : "No covered entities found nearby. Try a different zip code."}</p>}
      <div className="card" style={{ marginTop: "0.5rem" }}>
        <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 4px" }}>{t ? "Buscar directamente en HRSA" : "Search HRSA directly"}</p>
        <a href="https://340bopais.hrsa.gov/coveredentitysearch" target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>340bopais.hrsa.gov/coveredentitysearch →</a>
      </div>
    </div>
  );
}

function AdvocacyTab({ lang, state }) {
  const t = lang === "es";
  const [subject, setSubject] = useState(DEFAULT_EMAIL_SUBJECT);
  const [body, setBody] = useState(DEFAULT_EMAIL_BODY);
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 className="serif" style={{ fontSize: 26, fontWeight: 500, margin: "0 0 6px" }}>{t ? "¿Qué puede hacer un HCP para que el 340B tenga éxito?" : "What can an HCP do to help 340B succeed?"}</h2>
        <p style={{ color: B.textMuted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
          {t ? "Clínicos y farmacéuticos tienen una voz única en la política del 340B. Aquí están las acciones con mayor apalancamiento para abogar por un programa que realmente llegue a los pacientes que debe servir." : "Clinicians and pharmacists bring a voice to 340B policy that no other stakeholder can replace. Below are the highest-leverage actions HCPs can take to ensure the program reaches the patients it was built to serve."}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 20, marginBottom: "1.25rem" }} className="advocacy-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: B.teal, margin: "0 0 2px", fontWeight: 600 }}>{t ? "Acciones con alto apalancamiento" : "High-leverage actions"}</p>
          {ADVOCACY_ACTIONS.map((a, i) => (
            <div key={i} className="card">
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: B.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15, margin: "0 0 4px", color: "#fff" }}>{a.title}</p>
                  <p style={{ fontSize: 13, color: B.textMuted, margin: 0, lineHeight: 1.6 }}>{a.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: "sticky", top: 16, alignSelf: "flex-start" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: B.teal, margin: "0 0 2px", fontWeight: 600 }}>{t ? "Plantilla de correo" : "Template email"}</p>
          <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 4px" }}>{t ? "Escriba a sus legisladores" : "Write to your lawmakers"}</h3>
          <p style={{ fontSize: 13, color: B.textMuted, margin: "0 0 0.85rem", lineHeight: 1.6 }}>
            {t ? "Edite los corchetes con su información y detalle local. Use 'Abrir email' para enviar desde su cliente, o 'Copiar' para pegarlo en un formulario web." : "Edit the bracketed fields with your info and local detail. Use 'Open email' to send from your client, or 'Copy' to paste into a web contact form."}
            {state ? ` ${t ? "Incluimos contexto de" : "We've included"} ${state} ${t ? "si es relevante." : "context if relevant."}` : ""}
          </p>
          <div className="card">
            <label style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: B.textMuted, display: "block", marginBottom: 4 }}>{t ? "Asunto" : "Subject"}</label>
            <input className="input-base" value={subject} onChange={e => setSubject(e.target.value)} style={{ marginBottom: "0.85rem" }} />
            <label style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: B.textMuted, display: "block", marginBottom: 4 }}>{t ? "Cuerpo" : "Body"}</label>
            <textarea className="input-base" value={body} onChange={e => setBody(e.target.value)} rows={16} style={{ resize: "vertical", fontFamily: "inherit", lineHeight: 1.55 }} />
            <div style={{ display: "flex", gap: 8, marginTop: "0.85rem", flexWrap: "wrap" }}>
              <a className="btn-primary" href={mailto} style={{ textDecoration: "none", display: "inline-block" }}>{t ? "Abrir email" : "Open email"}</a>
              <button className="btn-teal-outline" onClick={onCopy}>{copied ? (t ? "¡Copiado!" : "Copied!") : (t ? "Copiar" : "Copy")}</button>
              <a className="btn-ghost" href="https://www.house.gov/representatives/find-your-representative" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{t ? "Buscar representante" : "Find my U.S. rep"}</a>
              <a className="btn-ghost" href="https://www.senate.gov/senators/senators-contact.htm" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{t ? "Buscar senador" : "Find my U.S. senator"}</a>
              <a className="btn-ghost" href="https://openstates.org/" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{t ? "Legisladores estatales" : "Find my state legislators"}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 4px", color: "#fff" }}>{t ? "Coaliciones y recursos" : "Coalitions & resources"}</p>
        <p style={{ fontSize: 13, margin: "2px 0" }}><a href="https://www.340bhealth.org" target="_blank" rel="noreferrer">340B Health</a> — association of hospitals in 340B</p>
        <p style={{ fontSize: 13, margin: "2px 0" }}><a href="https://www.nachc.org" target="_blank" rel="noreferrer">NACHC</a> — community health center advocacy</p>
        <p style={{ fontSize: 13, margin: "2px 0" }}><a href="https://rwc340b.org" target="_blank" rel="noreferrer">Ryan White Clinics for 340B Access</a></p>
        <p style={{ fontSize: 13, margin: "2px 0" }}><a href="https://www.hrsa.gov/opa" target="_blank" rel="noreferrer">HRSA Office of Pharmacy Affairs</a> — program authority</p>
      </div>
    </div>
  );
}

function PolicyBrief({ lang, state, onClose }) {
  const t = lang === "es";
  const si = STATE_INFO[state];
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const [providerName, setProviderName] = useState("");
  const [institution, setInstitution] = useState("");
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <span style={{ fontWeight: 500, fontSize: 15, letterSpacing: "0.04em", textTransform: "uppercase", color: B.textMuted }}>{t ? "Resumen clínico-político" : "Clinical policy brief"}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-primary" onClick={() => window.print()}>{t ? "Imprimir / PDF" : "Print / Save PDF"}</button>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: B.textMuted, cursor: "pointer" }}>×</button>
          </div>
        </div>
        <div className="no-print" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.25rem" }}>
          <div>
            <label style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: B.textMuted, display: "block", marginBottom: 4 }}>{t ? "Clínico" : "Provider"}</label>
            <input className="input-base" value={providerName} onChange={e => setProviderName(e.target.value)} placeholder={t ? "Dr. Nombre, MD" : "Dr. Name, MD"} />
          </div>
          <div>
            <label style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: B.textMuted, display: "block", marginBottom: 4 }}>{t ? "Institución" : "Institution"}</label>
            <input className="input-base" value={institution} onChange={e => setInstitution(e.target.value)} placeholder={t ? "Hospital / Clínica" : "Hospital / Clinic"} />
          </div>
        </div>
        <hr className="divider" />
        <div style={{ fontSize: 14, lineHeight: 1.75 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "0.75rem", marginBottom: "0.85rem", borderBottom: `1px solid ${B.border}` }}>
            <div>
              <p className="serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 2px" }}>{t ? "El programa 340B: resumen para HCPs" : "The 340B Program: HCP Brief"}</p>
              <p style={{ fontSize: 12, color: B.textMuted, margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>BlackDoctor Pro · 340B HCP</p>
            </div>
            <div style={{ textAlign: "right", fontSize: 12, color: B.textMuted, flexShrink: 0, marginLeft: 16 }}>
              {providerName && <p style={{ margin: "0 0 2px", fontWeight: 500, color: B.text }}>{providerName}</p>}
              {institution && <p style={{ margin: "0 0 2px" }}>{institution}</p>}
              <p style={{ margin: 0 }}>{today}</p>
            </div>
          </div>
          {[
            { h: t ? "Qué es" : "What it is", b: t ? "340B obliga a los fabricantes de medicamentos a vender medicamentos ambulatorios a precios reducidos a entidades cubiertas (FQHCs, DSH, CAH, hospitales pediátricos, clínicas Ryan White, RRC, SCH). Es una ley federal (42 U.S.C. §256b)." : "Federal law (42 U.S.C. §256b) requiring manufacturers to sell outpatient drugs at discounted prices to covered entities — FQHCs, DSH hospitals, CAHs, children's hospitals, Ryan White clinics, RRCs, SCHs." },
            { h: t ? "Por qué importa en la clínica" : "Why it matters at the bedside", b: t ? "Los ahorros financian navegadores de pacientes, asistencia financiera, sillas de infusión, programas de insulina, traducción y atención para no asegurados — capacidades que no son facturables pero son esenciales para servir a comunidades desatendidas." : "Savings fund patient navigators, financial assistance, infusion chairs, insulin programs, translation, and care for the uninsured — capacities that are not separately billable but are essential to underserved care." },
            { h: t ? "Debate actual" : "Current debate", b: t ? "La transparencia y la rendición de cuentas están en el centro del debate: restricciones de fabricantes a farmacias contratadas, reembolso discriminatorio de PBMs, uso de ingresos hospitalarios y si los ahorros llegan a los pacientes." : "Transparency and accountability sit at the center: manufacturer contract-pharmacy restrictions, discriminatory PBM reimbursement, how hospital 340B revenue is spent, and whether savings reach vulnerable patients." },
            { h: t ? "Qué puede hacer el HCP" : "What the HCP can do", list: t ? ["Contactar a legisladores federales y estatales con casos clínicos concretos","Apoyar la reforma de PBMs que prohíba el reembolso discriminatorio","Unirse a 340B Health, NACHC o coaliciones estatales","Documentar el impacto local con datos — no anécdotas generales"] : ["Contact federal and state lawmakers with concrete clinical cases","Support PBM reform that bars discriminatory reimbursement","Join 340B Health, NACHC, or a state coalition","Document local impact with data — not general talking points"] },
          ].map(s => (
            <div key={s.h} style={{ marginBottom: "0.85rem" }}>
              <p style={{ fontWeight: 600, margin: "0 0 3px", color: "#fff" }}>{s.h}</p>
              {s.b ? <p style={{ margin: 0, color: B.textMuted }}>{s.b}</p> : (
                <div>{s.list.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 5 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: B.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: "#fff", flexShrink: 0, marginTop: 3 }}>{i + 1}</div>
                    <p style={{ fontSize: 13, margin: 0, color: B.textMuted, lineHeight: 1.5 }}>{tip}</p>
                  </div>
                ))}</div>
              )}
            </div>
          ))}
          {si && (
            <div style={{ background: B.panel, borderLeft: `3px solid ${B.teal}`, padding: "0.75rem 1rem", marginBottom: "0.85rem" }}>
              <p style={{ fontWeight: 600, fontSize: 13, margin: "0 0 3px", color: "#fff" }}>{t ? `Contexto de ${state}` : `${state} context`}</p>
              <p style={{ fontSize: 13, margin: "0 0 4px", color: B.textMuted }}>{si.protections}</p>
              <a href={si.resources} style={{ fontSize: 12 }}>{si.resources}</a>
            </div>
          )}
          <hr className="divider" />
          <p style={{ fontSize: 12, color: B.textMuted, margin: 0 }}>HRSA 340B: hrsa.gov/opa · 340B Health: 340bhealth.org · NACHC: nachc.org</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBrief, setShowBrief] = useState(false);
  const [showAllStarters, setShowAllStarters] = useState(false);
  const [tab, setTab] = useState("chat");
  const [lang, setLang] = useState("en");
  const [langWarning, setLangWarning] = useState(false);
  const [state, setState] = useState("");
  const bottomRef = useRef(null);
  const t = lang === "es";
  const si = STATE_INFO[state];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    const next = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: buildSystem(lang), messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "Sorry, no response." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: t ? "Algo salió mal." : "Something went wrong." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {showBrief && <PolicyBrief lang={lang} state={state} onClose={() => setShowBrief(false)} />}

        <div className="brand-header">
          <div className="brand-mark">
            <span>BlackDoctor</span><span className="pro">Pro</span>
            <span className="sep">·</span>
            <span className="sub">340B HCP</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select value={state} onChange={e => setState(e.target.value)} style={{ fontSize: 12, padding: "7px 10px", border: `1px solid ${B.border}`, background: B.panel, color: B.text, borderRadius: 3, maxWidth: 160 }}>
              <option value="">{t ? "Estado" : "Select state"}</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="btn-ghost" onClick={() => { if (messages.length > 0) { setLangWarning(true); } else { setLang(l => l === "en" ? "es" : "en"); } }}>{t ? "English" : "Español"}</button>
          </div>
        </div>

        <div className="teal-banner">
          {t ? "Perspectivas clínicas. Impacto comunitario. Políticas basadas en evidencia para HCPs." : "Clinical insights. Community impact. Evidence-based 340B resources for healthcare providers."}
        </div>

        {langWarning && (
          <div style={{ background: B.panel, border: `1px solid ${B.teal}`, padding: "0.65rem 1rem", marginBottom: "1rem", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span>{t ? "¿Cambiar a English? Se borrará la conversación actual." : "Switch to Español? This will clear the current conversation."}</span>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button className="btn-primary" onClick={() => { setLang(l => l === "en" ? "es" : "en"); setMessages([]); setLangWarning(false); }}>{t ? "Switch" : "Cambiar"}</button>
              <button className="btn-ghost" onClick={() => setLangWarning(false)}>{t ? "Cancel" : "Cancelar"}</button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 0, marginBottom: "1.5rem", borderBottom: `1px solid ${B.border}`, flexWrap: "wrap" }}>
          {["chat","about","advocacy","pharmacies"].map(k => (
            <button key={k} className={`tab-btn${tab === k ? " active" : ""}`} onClick={() => setTab(k)}>
              {{
                chat: t ? "340B Smart Chat" : "340B Smart Chat",
                about: t ? "Sobre 340B" : "About 340B",
                advocacy: t ? "Abogar" : "Advocacy",
                pharmacies: t ? "Entidades" : "Covered entities"
              }[k]}
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, paddingBottom: 4 }}>
            <button className="btn-teal-outline" onClick={() => setShowBrief(true)}>{t ? "Resumen" : "Policy brief"}</button>
          </div>
        </div>

        {state && si && (
          <div className="state-banner">
            <span style={{ fontWeight: 600, color: B.teal }}>{state}: </span>{si.protections}
          </div>
        )}

        {tab === "chat" && (
          <div>
            {messages.length === 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <div className="starter-banner">
                  <span className="starter-banner-title">{t ? "Preguntas para comenzar" : "Conversation starters"}</span>
                  <span className="starter-banner-sub">{t ? "toque para preguntar" : "tap any prompt to ask"}</span>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: "1rem", marginBottom: "1.5rem" }}>
                  <input className="input-base" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} placeholder={t ? "Escriba su pregunta sobre 340B..." : "Ask your 340B policy or clinical question..."} style={{ flex: 1, fontSize: 15, padding: "12px 16px" }} />
                  <button className="btn-primary" onClick={() => send()} disabled={loading}>{t ? "Enviar" : "Send"}</button>
                </div>
                <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: B.textMuted, margin: "0 0 10px", fontWeight: 600 }}>{t ? "O pruebe una de estas" : "Or try one of these"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "flex-start", alignItems: "center" }}>
                  {STARTERS[lang].slice(0, showAllStarters ? STARTERS[lang].length : 5).map(q => <button key={q} className="chip-btn" onClick={() => send(q)} disabled={loading}>{q}</button>)}
                  {STARTERS[lang].length > 5 && (
                    <button className="more-btn" onClick={() => setShowAllStarters(!showAllStarters)}>
                      {showAllStarters ? (t ? "Menos ▲" : "Show less ▲") : (t ? `+${STARTERS[lang].length - 5} más ▼` : `+${STARTERS[lang].length - 5} more ▼`)}
                    </button>
                  )}
                </div>
              </div>
            )}
            <div style={{ minHeight: messages.length === 0 ? 0 : 180, marginBottom: "0.85rem" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: "0.75rem", gap: 8 }}>
                  {m.role === "assistant" && <div className="avatar">340B</div>}
                  <div className={m.role === "user" ? "bubble-user" : "bubble-ai"}>{m.content}</div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                  <div className="avatar">340B</div>
                  <div className="bubble-ai" style={{ color: B.textMuted }}>{t ? "Pensando..." : "Thinking..."}</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            {messages.length > 0 && (
              <div style={{ display: "flex", gap: 8 }}>
                <input className="input-base" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} placeholder={t ? "Haga una pregunta sobre 340B..." : "Ask a 340B question..."} disabled={loading} />
                <button className="btn-primary" onClick={() => send()} disabled={loading}>{t ? "Enviar" : "Send"}</button>
              </div>
            )}
            {messages.length > 0 && <button onClick={() => setMessages([])} style={{ marginTop: 8, fontSize: 12, color: B.textMuted, background: "none", border: "none", cursor: "pointer" }}>{t ? "Limpiar" : "Clear conversation"}</button>}
          </div>
        )}

        {tab === "about" && (
          <div style={{ fontSize: 14, lineHeight: 1.8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12, marginBottom: "1.5rem" }}>
              {[{ l: t ? "Ahorro est." : "Est. savings", v: "25–50%", s: t ? "medicamentos elegibles" : "on eligible outpatient drugs" },
                { l: t ? "Desde" : "Since", v: "1992", s: t ? "ley federal" : "42 U.S.C. §256b" },
                { l: t ? "Entidades" : "Covered entities", v: "50,000+", s: t ? "nacional" : "nationwide" }].map(c => (
                <div key={c.l} className="stat-card">
                  <p className="stat-label" style={{ fontSize: 10, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{c.l}</p>
                  <p className="serif stat-value" style={{ fontSize: 30, fontWeight: 500, margin: "0 0 4px" }}>{c.v}</p>
                  <p className="stat-sub" style={{ fontSize: 12, margin: 0 }}>{c.s}</p>
                </div>
              ))}
            </div>
            {(t ? [
              { h: "¿Qué es el programa 340B?", b: "Ley federal de 1992 que obliga a los fabricantes a vender medicamentos ambulatorios a precios reducidos a entidades de seguridad — FQHCs, DSH, CAH, hospitales pediátricos, Ryan White, RRC, SCH." },
              { h: "¿Por qué importa en la clínica?", b: "Los ahorros sostienen servicios no facturables esenciales: navegación, traducción, asistencia financiera, farmacia clínica, oncología ambulatoria en comunidades desatendidas." },
              { h: "El debate actual", b: "Transparencia, rendición de cuentas, restricciones de fabricantes a farmacias contratadas, reembolso PBM discriminatorio, y si los ahorros llegan a los pacientes que el programa pretende servir." },
              { h: "¿Qué sigue?", b: "Ver pestaña 'Abogar' para pasos concretos, plantilla de correo a legisladores y coaliciones." },
            ] : [
              { h: "What is the 340B program?", b: "A 1992 federal law (42 U.S.C. §256b) requiring drug manufacturers to sell outpatient medications at deeply discounted prices to safety-net entities — FQHCs, DSH hospitals, CAHs, children's hospitals, Ryan White clinics, RRCs, and SCHs." },
              { h: "Why it matters at the bedside", b: "340B savings fund the non-billable clinical infrastructure that makes safety-net care possible: patient navigation, translation, financial assistance, clinical pharmacy, outpatient oncology infrastructure in underserved communities." },
              { h: "The current debate", b: "Transparency and accountability dominate the national conversation: manufacturer contract-pharmacy restrictions, discriminatory PBM reimbursement, how hospital 340B revenue is used, and whether savings demonstrably reach vulnerable patients." },
              { h: "What HCPs can do", b: "See the 'Advocacy' tab for concrete steps, a template email to lawmakers, and the major 340B coalitions." },
            ]).map(s => (
              <div key={s.h} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: `1px solid ${B.border}` }}>
                <p className="serif" style={{ fontWeight: 500, margin: "0 0 4px", fontSize: 18, color: "#fff" }}>{s.h}</p>
                <p style={{ margin: 0, color: B.textMuted }}>{s.b}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "advocacy" && <AdvocacyTab lang={lang} state={state} />}

        {tab === "pharmacies" && (
          <div>
            <p style={{ fontSize: 13, color: B.textMuted, margin: "0 0 1rem" }}>{t ? "Busque entidades cubiertas por 340B cerca de un código postal." : "Search for 340B covered entities near a zip code."}</p>
            <PharmacyLookup lang={lang} />
          </div>
        )}
      </div>
    </>
  );
}
