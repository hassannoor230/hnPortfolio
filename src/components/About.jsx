import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import img from "../../public/Me.png";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Framer Motion", "Three.js"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase"] },
  { category: "Design", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "UI/UX"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Webpack"] },
];

const timeline = [
  { year: "2022", title: "Junior Developer", company: "StartUp" },
  { year: "2023", title: "Senior Frontend Developer", company: "Techno Sphere" },
  { year: "2024", title: "Full Stack Developer", company: "Techno Sphere" },
  { year: "2024", title: "BB Information Technology", company: "Virtual University of Pakistan" },
];

function FadeIn({ children, delay = 0, y = 30 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="about-section">

      <div className="container">

        {/* Header */}
        <FadeIn>
          <div className="about-header">
            <span className="line"></span>
            <span className="label">Who I Am</span>

            <h2 className="title">About Me</h2>
          </div>
        </FadeIn>

        <div className="about-grid">

          {/* LEFT IMAGE */}
          <FadeIn delay={0.2}>
            <div className="avatar-container">

              <img src={img} alt="Hassan Noor" className="avatar-img"/>

              <div className="avatar-overlay">
                <p className="avatar-name">Hassan Noor</p>
                <p className="avatar-role">MERN STACK DEVELOPER</p>
              </div>

              <motion.div
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="scan-line"
              />

            </div>
          </FadeIn>

          {/* RIGHT CONTENT */}
          <div>

            <FadeIn delay={0.3}>
              <p className="about-text">
                I'm a passionate MERN Stack Developer based in Pakistan with over 2 years of
                experience building modern scalable web applications.
              </p>

              <p className="about-text">
                My philosophy is simple: every pixel matters. I blend technical precision with
                creative vision to build products that resonate.
              </p>
            </FadeIn>

            {/* Skills */}
            <FadeIn delay={0.4}>
              <h3 className="section-title">Skills</h3>

              <div className="skills-grid">
                {skills.map((skill) => (
                  <div key={skill.category}>
                    <div className="skill-category">{skill.category}</div>

                    <div className="skill-tags">
                      {skill.items.map((item) => (
                        <span key={item} className="tag">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Timeline */}
            <FadeIn delay={0.5}>
              <h3 className="section-title">Experience</h3>

              <div className="timeline">
                {timeline.map((item, i) => (
                  <div key={i} className="timeline-item">

                    <div className="timeline-dot"></div>

                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-company">{item.company}</div>

                  </div>
                ))}
              </div>

            </FadeIn>

          </div>

        </div>
      </div>

<style>{`

/* MAIN SECTION */

.about-section{
width:100%;
min-height:100vh;
padding:120px 0;
background:var(--bg-2);
}

/* CONTAINER */

.container{
width:100%;
max-width:1400px;
margin:auto;
padding:0 40px;
}

/* HEADER */

.about-header{
margin-bottom:80px;
}

.line{
display:inline-block;
width:50px;
height:1px;
background:gold;
margin-right:10px;
}

.label{
font-size:12px;
letter-spacing:4px;
color:gold;
text-transform:uppercase;
}

.title{
font-size:clamp(36px,6vw,70px);
margin-top:20px;
}

/* GRID */

.about-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:80px;
align-items:start;
}

/* IMAGE */

.avatar-container{
width:100%;
aspect-ratio:4/5;
overflow:hidden;
position:relative;
border:1px solid #333;
}

.avatar-img{
width:100%;
height:100%;
object-fit:cover;
}

.avatar-overlay{
position:absolute;
bottom:0;
width:100%;
text-align:center;
background:linear-gradient(to top,rgba(0,0,0,0.6),transparent);
padding:12px;
}

.avatar-name{
font-size:12px;
letter-spacing:3px;
}

.avatar-role{
font-size:11px;
color:gold;
}

.scan-line{
position:absolute;
left:0;
right:0;
height:2px;
background:linear-gradient(90deg,transparent,gold,transparent);
top:0;
}

/* TEXT */

.about-text{
font-size:16px;
line-height:1.8;
margin-bottom:20px;
}

/* SKILLS */

.skills-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:20px;
margin-bottom:40px;
}

.skill-category{
font-size:12px;
color:gold;
margin-bottom:8px;
}

.skill-tags{
display:flex;
flex-wrap:wrap;
gap:6px;
}

.tag{
padding:4px 10px;
background:#111;
border:1px solid #333;
font-size:12px;
}

/* TIMELINE */

.timeline{
border-left:1px solid gold;
padding-left:20px;
}

.timeline-item{
margin-bottom:25px;
position:relative;
}

.timeline-dot{
width:10px;
height:10px;
background:gold;
border-radius:50%;
position:absolute;
left:-26px;
top:6px;
}

.timeline-year{
font-size:12px;
color:gold;
}

.timeline-title{
font-size:18px;
}

.timeline-company{
font-size:14px;
color:#aaa;
}

/* RESPONSIVE */

@media(max-width:1024px){

.about-grid{
grid-template-columns:1fr;
gap:60px;
}

}

@media(max-width:768px){

.container{
padding:0 20px;
}

.skills-grid{
grid-template-columns:1fr;
}

}

`}</style>

    </section>
  );
}