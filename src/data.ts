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

export interface Project {
  title: string;
  description: string;
  tech: string[];
  role: string;
  features: string[];
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
  summary: "Mahasiswa Teknik Informatika yang memiliki minat pada bidang pengembangan Web dan Internet of Things (IoT), serta telah mempelajari bahasa pemrograman C/C++, JavaScript, Python, serta HTML dan CSS. Saat ini sedang mencari kesempatan magang untuk mengembangkan keterampilan teknis dan pengalaman praktis. Memiliki kemampuan dalam pemecahan masalah serta terbiasa mempelajari teknologi baru, dengan motivasi untuk berkontribusi dalam pengembangan solusi digital yang inovatif dan efisien.",
  aboutText: "Saya adalah mahasiswa semester akhir yang berfokus pada pengembangan solusi digital berskala penuh. Menggabungkan ketelitian rekayasa akademis dengan hasrat mengeksplorasi sensor IoT dan integrasi web modern, saya membangun pengalaman pengguna yang bersih dan fungsional. Melalui pembelajaran adaptif, saya siap menyumbangkan keahlian saya dalam tim pengembangan perangkat lunak modern.",
};

export const education: Education = {
  degree: "S1 Teknik Informatika",
  major: "Teknik Informatika",
  institution: "Universitas Advent Indonesia",
  period: "2023 – Sekarang",
  gpa: "3.62 / 4.0",
  coursework: ["Pemrograman Web 1 & 2", "Algoritma Pemrograman", "Pemrograman Basis Data"],
};

export const experiences: Experience[] = [
  {
    role: "Distribution Center Staff",
    company: "PT Imani Sehat",
    location: "Sentra Industri Terpadu 1 & 2, Blok G2 No.9 Elang Laut, PIK",
    period: "Dec 2025 – Jan 2026",
    responsibilities: [
      "Bekerja selama 1 bulan di bagian penyimpanan barang (distribution center).",
      "Menyimpan dan mengelola barang dari hasil produksi (packing) ke dalam sistem gudang secara rapi.",
      "Melayani serta menyiapkan permintaan distribusi barang ke berbagai cabang toko Club Sehat di seluruh daerah.",
      "Berkolaborasi solid dalam tim untuk memastikan seluruh proses logistik dan rantai pasok berjalan dengan aman, efektif, dan efisien."
    ],
  },
  {
    role: "Karyawan Toko",
    company: "Club Sehat Cideng Barat",
    location: "Jl. Cideng Barat No.62B 14, Kota Jakarta Pusat",
    period: "Dec 2024 – Jan 2025",
    responsibilities: [
      "Mengelola operasional harian toko ritel kesehatan selama 1 bulan penuh.",
      "Menghitung, memproses, dan memvalidasi barang masuk ke gudang toko yang dikirimkan oleh DC PT. Imani Sehat.",
      "Memberikan pelayanan customer service yang responsif ketika pelanggan mencari produk.",
      "Melakukan penataan visual merchandising dan menyusun stok barang di rak-rak pajangan yang kosong."
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
    items: ["React.js", "TypeScript", "NestJS", "Node.js", "State Management (Redux/Context)", "Component-based Architecture"],
  },
  {
    category: "Databases & Cloud",
    items: ["NeonDB", "PostgreSQL", "SQL Basics"],
  },
  {
    category: "Tools & Technologies",
    items: ["Visual Studio Code", "Git / GitHub", "Figma", "Canva", "Microsoft Office"],
  },
  {
    category: "Keahlian Lain (Soft Skills)",
    items: ["Pemecahan Masalah (Problem Solving)", "Komunikasi Interpersonal & Kerja Tim", "Adaptif & Cepat Belajar", "Teliti & Berorientasi pada Detail", "Ketertarikan Tinggi pada Internet of Things (IoT)"],
  },
];

export const certificate: Certification = {
  title: "HTML5 Application Development",
  issuer: "Information Technology Specialist (Certiport, CertNexus & Pearson)",
  issueDate: "March 29, 2026",
  credentialId: "PU9X-uS7G",
  image: "/assets/certificate.jpg",
  verificationUrl: "https://verify.certiport.com",
  description: "Sertifikasi keahlian profesional berstandar industri internasional yang memvalidasi kemampuan mendalam dalam merancang aplikasi web modern interaktif berbasis HTML5, CSS3, dan pemanfaatan JavaScript modern untuk manipulasi DOM, manajemen performa, dan struktur dokumen modern bertaraf tinggi.",
};

export const projects: Project[] = [
  {
    title: "Sistem Manajemen Web Portofolio & Proyek Akhir",
    description: "Website modern interaktif yang dikembangkan sebagai proyek akhir mata kuliah Pemrograman Web 2, mengintegrasikan backend modern tangguh dengan frontend berbasis tipe data kuat.",
    tech: ["React.js", "TypeScript", "NestJS", "NeonDB", "Tailwind CSS"],
    role: "Full Stack Developer",
    features: [
      "Merancang arsitektur web berbasis komponen modular yang re-usable.",
      "Mengintegrasikan API endpoint robust dari NestJS dengan database PostgreSQL di hosting Cloud NeonDB.",
      "Menerapkan manajemen state mutakhir demi kenyamanan interaksi pengguna tanpa reload halaman."
    ]
  },
  {
    title: "Prototype Smart Room - IoT Core",
    description: "Proyek hobi eksplorasi Internet of Things (IoT) yang mengintegrasikan mikrokontroler dengan interface web real-time pintar.",
    tech: ["C/C++ (Arduino)", "Python", "WebSockets", "HTML5 & CSS3"],
    role: "IoT & Frontend Developer",
    features: [
      "Mengembangkan logika kontrol firmware perangkat keras menggunakan C/C++.",
      "Membangun visualisasi dashboard pemantau suhu, cahaya, dan sensor biner secara real-time.",
      "Menghubungkan sensor fisik dengan script Python untuk perekaman data log aktivitas ruangan."
    ]
  }
];

export const chatAssistantAnswers = [
  {
    keywords: ["halo", "hai", "hi", "pagi", "siang", "sore", "malam", "siapa"],
    answer: "Halo! Saya adalah **Andre AI**, asisten portofolio digital yang dibuat untuk membantu Anda mengenal lebih jauh tentang **Andre Lumbantoruan**. Ada yang bisa saya bantu hari ini? Anda bisa menanyakan tentang pendidikan, keahlian программирование, pengalaman kerja, atau sertifikasinya."
  },
  {
    keywords: ["pendidikan", "kuliah", "sekolah", "gpa", "ipk", "universitas", "advent", "unai"],
    answer: "Andre sedang menempuh pendidikan **S1 Teknik Informatika** di **Universitas Advent Indonesia** (angkatan 2023 - Sekarang). Saat ini ia memiliki **IPK/GPA: 3.62 / 4.0**, dengan mata kuliah relevan seperti Pemrograman Web 1 & 2, Algoritma Pemrograman, dan Pemrograman Basis Data."
  },
  {
    keywords: ["kerja", "pengalaman", "karyawan", "gudang", "dc", "pt imani sehat", "club sehat", "berpengalaman"],
    answer: "Andre memiliki dua pengalaman kerja signifikan:\n1. **Distribution Center Staff** di **PT Imani Sehat** (Desember 2025 – Januari 2026), mengelola logistik gudang, visual packing, dan koordinasi distribusi antar-cabang toko.\n2. **Karyawan Toko** di **Club Sehat Cideng Barat** (Desember 2024 – Januari 2025), melayani pelanggan, memproses logistik barang masuk, dan menata pajangan rak."
  },
  {
    keywords: ["skill", "teknologi", "bahasa", "pemrograman", "bisa apa", "keahlian", "react", "nestjs", "typescript", "python", "c++"],
    answer: "Andre memiliki keahlian teknis tingkat tinggi di bidang:\n- **Frontend**: React.js, TypeScript, HTML5, dan CSS3.\n- **Backend & Database**: NestJS dan NeonDB (PostgreSQL).\n- **Sistem Dasar**: Python dan C/C++.\n- **IoT (Internet of Things)**: Pemahaman dasar arsitektur mikrokontroler dan integrasinya.\n- **Peralatan**: VS Code, Git/GitHub, Figma, Canva, Microsoft Office."
  },
  {
    keywords: ["sertifikat", "html5", "certiport", "credential", "bukti", "lisensi"],
    answer: "Benar sekali! Andre tersertifikasi secara internasional dalam **HTML5 Application Development** yang diterbitkan oleh institusi tepercaya **Information Technology Specialist (Certiport, CertNexus & Pearson)** pada tanggal **29 Maret 2026** dengan ID Kredensial: **PU9X-uS7G**."
  },
  {
    keywords: ["proyek", "portofolio", "project", "web 2", "bikin apa", "aplikasi"],
    answer: "Andre telah menyelesaikan beberapa proyek keren, di antaranya:\n1. **Sistem Manajemen Web Portofolio & Proyek Akhir** (React, TypeScript, NestJS, NeonDB) - Proyek akhir Web 2 dengan manajemen state mutakhir.\n2. **Prototipe Smart Room IoT** (C/C++ Arduino, Python, WebSockets) - Sistem pengontrol sensor fisik berbasis web."
  },
  {
    keywords: ["kontak", "hubungi", "email", "telepon", "whatsapp", "wa", "lokasi", "alamat"],
    answer: "Anda dapat menghubungi Andre secara langsung melalui:\n- **Email**: Lumbantoruanandre9@gmail.com\n- **Telepon/WA**: 0895-2764-6626\n- **Lokasi**: Bandung Barat, Jawa Barat, Indonesia\n- **GitHub**: https://github.com/2381031\n- **Portofolio**: https://portofolio-tau-seven-39.vercel.app/"
  }
];
