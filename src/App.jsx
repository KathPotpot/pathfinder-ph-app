import { useState } from "react";

const INDUSTRIES = [
  { id: "technology", label: "Technology & IT", emoji: "💻" },
  { id: "healthcare", label: "Healthcare", emoji: "🏥" },
  { id: "business", label: "Business & Finance", emoji: "📊" },
  { id: "education", label: "Education", emoji: "📚" },
  { id: "engineering", label: "Engineering", emoji: "⚙️" },
  { id: "creative", label: "Arts & Creative", emoji: "🎨" },
  { id: "hospitality", label: "Hospitality & Tourism", emoji: "🏨" },
  { id: "agriculture", label: "Agriculture", emoji: "🌾" },
  { id: "government", label: "Government Service", emoji: "🏛️" },
  { id: "trade", label: "Skilled Trades", emoji: "🔧" },
  { id: "media", label: "Media & Comms", emoji: "📡" },
  { id: "retail", label: "Retail & Commerce", emoji: "🛍️" },
];

const EDUCATION_LEVELS = [
  { id: "SHS Graduate", label: "Stop at Senior High School", sub: "Enter the workforce right after K-12", tag: "0 extra years" },
  { id: "TESDA / Vocational", label: "TESDA / Vocational", sub: "Technical-vocational skills certification", tag: "6 months – 2 years" },
  { id: "Bachelor's Degree", label: "Bachelor's Degree", sub: "4-year college or university program", tag: "4 years" },
  { id: "Graduate Degree", label: "Graduate Degree", sub: "Master's, MD, Law, or PhD", tag: "6+ years" },
];

const EDU_ORDER = ["SHS Graduate", "TESDA / Vocational", "Bachelor's Degree", "Graduate Degree"];

const ALL_CAREERS = [
  // ── TECHNOLOGY ──
  { industry:"technology", minEdu:"SHS Graduate", title:"Technical Support Rep", field:"BPO / IT Support", salaryRange:"₱18,000 – ₱35,000/month", salaryMid:26500, eduReq:"SHS Graduate", timeline:"0–3 months (with training)", skills:["Communication","Troubleshooting","MS Office","Customer Service"], outlook:"High Demand", phContext:"Thousands of BPO seats in Metro Manila, Cebu & Davao hire fresh SHS grads with no experience required." },
  { industry:"technology", minEdu:"TESDA / Vocational", title:"Computer Hardware Technician", field:"Hardware & Networking", salaryRange:"₱18,000 – ₱32,000/month", salaryMid:25000, eduReq:"TESDA NC II – Computer Hardware Servicing", timeline:"6 months – 1 year", skills:["Hardware Repair","Network Setup","OS Installation","Diagnostics"], outlook:"Steady", phContext:"High demand in schools, LGUs, and SMEs; TESDA NC II is a recognized credential that opens doors immediately." },
  { industry:"technology", minEdu:"TESDA / Vocational", title:"Social Media Manager", field:"Digital Marketing", salaryRange:"₱20,000 – ₱55,000/month", salaryMid:37500, eduReq:"Short course or self-taught with portfolio", timeline:"3–6 months", skills:["Content Creation","Canva","Meta Ads","Analytics","Copywriting"], outlook:"Growing", phContext:"Filipino brands of all sizes are shifting online; a strong portfolio matters more than a degree for this role." },
  { industry:"technology", minEdu:"Bachelor's Degree", title:"Software Developer", field:"Web / Mobile Development", salaryRange:"₱35,000 – ₱120,000/month", salaryMid:77500, eduReq:"BS Computer Science or Information Technology", timeline:"4–5 years", skills:["JavaScript","Python","React","Git","Problem Solving"], outlook:"High Demand", phContext:"Philippine software outsourcing is booming; companies like Accenture, Sprout Solutions & dozens of startups are always hiring." },
  { industry:"technology", minEdu:"Bachelor's Degree", title:"Data Analyst", field:"Business Intelligence", salaryRange:"₱30,000 – ₱90,000/month", salaryMid:60000, eduReq:"BS Statistics, Math, CS, or IT", timeline:"4–5 years", skills:["Excel","SQL","Python","Data Visualization","Statistics"], outlook:"Growing", phContext:"Banks, telcos & e-commerce companies in the PH are rapidly hiring data analysts to make sense of their growing customer data." },
  { industry:"technology", minEdu:"Graduate Degree", title:"AI / Machine Learning Engineer", field:"Artificial Intelligence", salaryRange:"₱80,000 – ₱250,000/month", salaryMid:165000, eduReq:"MS Computer Science or Data Science", timeline:"6–8 years", skills:["Python","TensorFlow","Mathematics","Research","Cloud Platforms"], outlook:"High Demand", phContext:"Filipino ML engineers are being hired by international companies remotely at global salary rates — one of the highest-paying paths." },
  // ── HEALTHCARE ──
  { industry:"healthcare", minEdu:"SHS Graduate", title:"Medical Transcriptionist", field:"Health Information / BPO", salaryRange:"₱15,000 – ₱30,000/month", salaryMid:22500, eduReq:"SHS Graduate with good English & typing speed", timeline:"0–6 months (with training)", skills:["Typing","Medical Terminology","Attention to Detail","English"], outlook:"Steady", phContext:"Many Philippine BPO companies specialize in medical transcription for US & UK clients, hiring SHS graduates with training." },
  { industry:"healthcare", minEdu:"TESDA / Vocational", title:"Caregiver / Nursing Aide", field:"Elder & Patient Care", salaryRange:"₱20,000 – ₱80,000/month", salaryMid:50000, eduReq:"TESDA NC II – Caregiving", timeline:"6 months – 1 year", skills:["Patient Care","First Aid","Communication","Empathy"], outlook:"High Demand", phContext:"TESDA-certified caregivers are in very high demand in Japan, Israel & Canada — with salaries 3–5× higher than local rates." },
  { industry:"healthcare", minEdu:"Bachelor's Degree", title:"Registered Nurse", field:"Clinical Nursing", salaryRange:"₱25,000 – ₱80,000/month", salaryMid:52500, eduReq:"BS Nursing + PRC Board Exam", timeline:"4–5 years", skills:["Patient Assessment","IV Insertion","Critical Thinking","BLS / ACLS"], outlook:"High Demand", phContext:"The Philippines is the world's top exporter of nurses; passing the US NCLEX opens doors to ₱200K+/month abroad." },
  { industry:"healthcare", minEdu:"Bachelor's Degree", title:"Medical Technologist", field:"Clinical Laboratory", salaryRange:"₱22,000 – ₱60,000/month", salaryMid:41000, eduReq:"BS Medical Technology + PRC Board Exam", timeline:"4–5 years", skills:["Lab Analysis","Hematology","Microbiology","Quality Control"], outlook:"Steady", phContext:"Every hospital and diagnostic clinic needs medtechs; board passers are immediately employable nationwide." },
  { industry:"healthcare", minEdu:"Graduate Degree", title:"Physician / Doctor", field:"Medicine", salaryRange:"₱80,000 – ₱300,000/month", salaryMid:190000, eduReq:"Doctor of Medicine (MD) + PRC License", timeline:"10–12 years", skills:["Diagnosis","Clinical Decision Making","Patient Care","Research"], outlook:"High Demand", phContext:"Rural areas desperately need doctors; the government's Doctors to the Barrios program offers scholarships & immediate placement." },
  // ── BUSINESS & FINANCE ──
  { industry:"business", minEdu:"SHS Graduate", title:"Sales Representative", field:"Retail / Direct Sales", salaryRange:"₱15,000 – ₱40,000/month", salaryMid:27500, eduReq:"SHS Graduate", timeline:"0–3 months", skills:["Communication","Persuasion","Product Knowledge","Customer Handling"], outlook:"Steady", phContext:"Thousands of sales roles open in insurance, real estate & FMCG companies across the Philippines year-round." },
  { industry:"business", minEdu:"TESDA / Vocational", title:"Bookkeeper", field:"Accounting Support", salaryRange:"₱18,000 – ₱35,000/month", salaryMid:26500, eduReq:"TESDA Bookkeeping NC III", timeline:"6 months – 1 year", skills:["Accounting Basics","Spreadsheets","Payroll","Attention to Detail"], outlook:"Steady", phContext:"Every small business needs a bookkeeper; TESDA NC III holders are recognized by BIR and DTI-accredited firms." },
  { industry:"business", minEdu:"Bachelor's Degree", title:"Certified Public Accountant (CPA)", field:"Accounting & Auditing", salaryRange:"₱30,000 – ₱120,000/month", salaryMid:75000, eduReq:"BS Accountancy + CPA Board Exam", timeline:"4–5 years", skills:["Financial Reporting","Taxation","Auditing","Excel","Analytical Thinking"], outlook:"High Demand", phContext:"CPAs are among the highest-paid professionals in the PH; Big 4 firms (Deloitte, PwC, KPMG, EY) have large Manila offices." },
  { industry:"business", minEdu:"Bachelor's Degree", title:"Financial Analyst", field:"Investment & Finance", salaryRange:"₱35,000 – ₱100,000/month", salaryMid:67500, eduReq:"BS Finance, Economics, or Accountancy", timeline:"4–5 years", skills:["Financial Modeling","Excel","Bloomberg","Valuation","Report Writing"], outlook:"Growing", phContext:"Growing Philippine capital markets and BPO finance operations are driving strong demand for local financial analysts." },
  { industry:"business", minEdu:"Graduate Degree", title:"Finance Director / Investment Banker", field:"Corporate Finance", salaryRange:"₱150,000 – ₱500,000/month", salaryMid:325000, eduReq:"MBA or MS Finance", timeline:"8–10 years", skills:["Deal Structuring","Leadership","Financial Strategy","Negotiation"], outlook:"Growing", phContext:"The Philippine Stock Exchange and growing M&A activity are creating senior finance roles, especially in BGC and Makati." },
  // ── EDUCATION ──
  { industry:"education", minEdu:"SHS Graduate", title:"Daycare Worker / Teacher's Aide", field:"Early Childhood Assistance", salaryRange:"₱12,000 – ₱22,000/month", salaryMid:17000, eduReq:"SHS Graduate", timeline:"0–3 months", skills:["Child Care","Patience","Communication","Basic Teaching"], outlook:"Steady", phContext:"Barangay-based daycare centers and private learning centers hire SHS graduates as aides across the country." },
  { industry:"education", minEdu:"TESDA / Vocational", title:"Early Childhood Care & Development Worker", field:"Child Development", salaryRange:"₱15,000 – ₱28,000/month", salaryMid:21500, eduReq:"TESDA ECCD NC II", timeline:"6 months", skills:["Child Development","Activity Planning","Communication","First Aid"], outlook:"Steady", phContext:"TESDA ECCD certification is required by DSWD for government daycare workers and many private nurseries." },
  { industry:"education", minEdu:"Bachelor's Degree", title:"Licensed Professional Teacher", field:"K–12 Education", salaryRange:"₱28,000 – ₱70,000/month", salaryMid:49000, eduReq:"BS Education + LET Board Exam", timeline:"4–5 years", skills:["Lesson Planning","Classroom Management","Subject Mastery","Communication"], outlook:"High Demand", phContext:"DepEd continuously hires thousands of teachers nationwide; private international schools offer significantly higher pay." },
  { industry:"education", minEdu:"Bachelor's Degree", title:"Corporate Trainer", field:"Learning & Development", salaryRange:"₱30,000 – ₱80,000/month", salaryMid:55000, eduReq:"Any Bachelor's Degree + training experience", timeline:"4–6 years", skills:["Public Speaking","Curriculum Design","Facilitation","Adult Learning"], outlook:"Growing", phContext:"BPO and multinational companies in the Philippines have large L&D teams and regularly hire experienced trainers." },
  { industry:"education", minEdu:"Graduate Degree", title:"University Professor", field:"Higher Education & Research", salaryRange:"₱40,000 – ₱120,000/month", salaryMid:80000, eduReq:"Master's or PhD in relevant field", timeline:"7–10 years", skills:["Research","Academic Writing","Subject Expertise","Mentoring"], outlook:"Steady", phContext:"CHED requires graduate degrees for HEI faculty; state universities offer tenure and research grants for academics." },
  // ── ENGINEERING ──
  { industry:"engineering", minEdu:"SHS Graduate", title:"Construction Helper", field:"Building & Construction", salaryRange:"₱12,000 – ₱25,000/month", salaryMid:18500, eduReq:"SHS Graduate", timeline:"Immediate", skills:["Physical Fitness","Tool Handling","Safety Awareness","Teamwork"], outlook:"Steady", phContext:"Construction is booming in the Philippines under the Build Better More infrastructure program." },
  { industry:"engineering", minEdu:"TESDA / Vocational", title:"Electrician", field:"Electrical Installation", salaryRange:"₱20,000 – ₱60,000/month", salaryMid:40000, eduReq:"TESDA Electrical Installation & Maintenance NC II", timeline:"6 months – 1 year", skills:["Wiring","Electrical Diagrams","Safety Protocols","Troubleshooting"], outlook:"High Demand", phContext:"Licensed electricians are required by law for all construction projects; TESDA NC II holders can also work in the Middle East." },
  { industry:"engineering", minEdu:"Bachelor's Degree", title:"Civil Engineer", field:"Structural / Infrastructure", salaryRange:"₱35,000 – ₱120,000/month", salaryMid:77500, eduReq:"BS Civil Engineering + PRC Board Exam", timeline:"4–5 years", skills:["AutoCAD","Structural Design","Project Management","NSCP Code"], outlook:"High Demand", phContext:"Government and private infrastructure projects across Luzon, Visayas & Mindanao constantly need licensed civil engineers." },
  { industry:"engineering", minEdu:"Bachelor's Degree", title:"Electrical Engineer", field:"Power & Electronics", salaryRange:"₱35,000 – ₱110,000/month", salaryMid:72500, eduReq:"BS Electrical Engineering + PRC Board Exam", timeline:"4–5 years", skills:["Circuit Design","Power Systems","AutoCAD Electrical","Project Management"], outlook:"High Demand", phContext:"Energy sector growth and manufacturing expansion are driving strong demand for licensed electrical engineers nationwide." },
  { industry:"engineering", minEdu:"Graduate Degree", title:"Engineering Project Director", field:"Large-Scale Project Management", salaryRange:"₱120,000 – ₱350,000/month", salaryMid:235000, eduReq:"MS Engineering or MBA with engineering background", timeline:"8–12 years", skills:["Leadership","Risk Management","Budgeting","Stakeholder Management"], outlook:"Growing", phContext:"DMCI, Ayala Land, DPWH and San Miguel Infrastructure need senior project directors for their mega-projects." },
  // ── CREATIVE ──
  { industry:"creative", minEdu:"SHS Graduate", title:"Social Media Content Creator", field:"Digital Content", salaryRange:"₱15,000 – ₱80,000+/month", salaryMid:40000, eduReq:"SHS Graduate with a creative eye", timeline:"0–6 months (build a portfolio)", skills:["Content Creation","Photography","Caption Writing","Canva","Reels / TikTok"], outlook:"Growing", phContext:"The Philippines has some of the highest social media usage in the world; brands actively seek Filipino content creators." },
  { industry:"creative", minEdu:"TESDA / Vocational", title:"Graphic Artist / Layout Artist", field:"Visual Design", salaryRange:"₱18,000 – ₱45,000/month", salaryMid:31500, eduReq:"TESDA Visual Graphic Design NC II or self-taught portfolio", timeline:"6 months – 1 year", skills:["Photoshop","Illustrator","Canva","Typography","Color Theory"], outlook:"Steady", phContext:"Printing shops, advertising agencies & online businesses across the Philippines hire layout artists regularly." },
  { industry:"creative", minEdu:"Bachelor's Degree", title:"UX / UI Designer", field:"Digital Product Design", salaryRange:"₱40,000 – ₱130,000/month", salaryMid:85000, eduReq:"BS Multimedia Arts, IT, or Fine Arts", timeline:"4–5 years", skills:["Figma","User Research","Prototyping","Wireframing","Design Systems"], outlook:"High Demand", phContext:"Tech companies and startups in the Philippines are urgently hiring UX designers as digital products multiply rapidly." },
  { industry:"creative", minEdu:"Bachelor's Degree", title:"Advertising Creative", field:"Advertising & Branding", salaryRange:"₱30,000 – ₱100,000/month", salaryMid:65000, eduReq:"BS Advertising, Communications, or Fine Arts", timeline:"4–5 years", skills:["Concept Development","Copywriting","Art Direction","Pitching"], outlook:"Steady", phContext:"Major agencies (BBDO, JWT, Dentsu) have Manila offices and regularly hire local creative professionals." },
  { industry:"creative", minEdu:"Graduate Degree", title:"Creative Director", field:"Brand & Creative Strategy", salaryRange:"₱100,000 – ₱300,000/month", salaryMid:200000, eduReq:"MFA or MBA with a strong creative portfolio", timeline:"10–15 years", skills:["Brand Strategy","Team Leadership","Visual Direction","Storytelling"], outlook:"Steady", phContext:"Top brands, agencies & media companies in BGC and Ortigas hire Filipino creative directors at competitive rates." },
  // ── HOSPITALITY ──
  { industry:"hospitality", minEdu:"SHS Graduate", title:"Hotel Front Desk / Receptionist", field:"Hotel Operations", salaryRange:"₱14,000 – ₱28,000/month", salaryMid:21000, eduReq:"SHS Graduate with good English", timeline:"0–3 months", skills:["Customer Service","Communication","Computer Basics","Grooming"], outlook:"Steady", phContext:"Tourism recovery has hotel chains like Marriott, Shangri-La & Seda actively hiring across the country." },
  { industry:"hospitality", minEdu:"TESDA / Vocational", title:"Cook / Chef de Partie", field:"Food & Beverage", salaryRange:"₱18,000 – ₱50,000/month", salaryMid:34000, eduReq:"TESDA Commercial Cooking NC II or NC III", timeline:"6 months – 1 year", skills:["Cooking Techniques","Kitchen Safety","Menu Knowledge","Speed & Hygiene"], outlook:"High Demand", phContext:"Restaurant & hotel boom means certified cooks are always in demand; cruise ship jobs are also accessible with NC II." },
  { industry:"hospitality", minEdu:"Bachelor's Degree", title:"Hotel Operations Manager", field:"Hotel Management", salaryRange:"₱45,000 – ₱150,000/month", salaryMid:97500, eduReq:"BS Hotel & Restaurant Management", timeline:"4–6 years", skills:["Operations Management","Guest Relations","Budgeting","Staff Training"], outlook:"Growing", phContext:"International hotel brands expanding in PH prefer HRM graduates from recognized schools like UP, La Salle & CEU." },
  { industry:"hospitality", minEdu:"Bachelor's Degree", title:"Events Coordinator", field:"MICE & Events", salaryRange:"₱25,000 – ₱70,000/month", salaryMid:47500, eduReq:"BS Tourism, HRM, or Communications", timeline:"4–5 years", skills:["Event Planning","Vendor Management","Budgeting","Communication"], outlook:"Growing", phContext:"MICE (Meetings, Incentives, Conferences & Exhibitions) is a booming sector in Manila, Cebu, and Davao." },
  { industry:"hospitality", minEdu:"Graduate Degree", title:"Hotel General Manager", field:"Hotel & Resort Leadership", salaryRange:"₱150,000 – ₱450,000/month", salaryMid:300000, eduReq:"MBA or MS Hospitality Management", timeline:"10–15 years", skills:["Strategic Leadership","P&L Management","Brand Standards","Guest Experience"], outlook:"Steady", phContext:"Five-star hotels & international resorts in Boracay, Palawan & Metro Manila pay competitive rates for seasoned GMs." },
  // ── AGRICULTURE ──
  { industry:"agriculture", minEdu:"SHS Graduate", title:"Farm Worker", field:"Crop Production", salaryRange:"₱10,000 – ₱20,000/month", salaryMid:15000, eduReq:"SHS Graduate", timeline:"Immediate", skills:["Physical Work","Crop Knowledge","Irrigation","Harvesting"], outlook:"Steady", phContext:"Agricultural regions in Bukidnon, Nueva Ecija & Davao constantly need seasonal and permanent farm workers." },
  { industry:"agriculture", minEdu:"TESDA / Vocational", title:"Agricultural Technician", field:"Crop & Soil Management", salaryRange:"₱15,000 – ₱35,000/month", salaryMid:25000, eduReq:"TESDA Organic Agriculture NC II", timeline:"6 months – 1 year", skills:["Soil Testing","Fertilizer Application","Pest Management","Farm Equipment"], outlook:"Growing", phContext:"DA (Department of Agriculture) and NGOs fund agri-tech programs; organic certification opens premium market access." },
  { industry:"agriculture", minEdu:"Bachelor's Degree", title:"Agronomist / Agricultural Scientist", field:"Crop Science & Research", salaryRange:"₱25,000 – ₱80,000/month", salaryMid:52500, eduReq:"BS Agriculture or Agronomy", timeline:"4–5 years", skills:["Crop Science","Research Methods","GIS Mapping","Data Analysis"], outlook:"Growing", phContext:"IRRI (International Rice Research Institute) in Los Baños & DA research agencies actively hire agriculture graduates." },
  { industry:"agriculture", minEdu:"Bachelor's Degree", title:"Food Technologist", field:"Food Processing & Safety", salaryRange:"₱25,000 – ₱75,000/month", salaryMid:50000, eduReq:"BS Food Technology + PRC Board Exam", timeline:"4–5 years", skills:["Food Safety","HACCP","Product Development","Quality Control"], outlook:"High Demand", phContext:"Del Monte, San Miguel, Universal Robina & Monde Nissin are major employers of food technologists in the Philippines." },
  { industry:"agriculture", minEdu:"Graduate Degree", title:"Veterinarian", field:"Animal Health & Production", salaryRange:"₱40,000 – ₱150,000/month", salaryMid:95000, eduReq:"Doctor of Veterinary Medicine (DVM)", timeline:"6–7 years", skills:["Animal Diagnosis","Surgery","Livestock Management","Public Health"], outlook:"High Demand", phContext:"The livestock industry & pet care boom in PH have dramatically increased demand for licensed veterinarians nationwide." },
  // ── GOVERNMENT ──
  { industry:"government", minEdu:"SHS Graduate", title:"Government Office Clerk", field:"Administrative Support", salaryRange:"₱14,000 – ₱24,000/month", salaryMid:19000, eduReq:"SHS Graduate + Career Service Sub-professional Exam", timeline:"Pass CSC exam", skills:["Filing","Data Entry","Communication","MS Office"], outlook:"Steady", phContext:"Passing the CSC (Civil Service Commission) exam opens doors to permanent government positions in any LGU or agency." },
  { industry:"government", minEdu:"TESDA / Vocational", title:"Police Officer (PNP)", field:"Law Enforcement", salaryRange:"₱29,000 – ₱60,000/month", salaryMid:44500, eduReq:"SHS Graduate + pass PNP Recruitment", timeline:"1–2 years (training)", skills:["Physical Fitness","Discipline","Law Knowledge","Community Relations"], outlook:"Steady", phContext:"PNP regularly opens recruitment; salary includes allowances and full government benefits (GSIS, PhilHealth, Pag-IBIG)." },
  { industry:"government", minEdu:"Bachelor's Degree", title:"Social Worker (DSWD)", field:"Social Services", salaryRange:"₱28,000 – ₱65,000/month", salaryMid:46500, eduReq:"BS Social Work + SWLE Board Exam", timeline:"4–5 years", skills:["Case Management","Counseling","Community Development","Report Writing"], outlook:"High Demand", phContext:"DSWD, LGUs & NGOs nationwide are consistently short-staffed; board passers are immediately deployable to the field." },
  { industry:"government", minEdu:"Bachelor's Degree", title:"Local Government Officer", field:"Public Administration", salaryRange:"₱30,000 – ₱80,000/month", salaryMid:55000, eduReq:"BS Public Administration or any 4-year degree + CSC Professional", timeline:"4–5 years", skills:["Policy Analysis","Budget Management","Communication","Leadership"], outlook:"Steady", phContext:"Every LGU needs public administrators; career progression leads to department head and executive positions." },
  { industry:"government", minEdu:"Graduate Degree", title:"Lawyer / Public Prosecutor", field:"Law & Justice", salaryRange:"₱60,000 – ₱200,000/month", salaryMid:130000, eduReq:"Juris Doctor (JD) + Bar Exam", timeline:"8–10 years", skills:["Legal Research","Argumentation","Legal Writing","Critical Thinking"], outlook:"Steady", phContext:"DOJ, Ombudsman & courts nationwide hire lawyers; private practice and corporate law offer even higher compensation." },
  // ── SKILLED TRADES ──
  { industry:"trade", minEdu:"SHS Graduate", title:"Construction Worker", field:"Building Trades", salaryRange:"₱12,000 – ₱28,000/month", salaryMid:20000, eduReq:"SHS Graduate", timeline:"Immediate", skills:["Manual Labor","Tool Use","Safety Awareness","Blueprint Reading"], outlook:"High Demand", phContext:"Infrastructure boom under Build Better More creates consistent demand for construction workers in all regions of the country." },
  { industry:"trade", minEdu:"TESDA / Vocational", title:"Automotive Mechanic", field:"Vehicle Maintenance & Repair", salaryRange:"₱18,000 – ₱60,000/month", salaryMid:39000, eduReq:"TESDA Automotive Servicing NC II", timeline:"6 months – 1 year", skills:["Engine Repair","Diagnostics","Electrical Systems","Tools & Equipment"], outlook:"Steady", phContext:"The Philippines has millions of registered vehicles; certified mechanics are in demand in dealerships and independent shops." },
  { industry:"trade", minEdu:"TESDA / Vocational", title:"Welder", field:"Metal Fabrication", salaryRange:"₱20,000 – ₱80,000/month", salaryMid:50000, eduReq:"TESDA Shielded Metal Arc Welding NC II", timeline:"6 months", skills:["SMAW / MIG / TIG Welding","Blueprint Reading","Safety","Fabrication"], outlook:"High Demand", phContext:"TESDA-certified welders are among the most in-demand OFWs; Middle East & shipping industries pay ₱60K–₱150K/month." },
  { industry:"trade", minEdu:"Bachelor's Degree", title:"Safety Officer / OSH Practitioner", field:"Occupational Health & Safety", salaryRange:"₱30,000 – ₱90,000/month", salaryMid:60000, eduReq:"Any Engineering degree + DOLE OSH certification", timeline:"4–6 years", skills:["Risk Assessment","DOLE Compliance","Incident Investigation","Safety Training"], outlook:"Growing", phContext:"DOLE now mandates safety officers in all workplaces; construction & manufacturing are the largest employers of OSH practitioners." },
  { industry:"trade", minEdu:"Graduate Degree", title:"Construction Project Manager", field:"Large-Scale Project Management", salaryRange:"₱80,000 – ₱250,000/month", salaryMid:165000, eduReq:"MS Construction Management or MBA + PRC Engineering license", timeline:"8–12 years", skills:["Project Planning","Contract Management","Team Leadership","Budgeting"], outlook:"Growing", phContext:"Mega-infrastructure projects like Skyway extensions & Metro Manila Subway need experienced construction project managers." },
  // ── MEDIA ──
  { industry:"media", minEdu:"SHS Graduate", title:"Video Editor", field:"Digital Content Production", salaryRange:"₱15,000 – ₱50,000/month", salaryMid:32500, eduReq:"SHS Graduate with editing skills & portfolio", timeline:"0–6 months", skills:["Premiere Pro","After Effects","Storytelling","Color Grading"], outlook:"Growing", phContext:"YouTube channels, vloggers & social media brands across the Philippines constantly hire skilled video editors." },
  { industry:"media", minEdu:"TESDA / Vocational", title:"Radio / Podcast Producer", field:"Broadcasting", salaryRange:"₱18,000 – ₱40,000/month", salaryMid:29000, eduReq:"TESDA Broadcast Technology or relevant short course", timeline:"6 months – 1 year", skills:["Audio Editing","Scriptwriting","Equipment Operation","Scheduling"], outlook:"Steady", phContext:"DZBB, DZMM & online podcast studios hire production staff; podcasting is a fast-growing media format in PH." },
  { industry:"media", minEdu:"Bachelor's Degree", title:"Digital Marketing Manager", field:"Online Marketing", salaryRange:"₱35,000 – ₱120,000/month", salaryMid:77500, eduReq:"BS Marketing, Communications, or IT", timeline:"4–5 years", skills:["SEO / SEM","Facebook & Google Ads","Content Strategy","Analytics"], outlook:"High Demand", phContext:"Every Philippine brand shifting online needs digital marketers; current demand significantly exceeds available supply." },
  { industry:"media", minEdu:"Bachelor's Degree", title:"Broadcast Journalist", field:"News & Broadcasting", salaryRange:"₱25,000 – ₱80,000/month", salaryMid:52500, eduReq:"AB Journalism or Mass Communication", timeline:"4–5 years", skills:["News Writing","On-Camera Presence","Research","Social Media","Video Editing"], outlook:"Steady", phContext:"ABS-CBN, GMA, CNN Philippines & online outlets like Rappler and Inquirer.net hire journalism graduates regularly." },
  { industry:"media", minEdu:"Graduate Degree", title:"Communications Director", field:"PR & Corporate Communications", salaryRange:"₱100,000 – ₱300,000/month", salaryMid:200000, eduReq:"MA Communications or MBA with PR background", timeline:"10–15 years", skills:["Crisis Communications","Media Relations","Strategic Messaging","Brand Reputation"], outlook:"Steady", phContext:"Large Philippine conglomerates (Ayala, SM, San Miguel) & government agencies hire experienced communications directors." },
  // ── RETAIL & COMMERCE ──
  { industry:"retail", minEdu:"SHS Graduate", title:"Retail Sales Associate", field:"Retail Operations", salaryRange:"₱13,000 – ₱22,000/month", salaryMid:17500, eduReq:"SHS Graduate", timeline:"Immediate", skills:["Customer Service","Cash Handling","Product Knowledge","Communication"], outlook:"Steady", phContext:"SM, Robinsons, Ayala Malls & thousands of stores nationwide are constantly hiring sales associates." },
  { industry:"retail", minEdu:"TESDA / Vocational", title:"Entrepreneur / Micro-Business Owner", field:"Micro & Small Enterprise", salaryRange:"₱15,000 – ₱100,000+/month", salaryMid:45000, eduReq:"TESDA Entrepreneurship NC II or DTI Negosyo Center training", timeline:"6 months – 2 years", skills:["Business Planning","Marketing","Customer Service","Financial Literacy"], outlook:"Growing", phContext:"DTI's MSME programs & Negosyo Centers offer free training and startup support specifically for young Filipino entrepreneurs." },
  { industry:"retail", minEdu:"Bachelor's Degree", title:"E-Commerce Manager", field:"Online Retail", salaryRange:"₱35,000 – ₱100,000/month", salaryMid:67500, eduReq:"BS Business Administration or Marketing", timeline:"4–5 years", skills:["Shopee / Lazada Ops","Digital Marketing","Supply Chain","Analytics"], outlook:"High Demand", phContext:"Philippine e-commerce is one of the fastest-growing in Southeast Asia; Shopee & Lazada sellers need professional managers." },
  { industry:"retail", minEdu:"Bachelor's Degree", title:"Brand Manager", field:"Marketing & Brand Strategy", salaryRange:"₱40,000 – ₱120,000/month", salaryMid:80000, eduReq:"BS Marketing or Business Administration", timeline:"4–6 years", skills:["Brand Strategy","Market Research","Campaign Management","Consumer Insights"], outlook:"Growing", phContext:"FMCG giants like Unilever, P&G, Nestlé & Monde Nissin have large Philippine operations with strong brand teams." },
  { industry:"retail", minEdu:"Graduate Degree", title:"VP of Merchandising / Retail Director", field:"Retail Strategy & Leadership", salaryRange:"₱150,000 – ₱450,000/month", salaryMid:300000, eduReq:"MBA or MS Business", timeline:"10–15 years", skills:["Strategic Planning","Category Management","P&L Ownership","Leadership"], outlook:"Steady", phContext:"SM Retail, Puregold, Robinsons & international brands growing in PH need senior retail leaders with graduate credentials." },
];

const TIPS = {
  technology: "Start learning to code for free on freeCodeCamp.org or Harvard's CS50 on edX — both are 100% free and internationally recognized.",
  healthcare: "Shadow a healthcare professional at your local barangay health center or hospital to confirm your passion before committing years of study.",
  business: "Open a free demo account on COL Financial or First Metro Sec to practice investing and learn how the Philippine stock market works.",
  education: "Volunteer as a tutor at your school or barangay learning center now — early teaching experience makes your application stand out.",
  engineering: "Learn free CAD software like FreeCAD or SketchUp, and take free physics & math courses on Khan Academy to build your foundation.",
  creative: "Start your portfolio today — even free tools like Canva and a Behance account are enough to showcase your work to future clients.",
  hospitality: "Apply for part-time work at any hotel, café, or restaurant. Real hospitality experience is valued more than certificates at the entry level.",
  agriculture: "Visit your nearest DA (Department of Agriculture) office — they offer free training programs and scholarships for young farmers.",
  government: "Start reviewing for the Civil Service Examination (CSC) now — passing it while still in school gives you a massive head start.",
  trade: "TESDA offers many courses for FREE through their scholarship programs (TWSP / STEP) — check tesda.gov.ph for available slots near you.",
  media: "Create a YouTube channel, blog, or podcast today — your first 10 pieces of content are your portfolio and they cost nothing to make.",
  retail: "Register on Shopee or Facebook Marketplace and try selling something small — real selling experience beats any textbook or seminar.",
};

const logMin = Math.log(10000);
const logMax = Math.log(500000);
const sliderToSalary = (v) => Math.round(Math.exp(logMin + ((logMax - logMin) * v) / 100) / 500) * 500;
const salaryToSlider = (s) => Math.round(((Math.log(s) - logMin) / (logMax - logMin)) * 100);
const fmt = (v) => { if (v >= 1000000) return `₱${(v/1000000).toFixed(1)}M`; if (v >= 1000) return `₱${(v/1000).toFixed(0)}K`; return `₱${v.toLocaleString()}`; };
const outlookStyle = (o = "") => {
  if (o.includes("High")) return { bg:"#0e2b1a", color:"#4ade80", border:"#1e5c33" };
  if (o.includes("Growing")) return { bg:"#0e1e35", color:"#60a5fa", border:"#1e4070" };
  return { bg:"#2b230e", color:"#fbbf24", border:"#5c4a1e" };
};

export default function PathFinderPH() {
  const [step, setStep] = useState(1);
  const [sliderVal, setSliderVal] = useState(salaryToSlider(30000));
  const [salary, setSalary] = useState(30000);
  const [education, setEducation] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [results, setResults] = useState(null);

  const handleSlider = (e) => { const v = parseInt(e.target.value); setSliderVal(v); setSalary(sliderToSalary(v)); };
  const setPreset = (val) => { setSalary(val); setSliderVal(salaryToSlider(val)); };

  const getRecommendations = () => {
    const userEduIdx = EDU_ORDER.indexOf(education);
    const matching = ALL_CAREERS
      .filter(c => c.industry === industry && EDU_ORDER.indexOf(c.minEdu) <= userEduIdx)
      .sort((a, b) => {
        const aExact = a.minEdu === education ? 0 : 1;
        const bExact = b.minEdu === education ? 0 : 1;
        if (aExact !== bExact) return aExact - bExact;
        return Math.abs(a.salaryMid - salary) - Math.abs(b.salaryMid - salary);
      })
      .slice(0, 3);

    const industryLabel = INDUSTRIES.find(i => i.id === industry)?.label || industry;
    const top = matching[0];
    const meetsGoal = top && top.salaryMid >= salary;
    const summary = `Based on your ₱${salary.toLocaleString()}/month goal in ${industryLabel}, here are the most promising paths aligned with a ${education} plan. Your top match — ${top?.title} — offers ${top?.salaryRange}, which ${meetsGoal ? "meets or exceeds" : "is a strong step toward"} your target salary.`;
    const tip = TIPS[industry] || "Research your chosen field thoroughly and connect with professionals on LinkedIn to learn what the path really looks like.";

    setResults({ summary, careers: matching, tip });
    setStep(4);
  };

  const reset = () => { setStep(1); setEducation(null); setIndustry(null); setResults(null); };

  return (
    <div style={{ minHeight:"100vh", background:"#080f1c", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#fff", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .gold{background:linear-gradient(130deg,#f7cf65,#e8913a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .fadein{animation:fadeUp .45s ease both;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        .icard{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:.9rem .7rem;cursor:pointer;transition:all .2s ease;text-align:center;}
        .icard:hover{background:rgba(245,168,35,.08);border-color:rgba(245,168,35,.35);transform:translateY(-2px);}
        .icard.sel{background:rgba(245,168,35,.13);border-color:#f5a823;}
        .ecard{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1.1rem 1.25rem;cursor:pointer;transition:all .2s ease;display:flex;align-items:center;gap:.9rem;}
        .ecard:hover{background:rgba(245,168,35,.07);border-color:rgba(245,168,35,.3);}
        .ecard.sel{background:rgba(245,168,35,.12);border-color:#f5a823;}
        .pcard{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:1.4rem;margin-bottom:1rem;}
        .pcard.c1{animation:fadeUp .45s .1s ease both;}
        .pcard.c2{animation:fadeUp .45s .2s ease both;}
        .pcard.c3{animation:fadeUp .45s .3s ease both;}
        .skill{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.11);border-radius:6px;padding:.22rem .6rem;font-size:.73rem;color:rgba(255,255,255,.65);}
        .btn{background:linear-gradient(130deg,#f5a823,#e57c2c);color:#06111f;border:none;border-radius:10px;padding:.85rem 1.75rem;font-family:inherit;font-size:.92rem;font-weight:600;cursor:pointer;transition:all .2s ease;width:100%;letter-spacing:.02em;}
        .btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(245,168,35,.28);}
        .btn:disabled{opacity:.38;cursor:not-allowed;}
        .ghost{background:transparent;color:rgba(255,255,255,.38);border:none;font-family:inherit;font-size:.82rem;cursor:pointer;padding:.5rem 0;transition:color .2s;width:100%;margin-top:.6rem;}
        .ghost:hover{color:rgba(255,255,255,.7);}
        input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:4px;background:rgba(255,255,255,.12);border-radius:2px;outline:none;cursor:pointer;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#f5a823,#e8813a);cursor:pointer;box-shadow:0 2px 10px rgba(245,168,35,.4);transition:transform .15s;}
        input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.15);}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:transparent;} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px;}
      `}</style>

      <div style={{ position:"fixed", inset:0, backgroundImage:"radial-gradient(ellipse at 20% 20%, rgba(245,168,35,.05) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(20,60,130,.14) 0%, transparent 55%)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:1, maxWidth:620, margin:"0 auto", padding:"2rem 1.25rem 5rem" }}>

        {/* HEADER */}
        <div style={{ textAlign:"center", marginBottom:"2.25rem" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:".45rem", marginBottom:".45rem" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#f5a823" }} />
            <span style={{ fontSize:".7rem", letterSpacing:".16em", color:"rgba(245,168,35,.75)", textTransform:"uppercase", fontWeight:500 }}>For Filipino High School Students</span>
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,6vw,2.8rem)", fontWeight:600, lineHeight:1.1, marginBottom:".4rem" }}>
            <span className="gold">PathFinder</span><span style={{ color:"rgba(255,255,255,.92)" }}> PH</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,.42)", fontSize:".875rem", maxWidth:390, margin:"0 auto", lineHeight:1.6 }}>Discover career paths aligned with your goals and the Philippine job market</p>
        </div>

        {/* STEP PILLS */}
        {step <= 3 && (
          <div style={{ display:"flex", justifyContent:"center", gap:".45rem", marginBottom:"1.75rem" }}>
            {[1,2,3].map(s => (
              <div key={s} style={{ height:4, width:s===step?28:14, borderRadius:2, background:s===step?"#f5a823":s<step?"rgba(245,168,35,.35)":"rgba(255,255,255,.13)", transition:"all .3s ease" }} />
            ))}
          </div>
        )}

        {/* STEP 1 — SALARY */}
        {step === 1 && (
          <div className="fadein">
            <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:16, padding:"1.75rem" }}>
              <div style={{ fontSize:".7rem", color:"#f5a823", textTransform:"uppercase", letterSpacing:".12em", fontWeight:500, marginBottom:".6rem" }}>Step 1 of 3</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.7rem", fontWeight:600, marginBottom:".4rem" }}>What's your dream monthly salary?</h2>
              <p style={{ color:"rgba(255,255,255,.45)", fontSize:".855rem", marginBottom:"2rem", lineHeight:1.6 }}>Think of what you'd like to earn once established in your career.</p>
              <div style={{ textAlign:"center", marginBottom:"2rem" }}>
                <div className="gold" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,8vw,3.75rem)", fontWeight:600, lineHeight:1 }}>{fmt(salary)}</div>
                <div style={{ color:"rgba(255,255,255,.3)", fontSize:".75rem", marginTop:".2rem" }}>per month</div>
              </div>
              <input type="range" min="0" max="100" step="1" value={sliderVal} onChange={handleSlider} style={{ marginBottom:".6rem" }} />
              <div style={{ display:"flex", justifyContent:"space-between", color:"rgba(255,255,255,.25)", fontSize:".72rem", marginBottom:"1.75rem" }}>
                <span>₱10K</span><span>₱500K</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:".5rem", marginBottom:"1.75rem" }}>
                {[15000,30000,80000,200000].map(p => (
                  <div key={p} onClick={() => setPreset(p)} style={{ background:salary===p?"rgba(245,168,35,.13)":"rgba(255,255,255,.04)", border:`1px solid ${salary===p?"#f5a823":"rgba(255,255,255,.08)"}`, borderRadius:8, padding:".45rem .25rem", textAlign:"center", cursor:"pointer", fontSize:".78rem", color:salary===p?"#f5a823":"rgba(255,255,255,.55)", transition:"all .18s", fontWeight:salary===p?500:400 }}>{fmt(p)}</div>
                ))}
              </div>
              <button className="btn" onClick={() => setStep(2)}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 2 — EDUCATION */}
        {step === 2 && (
          <div className="fadein">
            <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:16, padding:"1.75rem" }}>
              <div style={{ fontSize:".7rem", color:"#f5a823", textTransform:"uppercase", letterSpacing:".12em", fontWeight:500, marginBottom:".6rem" }}>Step 2 of 3</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.7rem", fontWeight:600, marginBottom:".4rem" }}>How far are you willing to study?</h2>
              <p style={{ color:"rgba(255,255,255,.45)", fontSize:".855rem", marginBottom:"1.5rem", lineHeight:1.6 }}>Be honest — this helps us match careers that are realistic for your situation.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:".65rem", marginBottom:"1.5rem" }}>
                {EDUCATION_LEVELS.map((edu, i) => {
                  const nums = ["①","②","③","④"];
                  const sel = education === edu.id;
                  return (
                    <div key={edu.id} className={`ecard${sel?" sel":""}`} onClick={() => setEducation(edu.id)}>
                      <div style={{ width:36, height:36, borderRadius:"50%", background:sel?"rgba(245,168,35,.18)":"rgba(255,255,255,.06)", border:`1px solid ${sel?"#f5a823":"rgba(255,255,255,.1)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", flexShrink:0, color:sel?"#f5a823":"rgba(255,255,255,.45)", transition:"all .2s" }}>{nums[i]}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:500, fontSize:".92rem", marginBottom:".18rem", color:sel?"#fff":"rgba(255,255,255,.88)" }}>{edu.label}</div>
                        <div style={{ color:"rgba(255,255,255,.4)", fontSize:".78rem" }}>{edu.sub}</div>
                      </div>
                      <div style={{ fontSize:".7rem", color:sel?"#f5a823":"rgba(255,255,255,.28)", background:sel?"rgba(245,168,35,.1)":"rgba(255,255,255,.04)", border:`1px solid ${sel?"rgba(245,168,35,.3)":"rgba(255,255,255,.07)"}`, borderRadius:6, padding:".2rem .55rem", whiteSpace:"nowrap", flexShrink:0, transition:"all .2s" }}>{edu.tag}</div>
                    </div>
                  );
                })}
              </div>
              <button className="btn" onClick={() => setStep(3)} disabled={!education}>Continue →</button>
              <button className="ghost" onClick={() => setStep(1)}>← Back</button>
            </div>
          </div>
        )}

        {/* STEP 3 — INDUSTRY */}
        {step === 3 && (
          <div className="fadein">
            <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:16, padding:"1.75rem" }}>
              <div style={{ fontSize:".7rem", color:"#f5a823", textTransform:"uppercase", letterSpacing:".12em", fontWeight:500, marginBottom:".6rem" }}>Step 3 of 3</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.7rem", fontWeight:600, marginBottom:".4rem" }}>Which industry calls to you?</h2>
              <p style={{ color:"rgba(255,255,255,.45)", fontSize:".855rem", marginBottom:"1.5rem", lineHeight:1.6 }}>Pick the field that genuinely interests you — passion drives long-term success.</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".55rem", marginBottom:"1.5rem" }}>
                {INDUSTRIES.map(ind => (
                  <div key={ind.id} className={`icard${industry===ind.id?" sel":""}`} onClick={() => setIndustry(ind.id)}>
                    <div style={{ fontSize:"1.45rem", marginBottom:".3rem" }}>{ind.emoji}</div>
                    <div style={{ fontSize:".75rem", fontWeight:500, color:industry===ind.id?"#f5a823":"rgba(255,255,255,.78)", lineHeight:1.3 }}>{ind.label}</div>
                  </div>
                ))}
              </div>
              <button className="btn" onClick={getRecommendations} disabled={!industry}>See My Career Paths ✦</button>
              <button className="ghost" onClick={() => setStep(2)}>← Back</button>
            </div>
          </div>
        )}

        {/* STEP 4 — RESULTS */}
        {step === 4 && results && (
          <div>
            <div className="fadein" style={{ background:"rgba(245,168,35,.07)", border:"1px solid rgba(245,168,35,.2)", borderRadius:16, padding:"1.4rem 1.5rem", marginBottom:"1.4rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:".45rem", marginBottom:".6rem" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#f5a823" }} />
                <span style={{ fontSize:".68rem", color:"#f5a823", textTransform:"uppercase", letterSpacing:".12em", fontWeight:500 }}>Your Career Analysis</span>
              </div>
              <p style={{ color:"rgba(255,255,255,.83)", lineHeight:1.65, fontSize:".92rem" }}>{results.summary}</p>
            </div>

            {results.careers?.map((career, i) => {
              const oc = outlookStyle(career.outlook);
              return (
                <div key={i} className={`pcard c${i+1}`}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:".75rem", marginBottom:"1rem" }}>
                    <div>
                      <div style={{ fontSize:".68rem", color:"rgba(245,168,35,.65)", textTransform:"uppercase", letterSpacing:".12em", fontWeight:500, marginBottom:".2rem" }}>Career {i+1}</div>
                      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.45rem", fontWeight:600, lineHeight:1.2, marginBottom:".18rem" }}>{career.title}</h3>
                      <div style={{ color:"rgba(255,255,255,.4)", fontSize:".78rem" }}>{career.field}</div>
                    </div>
                    <div style={{ background:oc.bg, color:oc.color, border:`1px solid ${oc.border}`, borderRadius:20, padding:".22rem .75rem", fontSize:".7rem", fontWeight:500, whiteSpace:"nowrap", flexShrink:0, marginTop:".25rem" }}>{career.outlook}</div>
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".55rem", marginBottom:"1rem" }}>
                    {[{label:"Salary Range",val:career.salaryRange},{label:"Time to Enter",val:career.timeline},{label:"Education Needed",val:career.eduReq}].map(item => (
                      <div key={item.label} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:".7rem .85rem" }}>
                        <div style={{ fontSize:".67rem", color:"rgba(255,255,255,.32)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:".22rem" }}>{item.label}</div>
                        <div style={{ fontSize:".83rem", fontWeight:500, color:"rgba(255,255,255,.88)", lineHeight:1.35 }}>{item.val}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom:".85rem" }}>
                    <div style={{ fontSize:".67rem", color:"rgba(255,255,255,.32)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:".45rem" }}>Key Skills</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:".35rem" }}>
                      {career.skills?.map(s => <span key={s} className="skill">{s}</span>)}
                    </div>
                  </div>

                  <div style={{ background:"rgba(255,255,255,.03)", borderRadius:8, padding:".75rem 1rem", borderLeft:"2px solid rgba(245,168,35,.35)" }}>
                    <div style={{ fontSize:".67rem", color:"#f5a823", textTransform:"uppercase", letterSpacing:".08em", marginBottom:".2rem" }}>🇵🇭 Philippine Context</div>
                    <div style={{ fontSize:".8rem", color:"rgba(255,255,255,.58)", lineHeight:1.55 }}>{career.phContext}</div>
                  </div>
                </div>
              );
            })}

            {results.tip && (
              <div className="fadein" style={{ background:"rgba(20,100,60,.12)", border:"1px solid rgba(40,180,100,.2)", borderRadius:16, padding:"1.2rem 1.4rem", marginBottom:"1.4rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:".45rem", marginBottom:".45rem" }}>
                  <span style={{ fontSize:".95rem" }}>💡</span>
                  <span style={{ fontSize:".68rem", color:"#4ade80", textTransform:"uppercase", letterSpacing:".12em", fontWeight:500 }}>Start Now — Action Step</span>
                </div>
                <p style={{ color:"rgba(255,255,255,.78)", fontSize:".87rem", lineHeight:1.6 }}>{results.tip}</p>
              </div>
            )}

            <button className="btn" onClick={reset}>Start Over</button>
          </div>
        )}

        <p style={{ textAlign:"center", marginTop:"2rem", color:"rgba(255,255,255,.17)", fontSize:".7rem" }}>
          Career data reflects Philippine job market conditions
        </p>
      </div>
    </div>
  );
}
