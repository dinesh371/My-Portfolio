// data.js
// Make sure this file loads BEFORE script.js (you already have it correct)

window.PORTFOLIO = {
  // Basics
  name: "T. Dinesh",
  title: "Infrastructure & Cloud System Administrator",
  tagline: "Security-first IAM + Azure/Wintel operations | Stable enterprise support | Reliable delivery",
  location: "India",
  totalExperience: "4+ Years Experience",
  email: "yourmail@example.com",     // <-- change
  phone: "+91 0000000000",           // <-- change

  // Links
  cvPath: "assets/T_Dinesh_CV.pdf",  // ✅ IMPORTANT: Must match your real file name in /assets/
  linkedin: "https://www.linkedin.com/in/your-profile/",  // <-- change
  github: "https://github.com/dinesh371",                 // <-- change

  // Profile image
  profileImage: "assets/Profile.JPG",

  // Optional: rotating hero images (put images in /assets/)
  heroImages: [
    "assets/hero1.jpg",
    "assets/hero2.jpg",
    "assets/hero3.jpg"
  ],

  // Stats (Home - At a Glance)
  stats: [
    { k: "Years", v: 4, suffix: "+", s: "Hands-on experience", count: true },
    { k: "Tickets / Month", v: 300, suffix: "+", s: "Ops support volume (example)", count: true },
    { k: "Uptime Focus", v: "99.9%", s: "Reliability & stability" }
  ],

  // What I Deliver
  highlights: [
    { icon: "cloud", k: "Azure Administration", v: "VMs, storage, monitoring, backup, patching, incident response." },
    { icon: "id", k: "Identity & Access (IAM)", v: "AD, Azure AD, Okta, RBAC, access reviews, joiner/mover/leaver." },
    { icon: "network", k: "Wintel & Enterprise Support", v: "Windows Server, troubleshooting, AD/GPO basics, endpoint issues." },
    { icon: "shield", k: "Security-first Operations", v: "Least privilege mindset, audit-friendly documentation, hardening basics." }
  ],

  // Why I’m a Safe Hire
  confidence: [
    { icon: "shield", k: "Reliable ownership", v: "Follows through on tasks, clear updates, predictable delivery." },
    { icon: "cloud", k: "Calm during incidents", v: "Structured troubleshooting and clean handoffs for faster resolution." },
    { icon: "network", k: "Documentation habit", v: "Runbooks, SOPs, and fixes written so issues don’t repeat." },
    { icon: "id", k: "Access hygiene", v: "Role clarity, access review support, and clean approvals flow." }
  ],

  // Tech logo pills (shown under CTA)
  toolLogos: [
    { key: "azure", name: "Azure" },
    { key: "okta", name: "Okta" },
    { key: "ad", name: "Active Directory" },
    { key: "m365", name: "Microsoft 365" },
    { key: "windows", name: "Windows Server" }
  ],

  // Experience page data (example)
  experience: [
    {
      role: "Infrastructure / System Administrator",
      company: "Your Company",
      location: "India",
      period: "2022 - Present",
      points: [
        "Handled daily infrastructure support for Windows and cloud workloads.",
        "Managed IAM requests (Okta/AD/Azure AD) and access reviews.",
        "Performed troubleshooting, monitoring and incident coordination."
      ],
      tags: ["Azure", "Okta", "Windows", "IAM", "L2 Support"]
    }
  ],

  // Skills page data (example)
  skills: [
    {
      group: "Cloud & Identity",
      items: [
        { name: "Azure Admin", level: 80 },
        { name: "Azure AD / Entra", level: 75 },
        { name: "Okta (IAM)", level: 70 }
      ]
    },
    {
      group: "Wintel & Support",
      items: [
        { name: "Windows Server", level: 78 },
        { name: "Troubleshooting", level: 85 },
        { name: "Documentation", level: 82 }
      ]
    }
  ],

  // Projects page data (example)
  projects: [
    {
      title: "IAM Cleanup + Access Review Process",
      period: "2024",
      problem: "Over-provisioned access and inconsistent approvals increased risk.",
      actions: [
        "Created role-based access matrix.",
        "Implemented review cycles and removal workflow.",
        "Documented SOP for approvals and escalations."
      ],
      outcome: "Improved access hygiene and reduced unnecessary privileges.",
      stack: ["Okta", "Azure AD", "RBAC", "SOP"]
    }
  ],

  // Certifications page data (optional)
  certifications: [
    { name: "Microsoft Azure Fundamentals (AZ-900)" }
  ],

  // Security page data (optional)
  securityPractices: [
    {
      title: "Operational Security Practices",
      bullets: [
        "Least privilege and role-based access approach.",
        "Change tracking and documentation for audit readiness.",
        "Basic hardening and patch-first mindset."
      ]
    }
  ],

  // Contact page: work samples (optional)
  workSamples: [
    { title: "LinkedIn Profile", url: "https://www.linkedin.com/in/your-profile/", note: "Updated profile" },
    { title: "GitHub", url: "https://github.com/dinesh371", note: "Projects / scripts" }
  ]
};
