import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Parse .env.local manually (handles UTF-16 BOM that Windows sometimes adds)
function loadEnv(filePath) {
  const raw = readFileSync(filePath)
  const text = raw.toString('utf8').replace(/\0/g, '').replace(/^\uFEFF/, '')
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim()
    if (key) process.env[key] = val
  }
}

loadEnv(resolve(__dirname, '../.env.local'))

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

// ─── CREATE TABLE SQL ────────────────────────────────────────────────────────
const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS advisors (
  id                   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name                 TEXT        NOT NULL,
  email                TEXT        UNIQUE NOT NULL,
  city                 TEXT        NOT NULL,
  sebi_number          TEXT        UNIQUE NOT NULL,
  registration         TEXT        NOT NULL DEFAULT 'RIA',
  experience           INTEGER     NOT NULL,
  specializations      TEXT[]      NOT NULL DEFAULT '{}',
  specialization_labels TEXT[]     NOT NULL DEFAULT '{}',
  languages            TEXT[]      NOT NULL DEFAULT '{}',
  bio                  TEXT        NOT NULL,
  fee_range            TEXT        NOT NULL,
  is_active            BOOLEAN     NOT NULL DEFAULT true,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security but allow public reads
ALTER TABLE advisors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public advisors are viewable by everyone"
  ON advisors FOR SELECT USING (is_active = true);
`

// Actual table columns: id, full_name, email, phone, city, sebi_reg_no,
// years_experience, specializations, languages, bio, is_active, created_at

// ─── 50 ADVISOR PROFILES ────────────────────────────────────────────────────
const advisors = [
  // ── BENGALURU (15) ──────────────────────────────────────────────────────
  {
    full_name: 'Rajesh Sharma',
    email: 'rajesh.sharma@finwise.in',
    phone: '+91-98451-10023',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000001823',
    years_experience: 12,
    specializations: ['mutual-funds', 'epf', 'inheritance'],
    languages: ['English', 'Hindi', 'Kannada'],
    bio: 'SEBI Registered Investment Advisor with 12 years of experience helping salaried professionals in Bengaluru build wealth through goal-based financial planning. Former banker turned fee-only advisor.',
  },
  {
    full_name: 'Priya Nair',
    email: 'priya.nair@wealthharbour.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000002156',
    years_experience: 8,
    specializations: ['mutual-funds', 'nri', 'global'],
    languages: ['English', 'Malayalam', 'Hindi'],
    bio: 'Specialises in NRI financial planning and cross-border investment strategies. Helped 200+ NRI clients structure tax-efficient portfolios. SEBI RIA with CFA Level II.',
  },
  {
    full_name: 'Venkatesh Rao',
    email: 'v.rao@capitalpath.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000003741',
    years_experience: 16,
    specializations: ['bonds', 'mutual-funds', 'nps'],
    languages: ['English', 'Telugu', 'Kannada'],
    bio: 'Senior wealth advisor with 16 years in fixed income and debt markets. Expert in building conservative portfolios for retirees and near-retirement professionals using bonds, SGBs, and NPS.',
  },
  {
    full_name: 'Ananya Krishnan',
    email: 'ananya.k@plannersindia.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000004589',
    years_experience: 10,
    specializations: ['nri', 'global', 'mutual-funds'],
    languages: ['English', 'Tamil', 'Hindi'],
    bio: 'Dual-qualified financial advisor with expertise in international taxation and LRS remittance planning. Regularly advises IT professionals in Bengaluru on US stocks and ETF investing under the Liberalised Remittance Scheme.',
  },
  {
    full_name: 'Girish Hegde',
    email: 'girish.hegde@debtfreeindia.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000005312',
    years_experience: 7,
    specializations: ['loan', 'mutual-funds', 'insurance'],
    languages: ['English', 'Kannada', 'Tulu'],
    bio: 'Specialises in debt restructuring and home loan optimisation for young professionals. Certified Financial Planner with a focus on building net worth through loan prepayment strategies and parallel SIP investing.',
  },
  {
    full_name: 'Sridevi Pillai',
    email: 'sridevi.pillai@horizonwealth.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000006723',
    years_experience: 13,
    specializations: ['epf', 'mutual-funds', 'nps'],
    languages: ['English', 'Malayalam', 'Kannada'],
    bio: 'Specialist in retirement corpus planning integrating EPF, NPS, and mutual fund SIPs. Has guided over 300 Bengaluru-based corporate employees on PF transfers, UAN activation, and nomination structuring.',
  },
  {
    full_name: 'Naveen Shetty',
    email: 'naveen.shetty@safehavenrm.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000007834',
    years_experience: 9,
    specializations: ['mutual-funds', 'bonds', 'insurance'],
    languages: ['English', 'Kannada', 'Hindi'],
    bio: 'Fee-only RIA helping Bengaluru families build diversified portfolios. Focus on term insurance adequacy reviews and FD laddering for medium-term goals. No product commissions — ever.',
  },
  {
    full_name: 'Deepa Kulkarni',
    email: 'deepa.kulkarni@clearfinplan.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000008915',
    years_experience: 11,
    specializations: ['inheritance', 'mutual-funds', 'epf'],
    languages: ['English', 'Marathi', 'Kannada'],
    bio: 'Focuses on estate planning, will drafting guidance, and asset transfer for high-net-worth families. Works with clients to structure joint accounts, trusts, and nominations to avoid post-inheritance disputes.',
  },
  {
    full_name: 'Aditya Bhat',
    email: 'aditya.bhat@newleaffinance.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000009026',
    years_experience: 6,
    specializations: ['mutual-funds', 'nps', 'loan'],
    languages: ['English', 'Kannada', 'Hindi'],
    bio: 'Young SEBI RIA passionate about helping early-career professionals in Bengaluru start their financial journey right. Specialises in NPS Tier 1 & 2 setup and SIP-based goal planning for first-time investors.',
  },
  {
    full_name: 'Ramakrishna Iyer',
    email: 'rk.iyer@trustedadvisor.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000010137',
    years_experience: 22,
    specializations: ['inheritance', 'bonds', 'mutual-funds'],
    languages: ['English', 'Tamil', 'Kannada', 'Hindi'],
    bio: 'Veteran advisor with 22 years of experience in wealth management and estate planning. Former Head of Private Banking at a leading PSU bank. Specialises in multi-generational wealth transfer and conservation for HNI families.',
  },
  {
    full_name: 'Sunitha Reddy',
    email: 'sunitha.reddy@wisefolio.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000011248',
    years_experience: 8,
    specializations: ['mutual-funds', 'insurance', 'epf'],
    languages: ['English', 'Telugu', 'Kannada'],
    bio: 'Believes every family needs a comprehensive financial health check before investing. Focuses on term insurance sizing, health cover adequacy reviews, and SIP-based wealth building for working couples.',
  },
  {
    full_name: 'Karthik Swamy',
    email: 'karthik.swamy@globalinvestindia.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000012359',
    years_experience: 14,
    specializations: ['nri', 'global', 'mutual-funds'],
    languages: ['English', 'Tamil', 'Hindi'],
    bio: 'Expert in cross-border financial planning for NRIs returning to India and for resident Indians investing abroad. Advises on DTAA benefits, NRE/NRO account structuring, and PFIC compliance for US-based NRIs.',
  },
  {
    full_name: 'Manjula Naidu',
    email: 'manjula.naidu@steadyreturns.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000013460',
    years_experience: 10,
    specializations: ['mutual-funds', 'bonds', 'nps'],
    languages: ['English', 'Telugu', 'Kannada'],
    bio: 'Specialises in conservative wealth management for government employees and teachers. Expertise in integrating NPS Tier 1 with debt mutual funds and RBI bonds to build a predictable retirement income stream.',
  },
  {
    full_name: 'Vivek Sharma',
    email: 'vivek.s@startupwealth.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000014571',
    years_experience: 5,
    specializations: ['mutual-funds', 'epf', 'loan'],
    languages: ['English', 'Hindi'],
    bio: 'Works primarily with startup employees navigating ESOPs, variable pay, and EPF complexity. Helps clients align their irregular cash flows with SIP investments and home loan prepayment schedules.',
  },
  {
    full_name: 'Arjun Balakrishnan',
    email: 'arjun.b@legacyplanners.in',
    city: 'Bengaluru',
    sebi_reg_no: 'INA000015682',
    years_experience: 17,
    specializations: ['inheritance', 'mutual-funds', 'bonds'],
    languages: ['English', 'Tamil', 'Kannada', 'Malayalam'],
    bio: 'Senior advisor specialising in inter-generational wealth planning and business succession for family-owned enterprises in Bengaluru. Expertise in structuring HUFs, family trusts, and nomination frameworks.',
  },

  // ── MUMBAI (12) ─────────────────────────────────────────────────────────
  {
    full_name: 'Vikram Mehta',
    email: 'vikram.mehta@alphawealth.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000016793',
    years_experience: 15,
    specializations: ['mutual-funds', 'inheritance', 'bonds'],
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Boutique wealth advisor with 15 years in Mumbai\'s financial district. Manages portfolios for senior executives and business families. Emphasis on asset allocation discipline and behavioural coaching during market volatility.',
  },
  {
    full_name: 'Meena Patel',
    email: 'meena.patel@goalbridge.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000017804',
    years_experience: 11,
    specializations: ['mutual-funds', 'epf', 'nps'],
    languages: ['English', 'Gujarati', 'Hindi'],
    bio: 'Known for translating complex financial jargon into simple action plans. Specialises in retirement planning for corporate employees using EPF, NPS, and equity mutual funds. Has a strong following in Andheri and Borivali.',
  },
  {
    full_name: 'Rohan Shah',
    email: 'rohan.shah@overseascapital.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000018915',
    years_experience: 8,
    specializations: ['global', 'nri', 'mutual-funds'],
    languages: ['English', 'Gujarati', 'Hindi'],
    bio: 'Focuses exclusively on LRS-based global investing for Mumbai HNI clients. Advises on US ETF portfolios, international mutual funds, and currency hedging strategies. Regular speaker at CFA India events.',
  },
  {
    full_name: 'Sunita Desai',
    email: 'sunita.desai@desaiwm.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000019026',
    years_experience: 19,
    specializations: ['inheritance', 'bonds', 'mutual-funds'],
    languages: ['English', 'Marathi', 'Gujarati', 'Hindi'],
    bio: 'One of Mumbai\'s most experienced fee-only advisors with 19 years in practice. Specialises in estate planning, family wealth governance, and creating structured withdrawal plans for retirees using a bond ladder approach.',
  },
  {
    full_name: 'Nikhil Agarwal',
    email: 'nikhil.agarwal@loansmart.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000020137',
    years_experience: 7,
    specializations: ['loan', 'mutual-funds', 'insurance'],
    languages: ['English', 'Hindi', 'Marathi'],
    bio: 'Former credit analyst turned fee-only advisor. Helps Mumbai clients decode home loan terms, negotiate interest rates, and build optimal prepayment vs investment strategies. Specialises in balance transfer analysis.',
  },
  {
    full_name: 'Preethi Menon',
    email: 'preethi.menon@growthcompass.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000021248',
    years_experience: 12,
    specializations: ['mutual-funds', 'nps', 'bonds'],
    languages: ['English', 'Malayalam', 'Hindi'],
    bio: 'SEBI RIA with CFP certification. Advises working professionals and homemakers on building a sustainable retirement corpus integrating NPS with debt and equity mutual funds. Operates from Powai.',
  },
  {
    full_name: 'Siddharth Malhotra',
    email: 'sid.malhotra@nriadvisor.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000022359',
    years_experience: 10,
    specializations: ['nri', 'global', 'mutual-funds'],
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Dedicated NRI wealth manager based in BKC. Works with Overseas Citizens of India and returning NRIs to structure India re-entry financial plans, repatriation strategies, and tax-optimised investment portfolios.',
  },
  {
    full_name: 'Rupal Shah',
    email: 'rupal.shah@rupals.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000023460',
    years_experience: 14,
    specializations: ['mutual-funds', 'inheritance', 'epf'],
    languages: ['English', 'Gujarati', 'Hindi'],
    bio: 'Known for plain-spoken advice and zero-jargon financial plans. 14 years advising Gujarati business families on wealth creation, succession planning, and EPF trust management. Based in Vile Parle.',
  },
  {
    full_name: 'Amol Kulkarni',
    email: 'amol.k@punekarnri.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000024571',
    years_experience: 6,
    specializations: ['loan', 'mutual-funds', 'insurance'],
    languages: ['English', 'Marathi', 'Hindi'],
    bio: 'Helps young Mumbai professionals avoid the most common financial mistakes: underinsuring, over-borrowing, and under-saving. Provides structured debt management roadmaps alongside SIP-based investment plans.',
  },
  {
    full_name: 'Vaishali Mehta',
    email: 'vaishali.m@portfosafe.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000025682',
    years_experience: 9,
    specializations: ['mutual-funds', 'bonds', 'nps'],
    languages: ['English', 'Gujarati', 'Hindi'],
    bio: 'Certified financial planner helping Mumbai\'s middle-income families navigate financial decisions with clarity. Specialises in goal-based portfolio construction balancing equity SIPs with FD ladders for stability.',
  },
  {
    full_name: 'Ritesh Gupta',
    email: 'ritesh.gupta@wealthdelta.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000026793',
    years_experience: 16,
    specializations: ['inheritance', 'mutual-funds', 'bonds'],
    languages: ['English', 'Hindi', 'Marwari'],
    bio: 'Senior advisor to Marwari business families in Mumbai. Deep expertise in HUF structuring, family trust formation, and multi-generational wealth conservation. 16 years of conflict-free fee-only practice.',
  },
  {
    full_name: 'Dipika Soni',
    email: 'dipika.soni@womenfinance.in',
    city: 'Mumbai',
    sebi_reg_no: 'INA000027804',
    years_experience: 11,
    specializations: ['mutual-funds', 'epf', 'nri'],
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Specialises in financial planning for working women and women entrepreneurs. Focuses on financial independence through goal-based SIPs, EPF maximisation, and insurance structuring. Based in Lower Parel.',
  },

  // ── DELHI / NCR (10) ────────────────────────────────────────────────────
  {
    full_name: 'Arun Kumar',
    email: 'arun.kumar@delhiria.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000028915',
    years_experience: 20,
    specializations: ['inheritance', 'mutual-funds', 'nri'],
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Doyen of Delhi\'s fee-only advisory community with 20 years of practice. Advises Delhi and NCR-based business families and government officials on estate planning, succession, and portfolio management.',
  },
  {
    full_name: 'Pooja Sharma',
    email: 'pooja.sharma@goalsetters.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000029026',
    years_experience: 9,
    specializations: ['mutual-funds', 'epf', 'loan'],
    languages: ['English', 'Hindi'],
    bio: 'Delhi-based SEBI RIA helping Millennial couples plan their first home purchase, children\'s education funds, and retirement simultaneously. Known for her structured "3-bucket" goal planning framework.',
  },
  {
    full_name: 'Manish Verma',
    email: 'manish.v@fixedincomeindia.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000030137',
    years_experience: 13,
    specializations: ['bonds', 'mutual-funds', 'nps'],
    languages: ['English', 'Hindi'],
    bio: 'Former treasury officer with 13 years advising on fixed income strategies. Expert in RBI bonds, PSU bond selection, and FD laddering. Advises conservative investors and retirees across Delhi NCR.',
  },
  {
    full_name: 'Neha Singh',
    email: 'neha.singh@smartcoverage.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000031248',
    years_experience: 7,
    specializations: ['mutual-funds', 'insurance', 'loan'],
    languages: ['English', 'Hindi'],
    bio: 'Insurance audit specialist turned SEBI RIA. Helps Delhi families identify over-priced, under-performing insurance policies and redirect premiums into mutual funds. Strong focus on term + health cover optimisation.',
  },
  {
    full_name: 'Sanjay Saxena',
    email: 'sanjay.saxena@patrimonium.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000032359',
    years_experience: 18,
    specializations: ['inheritance', 'bonds', 'mutual-funds'],
    languages: ['English', 'Hindi'],
    bio: 'Specialises in wealth preservation for senior IAS, IPS, and defence officers and their families. Expertise in government pension integration, PPF maximisation, and estate structuring for large asset bases.',
  },
  {
    full_name: 'Kritika Malhotra',
    email: 'kritika.m@globalmoneyin.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000033460',
    years_experience: 10,
    specializations: ['nri', 'global', 'mutual-funds'],
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Delhi\'s go-to advisor for Punjabi NRI families with large UK and Canada diaspora connections. Expert in DTAA planning, FEMA compliance, and repatriation of inherited property proceeds.',
  },
  {
    full_name: 'Rakesh Tiwari',
    email: 'rakesh.tiwari@retirerich.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000034571',
    years_experience: 15,
    specializations: ['mutual-funds', 'epf', 'nps'],
    languages: ['English', 'Hindi'],
    bio: 'Retirement planning specialist working primarily with central government employees and PSU workers. Deep expertise in NPS Tier 1 allocation strategies, EPF partial withdrawals, and Systematic Withdrawal Plans for retirees.',
  },
  {
    full_name: 'Anita Gupta',
    email: 'anita.gupta@safeportfolio.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000035682',
    years_experience: 8,
    specializations: ['mutual-funds', 'insurance', 'bonds'],
    languages: ['English', 'Hindi'],
    bio: 'Known for comprehensive financial health audits that uncover hidden inefficiencies. Helps Delhi NCR families reduce insurance costs, consolidate scattered FDs, and migrate to goal-oriented mutual fund portfolios.',
  },
  {
    full_name: 'Dhruv Chandra',
    email: 'dhruv.chandra@pillarswealth.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000036793',
    years_experience: 11,
    specializations: ['loan', 'mutual-funds', 'inheritance'],
    languages: ['English', 'Hindi'],
    bio: 'Holistic advisor focusing on the intersection of debt management and wealth building. Develops customised roadmaps for Delhi professionals to become debt-free while simultaneously growing a meaningful investment corpus.',
  },
  {
    full_name: 'Kavita Bhatia',
    email: 'kavita.bhatia@wealthwomen.in',
    city: 'Delhi',
    sebi_reg_no: 'INA000037804',
    years_experience: 14,
    specializations: ['mutual-funds', 'nri', 'global'],
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Serves NRI clients from Delhi NCR with large US and Canada communities. Specialises in helping NRIs rebalance India-based portfolios while maintaining global diversification through LRS investing.',
  },

  // ── CHENNAI (6) ─────────────────────────────────────────────────────────
  {
    full_name: 'Kavitha Iyer',
    email: 'kavitha.iyer@southfinplan.in',
    city: 'Chennai',
    sebi_reg_no: 'INA000038915',
    years_experience: 7,
    specializations: ['insurance', 'mutual-funds', 'loan'],
    languages: ['English', 'Tamil', 'Hindi'],
    bio: 'Chennai-based advisor passionate about helping families build financial resilience. Known for structured insurance audits that eliminate expensive endowment plans and redirect savings into mutual funds and term covers.',
  },
  {
    full_name: 'Balasubramaniam Raghavan',
    email: 'bala.raghavan@heritagewm.in',
    city: 'Chennai',
    sebi_reg_no: 'INA000039026',
    years_experience: 21,
    specializations: ['inheritance', 'bonds', 'mutual-funds'],
    languages: ['English', 'Tamil'],
    bio: 'Chennai\'s most experienced estate planning advisor. Former advocate and financial planner, now a full-time SEBI RIA specialising in will drafting guidance, asset distribution frameworks, and family settlement structures.',
  },
  {
    full_name: 'Lakshmi Venkataraman',
    email: 'lakshmi.v@nrifincenter.in',
    city: 'Chennai',
    sebi_reg_no: 'INA000040137',
    years_experience: 12,
    specializations: ['mutual-funds', 'nri', 'epf'],
    languages: ['English', 'Tamil', 'Hindi'],
    bio: 'Specialises in dual-residency financial planning for Tamil Nadu-origin NRIs across the US, UK, Singapore, and Middle East. Expertise in PF withdrawal for non-resident Indians and tax-efficient repatriation.',
  },
  {
    full_name: 'Sundar Krishnamurthy',
    email: 'sundar.km@pensionpathway.in',
    city: 'Chennai',
    sebi_reg_no: 'INA000041248',
    years_experience: 9,
    specializations: ['nps', 'mutual-funds', 'bonds'],
    languages: ['English', 'Tamil'],
    bio: 'NPS specialist who has helped 500+ Tamil Nadu government employees and private sector workers optimise their pension corpus. Expert in fund manager selection and annuity planning under NPS for maximum post-retirement income.',
  },
  {
    full_name: 'Priya Subramanian',
    email: 'priya.sub@familyfinchennai.in',
    city: 'Chennai',
    sebi_reg_no: 'INA000042359',
    years_experience: 11,
    specializations: ['mutual-funds', 'epf', 'insurance'],
    languages: ['English', 'Tamil', 'Telugu'],
    bio: 'Empowers Chennai families with practical financial plans tailored to South Indian lifestyle and financial patterns. Specialises in education corpus creation, EPF maximisation, and family health cover structuring.',
  },
  {
    full_name: 'Rajan Narayanan',
    email: 'rajan.n@fixedwealthindia.in',
    city: 'Chennai',
    sebi_reg_no: 'INA000043460',
    years_experience: 16,
    specializations: ['inheritance', 'mutual-funds', 'bonds'],
    languages: ['English', 'Tamil', 'Hindi'],
    bio: 'Senior wealth advisor serving Chennai\'s old-money families and business community. Expert in systematic asset transfer between generations, trust structuring, and building fixed income ladders for long-term wealth preservation.',
  },

  // ── HYDERABAD (5) ───────────────────────────────────────────────────────
  {
    full_name: 'Suresh Reddy',
    email: 'suresh.reddy@deccanwealth.in',
    city: 'Hyderabad',
    sebi_reg_no: 'INA000044571',
    years_experience: 18,
    specializations: ['mutual-funds', 'nps', 'bonds'],
    languages: ['English', 'Telugu', 'Hindi'],
    bio: 'Senior Hyderabad-based advisor with 18 years serving pharma, IT, and manufacturing sector employees. Strong expertise in NPS fund manager selection and conservative portfolio strategies for senior professionals nearing retirement.',
  },
  {
    full_name: 'Anuradha Rao',
    email: 'anuradha.rao@goalplanners.in',
    city: 'Hyderabad',
    sebi_reg_no: 'INA000045682',
    years_experience: 10,
    specializations: ['mutual-funds', 'epf', 'inheritance'],
    languages: ['English', 'Telugu', 'Hindi'],
    bio: 'Hyderabad-based SEBI RIA combining behavioral finance coaching with robust financial planning. Specialises in EPF-based retirement strategies and nomination/will planning for IT professionals and dual-income families.',
  },
  {
    full_name: 'Venkataramana Naidu',
    email: 'vr.naidu@globalnrideccan.in',
    city: 'Hyderabad',
    sebi_reg_no: 'INA000046793',
    years_experience: 14,
    specializations: ['bonds', 'nri', 'mutual-funds'],
    languages: ['English', 'Telugu', 'Hindi'],
    bio: 'Expert in NRI financial planning for Hyderabad-origin professionals in the Middle East and US. Advises on NRO/NRE account management, repatriation of rental income, and India portfolio structuring for NRI clients.',
  },
  {
    full_name: 'Madhavi Krishnarao',
    email: 'madhavi.k@securelifeplan.in',
    city: 'Hyderabad',
    sebi_reg_no: 'INA000047804',
    years_experience: 8,
    specializations: ['mutual-funds', 'insurance', 'loan'],
    languages: ['English', 'Telugu', 'Kannada'],
    bio: 'Focuses on financial protection and wealth building for young Hyderabad families. Conducts insurance adequacy reviews, helps clients exit poor-performing endowment plans, and builds systematic investment plans from savings.',
  },
  {
    full_name: 'Praveen Chowdary',
    email: 'praveen.c@pensionplus.in',
    city: 'Hyderabad',
    sebi_reg_no: 'INA000048915',
    years_experience: 12,
    specializations: ['mutual-funds', 'epf', 'nps'],
    languages: ['English', 'Telugu', 'Hindi'],
    bio: 'Retirement planning specialist helping Hyderabad\'s large IT workforce integrate EPF, NPS, and equity SIPs into a coherent long-term plan. Runs monthly group financial planning workshops at tech parks in HITEC City.',
  },

  // ── PUNE (5) ────────────────────────────────────────────────────────────
  {
    full_name: 'Sanjay Joshi',
    email: 'sanjay.joshi@puneplanners.in',
    city: 'Pune',
    sebi_reg_no: 'INA000049026',
    years_experience: 9,
    specializations: ['loan', 'mutual-funds', 'insurance'],
    languages: ['English', 'Marathi', 'Hindi'],
    bio: 'Pune-based SEBI RIA known for practical, no-nonsense financial plans. Helps IT and manufacturing professionals in Pune manage home loans smartly while building a parallel investment portfolio through SIPs.',
  },
  {
    full_name: 'Ashwini Deshpande',
    email: 'ashwini.d@marathawealth.in',
    city: 'Pune',
    sebi_reg_no: 'INA000050137',
    years_experience: 13,
    specializations: ['mutual-funds', 'bonds', 'nps'],
    languages: ['English', 'Marathi', 'Hindi'],
    bio: 'Senior advisor with 13 years serving Pune\'s growing professional community. Expertise in conservative portfolio construction for risk-averse investors using FD ladders, debt mutual funds, and NPS contributions.',
  },
  {
    full_name: 'Prashant Kulkarni',
    email: 'prashant.k@futurewealth.in',
    city: 'Pune',
    sebi_reg_no: 'INA000051248',
    years_experience: 11,
    specializations: ['mutual-funds', 'epf', 'inheritance'],
    languages: ['English', 'Marathi', 'Hindi'],
    bio: 'Comprehensive financial planner helping Pune-based engineers and managers build wealth from day one. Specialises in EPF nomination updates, SIP automation, and estate planning for families with growing asset bases.',
  },
  {
    full_name: 'Swati Gokhale',
    email: 'swati.gokhale@femfin.in',
    city: 'Pune',
    sebi_reg_no: 'INA000052359',
    years_experience: 8,
    specializations: ['mutual-funds', 'insurance', 'nps'],
    languages: ['English', 'Marathi', 'Hindi'],
    bio: 'Passionate about financial literacy for women. Helps Pune-based working women take control of their financial lives through customised investment plans, health insurance reviews, and NPS account setup.',
  },
  {
    full_name: 'Rahul Chitale',
    email: 'rahul.chitale@wealthbridge.in',
    city: 'Pune',
    sebi_reg_no: 'INA000053460',
    years_experience: 15,
    specializations: ['inheritance', 'mutual-funds', 'bonds'],
    languages: ['English', 'Marathi', 'Hindi', 'Gujarati'],
    bio: 'Pune\'s trusted advisor for business family succession planning. 15 years of experience helping family businesses transition wealth across generations through structured HUF planning, trust formation, and portfolio consolidation.',
  },

  // ── OTHERS: Kolkata, Ahmedabad, Jaipur (3) ─────────────────────────────
  {
    full_name: 'Deepak Banerjee',
    email: 'deepak.banerjee@calcuttawealth.in',
    city: 'Kolkata',
    sebi_reg_no: 'INA000054571',
    years_experience: 14,
    specializations: ['bonds', 'mutual-funds', 'nps'],
    languages: ['English', 'Bengali', 'Hindi'],
    bio: 'Kolkata-based veteran advisor specialising in conservative wealth management for Bengal\'s professional and business community. Known for deep expertise in RBI savings bonds, PSU fixed deposits, and NPS fund selection.',
  },
  {
    full_name: 'Hardik Patel',
    email: 'hardik.patel@ahmedabadria.in',
    city: 'Ahmedabad',
    sebi_reg_no: 'INA000055682',
    years_experience: 11,
    specializations: ['mutual-funds', 'nri', 'global'],
    languages: ['English', 'Gujarati', 'Hindi'],
    bio: 'Ahmedabad-based SEBI RIA serving Gujarat\'s large NRI community. Specialises in LRS-based global investing, DTAA tax optimisation for US/UK NRIs, and India portfolio management for non-residents.',
  },
  {
    full_name: 'Monika Agarwal',
    email: 'monika.agarwal@jaipurfinplan.in',
    city: 'Jaipur',
    sebi_reg_no: 'INA000056793',
    years_experience: 9,
    specializations: ['mutual-funds', 'inheritance', 'insurance'],
    languages: ['English', 'Hindi', 'Rajasthani'],
    bio: 'Jaipur\'s leading fee-only advisor, working with Rajasthan\'s business and trading families on comprehensive financial planning. Expertise in will planning, nomination structuring, and systematic investing for family wealth growth.',
  },
]

// ─── SEED FUNCTION ──────────────────────────────────────────────────────────
async function seed() {
  console.log(`\n🔍 Checking Supabase connection (${supabaseUrl})...\n`)

  const { error: checkError } = await supabase.from('advisors').select('id').limit(1)

  if (checkError?.code === '42P01') {
    console.log('❌  Table "advisors" does not exist.\n')
    console.log('📋  Run this SQL in your Supabase SQL Editor, then re-run this script:\n')
    console.log('─'.repeat(60))
    console.log(CREATE_TABLE_SQL)
    console.log('─'.repeat(60))
    process.exit(1)
  }

  if (checkError) {
    console.error('❌  Unexpected error:', checkError.message)
    process.exit(1)
  }

  console.log('✅  Table exists.\n')
  console.log(`📦  Inserting ${advisors.length} advisor profiles...\n`)

  // Generate phone numbers for advisors that don't have one
  const phonePrefixes = ['98', '97', '96', '95', '94', '93', '91', '90', '88', '87', '86', '85', '84', '83', '82', '81', '80', '79', '78', '77', '76', '75', '74', '73', '72', '70']
  const withPhones = advisors.map((a, i) => ({
    ...a,
    phone: a.phone ?? `+91-${phonePrefixes[i % phonePrefixes.length]}${String(10000000 + i * 137 * 97).slice(0, 8)}`,
  }))

  const { data, error: insertError } = await supabase
    .from('advisors')
    .insert(withPhones)
    .select('id, full_name, city')

  if (insertError) {
    if (insertError.code === '23505') {
      console.error('❌  Duplicate detected — some advisors already exist. Delete existing rows first or use upsert.')
    } else {
      console.error('❌  Insert failed:', insertError.message)
    }
    process.exit(1)
  }

  console.log('✅  Successfully seeded advisors:\n')
  data.forEach((a, i) => console.log(`   ${String(i + 1).padStart(2, ' ')}. ${a.full_name} (${a.city}) — id: ${a.id}`))
  console.log(`\n🎉  Done! ${data.length} profiles inserted into Supabase.\n`)
}

seed().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
