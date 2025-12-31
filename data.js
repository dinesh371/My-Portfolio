window.PORTFOLIO = {
  name: "T. Dinesh",
  title: "Infrastructure & Cloud System Administrator",
  location: "Visakhapatnam, India",
  email: "dineshtankala85@outlook.com",
  phone: "+91-8331956172",
  linkedin: "https://www.linkedin.com/in/dinesh-tankala",
  github: "https://github.com/dinesh371",
  cvPath: "assets/T_Dinesh_CV.pdf",

  // Internet images (auto rotates)
  heroImages: [
    // clean IT themed Unsplash images (safe + professional)
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=70"
  ],

  // Polished summary
  summary:
    "Infrastructure & Cloud System Administrator with strong experience in Identity & Access Management (IAM), Google Workspace administration, Windows infrastructure, Azure operations, and enterprise IT support. Delivered operations and troubleshooting support for government-scale applications (NITI Aayog programs) with a security-first mindset—focused on hardening, access governance, incident handling, and scalable IT operations.",

  tagline:
    "Secure Identity • Reliable Infrastructure • Cloud Operations • Incident Response",

  stats: [
    { k: "Total Experience", v: "8+ Years", s: "Infrastructure & Support" },
    { k: "Cloud & Workspace", v: "3+ Years", s: "Admin + Security Controls" },
    { k: "Security Focus", v: "Hardening", s: "MFA • Logging • Hygiene" },
    { k: "Programs", v: "Gov Scale", s: "NITI Aayog Operations" }
  ],

  highlights: [
    { k: "Identity & Access", v: "Joiner/Mover/Leaver • MFA/2SV • Role separation • Governance baselines", icon: "id" },
    { k: "Cloud & Systems", v: "Azure VM ops • Monitoring & logs • Windows admin • Backup readiness", icon: "cloud" },
    { k: "Security Operations", v: "Hardening • Vulnerability support (Nessus) • Email security (SPF/DKIM/DMARC)", icon: "shield" },
    { k: "Networking", v: "LAN/Wi-Fi/APs • Firewall policy support • DNS/DHCP fundamentals • Troubleshooting", icon: "network" }
  ],

  companies: [
    {
      role: "System Administrator",
      company: "PRO -VIGIL",
      period: "Sep 2023 – Present",
      location: "India",
      bullets: [
        "Administer Google Workspace for 300+ users: lifecycle (JML), groups/OUs, access controls, and admin governance.",
        "Implement security controls: enforce 2-Step Verification, audit log review, and standardized admin baselines.",
        "Support Azure operations: VM provisioning, monitoring, log analysis, and service health validation.",
        "Drive incident handling with SLA focus: triage → resolve → validate → document → prevent recurrence."
      ],
      tags: ["Google Admin", "IAM", "Azure Ops", "Security Controls"]
    },
    {
      role: "System Support Specialist",
      company: "Dynata",
      period: "Dec 2021 – Sep 2023",
      location: "India",
      bullets: [
        "Provided L2/L3 Workspace support: mail flow, permissions, admin escalations, and device access policies.",
        "Implemented email authentication: SPF/DKIM/DMARC; reduced identity and spoofing risk.",
        "Supported patch readiness (Ivanti/LANDesk) and vulnerability findings (Nessus) to improve hygiene.",
        "Performed incident triage with strong documentation discipline and stakeholder coordination."
      ],
      tags: ["Email Security", "MDM", "Ivanti", "Nessus", "ITSM"]
    },
    {
      role: "Technical Engineer",
      company: "HBL Power Systems Ltd.",
      period: "Jan 2021 – Dec 2021",
      location: "India",
      bullets: [
        "Supported firewall log review and troubleshooting during network changes and upgrades.",
        "Resolved infrastructure issues across router/switch/server layers and endpoint readiness.",
        "Enabled operational stability via SOPs and awareness sessions."
      ],
      tags: ["Firewall", "Networking", "Infra Support"]
    },
    {
      role: "IT Support",
      company: "Piramal Swasthya",
      period: "Feb 2019 – Jan 2021",
      location: "India",
      bullets: [
        "Delivered end-to-end IT support across systems, devices, and application operations.",
        "Handled incident triage, resolution, and escalation to ensure service continuity.",
        "Maintained clear documentation and repeatable SOPs."
      ],
      tags: ["IT Support", "Operations", "Documentation"]
    },
    {
      role: "Network Engineer",
      company: "Pioneer Elba’s Ltd.",
      period: "Dec 2017 – Dec 2018",
      location: "India",
      bullets: [
        "Supported LAN/Wi-Fi operations, access points, and connectivity troubleshooting across sites.",
        "Assisted routing/switching basics and improved daily availability for users.",
        "Performed infrastructure upkeep and user support for continuity."
      ],
      tags: ["LAN/Wi-Fi", "Access Points", "Support"]
    }
  ],

  skills: [
    { group: "Identity & Access", items: [
      { name: "Active Directory (AD)", level: 80 },
      { name: "User Lifecycle (JML)", level: 86 },
      { name: "MFA / 2-Step Verification", level: 84 },
      { name: "Access Governance (basic)", level: 72 }
    ]},
    { group: "Cloud & Systems", items: [
      { name: "Azure Ops (VM/Monitoring/Logs)", level: 76 },
      { name: "Windows Administration", level: 78 },
      { name: "Backup/Restore Readiness", level: 74 },
      { name: "System Hardening", level: 82 }
    ]},
    { group: "Security Operations", items: [
      { name: "Email Security (SPF/DKIM/DMARC)", level: 78 },
      { name: "Vulnerability Support (Nessus)", level: 72 },
      { name: "Audit Logs & Policy Controls", level: 76 },
      { name: "Incident Handling & RCA (basic)", level: 80 }
    ]},
    { group: "Networking", items: [
      { name: "LAN/Wi-Fi/APs", level: 76 },
      { name: "Firewall Policy Support", level: 72 },
      { name: "DNS/DHCP Fundamentals", level: 73 },
      { name: "Troubleshooting (Layered)", level: 82 }
    ]}
  ],

  projects: [
    {
      title: "NITI Aayog – Aspirational District App (Android)",
      period: "Feb 2019 – Ongoing",
      problem: "Government-scale field workflows required stable operations and fast incident resolution.",
      actions: ["Application-level troubleshooting", "User support and coordination", "Operational triage and follow-up"],
      outcome: "Improved continuity of field operations through structured support and resolution workflows.",
      stack: ["Support Ops", "Incident Handling", "Stakeholder Coordination"]
    },
    {
      title: "Yatharth App (Android)",
      period: "May 2019 – Ongoing",
      problem: "Reliability and adoption support for operational users.",
      actions: ["Issue triage", "Repeat-fix documentation", "Stakeholder coordination"],
      outcome: "Reduced repeat incidents and improved support turnaround through standard patterns and SOPs.",
      stack: ["Ops Support", "Documentation", "Process Improvement"]
    },
    {
      title: "Health & Wellness Center – Telemedicine Operations",
      period: "Sep 2019 – Ongoing",
      problem: "Telemedicine workflows required consistent operational uptime.",
      actions: ["Operational support", "Incident triage", "Resolution validation and closure"],
      outcome: "Improved service continuity and reduced recurrence using structured SOPs.",
      stack: ["Operations", "IT Support", "SOP Discipline"]
    }
  ],

  certifications: [
    { name: "Microsoft Certified: Azure Administrator (AZ-104)", year: "—" },
    { name: "Microsoft Certified Professional (MCP)", year: "—" },
    { name: "Microsoft Technology Associate (MTA)", year: "—" }
  ]
};
