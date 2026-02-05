// data.js
// Make sure this file loads BEFORE script.js

window.PORTFOLIO = {
  // Basics
  name: "T. Dinesh",
  title: "Senior System Administrator | Cloud & IAM",
  tagline: "Security-first IAM, Azure & enterprise IT operations | Stable systems | Trusted delivery",
  location: "India",
  totalExperience: "8+ Years Experience",
  email: "dineshtankala85@outlook.com",
  phone: "+91 8331956172",

  // Links
  cvPath: "assets/T_Dinesh_CV.pdf",
  linkedin: "https://www.linkedin.com/in/your-profile/", // update when ready
  github: "https://github.com/dinesh371",

  // Profile image
  profileImage: "assets/Profile.JPG",

  // Hero images
  heroImages: [],

  // Home - At a Glance
  stats: [
    { k: "Experience", v: 8, suffix: "+", s: "Years in enterprise IT operations", count: true },
    { k: "Primary Focus", v: "IAM & Cloud", s: "Identity, access, and infrastructure stability" },
    { k: "Support Level", v: "L2 / L3", s: "Production systems & escalations" }
  ],

  // What I Deliver
  highlights: [
    {
      icon: "cloud",
      k: "Azure Administration",
      v: "Compute, storage, monitoring, backup, patching, and incident response."
    },
    {
      icon: "id",
      k: "Identity & Access Management",
      v: "Active Directory, Azure AD (Entra), Okta, RBAC, JML lifecycle, access reviews."
    },
    {
      icon: "network",
      k: "Enterprise IT Operations",
      v: "Windows Server, endpoint management, troubleshooting, and standardization."
    },
    {
      icon: "shield",
      k: "Security-First Operations",
      v: "Least privilege, audit readiness, change tracking, and clean documentation."
    }
  ],

  // Why I’m a Safe Hire
  confidence: [
    {
      icon: "shield",
      k: "Ownership mindset",
      v: "Clear accountability, reliable follow-through, and predictable outcomes."
    },
    {
      icon: "cloud",
      k: "Incident-ready",
      v: "Structured troubleshooting, calm escalation handling, and fast recovery."
    },
    {
      icon: "network",
      k: "Documentation-driven",
      v: "Runbooks, SOPs, and fix notes to reduce repeat incidents."
    },
    {
      icon: "id",
      k: "Access discipline",
      v: "Controlled approvals, periodic reviews, and role clarity."
    }
  ],

  // Tool logo pills
  toolLogos: [
    { key: "azure", name: "Azure" },
    { key: "okta", name: "Okta" },
    { key: "ad", name: "Active Directory" },
    { key: "m365", name: "Microsoft 365" },
    { key: "windows", name: "Windows Server" }
  ],

  // Experience page (used if rendered dynamically)
  experience: [
    {
      role: "System Administrator",
      company: "PRO-VIGIL",
      location: "India",
      period: "Sep 2023 – Present",
      points: [
        "Own full identity and access lifecycle across Okta and Active Directory.",
        "Administer Google Workspace and Microsoft 365 for global users.",
        "Manage endpoint security, patching, monitoring, and automation using NinjaOne.",
        "Support SOC audits with access logs, evidence, and compliance reports.",
        "Act as escalation point for high-impact infrastructure incidents."
      ],
      tags: ["Okta", "Azure AD", "Microsoft 365", "IAM", "Endpoint Security"]
    },
    {
      role: "System Support Specialist",
      company: "Dynata",
      location: "India",
      period: "Dec 2021 – Sep 2023",
      points: [
        "Provided enterprise support across endpoints, applications, and access systems.",
        "Handled Jira ITSM workflows with SLA-driven delivery.",
        "Maintained IT asset inventory for onsite and remote users.",
        "Supported M365, VPN, endpoint security, and access controls."
      ],
      tags: ["ITSM", "Microsoft 365", "VPN", "Endpoint Support"]
    }
  ],

  // Skills page
  skills: [
    {
      group: "Cloud & Identity",
      items: [
        { name: "Azure Administration", level: 80 },
        { name: "Azure AD / Entra ID", level: 75 },
        { name: "Okta (IAM)", level: 72 }
      ]
    },
    {
      group: "Enterprise Operations",
      items: [
        { name: "Windows Server", level: 82 },
        { name: "Endpoint Management", level: 80 },
        { name: "Incident Troubleshooting", level: 85 }
      ]
    },
    {
      group: "Process & Governance",
      items: [
        { name: "ITSM (Jira)", level: 78 },
        { name: "Documentation / SOPs", level: 82 },
        { name: "Audit Support", level: 75 }
      ]
    }
  ],

  // Projects page
  projects: [
    {
      title: "IAM Cleanup and Access Review Framework",
      period: "2024",
      problem: "Over-provisioned access and inconsistent approvals increased security risk.",
      actions: [
        "Defined role-based access matrix and approval workflow.",
        "Implemented periodic access reviews and removal process.",
        "Created SOPs for access requests and escalations."
      ],
      outcome: "Improved access hygiene and reduced unnecessary privileges.",
      stack: ["Okta", "Azure AD", "RBAC", "SOP"]
    }
  ],

  // Certifications
  certifications: [
    {
      name: "Microsoft Azure Administrator (AZ-104)",
      issuer: "Microsoft",
      year: "2024"
    }
  ],

  // Security page
  securityPractices: [
    {
      title: "Operational Security Controls",
      bullets: [
        "Least-privilege access with role-based assignments.",
        "Change tracking and documentation for audit readiness.",
        "Patch-first approach with baseline system hardening."
      ]
    }
  ],

  // Contact page
  workSamples: [
    {
      title: "GitHub",
      url: "https://github.com/dinesh371",
      note: "Scripts and automation projects"
    },
    {
      title: "Portfolio Source",
      url: "https://github.com/dinesh371/My-Portfolio",
      note: "Website source code"
    }
  ]
};
