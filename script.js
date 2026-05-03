const projects = [
  {
    name: 'Hotels Analysis',
    badge: 'Executive overview',
    description:
      'An executive Tableau view of hotel demand patterns, occupancy momentum, and booking behavior built for fast commercial decisions.',
    tags: ['Python', 'Tableau', 'Visualization'],
    categories: ['Python', 'Tableau'],
    meta: ['Live dashboard', 'Business-facing overview'],
    liveUrl:
      'https://public.tableau.com/app/profile/abhijeet.kumar5810/viz/HotelBookingDemand_17772927069120/DASHBOARD1EXECUTIVEOVERVIEW',
    previewImage: 'assets/Hotels_analysis.png',
  },
  {
    name: 'Loan Default',
    badge: 'Risk analysis',
    description:
      'A Python and Excel analysis focused on default risk drivers, portfolio quality signals, and decision-ready credit insights.',
    tags: ['Python', 'Excel', 'Risk Modeling'],
    categories: ['Python', 'Excel'],
    meta: ['Spreadsheet analysis', 'Notebook-friendly workflow'],
    liveUrl:
      'https://docs.google.com/spreadsheets/d/1I08bak5GjFaTOK7W37pT1e3F5wkO3QVP4P1H2OkyTT8/edit?gid=1829128131#gid=1829128131',
    previewImage: 'assets/Loan default.png',
  },
];

const filters = ['All', ...new Set(projects.flatMap((project) => project.categories))];

const projectsContainer = document.querySelector('#projects');
const filtersContainer = document.querySelector('#filters');
const searchInput = document.querySelector('#projectSearch');

let activeFilter = 'All';

function renderFilters() {
  filtersContainer.innerHTML = filters
    .map(
      (filter) => `
        <button class="chip ${filter === activeFilter ? 'is-active' : ''}" type="button" data-filter="${filter}">
          ${filter}
        </button>
      `,
    )
    .join('');
}

function renderProjects() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === 'All' || project.categories.includes(activeFilter);
    const searchTarget = [project.name, project.badge, project.description, ...project.categories, ...project.tags, ...project.meta]
      .join(' ')
      .toLowerCase();

    return matchesFilter && searchTarget.includes(query);
  });

  if (filteredProjects.length === 0) {
    projectsContainer.innerHTML = `
      <article class="project-card">
        <div class="preview-frame" style="--preview-bg: linear-gradient(145deg, #b89a78, #6c5340);"></div>
        <div class="project-body">
          <div class="project-header">
            <h4>No matching projects</h4>
          </div>
          <div class="project-copy">
            <p>Try a different search term or switch to another category.</p>
          </div>
        </div>
      </article>
    `;
    return;
  }

  projectsContainer.innerHTML = filteredProjects
    .map(
      (project) => `
        <article class="project-card">
          <div class="preview-frame">
            <img class="preview-image" src="${encodeURI(project.previewImage)}" alt="${project.name} preview" loading="lazy" />
          </div>
          <div class="project-body">
            <div class="project-header">
              <div>
                <h4>${project.name}</h4>
              </div>
              <span class="project-badge">${project.badge}</span>
            </div>

            <div class="project-copy">
              <p>${project.description}</p>
            </div>

            <div class="project-tags">
              ${project.tags.map((tag) => `<span>${tag}</span>`).join('')}
            </div>

            <div class="project-meta project-tech">
              ${project.categories.map((item) => `<span>${item}</span>`).join('<span>•</span>')}
            </div>

            <div class="project-meta">
              ${project.meta.map((item) => `<span>${item}</span>`).join('<span>•</span>')}
            </div>

            <div class="project-footer">
              <a class="ghost-button" href="${project.liveUrl}" aria-label="Open ${project.name}">Live website</a>
            </div>
          </div>
        </article>
      `,
    )
    .join('');
}

filtersContainer.addEventListener('click', (event) => {
  const filterButton = event.target.closest('[data-filter]');

  if (!filterButton) {
    return;
  }

  activeFilter = filterButton.dataset.filter;
  renderFilters();
  renderProjects();
});

searchInput.addEventListener('input', renderProjects);

renderFilters();
renderProjects();