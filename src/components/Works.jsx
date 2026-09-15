import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import eCommerceImg from "../projects/e-commerce.png";
import socialImg from "../projects/social.png";
import dashboardImg from "../projects/dashboard.png";
import designImg from "../projects/design.png";
import cryptoImg from "../projects/crypto.png";
import healthImg from "../projects/health.png";

const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    image: eCommerceImg,
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "MERN Stack"],
    year: "2024",
    description:
      "Complete MERN stack e-commerce platform with product management, cart system, and secure checkout.",
    number: "01",
  },
  {
    id: 2,
    title: "Social Media Application",
    image: socialImg,
    category: "Full Stack",
    tags: ["React", "Firebase", "Redux", "Authentication", "Real-time Chat"],
    year: "2024",
    description:
      "Modern social media platform with posts, likes, comments, and real-time messaging.",
    number: "02",
  },
  {
    id: 3,
    title: "SaaS Admin Dashboard",
    image: dashboardImg,
    category: "Frontend",
    tags: ["React", "Tailwind CSS", "Charts.js", "Data Visualization", "TypeScript"],
    year: "2023",
    description:
      "Analytics dashboard with real-time charts, reports, and user management features.",
    number: "03",
  },
  {
    id: 4,
    title: "UI/UX Brand Design",
    image: designImg,
    category: "Design",
    tags: ["Figma", "Branding", "UI/UX Design", "Prototyping", "Wireframes"],
    year: "2023",
    description:
      "Complete brand identity and UI design system for modern startups.",
    number: "04",
  },
  {
    id: 5,
    title: "Crypto Wallet App",
    image: cryptoImg,
    category: "Web3",
    tags: ["React", "Web3.js", "Solidity", "Ethereum", "DeFi Integration"],
    year: "2023",
    description:
      "Secure cryptocurrency wallet with multi-chain support and DeFi integrations.",
    number: "05",
  },
  {
    id: 6,
    title: "Health Tracking App",
    image: healthImg,
    category: "Mobile",
    tags: ["Flutter", "Dart", "HealthKit", "Biometric Tracking"],
    year: "2022",
    description:
      "Mobile health tracking application with personalized wellness insights.",
    number: "06",
  },
];

const filters = ["All", "Full Stack", "Frontend", "Design", "Web3", "Mobile"];

export default function Works() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="works" style={{ padding: "120px 0", background: "var(--bg)" }}>
      <div className="container">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "60px" }}
        >
          <h2 className="works-title">
            Featured Projects
          </h2>

          <p className="works-desc">
            A selection of my best projects demonstrating full stack development and modern UI design.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="works-filters">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`filter-btn ${active === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects */}
        <AnimatePresence>
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="project-row"
            >

              <div className="project-number">
                {project.number}
              </div>

              <div>

                <div className="project-header">

                  <img
                    src={project.image}
                    alt={project.title}
                    onClick={() => setSelectedProject(project)}
                    className="project-thumb"
                  />

                  <motion.h3
                    animate={{ x: hovered === project.id ? 8 : 0 }}
                    className="project-title"
                  >
                    {project.title}
                  </motion.h3>

                </div>

                <p className="project-desc">
                  {project.description}
                </p>

              </div>

              <div className="project-meta">
                <div>{project.year}</div>
                <div className="project-category">
                  {project.category}
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>

      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content"
            >

              <div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="modal-image"
                />
              </div>

              <div>

                <h3 className="modal-title">
                  {selectedProject.title}
                </h3>

                <p className="modal-desc">
                  {selectedProject.description}
                </p>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ marginBottom: "10px" }}>Technologies Used:</h4>

                  <div className="modal-tags">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                <div className="modal-meta">
                  <div><strong>Category:</strong> {selectedProject.category}</div>
                  <div><strong>Year:</strong> {selectedProject.year}</div>
                  <div><strong>Project Number:</strong> {selectedProject.number}</div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

<style>{`

/* typography */

.works-title{
font-size:clamp(32px,5vw,48px);
font-weight:600;
margin-bottom:10px;
}

.works-desc{
color:var(--text-dim);
max-width:500px;
}


/* filters */

.works-filters{
display:flex;
gap:10px;
flex-wrap:wrap;
margin-bottom:50px;
}

.filter-btn{
padding:10px 18px;
border:1px solid var(--border);
background:transparent;
color:var(--text);
cursor:pointer;
font-size:12px;
transition:0.3s;
}

.filter-btn.active{
background:#C9A84C;
color:black;
}


/* project row */

.project-row{
border-top:1px solid var(--border);
padding:30px 0;
display:grid;
grid-template-columns:70px 1fr auto;
gap:30px;
align-items:center;
}

.project-number{
font-size:26px;
color:var(--text-muted);
}

.project-header{
display:flex;
align-items:center;
gap:16px;
margin-bottom:10px;
}

.project-thumb{
width:70px;
height:70px;
object-fit:cover;
border-radius:10px;
cursor:pointer;
}

.project-title{
font-size:26px;
font-weight:500;
}

.project-desc{
color:var(--text-dim);
}

.project-meta{
text-align:right;
font-size:12px;
}

.project-category{
color:#C9A84C;
}


/* modal */

.modal-overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.9);
display:flex;
justify-content:center;
align-items:center;
z-index:9999;
padding:20px;
}

.modal-content{
background:#111;
padding:30px;
border-radius:12px;
max-width:1000px;
width:100%;
display:grid;
grid-template-columns:1fr 1fr;
gap:30px;
}

.modal-image{
width:100%;
height:320px;
object-fit:cover;
border-radius:10px;
}

.modal-title{
font-size:32px;
margin-bottom:15px;
color:#C9A84C;
}

.modal-desc{
color:#aaa;
margin-bottom:20px;
line-height:1.6;
}

.modal-tags{
display:flex;
gap:10px;
flex-wrap:wrap;
}

.tag{
border:1px solid #444;
padding:6px 14px;
font-size:14px;
border-radius:6px;
background:#222;
}

.modal-meta{
color:#aaa;
font-size:16px;
display:grid;
gap:10px;
}


/* responsive */

@media(max-width:900px){

.project-row{
grid-template-columns:1fr;
gap:20px;
}

.project-meta{
text-align:left;
}

}

@media(max-width:768px){

.modal-content{
grid-template-columns:1fr;
}

.modal-image{
height:240px;
}

.works-filters{
overflow-x:auto;
flex-wrap:nowrap;
}

}

`}</style>

    </section>
  );
}