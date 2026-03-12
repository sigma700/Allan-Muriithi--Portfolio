import {useState, useEffect, useRef} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {SiExpress, SiFramer, SiMongodb, SiPostman} from "react-icons/si";
import {
  LuGraduationCap,
  LuBriefcase,
  LuDownload,
  LuExternalLink,
  LuArrowRight,
} from "react-icons/lu";
import {
  FaCode,
  FaGitAlt,
  FaHiking,
  FaLinux,
  FaNimblr,
  FaNodeJs,
  FaReact,
  FaBuilding,
} from "react-icons/fa";
import {TypeAnimation} from "react-type-animation";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
import {useInView} from "react-intersection-observer";
import {Links} from "../components/links";

export function meta() {
  return [
    {title: "Allan Muriiithi — FullStack Engineer"},
    {
      name: "description",
      content:
        "Portfolio of Allan Muriiithi, a premium full-stack engineer specializing in MERN stack, UI/UX design, and scalable web applications.",
    },
  ];
}

/* ─── GRAIN OVERLAY COMPONENT ─────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/* ─── CUSTOM CURSOR ───────────────────────────────────────── */
function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${
          e.clientY - 20
        }px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${
          e.clientY - 4
        }px)`;
      }
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(132, 204, 22, 0.6)",
          pointerEvents: "none",
          zIndex: 99999,
          transition:
            "transform 0.12s ease, width 0.2s, height 0.2s, border-color 0.2s",
          mixBlendMode: "difference",
          transform: hovered ? "scale(1.6)" : "scale(1)",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#84cc16",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "transform 0.04s ease",
        }}
      />
    </>
  );
}

/* ─── SCROLL PROGRESS BAR ────────────────────────────────── */
function ScrollProgress() {
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {stiffness: 100, damping: 30});

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #84cc16, #22c55e)",
        transformOrigin: "0%",
        zIndex: 99998,
      }}
    />
  );
}

/* ─── ANIMATED SECTION TITLE ─────────────────────────────── */
function SectionTitle({label, title, subtitle}) {
  const {ref, inView} = useInView({triggerOnce: true, threshold: 0.3});

  return (
    <div ref={ref} className="text-center mb-20">
      <motion.span
        initial={{opacity: 0, y: 10}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.5}}
        className="inline-block text-xs font-bold tracking-[0.3em] text-green-400 uppercase mb-4 px-4 py-2 border border-green-400/30 rounded-full"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{opacity: 0, y: 20}}
        animate={inView ? {opacity: 1, y: 0} : {}}
        transition={{duration: 0.6, delay: 0.1}}
        className="text-4xl lg:text-6xl font-black mb-4 tracking-tight"
        style={{fontFamily: "'Syne', sans-serif"}}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{opacity: 0, y: 10}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.5, delay: 0.2}}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ─── STAT COUNTER ───────────────────────────────────────── */
function StatCard({number, suffix, label, delay}) {
  const {ref, inView} = useInView({triggerOnce: true, threshold: 0.5});

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 30}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{duration: 0.6, delay}}
      className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
    >
      <div
        className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-lime-300 to-green-500 bg-clip-text text-transparent mb-2"
        style={{fontFamily: "'Syne', sans-serif"}}
      >
        {inView ? <CountUp end={number} duration={2} suffix={suffix} /> : "0"}
      </div>
      <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
        {label}
      </p>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
export default function Home() {
  const [show, setShow] = useState({
    project1: false,
    project2: false,
    project3: false,
    navbar: false,
  });

  const toggleShow = (project) => setShow({...show, [project]: !show[project]});

  const experiences = [
    {
      company: "SigmaDevs Web Development Co. Ltd",
      role: "Chief Executive Officer & Lead Engineer",
      period: "July 2025 – Present",
      color: "#84cc16",
      icon: <FaBuilding />,
      desc: "Founded and lead a web development firm delivering MERN-stack solutions, SEO, and consultation for businesses across Kenya.",
      highlights: [
        "Designed & shipped full-stack web apps from scratch",
        "Created Kenya Schools API — sold to multiple clients",
        "Built Protiba, an AI-powered school timetable SaaS",
        "Hosted free webinars teaching web development fundamentals",
      ],
    },
    {
      company: "Future Interns",
      role: "Software Engineering Intern",
      period: "2-Month Internship",
      color: "#3b82f6",
      icon: <LuBriefcase />,
      desc: "Immersive 2-month internship focused on real-world software engineering practices, agile workflows, and collaborative product delivery.",
      highlights: [
        "Contributed to production codebases in a team environment",
        "Applied agile methodologies and sprint-based delivery",
        "Built and reviewed RESTful API integrations",
        "Received mentorship from senior engineers",
      ],
    },
    {
      company: "Macista Limited Kenya",
      role: "Lead Developer",
      period: "July 2025 – September 2025",
      color: "#f59e0b",
      icon: <FaCode />,
      desc: "Coordinated, designed, and delivered the company's full website using the MERN stack alongside a team of developers.",
      highlights: [
        "Boosted company sales by 30% via modern UI",
        "Implemented JWT + bcrypt.js security layer",
        "Delivered the project 8 weeks on schedule",
        "Enhanced company visibility through thorough SEO",
      ],
    },
    {
      company: "BrewHaven USA",
      role: "Freelance Full-Stack Developer",
      period: "October 2025 – November 2025",
      color: "#8b5cf6",
      icon: <FaReact />,
      desc: "Developed a full e-commerce platform for a US-based coffee business enabling both online and in-person payments.",
      highlights: [
        "Increased company profits by 10% and growing",
        "Integrated Spline API for universal payments",
        "Built AI-powered FAQ and auto-response system",
        "Fully responsive, cross-device interactive UI",
      ],
    },
  ];

  const projects = [
    {
      title: "Protiba",
      image: "/Screenshot 2025-09-20 203806.png",
      tags: ["REACT", "Javascript", "NodeJs", "TAILWIND CSS", "Framer-motion"],
      link: "https://protiba.onrender.com/",
      desc: "AI-powered school timetable generator SaaS",
    },
    {
      title: "BrewHaven",
      image: "/Screenshot 2025-10-22 223907.png",
      tags: ["ReactJs", "TAILWIND CSS", "Framer-motion"],
      link: "https://brewhaven-qea1.onrender.com/",
      desc: "Coffee e-commerce platform with payment integration",
    },
    {
      title: "EduFind",
      image: "/Screenshot 2025-09-20 204543.png",
      tags: ["REACT", "TAILWIND CSS", "Framer-motion"],
      link: "https://edufind-ryn2.onrender.com/",
      desc: "Educational institution discovery platform",
    },
    {
      title: "MACISTA LIMITED",
      image: "/Screenshot 2025-09-20 203520.png",
      tags: ["REACT", "Javascript", "EXPRESS Js"],
      link: "https://www.macista.co.ke/",
      desc: "Full corporate website for a Kenyan enterprise",
    },
    {
      title: "TikTak Toe Game",
      image: "/Screenshot 2025-09-20 203447.png",
      tags: ["HTML & CSS", "Javascript"],
      link: "https://tiktaktoe-game.onrender.com/",
      desc: "Classic tic-tac-toe browser game",
    },
  ];

  return (
    <>
      {/* Inject Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

        * { font-family: 'DM Sans', sans-serif; }

        /* Glowing green orb background */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        /* Premium card glow */
        .glow-card {
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glow-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(132,204,22,0.15), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .glow-card:hover::before { opacity: 1; }
        .glow-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(132, 204, 22, 0.12);
        }

        /* Timeline glow dot */
        .timeline-dot::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: inherit;
          opacity: 0.3;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.8); opacity: 0; }
        }

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #bef264, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Shimmer effect for download buttons */
        .shimmer-btn {
          position: relative;
          overflow: hidden;
        }
        .shimmer-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .shimmer-btn:hover::after { left: 150%; }

        /* Skill badge hover */
        .skill-badge {
          transition: all 0.2s ease;
        }
        .skill-badge:hover {
          background: rgba(132, 204, 22, 0.12);
          border-color: rgba(132, 204, 22, 0.5);
          transform: translateY(-2px);
        }

        /* Section divider */
        .divider-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #84cc16, transparent);
          margin: 0 auto 24px;
        }

        /* Fancy scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #22c55e; border-radius: 2px; }

        /* Mobile cursor hide */
        @media (max-width: 768px) {
          .custom-cursor { display: none; }
        }
      `}</style>

      <GrainOverlay />
      <ScrollProgress />
      <div className="custom-cursor">
        <CustomCursor />
      </div>

      <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
        {/* ── NAVIGATION ──────────────────────────────────── */}
        <nav className="fixed w-full z-50 py-4 px-6 lg:px-10">
          <div
            className="max-w-7xl mx-auto flex justify-between items-center rounded-2xl px-6 py-3"
            style={{
              background: "rgba(17,24,39,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <motion.div
              initial={{opacity: 0, x: -20}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.6}}
              className="flex items-center gap-3"
            >
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-green-500/40"
                src="/Gemini_Generated_Image_g495wxg495wxg495-Photoroom.png"
                alt="Logo"
              />
              <span
                className="hidden sm:block text-sm font-bold tracking-wider text-gray-300"
                style={{fontFamily: "'Syne', sans-serif"}}
              >
                ALLAN<span className="text-green-400">.</span>DEV
              </span>
            </motion.div>

            <motion.ul
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.2, duration: 0.5}}
              className="hidden lg:flex gap-10 text-sm font-medium text-gray-400"
            >
              {[
                "about",
                "experience",
                "projects",
                "testimonials",
                "contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="relative hover:text-white transition-colors duration-300 capitalize group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </motion.ul>

            <motion.a
              href="#contact"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.3}}
              className="hidden lg:block px-5 py-2 text-sm font-semibold border border-green-500 text-green-400 rounded-xl hover:bg-green-500 hover:text-gray-900 transition-all duration-300 shimmer-btn"
            >
              Hire Me
            </motion.a>

            <motion.button
              whileTap={{scale: 0.95}}
              onClick={() => toggleShow("navbar")}
              className="lg:hidden p-2 rounded-lg bg-gray-800/80 border border-gray-700"
            >
              <img
                className="w-5 h-5"
                src="/align-justify (1).svg"
                alt="Menu"
              />
            </motion.button>
          </div>

          <AnimatePresence>
            {show.navbar && (
              <motion.div
                initial={{opacity: 0, y: -10, scale: 0.97}}
                animate={{opacity: 1, y: 0, scale: 1}}
                exit={{opacity: 0, y: -10, scale: 0.97}}
                transition={{duration: 0.2}}
                className="lg:hidden mt-3 mx-auto max-w-7xl bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden"
              >
                <ul className="py-4 px-4">
                  {["home", "about", "experience", "projects", "contact"].map(
                    (item) => (
                      <motion.li key={item} whileHover={{x: 6}}>
                        <a
                          href={`#${item}`}
                          onClick={() => toggleShow("navbar")}
                          className="block py-3 px-4 text-gray-300 hover:text-white capitalize rounded-lg hover:bg-gray-700/50 transition-colors"
                        >
                          {item}
                        </a>
                      </motion.li>
                    ),
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ── HERO SECTION ────────────────────────────────── */}
        <section
          id="home"
          className="relative min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-10 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(132,204,22,0.08) 0%, transparent 70%), #111827",
          }}
        >
          {/* Background orbs */}
          <div
            className="hero-orb"
            style={{
              width: 500,
              height: 500,
              background: "rgba(132,204,22,0.08)",
              top: "10%",
              right: "-10%",
            }}
          />
          <div
            className="hero-orb"
            style={{
              width: 300,
              height: 300,
              background: "rgba(34,197,94,0.06)",
              bottom: "10%",
              left: "-5%",
            }}
          />

          {/* Dotted grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              pointerEvents: "none",
            }}
          />

          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
            {/* Avatar */}
            <motion.div
              initial={{opacity: 0, scale: 0.8, rotate: -4}}
              animate={{opacity: 1, scale: 1, rotate: 0}}
              transition={{duration: 0.8, ease: [0.34, 1.56, 0.64, 1]}}
              className="relative flex-shrink-0"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #84cc16, #22c55e, transparent, transparent, #84cc16)",
                  padding: 3,
                  animation: "spin 8s linear infinite",
                }}
              />
              <style>{`@keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }`}</style>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #84cc16, #22c55e, transparent 50%, transparent 80%, #84cc16)",
                    filter: "blur(1px)",
                    animation: "spin 8s linear infinite",
                  }}
                />
                <img
                  className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover"
                  style={{
                    border: "4px solid #111827",
                    boxShadow:
                      "0 0 60px rgba(132,204,22,0.25), 0 0 120px rgba(132,204,22,0.1)",
                  }}
                  src="/Gemini_Generated_Image_iphrc7iphrc7iphr.png"
                  alt="Allan"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.8, duration: 0.5}}
                className="absolute -right-6 top-8 px-4 py-2 rounded-xl text-xs font-bold tracking-wider"
                style={{
                  background: "rgba(132,204,22,0.12)",
                  border: "1px solid rgba(132,204,22,0.3)",
                  backdropFilter: "blur(12px)",
                  color: "#84cc16",
                }}
              >
                Available for work
              </motion.div>

              <motion.div
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 1, duration: 0.5}}
                className="absolute -left-4 bottom-10 px-4 py-2 rounded-xl text-xs font-semibold"
                style={{
                  background: "rgba(17,24,39,0.85)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  color: "#d1d5db",
                }}
              >
                Nairobi, Kenya
              </motion.div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{opacity: 0, x: 30}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.8, delay: 0.2}}
              className="text-center lg:text-left max-w-2xl"
            >
              <motion.p
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3}}
                className="text-green-400 text-sm font-bold tracking-[0.25em] uppercase mb-4"
              >
                Welcome to my portfolio
              </motion.p>

              <h1
                className="text-5xl lg:text-7xl font-black mb-3 tracking-tight leading-none"
                style={{fontFamily: "'Syne', sans-serif"}}
              >
                I'm <span className="gradient-text">Allan</span>
              </h1>

              <div
                className="text-2xl lg:text-4xl font-bold text-gray-200 mb-6 min-h-[3rem]"
                style={{fontFamily: "'Syne', sans-serif"}}
              >
                <TypeAnimation
                  sequence={[
                    "FullStack Web Developer",
                    2000,
                    "MERN Stack Engineer",
                    2000,
                    "UI/UX Craftsman",
                    2000,
                    "Tech Entrepreneur",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                I design and build stunning, high-performance web applications —
                transforming wireframes into clean, logical, and beautiful code
                that drives real business outcomes.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <motion.a
                  href="https://wa.me/792624342?text=Hello%20I'm%20interested%20in%20your%20services"
                  target="_blank"
                  whileHover={{scale: 1.03, y: -2}}
                  whileTap={{scale: 0.97}}
                  className="group px-8 py-4 font-bold text-gray-900 rounded-xl shimmer-btn"
                  style={{
                    background: "linear-gradient(135deg, #84cc16, #22c55e)",
                    boxShadow: "0 0 30px rgba(132,204,22,0.35)",
                  }}
                >
                  Let's Chat
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </motion.a>

                <motion.a
                  href="#projects"
                  whileHover={{scale: 1.03, y: -2}}
                  whileTap={{scale: 0.97}}
                  className="px-8 py-4 font-bold border border-gray-600 text-gray-300 rounded-xl hover:border-green-400/50 hover:text-white transition-all duration-300"
                  style={{backdropFilter: "blur(10px)"}}
                >
                  View Work
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 1.5}}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-gray-500 text-xs tracking-widest uppercase">
              Scroll
            </span>
            <motion.div
              animate={{y: [0, 8, 0]}}
              transition={{duration: 1.5, repeat: Infinity}}
              className="w-px h-12"
              style={{
                background: "linear-gradient(to bottom, #84cc16, transparent)",
              }}
            />
          </motion.div>
        </section>

        {/* ── STATS STRIP ─────────────────────────────────── */}
        <section
          className="py-16 px-6 lg:px-10"
          style={{
            background: "#0f172a",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              number={10}
              suffix="+"
              label="Projects Shipped"
              delay={0}
            />
            <StatCard number={5} suffix="+" label="Happy Clients" delay={0.1} />
            <StatCard number={1} suffix="yr" label="Experience" delay={0.2} />
            <StatCard
              number={100}
              suffix="+"
              label="Tasks Completed"
              delay={0.3}
            />
          </div>
        </section>

        {/* ── ABOUT SECTION ───────────────────────────────── */}
        <section
          id="about"
          className="py-24 px-6 lg:px-10 bg-gray-900 relative overflow-hidden"
        >
          <div
            className="hero-orb"
            style={{
              width: 400,
              height: 400,
              background: "rgba(132,204,22,0.05)",
              top: "50%",
              left: "60%",
              transform: "translate(-50%,-50%)",
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle
              label="About Me"
              title="The Developer Behind the Code"
              subtitle="Passionate engineer combining mechanical rigour with modern web mastery to build solutions that matter"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Education */}
              <motion.div
                initial={{opacity: 0, x: -30}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.6}}
                viewport={{once: true}}
                className="glow-card p-8 rounded-3xl"
                style={{
                  background: "rgba(17,24,39,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-green-400 text-xl"
                    style={{
                      background: "rgba(132,204,22,0.1)",
                      border: "1px solid rgba(132,204,22,0.2)",
                    }}
                  >
                    <LuGraduationCap />
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{fontFamily: "'Syne', sans-serif"}}
                  >
                    Education
                  </h3>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      color: "#84cc16",
                      title: "Full Stack Web Dev + AI",
                      sub: "GoMyCode Kenya",
                      detail: "6-Month Intensive · Completed 2025",
                    },
                    {
                      color: "#3b82f6",
                      title: "BSc Mechanical Engineering",
                      sub: "Dedan Kimathi University",
                      detail: "5-Year Degree · In Progress",
                    },
                    {
                      color: "#8b5cf6",
                      title: "Freelance Academy",
                      sub: "ALX Africa",
                      detail: "Ongoing Professional Development",
                    },
                  ].map(({color, title, sub, detail}) => (
                    <div
                      key={title}
                      className="pl-4"
                      style={{borderLeft: `2px solid ${color}`}}
                    >
                      <h4 className="font-semibold text-sm" style={{color}}>
                        {title}
                      </h4>
                      <p className="text-gray-300 text-sm mt-0.5">{sub}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.1}}
                viewport={{once: true}}
                className="glow-card p-8 rounded-3xl"
                style={{
                  background: "rgba(17,24,39,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-blue-400 text-xl"
                    style={{
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                    }}
                  >
                    <FaCode />
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{fontFamily: "'Syne', sans-serif"}}
                  >
                    Tech Stack
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      name: "MongoDB",
                      icon: <SiMongodb className="text-green-500" />,
                    },
                    {
                      name: "Express.js",
                      icon: <SiExpress className="text-gray-300" />,
                    },
                    {
                      name: "React.js",
                      icon: <FaReact className="text-cyan-400" />,
                    },
                    {
                      name: "Node.js",
                      icon: <FaNodeJs className="text-green-400" />,
                    },
                    {
                      name: "Git",
                      icon: <FaGitAlt className="text-orange-500" />,
                    },
                    {
                      name: "Linux",
                      icon: <FaLinux className="text-yellow-300" />,
                    },
                    {
                      name: "RESTful APIs",
                      icon: <SiPostman className="text-orange-400" />,
                    },
                    {
                      name: "Framer Motion",
                      icon: <SiFramer className="text-pink-400" />,
                    },
                    {
                      name: "Anime.js",
                      icon: <FaNimblr className="text-purple-400" />,
                    },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-badge flex items-center gap-2.5 p-3 rounded-xl cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <span className="text-base">{skill.icon}</span>
                      <span className="text-sm font-medium text-gray-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Hobbies */}
              <motion.div
                initial={{opacity: 0, x: 30}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.6, delay: 0.2}}
                viewport={{once: true}}
                className="glow-card p-8 rounded-3xl"
                style={{
                  background: "rgba(17,24,39,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-purple-400 text-xl"
                    style={{
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.2)",
                    }}
                  >
                    <FaHiking />
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{fontFamily: "'Syne', sans-serif"}}
                  >
                    Beyond Code
                  </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Where technology meets passion . I'm fascinated by automotive
                  innovation, motorsport engineering, and the stories
                  documentaries tell.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      img: "/three-throne-productions-sfeUhgGXrCA-unsplash.jpg",
                      label: "Formula One",
                    },
                    {
                      img: "/ryno-marais-5Lg-APfDqpQ-unsplash.jpg",
                      label: "Car Reviews",
                    },
                    {
                      img: "/alex-kalligas-mtIt1iLvVws-unsplash.jpg",
                      label: "Documentaries",
                      wide: true,
                    },
                  ].map(({img, label, wide}) => (
                    <div
                      key={label}
                      className={`relative overflow-hidden rounded-2xl group ${
                        wide ? "col-span-2" : ""
                      }`}
                      style={{height: wide ? 80 : 90}}
                    >
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={img}
                        alt={label}
                      />
                      <div
                        className="absolute inset-0 flex items-end p-3"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        }}
                      >
                        <span className="text-white text-xs font-bold">
                          {label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE SECTION ──────────────────────────── */}
        <section
          id="experience"
          className="py-24 px-6 lg:px-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle
              label="Experience"
              title="Where I've Worked"
              subtitle="A track record of delivering high-quality software across real-world engagements"
            />

            <div className="relative">
              {/* Vertical line */}
              <div
                className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(132,204,22,0.3) 20%, rgba(132,204,22,0.3) 80%, transparent)",
                }}
              />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.company}
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: index * 0.1}}
                    viewport={{once: true}}
                    className={`lg:flex ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center gap-8`}
                  >
                    {/* Card */}
                    <div className="lg:w-[45%]">
                      <Tilt
                        tiltMaxAngleX={4}
                        tiltMaxAngleY={4}
                        glareEnable={true}
                        glareMaxOpacity={0.04}
                        glareColor="#84cc16"
                        glarePosition="all"
                      >
                        <div
                          className="p-8 rounded-3xl relative overflow-hidden"
                          style={{
                            background: "rgba(17,24,39,0.8)",
                            border: `1px solid ${exp.color}25`,
                            backdropFilter: "blur(20px)",
                            boxShadow: `0 0 40px ${exp.color}10`,
                          }}
                        >
                          {/* Accent top line */}
                          <div
                            className="absolute top-0 left-0 right-0 h-0.5"
                            style={{
                              background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                            }}
                          />

                          <div className="flex items-start justify-between mb-4">
                            <div
                              className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg"
                              style={{
                                background: `${exp.color}15`,
                                color: exp.color,
                                border: `1px solid ${exp.color}25`,
                              }}
                            >
                              {exp.icon}
                            </div>
                            <span
                              className="text-xs font-bold tracking-wider px-3 py-1.5 rounded-full"
                              style={{
                                background: `${exp.color}12`,
                                color: exp.color,
                                border: `1px solid ${exp.color}25`,
                              }}
                            >
                              {exp.period}
                            </span>
                          </div>

                          <h3
                            className="text-xl font-black mb-1 text-white"
                            style={{fontFamily: "'Syne', sans-serif"}}
                          >
                            {exp.role}
                          </h3>
                          <p
                            className="text-sm font-semibold mb-3"
                            style={{color: exp.color}}
                          >
                            {exp.company}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed mb-5">
                            {exp.desc}
                          </p>

                          <ul className="space-y-2">
                            {exp.highlights.map((h) => (
                              <li
                                key={h}
                                className="flex items-start gap-2.5 text-sm text-gray-300"
                              >
                                <span
                                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{background: exp.color}}
                                />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Tilt>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex flex-col items-center justify-center w-10 flex-shrink-0">
                      <div
                        className="timeline-dot relative w-4 h-4 rounded-full"
                        style={{background: exp.color}}
                      />
                    </div>

                    <div className="lg:w-[45%]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES SECTION ────────────────────────────── */}
        <section className="py-24 px-6 lg:px-10 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <SectionTitle
              label="Services"
              title="What I Offer"
              subtitle="End-to-end solutions built with precision and passion"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "/palette.svg",
                  title: "UI / UX Design",
                  desc: "Pixel-perfect interfaces that convert . I craft visually stunning designs that balance beauty with usability.",
                  color: "rgba(132,204,22,0.15)",
                  border: "rgba(132,204,22,0.2)",
                  key: "project1",
                },
                {
                  icon: "/laptop-minimal.svg",
                  title: "Web Development",
                  desc: "I hard-code websites according to client specifications, clean, fast, and scalable code every time.",
                  color: "rgba(59,130,246,0.12)",
                  border: "rgba(59,130,246,0.2)",
                  key: "project2",
                },
                {
                  icon: "/chart-column-increasing.svg",
                  title: "Systems Optimization",
                  desc: "I ensure existing systems run flawlessly ; auditing, debugging, and scaling for peak performance.",
                  color: "rgba(139,92,246,0.12)",
                  border: "rgba(139,92,246,0.2)",
                  key: "project3",
                },
              ].map((svc) => (
                <motion.div
                  key={svc.title}
                  initial={{opacity: 0, y: 30}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.5}}
                  viewport={{once: true}}
                  whileHover={{y: -6}}
                  className="p-8 rounded-3xl flex flex-col"
                  style={{
                    background: svc.color,
                    border: `1px solid ${svc.border}`,
                    backdropFilter: "blur(20px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{background: "rgba(0,0,0,0.2)"}}
                  >
                    <img className="w-8 h-8" src={svc.icon} alt={svc.title} />
                  </div>
                  <h3
                    className="text-xl font-black mb-3 text-white"
                    style={{fontFamily: "'Syne', sans-serif"}}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {svc.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS SECTION ────────────────────────────── */}
        <section
          id="projects"
          className="py-24 px-6 lg:px-10 relative overflow-hidden"
          style={{
            background: "#0f172a",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-xs font-bold tracking-[0.3em] text-green-400 uppercase">
                  Portfolio
                </span>
                <h2
                  className="text-4xl lg:text-6xl font-black mt-2 tracking-tight"
                  style={{fontFamily: "'Syne', sans-serif"}}
                >
                  Featured Work
                </h2>
              </div>
              <a
                href="https://github.com/sigma700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{scale: 1.04, y: -2}}
                  whileTap={{scale: 0.96}}
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shimmer-btn"
                  style={{
                    background: "rgba(132,204,22,0.08)",
                    border: "1px solid rgba(132,204,22,0.3)",
                    color: "#84cc16",
                  }}
                >
                  See All on GitHub
                  <LuExternalLink className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{opacity: 0, y: 40}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.5, delay: index * 0.08}}
                  viewport={{once: true}}
                >
                  <Tilt
                    tiltMaxAngleX={6}
                    tiltMaxAngleY={6}
                    glareEnable={true}
                    glareMaxOpacity={0.06}
                    glareColor="white"
                    glarePosition="all"
                    style={{height: "100%"}}
                  >
                    <div
                      className="rounded-3xl overflow-hidden h-full flex flex-col"
                      style={{
                        background: "rgba(17,24,39,0.8)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        backdropFilter: "blur(20px)",
                        transition: "box-shadow 0.3s ease",
                      }}
                    >
                      <div
                        className="relative overflow-hidden"
                        style={{height: 200}}
                      >
                        <motion.img
                          whileHover={{scale: 1.07}}
                          transition={{duration: 0.4}}
                          className="w-full h-full object-cover"
                          src={project.image}
                          alt={project.title}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(17,24,39,0.8) 0%, transparent 60%)",
                          }}
                        />
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3
                          className="text-lg font-black mb-1 text-white"
                          style={{fontFamily: "'Syne', sans-serif"}}
                        >
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-5 flex-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-medium rounded-lg"
                              style={{
                                background: "rgba(132,204,22,0.08)",
                                border: "1px solid rgba(132,204,22,0.15)",
                                color: "#86efac",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{x: 4}}
                          className="group flex items-center justify-between w-full py-3 px-4 rounded-xl text-sm font-semibold"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#d1d5db",
                          }}
                        >
                          View Live Project
                          <LuArrowRight className="group-hover:translate-x-1 transition-transform text-green-400" />
                        </motion.a>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOWNLOAD SECTION ────────────────────────────── */}
        <section className="py-24 px-6 lg:px-10 bg-gray-900 relative overflow-hidden">
          <div
            className="hero-orb"
            style={{
              width: 500,
              height: 500,
              background: "rgba(132,204,22,0.06)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <SectionTitle
              label="Documents"
              title="Download My Files"
              subtitle="Get a copy of my CV up to date"
            />

            <div className="flex justify-center">
              {/* CV Download */}
              <motion.a
                href="/ALLAN_KIRIMI.pdf"
                download="Allan_Muriiithi_CV.pdf"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                viewport={{once: true}}
                whileHover={{y: -6, scale: 1.01}}
                whileTap={{scale: 0.98}}
                className="group block p-8 rounded-3xl text-left shimmer-btn cursor-pointer w-full max-w-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(132,204,22,0.1), rgba(34,197,94,0.06))",
                  border: "1px solid rgba(132,204,22,0.25)",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 0 transparent",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(132,204,22,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 0 0 transparent")
                }
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform"
                  style={{
                    background: "rgba(132,204,22,0.15)",
                    border: "1px solid rgba(132,204,22,0.25)",
                    color: "#84cc16",
                  }}
                >
                  <LuDownload />
                </div>
                <h3
                  className="text-xl font-black text-white mb-2"
                  style={{fontFamily: "'Syne', sans-serif"}}
                >
                  Curriculum Vitae
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  My full professional resume — experience, skills, education,
                  and accomplishments.
                </p>
                <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                  <LuDownload className="text-base" />
                  Download PDF
                </div>
              </motion.a>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────── */}
        <section
          id="testimonials"
          className="py-24 px-6 lg:px-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(132,204,22,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle
              label="Testimonials"
              title="Clients Who Trust Me"
              subtitle="Real words from real people I've had the privilege of building for"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Mercy Mwenda",
                  role: "CEO, Macista Limited",
                  image: "/pexels-andrea-piacquadio-774909.jpg",
                  quote:
                    "We had agreed that the project would take at least four weeks but surprisingly by the end of the fourth week he had already sent me the application for review. Highly recommend working with him.",
                  rating: 5,
                },
                {
                  name: "Kevin Mwangi",
                  role: "Founder, Kentech Solutions",
                  image: "/kevin.png",
                  quote:
                    "Think about someone who does what he says — Allan is your guy. We worked with him on PROTIBA and I was shocked with the kind of seriousness he put in the work. Definitely someone to invest in.",
                  rating: 5,
                },
                {
                  name: "Amanda Reed",
                  role: "Manager, BrewHaven USA",
                  image: "/Screenshot 2025-10-24 165044.png",
                  quote:
                    "Needed a simple e-commerce application for my coffee shop and he delivered just as I had imagined it. A big thank you.",
                  rating: 5,
                },
              ].map((client, index) => (
                <motion.div
                  key={client.name}
                  initial={{opacity: 0, y: 40}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.5, delay: index * 0.1}}
                  viewport={{once: true}}
                  whileHover={{y: -5}}
                >
                  <Tilt
                    tiltMaxAngleX={4}
                    tiltMaxAngleY={4}
                    glareEnable={true}
                    glareMaxOpacity={0.04}
                  >
                    <div
                      className="p-8 rounded-3xl h-full flex flex-col"
                      style={{
                        background: "rgba(17,24,39,0.7)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                      }}
                    >
                      {/* Stars */}
                      <div className="flex gap-1 mb-5">
                        {Array.from({length: client.rating}).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">
                            ★
                          </span>
                        ))}
                      </div>

                      {/* Quote */}
                      <div
                        className="text-4xl font-black text-green-400/20 leading-none mb-2"
                        style={{fontFamily: "Georgia, serif"}}
                      >
                        "
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed flex-1 -mt-4">
                        {client.quote}
                      </p>

                      <div
                        className="flex items-center gap-4 mt-6 pt-6"
                        style={{borderTop: "1px solid rgba(255,255,255,0.06)"}}
                      >
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-12 h-12 rounded-full object-cover"
                          style={{border: "2px solid rgba(132,204,22,0.3)"}}
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {client.name}
                          </h4>
                          <p className="text-green-400 text-xs">
                            {client.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ─────────────────────────────────── */}
        <section
          id="contact"
          className="py-24 px-6 lg:px-10 bg-gray-900 relative overflow-hidden"
        >
          <div
            className="hero-orb"
            style={{
              width: 600,
              height: 400,
              background: "rgba(132,204,22,0.06)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6}}
              viewport={{once: true}}
            >
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-green-400 uppercase mb-4 px-4 py-2 border border-green-400/30 rounded-full">
                Let's Connect
              </span>
              <h3
                className="text-4xl lg:text-6xl font-black mb-6 tracking-tight"
                style={{fontFamily: "'Syne', sans-serif"}}
              >
                Let's Build Something{" "}
                <span className="gradient-text">Extraordinary</span>
              </h3>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Streamline your business with beautifully crafted,
                high-performance software. Let's turn your vision into reality.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="https://wa.me/792624342?text=Hello%20I'm%20interested%20in%20your%20services"
                  target="_blank"
                  whileHover={{scale: 1.04, y: -3}}
                  whileTap={{scale: 0.97}}
                  className="group px-10 py-4 font-bold text-gray-900 rounded-2xl shimmer-btn"
                  style={{
                    background: "linear-gradient(135deg, #84cc16, #22c55e)",
                    boxShadow: "0 0 40px rgba(132,204,22,0.4)",
                  }}
                >
                  WhatsApp Me
                  <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">
                    →
                  </span>
                </motion.a>

                <motion.a
                  href="tel:+254792624342"
                  whileHover={{scale: 1.04, y: -3}}
                  whileTap={{scale: 0.97}}
                  className="px-10 py-4 font-bold border border-gray-600 text-gray-300 rounded-2xl hover:border-green-400/50 hover:text-white transition-all duration-300"
                >
                  Call Me
                </motion.a>
              </div>

              <motion.p
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{delay: 0.3, duration: 0.5}}
                viewport={{once: true}}
                className="mt-8 text-gray-500 text-sm"
              >
                <a
                  href="tel:+254792624342"
                  className="hover:text-green-400 transition-colors"
                >
                  (+254) 792 624 342
                </a>{" "}
                ||
                <a
                  href="mailto:allankirimi65@gmail.com"
                  className="hover:text-green-400 transition-colors"
                >
                  allankirimi65@gmail.com
                </a>
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer
          className="py-12 px-6 lg:px-10"
          style={{
            background: "#0a0f1a",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center gap-6">
              <div
                className="text-center"
                style={{fontFamily: "'Syne', sans-serif"}}
              >
                <span className="text-2xl font-black">
                  ALLAN<span className="text-green-400">.</span>DEV
                </span>
              </div>

              <p className="text-gray-500 text-sm text-center">
                Follow me across all platforms
              </p>

              {/* Added w-full to prevent flex shrinking */}
              <div className="w-full">
                <Links />
              </div>

              <div
                className="w-16 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(132,204,22,0.4), transparent)",
                }}
              />

              <p className="text-gray-600 text-xs text-center">
                Crafted with precision by Allan Muriiithi{" "}
                <span className="text-green-400/70">© 2025</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
