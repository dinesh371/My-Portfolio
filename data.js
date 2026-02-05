// data.js
// Make sure this file loads BEFORE script.js

window.PORTFOLIO = {
  // Basics
  name: "T. Dinesh",
  title: "Infrastructure & Cloud System Administrator",
  tagline: "Security-first IAM + Azure/Wintel operations | Stable enterprise support | Reliable delivery",
  location: "India",
  totalExperience: "8+ Years Experience",
  email: "dineshtankala85@outlook.com",
  phone: "+91 8331956172",

  // Links
  // IMPORTANT: this must match the exact filename in /assets/ (case sensitive)
  cvPath: "assets/T_Dinesh_CV.pdf",
  linkedin: "https://www.linkedin.com/in/your-profile/",   // <-- replace with real LinkedIn
  github: "https://github.com/dinesh371",

  // Profile image
  profileImage: "assets/Profile.JPG",

  // Optional: rotating hero images (ONLY keep if these files exist in /assets/)
  // If you don't have these, set heroImages: []
  heroImages: [],

  // Home - At a Glance
  stats: [
    { k: "Experience", v: 8, suffix: "+", s: "Years in IT operations", count: true },
    { k: "Core Focus", v: "IAM + Cloud", s: "Secure access & stable infrastructure" },
    { k: "Support", v: "L2 / L3", s: "Enterprise troubleshooting & delivery" }
  ],

  // What I Deliver
  highlights: [
    { icon: "cloud", k: "Azure Administration", v: "Compute, storage, monitoring, backup, patching and incident support." },
    { icon: "id", k: "Identity & Access (IAM)", v: "AD / Azure AD (Entra), Okta, RBAC, access reviews and JML process." },
    { icon: "network", k: "Wintel & Enterprise Support", v: "Windows Server, endpoint support, troubleshooting and standardization." },
    { icon: "shield", k: "Security-first Operations", v: "Least privilege, audit-friendly changes and clean documentation." }
  ],

  // Why I’m a Safe Hire
  confidence: [
    { icon: "shield", k: "Reliable ownership", v: "Clear updates, solid follow-through, and consistent delivery." },
    { icon: "cloud", k: "Calm under pressure", v: "Structured troubleshooting and clean escalation during incidents." },
    { icon: "network", k: "Documentation habit", v: "Runbooks, SOPs and fix notes to prevent repeat issues." },
    { icon: "id", k: "Access hygiene", v: "Role clarity, review cycles, and controlled approvals." }
  ],

  // Tech logo pills (shown under CTA)
  toolLogos: [
    { key: "azure", name: "Azure" },
    { key: "okta", name: "Okta" },
    { key: "ad", name: "Active Directory" },
    { key: "m365", name: "Microsoft 365" },
    { key: "windows", name: "Windows Server" }
  ],

  // Experience page
  experience: [
    {
      role: "Infrastructure / System Administrator",
      company: "Your Company",        // <-- replace
      location: "India",
      period: "2022 - Present",       // <-- replace if needed
      points: [
        "Supported infrastructure operations for Windows and cloud workloads.",
        "Handled IAM requests (AD / Azure AD / Okta) and access review activities.",
        "Worked on monitoring, troubleshooting, patching and incident coordination."
      ],
      tags: ["Azure", "Okta", "Windows", "IAM", "L2 Support"]
    }
  ],

  // Skills page
  skills: [
    {
      group: "Cloud & Identity",
      items: [
        { name: "Azure Administration", level: 80 },
        { name: "Azure AD / Entra", level: 75 },
        { name: "Okta (IAM)", level: 70 }
      ]
    },
    {
      group: "Wintel & Operations",
      items: [
        { name: "Windows Server", level: 80 },
        { name: "Troubleshooting", level: 85 },
        { name: "Documentation / SOPs", level: 82 }
      ]
    }
  ],

  // Projects page
  projects: [
    {
      title: "IAM Cleanup + Access Review Process",
      period: "2024",
      problem: "Over-provisioned access and inconsistent approvals increased risk.",
      actions: [
        "Defined role-based access matrix and approval flow.",
        "Implemented review cycles and removal workflow.",
        "Documented SOP for access requests and escalations."
      ],
      outcome: "Improved access hygiene and reduced unnecessary privileges.",
      stack: ["Okta", "Azure AD", "RBAC", "SOP"]
    }
  ],

  // Certifications page
  // Supports: { name, issuer, year, id, verify }
  certifications: [
    { name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", year: "2024" }
  ],

  // Security page
  securityPractices: [
    {
      title: "Operational Security Practices",
      bullets: [
        "Least privilege and role-based access approach.",
        "Change tracking and documentation for audit readiness.",
        "Patch-first mindset with basic hardening practices."
      ]
    }
  ],

  // Contact page
  workSamples: [
    { title: "GitHub", url: "https://github.com/dinesh371", note: "Projects / scripts" },
    { title: "Portfolio Source", url: "https://github.com/dinesh371/My-Portfolio", note: "Website code repository" }
  ]
};
