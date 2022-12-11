// global selectors

const sidebar_links = document.querySelectorAll(".sidebar_links .item");

// Animation Sections

// Toggle Sidebar
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");
const sidebarBtn = document.querySelectorAll(".sidebar_btn");

sidebarBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;
    content.classList.toggle("w-100");
    sidebar.classList.toggle("sidebar_show");

    // sidebarBtn.forEach((btn) => {
    this.childNodes[0].classList.toggle("bx-arrow-back");
    this.childNodes[0].classList.toggle("bx-menu");
    // });
  });
});

// Home Button Back
const home = document.querySelector(".home");

const obsHome = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting)
    document.querySelector(".home_btn").classList.add("show_btn");
  else document.querySelector(".home_btn").classList.remove("show_btn");
};

const observer = new IntersectionObserver(obsHome, {
  root: null,
  threshold: 0.5,
});
observer.observe(home);

// section link active

const sections = document.querySelectorAll("header, section");
const obsSection = (entries) => {
  const [entry] = entries;

  const target = entry.target.getAttribute("id");

  if (entry.isIntersecting) {
    sidebar_links.forEach((link) => link.classList.remove("active"));

    document
      .querySelector(`a[href='#${target}']`)
      .parentNode.classList.add("active");
  }
};

const observerSection = new IntersectionObserver(obsSection, {
  root: null,
  threshold: 0.6,
});

sections.forEach((section) => observerSection.observe(section));

// Skills Animation

const SkillsItem = document.querySelectorAll(".list-skills");
const obsSkills = (entries) => {
  const [entry] = entries;

  if (entry.isIntersecting)
    [...entry.target.children].forEach((skill, index) => {
      setTimeout(() => {
        skill.classList.add("animated-skills");
      }, index * 100);
    });
  observer.unobserve(entry.target);
  // else
  //   [...entry.target.children].forEach((skill) => {
  //     skill.classList.remove("animated-skills");
  //   });
};

const observerSkills = new IntersectionObserver(obsSkills, {
  root: null,
  threshold: 0.5,
});

SkillsItem.forEach((skill) => {
  observerSkills.observe(skill);
});

// Projects Animation

const animate = document.querySelectorAll(".animate");
const obsAnimate = (entries) => {
  const [entry] = entries;

  if (entry.isIntersecting) entry.target.classList.add("animated");

  observer.unobserve(entry.target);
  // else entry.target.classList.remove("animated");
};

const observerAnimate = new IntersectionObserver(obsAnimate, {
  root: null,
  threshold: 0.5,
});

animate.forEach((pro) => {
  observerAnimate.observe(pro);
});

(async function () {
  const getData = await fetch("js/data.json");
  const {
    name,
    positions,
    urlResume,
    about,
    skills,
    eduction,
    courses,
    experience,
    projects,
  } = await getData.json();

  // Content Header
  (function () {
    const html = `
     <h1 class="home-title">${name}</h1>
     <p class="home-subtitle lead">
     I'm <span class="text-typing"></span>
    </p>
    <div class="btn-group">
      <a href=${urlResume} class="btn btn_main" download>
        download resume
        <i class="bx bx-file-blank"></i>
      </a>
      <a href="#portfolio" class="btn btn_sub scroll_btn">
        Portfolio
        <i class="bx bx-code-alt"></i>
      </a>
    </div>
     `;

    document
      .querySelector(".home_content")
      .insertAdjacentHTML("afterbegin", html);

    const typed = new Typed(".text-typing", {
      strings: [...positions],
      typeSpeed: 50,
      loop: true,
    });
  })();

  // Button Scroll To Section

  document.querySelectorAll(".scroll_btn").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let target = e.target;
      if (target.classList.contains("bx")) target = target.parentNode;
      const id = target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
      if (target.parentNode.classList.contains("item")) {
        document;
        sidebar_links.forEach((item) => item.classList.remove("active"));

        target.parentNode.classList.add("active");
      }
    });
  });

  // Content About
  (function () {
    // Summary
    document.querySelector(".summary").textContent = about.summary;

    // About Info Content
    const aboutInfoList = document.querySelector(".about_info-list");

    const getAge = (birthday) => {
      const birthTime = new Date(birthday);
      const now = new Date();

      if (now.getMonth() >= birthTime.getMonth()) {
        if (
          now.getMonth() === birthTime.getMonth() &&
          now.getDate() < birthTime.getDate()
        )
          return now.getFullYear() - birthTime.getFullYear() - 1;
        return now.getFullYear() - birthTime.getFullYear();
      }

      return now.getFullYear() - birthTime.getFullYear() - 1;
    };

    const formattingBirthDay = (birthday) => {
      const option = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const birthTime = new Date(birthday);
      return birthTime.toLocaleDateString("en-gb", option).split(".").join("");
    };

    const infoList = `
    <li class="list-item d-grid">
      <i class="bx bxs-chevron-right bx-fw main-color bx"></i>
      <p class="item-content fw-bold">
        birthday:
        <span class="fw-normal item-subcontent">
          ${formattingBirthDay(about.birthday)}
        </span>
      </p>
    </li>
    <li class="list-item d-grid">
      <i class="bx bxs-chevron-right bx-fw main-color bx"></i>
      <p class="item-content fw-bold">
        age: <span class="item-subcontent fw-normal">${getAge(
          about.birthday
        )}</span>
      </p>
    </li>
    <li class="list-item d-grid">
      <i class="bx bxs-chevron-right bx-fw main-color bx"></i>
      <p class="item-content fw-bold">
        address:
        <span class="item-subcontent fw-normal"
          >${about.address}</span
        >
      </p>
    </li>
    <li class="list-item d-grid">
      <i class="bx bxs-chevron-right bx-fw main-color bx"></i>
      <p class="item-content fw-bold">
        Degree:
        <span class="item-subcontent fw-normal">${about.degree}</span>
      </p>
    </li>
    <li class="list-item d-grid">
      <i class="bx bxs-chevron-right bx-fw main-color bx"></i>
      <p class="item-content fw-bold">
        Phone:
        <span class="item-subcontent fw-normal"
          >${about.phone}</span
        >
      </p>
    </li>
    <li class="list-item d-grid">
      <i class="bx bxs-chevron-right bx-fw main-color bx"></i>
      <p class="item-content fw-bold">
        Freelance:
        <span class="item-subcontent fw-normal">${about.freelance}</span>
      </p>
    </li>
    <li class="list-item d-grid">
      <i class="bx bxs-chevron-right bx-fw main-color bx"></i>
      <p class="item-content fw-bold">
        email:
        <span class="item-subcontent fw-normal text-lowercase"
          >${about.email}</span
        >
      </p>
    </li>
    `;

    aboutInfoList.insertAdjacentHTML("afterbegin", infoList);

    //Skills Content

    const skillsList = document.querySelector(".list-skills");

    let skillsContent = ``;

    skills.forEach((skill) => {
      skillsContent += `
      <!-- list item -->
      <div class="skill-item position-relative">
        ${skill.element}
        <p class ='bg-${skill.name}'>${skill.name}</p>
      </div>
      <!-- list item -->
      `;
    });

    skillsList.insertAdjacentHTML("afterbegin", skillsContent);

    // Eduction Content

    const contentCre = (ele, cre) => {
      const eleTarget = document.querySelector(ele);

      // let contentTarget = ``;

      cre.forEach((cre) => {
        const contentTarget = `
        <li class="cer-item position-relative">
        <h4 class="cer-title fw-bold">
          ${cre.certificate}
        </h4>
        <h5 class="cer-subtitle fw-bold text-capitalize">
          ${cre.placeName}, ${cre.address}
        </h5>
        <p class="cer-date mb-0 lead">${cre.start} - ${cre.end}</p>
      </li>
        `;
        eleTarget.insertAdjacentHTML("afterbegin", contentTarget);
      });
    };

    contentCre(".edu-list", eduction);
    contentCre(".cou-list", courses);
    // contentCre(".exp-list", experience);

    // Experience Content

    experience.forEach((exp) => {
      let desList = `<ul class='list-unstyled des-list'>`;
      exp.detailsPosition.forEach((desItem) => {
        desList += `<li class="des-item"><span>${desItem}</span></li>`;
      });
      desList += `</ul>`;
      const expContent = `
        <li class="cer-item position-relative">
        <h4 class="cer-title fw-bold">
          ${exp.companyName}
        </h4>
        <h5 class="cer-subtitle fw-bold text-capitalize">
          ${exp.position}${!exp.address ? "" : `, ${exp?.address}`}
        </h5>
        ${desList}
        <p class="cer-date mb-0 lead">${exp.start} - ${exp.end}</p>
      </li>
        `;
      document
        .querySelector(".exp-list")
        .insertAdjacentHTML("beforeend", expContent);
    });
  })();

  // Projects Content

  (function () {
    projects.forEach(({ projectName, url, githubUrl, urlImage, skills }) => {
      let proSkills = ``;

      skills.forEach(
        (skill) =>
          (proSkills += `<span class="color-${skill} skill">${skill}</span>`)
      );

      const html = `
      <div class="project-card animate flex-column d-flex">
      <div class="image-project">
        <img
          src="${urlImage}"
          alt="evelo website image"
          class="img-fluid"
        />
        
        <ul
          class="list-unstyled list_links-pro "
        >
        <li class="list-item project-name w-100 text-center">${projectName}</li>
        
          <li class="list-item d-flex gap-1">
            <a href="${url}" class='icon'><i class="bx bx-link-alt"></i></a>
            ${
              githubUrl
                ? `
              
                <a href="${githubUrl}" class='icon'><i class="bx bxl-github"></i></a>
              `
                : ""
            }
          </li>
          
        </ul>
      </div>
  
      <div class="skills-container d-flex gap-2 flex-wrap flex-grow-1 align-items-start">
        ${proSkills}
      </div>
    </div>
       `;

      document
        .querySelector(".project-container")
        .insertAdjacentHTML("afterbegin", html);
    });

    const animations = () => {
      const proSection = document.querySelectorAll(
        ".project-container .project-card"
      );

      proSection.forEach((item) => {
        const offSet = item.offsetTop - window.innerHeight * 0.7;

        if (window.scrollY >= offSet && !item.classList.contains("animated"))
          item.classList.add("animated");
      });
    };

    animations();
    window.addEventListener("scroll", animations);
  })();

  // Loader
  (function () {
    document.querySelector(".loader").classList.add("hide_loader");
    document.querySelector("body").style.overflowY = "auto";
  })();
})();
