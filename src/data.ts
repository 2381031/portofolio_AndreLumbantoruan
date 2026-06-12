export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  major: string;
  institution: string;
  period: string;
  gpa: string;
  coursework: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  image?: string;
  verificationUrl: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  role: string;
  features: string[];
  links?: ProjectLink[];
}

export const biography = {
  name: "Andre Lumbantoruan",
  title: "Informatics Engineering Student • Web Developer • IoT Enthusiast",
  status: "",
  location: "West Bandung, West Java, Indonesia",
  phone: "0895-2764-6626",
  email: "Lumbantoruanandre9@gmail.com",
  github: "https://github.com/2381031",
  portfolio: "https://portofolio-tau-seven-39.vercel.app/",
  profilePhoto: "/assets/profile.jpg",
  summary:
    "Mahasiswa Teknik Informatika yang memiliki minat pada bidang pengembangan Web dan Internet of Things (IoT), serta telah mempelajari bahasa pemrograman C/C++, JavaScript, Python, serta HTML dan CSS. Saat ini sedang mencari kesempatan magang untuk mengembangkan keterampilan teknis dan pengalaman praktis. Memiliki kemampuan dalam pemecahan masalah serta terbiasa mempelajari teknologi baru, dengan motivasi untuk berkontribusi dalam pengembangan solusi digital yang inovatif dan efisien.",
  aboutText:
    "Saya adalah mahasiswa semester akhir yang berfokus pada pengembangan solusi digital berskala penuh. Menggabungkan ketelitian rekayasa akademis dengan hasrat mengeksplorasi sensor IoT dan integrasi web modern, saya membangun pengalaman pengguna yang bersih dan fungsional. Melalui pembelajaran adaptif, saya siap menyumbangkan keahlian saya dalam tim pengembangan perangkat lunak modern.",
};

export const education: Education = {
  degree: "S1 Teknik Informatika",
  major: "Teknik Informatika",
  institution: "Universitas Advent Indonesia",
  period: "2023 – Sekarang",
  gpa: "3.62 / 4.0",
  coursework: [
    "Pemrograman Web 1 & 2",
    "Algoritma Pemrograman",
    "Pemrograman Basis Data",
  ],
};

export const experiences: Experience[] = [
  {
    role: "Distribution Center Staff",
    company: "PT Misi Sehat Imani",
    location: "Sentra Industri Terpadu 1 & 2, Blok G2 No.9 Elang Laut, PIK",
    period: "Dec 2025 – Jan 2026",
    responsibilities: [
      "Bekerja selama 1 bulan di bagian penyimpanan barang (distribution center).",
      "Menyimpan dan mengelola barang dari hasil produksi (packing) ke dalam sistem gudang secara rapi.",
      "Melayani serta menyiapkan permintaan distribusi barang ke berbagai cabang toko Club Sehat di seluruh daerah.",
      "Berkolaborasi solid dalam tim untuk memastikan seluruh proses logistik dan rantai pasok berjalan dengan aman, efektif, dan efisien.",
    ],
  },
  {
    role: "Karyawan Toko",
    company: "Club Sehat Cideng Barat",
    location: "Jl. Cideng Barat No.62B 14, Kota Jakarta Pusat",
    period: "Dec 2024 – Jan 2025",
    responsibilities: [
      "Mengelola operasional harian toko ritel kesehatan selama 1 bulan penuh.",
      "Menghitung, memproses, dan memvalidasi barang masuk ke gudang toko yang dikirimkan oleh DC PT. Misi Sehat Imani.",
      "Memberikan pelayanan customer service yang responsif ketika pelanggan mencari produk.",
      "Melakukan penataan visual merchandising dan menyusun stok barang di rak-rak pajangan yang kosong.",
    ],
  },
];

export const skills: SkillCategory[] = [
  {
    category: "Bahasa Pemrograman",
    items: ["JavaScript", "HTML & CSS", "Python (Dasar)", "C/C++ (Dasar)"],
  },
  {
    category: "Full Stack Developer",
    items: [
      "React.js",
      "TypeScript",
      "NestJS",
      "Node.js",
      "State Management (Redux/Context)",
      "Component-based Architecture",
    ],
  },
  {
    category: "Databases & Cloud",
    items: ["NeonDB", "PostgreSQL", "SQL Basics"],
  },
  {
    category: "Tools & Technologies",
    items: [
      "Visual Studio Code",
      "Git / GitHub",
      "Figma",
      "Canva",
      "Microsoft Office",
    ],
  },
  {
    category: "Keahlian Lain (Soft Skills)",
    items: [
      "Pemecahan Masalah (Problem Solving)",
      "Komunikasi Interpersonal & Kerja Tim",
      "Adaptif & Cepat Belajar",
      "Teliti & Berorientasi pada Detail",
      "Ketertarikan Tinggi pada Internet of Things (IoT)",
    ],
  },
];

export const certificate: Certification = {
  title: "HTML5 Application Development",
  issuer: "Information Technology Specialist (Certiport, CertNexus & Pearson)",
  issueDate: "March 29, 2026",
  credentialId: "PU9X-uS7G",
  image: "/assets/certificate.jpg",
  verificationUrl: "https://verify.certiport.com",
  description:
    "Sertifikasi keahlian profesional berstandar industri internasional yang memvalidasi kemampuan mendalam dalam merancang aplikasi web modern interaktif berbasis HTML5, CSS3, dan pemanfaatan JavaScript modern untuk manipulasi DOM, manajemen performa, dan struktur dokumen modern bertaraf tinggi.",
};

export const projects: Project[] = [
  {
    title: "Final Web 2 - Online Bookstore",
    role: "Full Stack Web Developer",
    description:
      "Aplikasi toko buku online berbasis web yang dikembangkan sebagai proyek akhir mata kuliah Pemrograman Web 2. Project ini menggunakan frontend modern dan backend API terpisah untuk mengelola data buku, user, autentikasi, serta proses manajemen toko buku.",
    features: [
      "Membangun frontend website toko buku yang responsif dan terhubung dengan backend API.",
      "Mengembangkan backend menggunakan NestJS untuk mengelola data aplikasi secara terstruktur.",
      "Mengintegrasikan database, endpoint API, autentikasi, dan deployment project ke platform online.",
    ],
    tech: [
      "React.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "NeonDB",
      "Vercel",
    ],
    links: [
      {
        label: "Live Demo",
        url: "https://f-inal-web2-bookstore-frontend.vercel.app/",
      },
      {
        label: "Backend Repo",
        url: "https://github.com/2381031/final-web2-bookstore-backend",
      },
      {
        label: "Backend API",
        url: "https://final-web2-bookstore-backend.vercel.app/",
      },
    ],
  },
];

export const chatAssistantAnswers = [
  {
    keywords: [
      "halo",
      "hai",
      "hi",
      "pagi",
      "siang",
      "sore",
      "malam",
      "siapa",
    ],
    answer:
      "Halo! Saya adalah **Andre AI**, asisten portofolio digital yang dibuat untuk membantu Anda mengenal lebih jauh tentang **Andre Lumbantoruan**. Ada yang bisa saya bantu hari ini? Anda bisa menanyakan tentang pendidikan, keahlian pemrograman, pengalaman kerja, proyek, atau sertifikasinya.",
  },
  {
    keywords: [
      "pendidikan",
      "kuliah",
      "sekolah",
      "gpa",
      "ipk",
      "universitas",
      "advent",
      "unai",
    ],
    answer:
      "Andre sedang menempuh pendidikan **S1 Teknik Informatika** di **Universitas Advent Indonesia** (angkatan 2023 - Sekarang). Saat ini ia memiliki **IPK/GPA: 3.62 / 4.0**, dengan mata kuliah relevan seperti Pemrograman Web 1 & 2, Algoritma Pemrograman, dan Pemrograman Basis Data.",
  },
  {
    keywords: [
      "kerja",
      "pengalaman",
      "karyawan",
      "gudang",
      "dc",
      "PT Misi Sehat Imani",
      "club sehat",
      "berpengalaman",
    ],
    answer:
      "Andre memiliki dua pengalaman kerja signifikan:\n1. **Distribution Center Staff** di **PT Misi Sehat Imani** (Desember 2025 – Januari 2026), mengelola logistik gudang, penyimpanan barang, dan koordinasi distribusi antar-cabang toko.\n2. **Karyawan Toko** di **Club Sehat Cideng Barat** (Desember 2024 – Januari 2025), melayani pelanggan, memproses logistik barang masuk, dan menata pajangan rak.",
  },
  {
    keywords: [
      "skill",
      "teknologi",
      "bahasa",
      "pemrograman",
      "bisa apa",
      "keahlian",
      "react",
      "nestjs",
      "typescript",
      "python",
      "c++",
    ],
    answer:
      "Andre memiliki keahlian teknis di bidang:\n- **Frontend**: React.js, TypeScript, HTML5, dan CSS3.\n- **Backend & Database**: NestJS dan NeonDB PostgreSQL.\n- **Sistem Dasar**: Python dan C/C++.\n- **IoT (Internet of Things)**: Pemahaman dasar arsitektur mikrokontroler dan integrasinya.\n- **Tools**: VS Code, Git/GitHub, Figma, Canva, dan Microsoft Office.",
  },
  {
    keywords: [
      "sertifikat",
      "html5",
      "certiport",
      "credential",
      "bukti",
      "lisensi",
    ],
    answer:
      "Benar sekali! Andre tersertifikasi secara internasional dalam **HTML5 Application Development** yang diterbitkan oleh **Information Technology Specialist (Certiport, CertNexus & Pearson)** pada tanggal **29 Maret 2026** dengan ID Kredensial: **PU9X-uS7G**.",
  },
  {
    keywords: [
      "proyek",
      "portofolio",
      "project",
      "web 2",
      "bikin apa",
      "aplikasi",
      "bookstore",
      "toko buku",
    ],
    answer:
      "Salah satu proyek utama Andre adalah **Final Web 2 - Online Bookstore**, yaitu aplikasi toko buku online berbasis web yang menggunakan frontend modern dan backend API terpisah. Project ini dibuat dengan teknologi seperti React.js, TypeScript, NestJS, PostgreSQL, NeonDB, dan Vercel.\n\nLive Demo: https://f-inal-web2-bookstore-frontend.vercel.app/\nBackend Repo: https://github.com/2381031/final-web2-bookstore-backend\nBackend API: https://final-web2-bookstore-backend.vercel.app/",
  },
  {
    keywords: [
      "kontak",
      "hubungi",
      "email",
      "telepon",
      "whatsapp",
      "wa",
      "lokasi",
      "alamat",
    ],
    answer:
      "Anda dapat menghubungi Andre secara langsung melalui:\n- **Email**: Lumbantoruanandre9@gmail.com\n- **Telepon/WA**: 0895-2764-6626\n- **Lokasi**: Bandung Barat, Jawa Barat, Indonesia\n- **GitHub**: https://github.com/2381031\n- **Portofolio**: https://portofolio-tau-seven-39.vercel.app/",
  },
];