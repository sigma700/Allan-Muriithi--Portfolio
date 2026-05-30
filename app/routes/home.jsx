import {useState, useEffect, useRef} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import {SiExpress, SiFramer, SiMongodb, SiPostman} from "react-icons/si";
import {
  LuGraduationCap,
  LuBriefcase,
  LuDownload,
  LuExternalLink,
  LuArrowRight,
  LuArrowUpRight,
  LuStar,
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

/* ─── MAGNETIC BUTTON ─────────────────────────────────────── */
function MagneticButton({
  children,
  className,
  style,
  href,
  target,
  download,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onMouseLeave && onMouseLeave();
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      download={download}
      onClick={onClick}
      style={{...style, x, y}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      className={className}
      transition={{type: "spring", stiffness: 350, damping: 25}}
    >
      {children}
    </Tag>
  );
}

/* ─── GRAIN OVERLAY ───────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.028,
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
  const trailRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const posRef = useRef({x: 0, y: 0});
  const currentPos = useRef({x: 0, y: 0});

  useEffect(() => {
    const move = (e) => {
      posRef.current = {x: e.clientX, y: e.clientY};
    };
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    let raf;
    const animate = () => {
      currentPos.current.x += (posRef.current.x - currentPos.current.x) * 0.14;
      currentPos.current.y += (posRef.current.y - currentPos.current.y) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${
          posRef.current.x - 4
        }px, ${posRef.current.y - 4}px)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${
          currentPos.current.x - 20
        }px, ${currentPos.current.y - 20}px) scale(${hovered ? 1.7 : 1})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, [hovered]);

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
          border: "1.5px solid rgba(132,204,22,0.55)",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          transition: "transform 0.1s ease, opacity 0.2s",
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
          boxShadow: "0 0 12px rgba(132,204,22,0.8)",
        }}
      />
    </>
  );
}

/* ─── SCROLL PROGRESS ─────────────────────────────────────── */
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
        background: "linear-gradient(90deg, #84cc16, #22c55e, #84cc16)",
        transformOrigin: "0%",
        zIndex: 99998,
      }}
    />
  );
}

/* ─── SECTION TITLE ───────────────────────────────────────── */
function SectionTitle({label, title, subtitle}) {
  const {ref, inView} = useInView({triggerOnce: true, threshold: 0.3});
  const words = title.split(" ");
  return (
    <div ref={ref} className="text-center mb-20">
      <motion.span
        initial={{opacity: 0, scale: 0.8}}
        animate={inView ? {opacity: 1, scale: 1} : {}}
        transition={{duration: 0.4}}
        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-green-400 uppercase mb-5 px-5 py-2.5 border border-green-400/25 rounded-full"
        style={{
          background: "rgba(132,204,22,0.05)",
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#84cc16",
            boxShadow: "0 0 8px #84cc16",
          }}
        />
        {label}
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#84cc16",
            boxShadow: "0 0 8px #84cc16",
          }}
        />
      </motion.span>
      <h2
        className="text-4xl lg:text-6xl font-black mb-5 tracking-tight overflow-hidden"
        style={{fontFamily: "'Syne', sans-serif"}}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{opacity: 0, y: 60}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{
              duration: 0.65,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </h2>
      {subtitle && (
        <motion.p
          initial={{opacity: 0, y: 10}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.5, delay: 0.35}}
          className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ─── STAT CARD ───────────────────────────────────────────── */
function StatCard({number, suffix, label, delay, icon}) {
  const {ref, inView} = useInView({triggerOnce: true, threshold: 0.5});
  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 30, scale: 0.95}}
      animate={inView ? {opacity: 1, y: 0, scale: 1} : {}}
      transition={{duration: 0.6, delay}}
      whileHover={{y: -6, scale: 1.03}}
      className="relative text-center p-8 rounded-3xl overflow-hidden cursor-default group"
      style={{
        background: "rgba(17,24,39,0.6)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(132,204,22,0.08), transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, #84cc16, transparent)",
        }}
      />
      <div
        className="text-4xl lg:text-5xl font-black mb-2 relative"
        style={{
          fontFamily: "'Syne', sans-serif",
          background: "linear-gradient(135deg, #bef264, #22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {inView ? <CountUp end={number} duration={2.5} suffix={suffix} /> : "0"}
      </div>
      <p className="text-gray-400 text-xs font-semibold tracking-[0.18em] uppercase">
        {label}
      </p>
    </motion.div>
  );
}

/* ─── EXPERIENCE CARD ─────────────────────────────────────── */
function ExpCard({exp, index}) {
  const {ref, inView} = useInView({triggerOnce: true, threshold: 0.15});
  const isEven = index % 2 === 0;
  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, x: isEven ? -50 : 50}}
      animate={inView ? {opacity: 1, x: 0} : {}}
      transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1]}}
      className={`lg:flex ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center gap-8`}
    >
      <div className="lg:w-[45%]">
        <motion.div
          whileHover={{y: -5}}
          transition={{type: "spring", stiffness: 300}}
          className="relative p-8 rounded-3xl overflow-hidden group"
          style={{
            background: "rgba(17,24,39,0.85)",
            border: `1px solid ${exp.color}20`,
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Glow bg */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${exp.color}10, transparent 65%)`,
            }}
          />
          {/* Top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: `linear-gradient(90deg, ${exp.color}, ${exp.color}00)`,
            }}
          />
          {/* Corner decoration */}
          <div
            className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-5"
            style={{background: exp.color, filter: "blur(20px)"}}
          />

          <div className="flex items-start justify-between mb-5 relative z-10">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg"
              style={{
                background: `${exp.color}12`,
                color: exp.color,
                border: `1px solid ${exp.color}22`,
              }}
            >
              {exp.icon}
            </div>
            <span
              className="text-xs font-bold tracking-wider px-3 py-1.5 rounded-full"
              style={{
                background: `${exp.color}10`,
                color: exp.color,
                border: `1px solid ${exp.color}20`,
              }}
            >
              {exp.period}
            </span>
          </div>

          <h3
            className="text-xl font-black mb-1 text-white relative z-10"
            style={{fontFamily: "'Syne', sans-serif"}}
          >
            {exp.role}
          </h3>
          <p
            className="text-sm font-bold mb-3 relative z-10"
            style={{color: exp.color}}
          >
            {exp.company}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-5 relative z-10">
            {exp.desc}
          </p>

          <ul className="space-y-2.5 relative z-10">
            {exp.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-sm text-gray-300"
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 6px ${exp.color}`,
                  }}
                />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="hidden lg:flex flex-col items-center w-10 flex-shrink-0">
        <motion.div
          initial={{scale: 0}}
          animate={inView ? {scale: 1} : {}}
          transition={{delay: 0.3, type: "spring"}}
          className="relative w-5 h-5 rounded-full"
          style={{background: exp.color, boxShadow: `0 0 20px ${exp.color}70`}}
        >
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{background: exp.color, opacity: 0.3}}
          />
        </motion.div>
      </div>
      <div className="lg:w-[45%]" />
    </motion.div>
  );
}

/* ─── PROJECT CARD ────────────────────────────────────────── */
function ProjectCard({project, index}) {
  const {ref, inView} = useInView({triggerOnce: true, threshold: 0.1});
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 50}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        whileHover={{y: -8}}
        transition={{type: "spring", stiffness: 300, damping: 20}}
        className="group rounded-3xl overflow-hidden h-full flex flex-col relative cursor-pointer"
        style={{
          background: "rgba(17,24,39,0.9)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
          boxShadow: hovering
            ? "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(132,204,22,0.08)"
            : "0 8px 30px rgba(0,0,0,0.3)",
          transition: "box-shadow 0.4s ease",
          textDecoration: "none",
        }}
      >
        {/* Image area - no separate anchor */}
        <div className="relative overflow-hidden" style={{height: 210}}>
          <motion.img
            animate={{scale: hovering ? 1.08 : 1}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className="w-full h-full object-cover"
            src={project.image}
            alt={project.title}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.2) 60%, transparent 100%)",
            }}
          />
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{opacity: 0}}
            animate={{opacity: hovering ? 1 : 0}}
            transition={{duration: 0.3}}
            style={{background: "rgba(132,204,22,0.05)"}}
          >
            <div
              className="w-14 h-14 rounded-full border-2 border-green-400/70 flex items-center justify-center backdrop-blur-sm"
              style={{background: "rgba(0,0,0,0.4)"}}
            >
              <LuArrowUpRight className="text-green-400 text-xl" />
            </div>
          </motion.div>
          {/* Tags strip at bottom of image */}
          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5">
            {project.tags
              .filter((t) => t)
              .slice(0, 3)
              .map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-semibold rounded-md"
                  style={{
                    background: "rgba(0,0,0,0.65)",
                    color: "#86efac",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(132,204,22,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            {project.tags.filter((t) => t).length > 3 && (
              <span
                className="px-2 py-0.5 text-xs font-semibold rounded-md"
                style={{
                  background: "rgba(0,0,0,0.65)",
                  color: "#9ca3af",
                  backdropFilter: "blur(8px)",
                }}
              >
                +{project.tags.filter((t) => t).length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3
            className="text-lg font-black mb-1.5 text-white tracking-tight"
            style={{fontFamily: "'Syne', sans-serif"}}
          >
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
            {project.desc}
          </p>

          {/* Button now a span (or motion.div) for visual only */}
          <div
            className="group/btn flex items-center justify-between w-full py-3 px-5 rounded-2xl text-sm font-bold"
            style={{
              background: "rgba(132,204,22,0.07)",
              border: "1px solid rgba(132,204,22,0.18)",
              color: "#d1d5db",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(132,204,22,0.12)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(132,204,22,0.07)";
              e.currentTarget.style.color = "#d1d5db";
            }}
          >
            View Live Project
            <LuArrowRight className="text-green-400 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const heroRef = useRef(null);
  const {scrollYProgress: heroScroll} = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

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
      tags: [
        "REACT",
        "Javascript",
        "NodeJs",
        "TAILWIND CSS",
        "Framer-motion",
        "Postman",
      ],
      link: "https://protiba.onrender.com/",
      desc: "AI-powered school timetable generator SaaS",
    },
    {
      title: "BrewHaven",
      image: "public/brew_haven.png",
      tags: ["ReactJs", "TAILWIND CSS", "Framer-motion", "AWS", "Squoosh"],
      link: "https://brewhaven-qea1.onrender.com/",
      desc: "Coffee e-commerce platform with payment integration",
    },
    {
      title: "EduFind",
      image: "public/edu_find.png",
      tags: ["REACT", "TAILWIND CSS", "Framer-motion", "NodeJs", "ExpressJs"],
      link: "https://edufind-ryn2.onrender.com/",
      desc: "Educational institution discovery platform",
    },
    {
      title: "MACISTA LIMITED",
      image: "/macista.png",
      tags: ["REACT", "Javascript", "EXPRESS Js"],
      link: "https://www.macista.co.ke/",
      desc: "Full corporate website for a Kenyan enterprise",
    },

    {
      title: "Mindful Living KE",
      image: "/mindfulLiving.png",
      tags: [
        "REACT",
        "TAILWINDCSS",
        "FRAMER-MOTION",
        "NODE JS WITH EXPRESS",
        "PAYSTACK",
      ],
      link: "https://mindfullivingke.onrender.com",
      desc: "A full stack e-commerce website for bf suma product distribution",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0f1a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#84cc16, #22c55e); border-radius: 3px; }

        .gradient-text {
          background: linear-gradient(135deg, #bef264 0%, #22c55e 60%, #84cc16 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .shimmer-btn { position: relative; overflow: hidden; }
        .shimmer-btn::after {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background:linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent);
          transform:skewX(-20deg); transition:left 0.55s ease;
        }
        .shimmer-btn:hover::after { left: 150%; }

        /* Animated border gradient */
        .border-glow {
          position: relative;
        }
        .border-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(132,204,22,0.4), transparent 50%, rgba(132,204,22,0.15));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 0;
        }
        .border-glow:hover::before { opacity: 1; }

        /* Hero orb */
        .hero-orb {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
        }

        /* Dot grid */
        .dot-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        /* Hex grid pattern */
        .hex-grid {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
        }

        /* Nav link */
        .nav-link {
          position: relative; color: #9ca3af; font-size: 0.875rem; font-weight: 500;
          text-decoration: none; transition: color 0.3s; text-transform: capitalize;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1.5px;
          background: linear-gradient(90deg, #84cc16, #22c55e);
          transition: width 0.3s ease; border-radius: 1px;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }

        /* Skill badge */
        .skill-badge {
          transition: all 0.25s ease; cursor: default;
        }
        .skill-badge:hover {
          background: rgba(132,204,22,0.1) !important;
          border-color: rgba(132,204,22,0.45) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(132,204,22,0.1);
        }

        /* Timeline line */
        .timeline-line {
          background: linear-gradient(to bottom,
            transparent,
            rgba(132,204,22,0.25) 15%,
            rgba(132,204,22,0.25) 85%,
            transparent
          );
        }

        /* Testimonial card quote */
        .quote-mark { font-family: Georgia, serif; line-height: 1; }

        /* Service card hover */
        .service-card { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .service-card:hover { transform: translateY(-10px) scale(1.02); }

        /* Animate floating */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes spin { from {transform:rotate(0deg)} to {transform:rotate(360deg)} }
        @keyframes spinR { from {transform:rotate(360deg)} to {transform:rotate(0deg)} }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .float-badge { animation: float 3.5s ease-in-out infinite; }
        .float-badge-slow { animation: floatSlow 5s ease-in-out infinite; }

        /* Section divider */
        .section-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
        }

        /* Mobile */
        @media (max-width: 768px) { .custom-cursor-wrap { display: none; } }

        /* CTA glow pulse */
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(132,204,22,0.35), 0 0 80px rgba(132,204,22,0.1); }
          50% { box-shadow: 0 0 60px rgba(132,204,22,0.55), 0 0 120px rgba(132,204,22,0.2); }
        }
        .cta-glow { animation: glow-pulse 3s ease-in-out infinite; }
      `}</style>

      <GrainOverlay />
      <ScrollProgress />
      <div className="custom-cursor-wrap">
        <CustomCursor />
      </div>

      <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        {/* ══ NAVIGATION ══════════════════════════════════ */}
        <nav className="fixed w-full z-50 py-4 px-6 lg:px-10">
          <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1]}}
            className="max-w-7xl mx-auto flex justify-between items-center rounded-2xl px-6 py-3"
            style={{
              background: "rgba(10,15,26,0.75)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{
                    background: "rgba(132,204,22,0.5)",
                    animationDuration: "3s",
                  }}
                />
                <img
                  className="relative w-10 h-10 rounded-full object-cover"
                  style={{
                    border: "2px solid rgba(132,204,22,0.4)",
                    boxShadow: "0 0 20px rgba(132,204,22,0.2)",
                  }}
                  src="/Gemini_Generated_Image_g495wxg495wxg495-Photoroom.png"
                  alt="Logo"
                />
              </div>
              <span
                className="hidden sm:block text-sm font-black tracking-widest text-gray-200"
                style={{fontFamily: "'Syne', sans-serif"}}
              >
                ALLAN
                <span
                  className="text-green-400"
                  style={{textShadow: "0 0 10px rgba(132,204,22,0.6)"}}
                >
                  .
                </span>
                DEV
              </span>
            </div>

            <ul className="hidden lg:flex gap-10 text-sm">
              {[
                "about",
                "experience",
                "projects",
                "testimonials",
                "contact",
              ].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="nav-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <MagneticButton
              href="#contact"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm font-bold border border-green-500/50 text-green-400 rounded-xl shimmer-btn"
              style={{
                background: "rgba(132,204,22,0.07)",
                transition: "all 0.3s ease",
              }}
            >
              Hire Me <LuArrowUpRight className="text-xs" />
            </MagneticButton>

            <motion.button
              whileTap={{scale: 0.93}}
              onClick={() => setNavOpen(!navOpen)}
              className="lg:hidden p-2.5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <img
                className="w-5 h-5"
                src="/align-justify (1).svg"
                alt="Menu"
              />
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {navOpen && (
              <motion.div
                initial={{opacity: 0, y: -12, scale: 0.96}}
                animate={{opacity: 1, y: 0, scale: 1}}
                exit={{opacity: 0, y: -12, scale: 0.96}}
                transition={{duration: 0.22}}
                className="lg:hidden mt-3 mx-auto max-w-7xl rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(10,15,26,0.92)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(24px)",
                }}
              >
                <ul className="py-3 px-4">
                  {["home", "about", "experience", "projects", "contact"].map(
                    (item, i) => (
                      <motion.li
                        key={item}
                        initial={{opacity: 0, x: -16}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: i * 0.04}}
                      >
                        <a
                          href={`#${item}`}
                          onClick={() => setNavOpen(false)}
                          className="flex items-center gap-3 py-3 px-4 text-gray-300 hover:text-white capitalize rounded-xl hover:bg-white/5 transition-all text-sm font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
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

        {/* ══ HERO ════════════════════════════════════════ */}
        <section
          id="home"
          ref={heroRef}
          className="relative min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-10 overflow-hidden"
          style={{background: "#0a0f1a"}}
        >
          {/* Background layers */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% -10%, rgba(132,204,22,0.09) 0%, transparent 65%)",
            }}
          />
          <div className="dot-grid" />

          {/* Animated orbs */}
          <motion.div
            style={{y: heroY}}
            className="hero-orb"
            animate={{scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5]}}
            transition={{duration: 7, repeat: Infinity}}
            styleProps={{
              width: 600,
              height: 600,
              background: "rgba(132,204,22,0.07)",
              top: "5%",
              right: "-15%",
            }}
          />
          <div
            className="hero-orb"
            style={{
              width: 350,
              height: 350,
              background: "rgba(34,197,94,0.05)",
              bottom: "5%",
              left: "-8%",
              animation: "floatSlow 8s ease-in-out infinite",
            }}
          />
          <div
            className="hero-orb"
            style={{
              width: 200,
              height: 200,
              background: "rgba(132,204,22,0.04)",
              top: "40%",
              left: "30%",
              animation: "float 6s ease-in-out infinite 1s",
            }}
          />

          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(132,204,22,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(132,204,22,0.025) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <motion.div
            style={{y: heroY, opacity: heroOpacity}}
            className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-20 relative z-10"
          >
            {/* Avatar column */}
            <motion.div
              initial={{opacity: 0, scale: 0.75, rotate: -6}}
              animate={{opacity: 1, scale: 1, rotate: 0}}
              transition={{duration: 1, ease: [0.34, 1.56, 0.64, 1]}}
              className="relative flex-shrink-0"
            >
              {/* Outer spinning ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -12,
                  borderRadius: "50%",
                  background:
                    "conic-gradient(from 0deg, #84cc16 0%, #22c55e 30%, transparent 50%, transparent 70%, #84cc16 100%)",
                  animation: "spin 10s linear infinite",
                  filter: "blur(1px)",
                  opacity: 0.5,
                }}
              />
              {/* Inner counter-spin */}
              <div
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: "50%",
                  background:
                    "conic-gradient(from 180deg, rgba(132,204,22,0.3) 0%, transparent 40%, rgba(34,197,94,0.2) 70%, transparent 100%)",
                  animation: "spinR 14s linear infinite",
                }}
              />

              {/* Avatar image */}
              <div
                className="relative"
                style={{
                  width: 288,
                  height: 288,
                  borderRadius: "50%",
                  boxShadow:
                    "0 0 0 3px #0a0f1a, 0 0 80px rgba(132,204,22,0.3), 0 0 160px rgba(132,204,22,0.1)",
                }}
              >
                <img
                  className="w-full h-full rounded-full object-cover"
                  style={{border: "3px solid rgba(132,204,22,0.2)"}}
                  src="/Gemini_Generated_Image_iphrc7iphrc7iphr.png"
                  alt="Allan"
                />
                {/* Inner glow overlay */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{boxShadow: "inset 0 0 40px rgba(132,204,22,0.08)"}}
                />
              </div>

              {/* Floating badge — available */}
              <motion.div
                className="float-badge absolute -right-8 top-6 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold"
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.8}}
                style={{
                  background: "rgba(132,204,22,0.1)",
                  border: "1px solid rgba(132,204,22,0.3)",
                  backdropFilter: "blur(16px)",
                  color: "#84cc16",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#84cc16",
                    boxShadow: "0 0 8px #84cc16",
                    animation: "pulse-ring 2s ease-out infinite",
                  }}
                  className="relative flex-shrink-0"
                />
                Available for work
              </motion.div>

              {/* Floating badge — location */}
              <motion.div
                className="float-badge-slow absolute -left-6 bottom-8 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold"
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 1}}
                style={{
                  background: "rgba(10,15,26,0.85)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(16px)",
                  color: "#d1d5db",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                }}
              >
                <span style={{fontSize: "1rem"}}></span>
                Nairobi, Kenya
              </motion.div>

              {/* Floating stat — projects */}
              <motion.div
                className="float-badge absolute -bottom-4 right-2 flex flex-col items-center px-4 py-2.5 rounded-2xl"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 1.2}}
                style={{
                  background: "rgba(17,24,39,0.9)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                }}
              >
                <span
                  className="text-xl font-black"
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    background: "linear-gradient(135deg, #bef264, #22c55e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  10+
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Projects
                </span>
              </motion.div>
            </motion.div>

            {/* Text column */}
            <motion.div
              initial={{opacity: 0, x: 40}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
              className="text-center lg:text-left max-w-2xl"
            >
              <motion.p
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.35}}
                className="inline-flex items-center gap-2 text-green-400 text-xs font-bold tracking-[0.28em] uppercase mb-5 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(132,204,22,0.06)",
                  border: "1px solid rgba(132,204,22,0.2)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#84cc16",
                    boxShadow: "0 0 10px #84cc16",
                  }}
                />
                Welcome to my portfolio
              </motion.p>

              <h1
                className="text-5xl lg:text-7xl font-black mb-4 tracking-tight leading-[1.02]"
                style={{fontFamily: "'Syne', sans-serif"}}
              >
                {"I'm ".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{opacity: 0, y: 40}}
                    animate={{opacity: 1, y: 0}}
                    transition={{
                      delay: 0.5 + i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  initial={{opacity: 0, y: 40}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.65, ease: [0.22, 1, 0.36, 1]}}
                  className="gradient-text"
                >
                  Allan
                </motion.span>
              </h1>

              <div
                className="text-2xl lg:text-3xl font-bold text-gray-300 mb-6 min-h-[2.5rem]"
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
                  speed={52}
                  repeat={Infinity}
                />
              </div>

              <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.9}}
                className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl"
              >
                I design and build stunning, high-performance web applications —
                transforming wireframes into clean, logical, and beautiful code
                that drives real business outcomes.
              </motion.p>

              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 1.1}}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <MagneticButton
                  href="https://wa.me/792624342?text=Hello%20I'm%20interested%20in%20your%20services"
                  target="_blank"
                  className="group flex items-center gap-2 px-8 py-4 font-bold text-gray-900 rounded-2xl shimmer-btn cta-glow"
                  style={{
                    background:
                      "linear-gradient(135deg, #84cc16 0%, #22c55e 100%)",
                  }}
                >
                  Let's Chat
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </MagneticButton>

                <MagneticButton
                  href="#projects"
                  className="flex items-center gap-2 px-8 py-4 font-bold rounded-2xl"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#d1d5db",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  View Work
                  <LuArrowRight className="text-green-400 text-sm" />
                </MagneticButton>
              </motion.div>

              {/* Social proof strip */}
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1.4}}
                className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
              >
                <div className="flex -space-x-2">
                  {[
                    "/pexels-andrea-piacquadio-774909.jpg",
                    "/kevin.png",
                    "/Screenshot 2025-10-24 165044.png",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                      style={{border: "2px solid #0a0f1a", zIndex: 3 - i}}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} className="text-yellow-400 text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs">5+ happy clients</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 1.8}}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-gray-600 text-xs tracking-[0.25em] uppercase">
              Scroll
            </span>
            <motion.div
              animate={{y: [0, 10, 0]}}
              transition={{duration: 1.6, repeat: Infinity}}
              style={{
                width: 1,
                height: 48,
                background: "linear-gradient(to bottom, #84cc16, transparent)",
              }}
            />
          </motion.div>
        </section>

        {/* ══ STATS STRIP ════════════════════════════════ */}
        <section
          className="py-16 px-6 lg:px-10 relative"
          style={{
            background: "#060d1b",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Accent line top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(132,204,22,0.2), transparent)",
            }}
          />
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              number={10}
              suffix="+"
              label="Projects Shipped"
              delay={0}
            />
            <StatCard
              number={5}
              suffix="+"
              label="Happy Clients"
              delay={0.08}
            />
            <StatCard number={1} suffix="yr" label="Experience" delay={0.16} />
            <StatCard
              number={100}
              suffix="+"
              label="Tasks Completed"
              delay={0.24}
            />
          </div>
        </section>

        {/* ══ ABOUT ═══════════════════════════════════════ */}
        <section
          id="about"
          className="py-24 px-6 lg:px-10 bg-gray-900 relative overflow-hidden"
        >
          <div
            className="hero-orb"
            style={{
              width: 500,
              height: 500,
              background: "rgba(132,204,22,0.04)",
              top: "50%",
              left: "65%",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div className="dot-grid" style={{opacity: 0.5}} />

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle
              label="About Me"
              title="The Developer Behind the Code"
              subtitle="Passionate engineer combining mechanical engineering knowledge with modern web mastery to build solutions that matter"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Education */}
              <motion.div
                initial={{opacity: 0, x: -40}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1]}}
                viewport={{once: true}}
                className="group p-8 rounded-3xl border-glow relative overflow-hidden"
                style={{
                  background: "rgba(13,19,33,0.7)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(132,204,22,0.06), transparent)",
                    filter: "blur(20px)",
                  }}
                />
                <div className="flex items-center gap-4 mb-8 relative z-10">
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
                    className="text-xl font-black"
                    style={{fontFamily: "'Syne',sans-serif"}}
                  >
                    Education
                  </h3>
                </div>
                <div className="space-y-6 relative z-10">
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
                    <motion.div
                      key={title}
                      whileHover={{x: 4}}
                      transition={{type: "spring", stiffness: 400}}
                      className="pl-5 cursor-default"
                      style={{borderLeft: `2px solid ${color}`}}
                    >
                      <div
                        className="w-2 h-2 rounded-full -ml-[1.3rem] mb-1"
                        style={{
                          background: color,
                          boxShadow: `0 0 8px ${color}`,
                        }}
                      />
                      <h4 className="font-bold text-sm" style={{color}}>
                        {title}
                      </h4>
                      <p className="text-gray-300 text-sm mt-0.5">{sub}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{detail}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Skills — bento grid */}
              <motion.div
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{once: true}}
                className="group p-8 rounded-3xl border-glow relative overflow-hidden"
                style={{
                  background: "rgba(13,19,33,0.7)",
                  border: "1px solid rgba(255,255,255,0.07)",
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
                    className="text-xl font-black"
                    style={{fontFamily: "'Syne',sans-serif"}}
                  >
                    Tech Stack
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
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
                      className="skill-badge flex items-center gap-2.5 p-3 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <span className="text-base flex-shrink-0">
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-300 truncate">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Beyond Code */}
              <motion.div
                initial={{opacity: 0, x: 40}}
                whileInView={{opacity: 1, x: 0}}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{once: true}}
                className="group p-8 rounded-3xl border-glow relative overflow-hidden"
                style={{
                  background: "rgba(13,19,33,0.7)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="flex items-center gap-4 mb-6">
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
                    className="text-xl font-black"
                    style={{fontFamily: "'Syne',sans-serif"}}
                  >
                    Beyond Code
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Where technology meets passion. I'm fascinated by automotive
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
                      className={`relative overflow-hidden rounded-2xl group/img ${
                        wide ? "col-span-2" : ""
                      }`}
                      style={{height: wide ? 75 : 88}}
                    >
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                        src={img}
                        alt={label}
                      />
                      <div
                        className="absolute inset-0 flex items-end p-2.5"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
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

        {/* ══ EXPERIENCE ══════════════════════════════════ */}
        <section
          id="experience"
          className="py-24 px-6 lg:px-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #060d1b 0%, #0a0f1a 100%)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="dot-grid" style={{opacity: 0.4}} />
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle
              label="Experience"
              title="Where I've Worked"
              subtitle="A track record of delivering high-quality software across real-world engagements"
            />
            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px timeline-line" />
              <div className="space-y-14">
                {experiences.map((exp, i) => (
                  <ExpCard key={exp.company} exp={exp} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ════════════════════════════════════ */}
        <section className="py-24 px-6 lg:px-10 bg-gray-900 relative overflow-hidden">
          <div
            className="hero-orb"
            style={{
              width: 600,
              height: 300,
              background: "rgba(132,204,22,0.04)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div className="max-w-7xl mx-auto relative z-10">
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
                  number: "01",
                  desc: "Pixel-perfect interfaces that convert. I craft visually stunning designs that balance beauty with usability.",
                  color: "rgba(132,204,22,0.1)",
                  border: "rgba(132,204,22,0.2)",
                  accent: "#84cc16",
                },
                {
                  icon: "/laptop-minimal.svg",
                  title: "Web Development",
                  number: "02",
                  desc: "I hard-code websites according to client specifications, clean, fast, and scalable code every time.",
                  color: "rgba(59,130,246,0.08)",
                  border: "rgba(59,130,246,0.2)",
                  accent: "#3b82f6",
                },
                {
                  icon: "/chart-column-increasing.svg",
                  title: "Systems Optimization",
                  number: "03",
                  desc: "I ensure existing systems run flawlessly; auditing, debugging, and scaling for peak performance.",
                  color: "rgba(139,92,246,0.08)",
                  border: "rgba(139,92,246,0.2)",
                  accent: "#8b5cf6",
                },
              ].map((svc, i) => (
                <motion.div
                  key={svc.title}
                  initial={{opacity: 0, y: 40}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{once: true}}
                  className="service-card group p-8 rounded-3xl flex flex-col relative overflow-hidden cursor-default"
                  style={{
                    background: svc.color,
                    border: `1px solid ${svc.border}`,
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Number watermark */}
                  <div
                    className="absolute top-4 right-6 text-6xl font-black opacity-[0.04] pointer-events-none select-none"
                    style={{fontFamily: "'Syne',sans-serif", color: svc.accent}}
                  >
                    {svc.number}
                  </div>
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: `linear-gradient(90deg, ${svc.accent}, transparent)`,
                    }}
                  />

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: `1px solid ${svc.border}`,
                    }}
                  >
                    <img className="w-7 h-7" src={svc.icon} alt={svc.title} />
                  </div>
                  <h3
                    className="text-xl font-black mb-3 text-white"
                    style={{fontFamily: "'Syne',sans-serif"}}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {svc.desc}
                  </p>

                  <div
                    className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{color: svc.accent}}
                  >
                    Learn more <LuArrowRight className="text-xs" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROJECTS ════════════════════════════════════ */}
        <section
          id="projects"
          className="py-24 px-6 lg:px-10 relative overflow-hidden"
          style={{
            background: "#060d1b",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="dot-grid" style={{opacity: 0.4}} />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <motion.span
                  initial={{opacity: 0, x: -20}}
                  whileInView={{opacity: 1, x: 0}}
                  viewport={{once: true}}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-green-400 uppercase"
                >
                  <span
                    style={{
                      width: 20,
                      height: 1,
                      background: "#84cc16",
                      display: "inline-block",
                    }}
                  />
                  Portfolio
                </motion.span>
                <motion.h2
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{delay: 0.1}}
                  viewport={{once: true}}
                  className="text-4xl lg:text-6xl font-black mt-2 tracking-tight"
                  style={{fontFamily: "'Syne',sans-serif"}}
                >
                  Featured Work
                </motion.h2>
              </div>
              <MagneticButton
                href="https://github.com/sigma700"
                target="_blank"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shimmer-btn"
                style={{
                  background: "rgba(132,204,22,0.07)",
                  border: "1px solid rgba(132,204,22,0.28)",
                  color: "#84cc16",
                }}
              >
                See All on GitHub
                <LuExternalLink className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </MagneticButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ DOWNLOAD / CV ═══════════════════════════════ */}
        <section className="py-24 px-6 lg:px-10 bg-gray-900 relative overflow-hidden">
          <div
            className="hero-orb"
            style={{
              width: 500,
              height: 500,
              background: "rgba(132,204,22,0.05)",
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
              <motion.a
                href="/ALLAN KIRIMI.pdf"
                download="Allan_Muriiithi_CV.pdf"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                viewport={{once: true}}
                whileHover={{y: -8, scale: 1.02}}
                whileTap={{scale: 0.98}}
                className="group block p-8 rounded-3xl text-left shimmer-btn cursor-pointer w-full max-w-md relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(132,204,22,0.09), rgba(34,197,94,0.05))",
                  border: "1px solid rgba(132,204,22,0.22)",
                  backdropFilter: "blur(20px)",
                  textDecoration: "none",
                  boxShadow: "0 0 0 transparent",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 24px 70px rgba(132,204,22,0.18)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 0 0 transparent")
                }
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: "linear-gradient(90deg, #84cc16, transparent)",
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(132,204,22,0.08), transparent)",
                    filter: "blur(20px)",
                  }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform relative z-10"
                  style={{
                    background: "rgba(132,204,22,0.12)",
                    border: "1px solid rgba(132,204,22,0.22)",
                    color: "#84cc16",
                  }}
                >
                  <LuDownload />
                </div>
                <h3
                  className="text-xl font-black text-white mb-2 relative z-10"
                  style={{fontFamily: "'Syne',sans-serif"}}
                >
                  Curriculum Vitae
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed relative z-10">
                  My full professional resume — experience, skills, education,
                  and accomplishments.
                </p>
                <div
                  className="flex items-center gap-2 text-green-400 text-sm font-bold relative z-10
                  group-hover:gap-3 transition-all"
                >
                  <LuDownload />
                  Download PDF
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500">
                    PDF • Latest version
                  </span>
                </div>
              </motion.a>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ════════════════════════════════ */}
        <section
          id="testimonials"
          className="py-24 px-6 lg:px-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #060d1b 0%, #0a0f1a 100%)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(132,204,22,0.025) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
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
              ].map((client, i) => (
                <motion.div
                  key={client.name}
                  initial={{opacity: 0, y: 50, scale: 0.96}}
                  whileInView={{opacity: 1, y: 0, scale: 1}}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{once: true}}
                  whileHover={{y: -8}}
                  className="group relative"
                >
                  <div
                    className="p-8 rounded-3xl h-full flex flex-col relative overflow-hidden"
                    style={{
                      background: "rgba(13,19,33,0.8)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(132,204,22,0.2)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(132,204,22,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.07)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 40px rgba(0,0,0,0.3)";
                    }}
                  >
                    {/* Glow */}
                    <div
                      className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(132,204,22,0.06), transparent)",
                        filter: "blur(20px)",
                      }}
                    />

                    {/* Stars */}
                    <div className="flex gap-1 mb-4 relative z-10">
                      {Array.from({length: client.rating}).map((_, j) => (
                        <motion.span
                          key={j}
                          initial={{opacity: 0, scale: 0}}
                          whileInView={{opacity: 1, scale: 1}}
                          transition={{delay: i * 0.1 + j * 0.06}}
                          viewport={{once: true}}
                          className="text-yellow-400 text-sm"
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>

                    {/* Big quote mark */}
                    <div
                      className="quote-mark text-5xl font-black leading-none mb-1 relative z-10"
                      style={{
                        color: "rgba(132,204,22,0.15)",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      "
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed flex-1 -mt-2 relative z-10">
                      {client.quote}
                    </p>

                    <div
                      className="flex items-center gap-4 mt-6 pt-5 relative z-10"
                      style={{borderTop: "1px solid rgba(255,255,255,0.06)"}}
                    >
                      <div className="relative">
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-11 h-11 rounded-full object-cover"
                          style={{border: "2px solid rgba(132,204,22,0.3)"}}
                        />
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{boxShadow: "0 0 12px rgba(132,204,22,0.2)"}}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {client.name}
                        </h4>
                        <p className="text-green-400 text-xs font-medium">
                          {client.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA / CONTACT ═══════════════════════════════ */}
        <section
          id="contact"
          className="py-28 px-6 lg:px-10 bg-gray-900 relative overflow-hidden"
        >
          <div
            className="hero-orb"
            style={{
              width: 700,
              height: 500,
              background: "rgba(132,204,22,0.055)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
          {/* Radial burst lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-conic-gradient(rgba(132,204,22,0.015) 0deg, transparent 1deg, transparent 30deg)",
              backgroundPosition: "center",
            }}
          />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.7}}
              viewport={{once: true}}
            >
              <motion.span
                initial={{opacity: 0, scale: 0.8}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.4}}
                viewport={{once: true}}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-green-400 uppercase mb-6 px-5 py-2.5 border border-green-400/25 rounded-full"
                style={{
                  background: "rgba(132,204,22,0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#84cc16",
                    boxShadow: "0 0 8px #84cc16",
                  }}
                />
                Let's Connect
              </motion.span>

              <h3
                className="text-4xl lg:text-6xl font-black mb-6 tracking-tight leading-tight"
                style={{fontFamily: "'Syne',sans-serif"}}
              >
                Let's Build Something{" "}
                <span className="gradient-text">Extraordinary</span>
              </h3>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                Streamline your business with beautifully crafted,
                high-performance software. Let's turn your vision into reality.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <MagneticButton
                  href="https://wa.me/792624342?text=Hello%20I'm%20interested%20in%20your%20services"
                  target="_blank"
                  className="group flex items-center gap-2 px-10 py-4 font-bold text-gray-900 rounded-2xl shimmer-btn"
                  style={{
                    background: "linear-gradient(135deg, #84cc16, #22c55e)",
                    boxShadow:
                      "0 0 50px rgba(132,204,22,0.45), 0 0 100px rgba(132,204,22,0.15)",
                  }}
                >
                  WhatsApp Me
                  <span className="group-hover:translate-x-1 inline-block transition-transform">
                    →
                  </span>
                </MagneticButton>

                <MagneticButton
                  href="tel:+254792624342"
                  className="flex items-center gap-2 px-10 py-4 font-bold rounded-2xl"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#d1d5db",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Call Me
                </MagneticButton>
              </div>

              {/* Contact info row */}
              <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{delay: 0.3}}
                viewport={{once: true}}
                className="flex flex-wrap justify-center gap-6 text-sm"
              >
                <a
                  href="tel:+254792624342"
                  className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                  (+254) 792 624 342
                </a>
                <span className="text-gray-700">|</span>
                <a
                  href="mailto:allankirimi65@gmail.com"
                  className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                  allankirimi65@gmail.com
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════ */}
        <footer
          className="py-14 px-6 lg:px-10"
          style={{
            background: "#040810",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center gap-7">
              {/* Logo */}
              <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                className="flex items-center gap-3"
              >
                <div
                  style={{
                    width: 2,
                    height: 24,
                    background:
                      "linear-gradient(to bottom, #84cc16, transparent)",
                    borderRadius: 2,
                  }}
                />
                <span
                  className="text-2xl font-black tracking-widest"
                  style={{fontFamily: "'Syne',sans-serif"}}
                >
                  ALLAN
                  <span
                    className="text-green-400"
                    style={{textShadow: "0 0 12px rgba(132,204,22,0.6)"}}
                  >
                    .
                  </span>
                  DEV
                </span>
                <div
                  style={{
                    width: 2,
                    height: 24,
                    background:
                      "linear-gradient(to bottom, transparent, #84cc16)",
                    borderRadius: 2,
                  }}
                />
              </motion.div>

              <p className="text-gray-500 text-sm">
                Follow me across all platforms
              </p>

              <div className="w-full">
                <Links />
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(132,204,22,0.2), transparent)",
                }}
              />

              <p className="text-gray-700 text-xs text-center">
                Allan Muriiithi{" "}
                <span className="text-green-400/60">© 2025</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
