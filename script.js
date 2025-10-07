gsap.registerPlugin(ScrollTrigger);

// ===== Dynamic Data =====
const timelineData = [
  "🎓 B.E in Computer Science - BITM",
];

const skillsData = [
  { name: "Python", percent: 90 },
  { name: "Java", percent: 85 },
  { name: "C,C++", percent: 80 },
  { name: "HTML/CSS/JS", percent: 79 },
  { name: "SQL", percent: 80 }
];

const projectsData = [
  { title: "RoadSense", desc: "AR-based pedestrian safety app" },
  { title: "PM2.5 Estimation", desc: "AI-based air quality model" },
  { title: "Music Playlist Manager", desc: "Python app for playlists" }
];

const contactData = {
  email: "mallikakondapur@gmail.com",
  socials: {
    LinkedIn: "https://www.linkedin.com/in/mallika-kondapur-12a649276/",
    GitHub: "https://github.com/KTMallika"
  }
};

// ===== Populate Timeline =====
const timelineContainer = document.getElementById("timeline-items");
timelineData.forEach(item=>{
  const div=document.createElement("div");
  div.classList.add("timeline-item");
  div.textContent=item;
  timelineContainer.appendChild(div);
});

// ===== Populate Skills =====
const skillsContainer=document.getElementById("skills-container");
skillsData.forEach(skill=>{
  const skillDiv=document.createElement("div");
  skillDiv.classList.add("skill-bar");
  skillDiv.innerHTML=`<p>${skill.name}</p><div class="bar"><span data-percent="${skill.percent}"></span></div>`;
  skillsContainer.appendChild(skillDiv);
});

// ===== Populate Projects =====
const projectsContainer=document.getElementById("projects-container");
projectsData.forEach(proj=>{
  const div=document.createElement("div");
  div.classList.add("project-card");
  div.innerHTML=`<h3>${proj.title}</h3><p>${proj.desc}</p>`;
  projectsContainer.appendChild(div);
});

// ===== Populate Contact =====
document.getElementById("contact-email").innerHTML=
  `Email: <a href="mailto:${contactData.email}">${contactData.email}</a>`;
document.getElementById("contact-phone").textContent=`Phone: ${contactData.phone}`;

const socialContainer=document.getElementById("social-links");
for(const [name,link] of Object.entries(contactData.socials)){
  const a=document.createElement("a");
  a.href=link;
  a.target="_blank";

  let iconClass="";
  if(name==="LinkedIn") iconClass="fab fa-linkedin";
  else if(name==="GitHub") iconClass="fab fa-github";

  a.innerHTML=`<i class="${iconClass} fa-2x"></i>`;
  socialContainer.appendChild(a);
}

// ===== GSAP Animations =====
gsap.from(".hero h1",{opacity:0,y:50,duration:1});
gsap.from(".hero p",{opacity:0,y:30,delay:0.3});
gsap.utils.toArray("section").forEach(section=>{
  gsap.from(section.querySelector("h2"),{
    scrollTrigger:{trigger:section,start:"top 80%"},
    opacity:0,
    y:40,
    duration:0.8
  });
});

// ===== Skill Bar Animation =====
ScrollTrigger.batch(".bar span",{onEnter:batch=>batch.forEach(el=>el.style.width=el.dataset.percent+"%")});

// ===== Active Nav Highlight & Scroll Progress =====
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-link");

window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{
    const sectionTop=section.offsetTop-150;
    if(scrollY>=sectionTop) current=section.id;
  });

  navLinks.forEach(link=>{
    link.classList.remove("active");
    if(link.getAttribute("href").includes(current)) link.classList.add("active");
  });

  const scrollTop=window.scrollY;
  const docHeight=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById("progress-bar").style.width=(scrollTop/docHeight)*100+"%";
});

// ===== Mobile Nav Toggle =====
const hamburger=document.getElementById("hamburger");
const navLinksContainer=document.getElementById("nav-links");
hamburger.addEventListener("click",()=>{
  hamburger.classList.toggle("active");
  navLinksContainer.classList.toggle("active");
});
document.querySelectorAll(".nav-link").forEach(link=>{
  link.addEventListener("click",()=>{
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("active");
  });
});
