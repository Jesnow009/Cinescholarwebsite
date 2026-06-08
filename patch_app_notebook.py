import re

with open("d:/Film Studies Website/js/app.js", "r", encoding="utf-8") as f:
    content = f.read()

target = '''            groupSection.innerHTML = `
                <h2 style="font-size: 1.5rem; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between;">
                    ${groupTitle}
                    <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: normal; background: rgba(212,175,55,0.1); padding: 0.25rem 0.75rem; border-radius: 4px; border: 1px solid rgba(212,175,55,0.2);">${films.length} Screened</span>
                </h2>
                <div class="required-screenings-grid"></div>
            `;
            
            const grid = groupSection.querySelector('.required-screenings-grid');
            
            // Re-use screening-card logic
            films.forEach(movie => {
                const card = document.createElement('div');
                card.className = "screening-card";
                card.id = `notebook-film-${movie.mId}`;
                
                card.innerHTML = `
                    <!-- TOP: Poster + Title Block -->
                    <div class="screening-card-top">
                        <!-- Poster -->
                        <div class="screening-card-poster-wrapper">
                            <div class="screening-card-poster-inner">
                                ${movie.poster ? `
                                    <img referrerpolicy="no-referrer" src="${movie.poster}" alt="${movie.title}" loading="lazy" onerror="this.outerHTML='<div class=&quot;poster-placeholder&quot; style=&quot;aspect-ratio: 2/3;&quot;><i class=&quot;ri-clapperboard-line&quot;></i></div>'" />
                                ` : `
                                    <div class="poster-placeholder" style="aspect-ratio: 2/3;">
                                        <i class="ri-clapperboard-line"></i>
                                    </div>
                                `}
                            </div>
                        </div>
                        
                        <!-- Title & Focus -->
                        <div class="screening-card-title-focus">
                            <h3 class="screening-card-title">
                                ${movie.title}
                            </h3>
                            <div class="screening-card-year">
                                ${movie.year || ''}
                            </div>
                            
                            <div class="screening-card-focus-box">
                                <div class="screening-card-focus-label">Studied Under</div>
                                <div class="screening-card-focus-text">${movie.parentName ? movie.parentName : 'General Curriculum'}</div>
                            </div>
                        </div>
                    </div>
                    <div style="padding: 0 1.5rem 1.5rem 1.5rem;">
                          <button class="quick-tick-btn watched" data-film-id="${movie.mId}" title="Unmark as Watched">
                              <i class="ri-checkbox-circle-fill" style="font-size: 1.1rem; font-weight: bold;"></i>
                              <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watched</span>
                          </button>
                    </div>
                `;
                
                const btn = card.querySelector('.quick-tick-btn');'''

replacement = '''            groupSection.innerHTML = `
                <h2 style="font-size: 1.5rem; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between;">
                    ${groupTitle}
                    <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: normal; background: rgba(212,175,55,0.1); padding: 0.25rem 0.75rem; border-radius: 4px; border: 1px solid rgba(212,175,55,0.2);">${films.length} Screened</span>
                </h2>
                <div class="notebook-mini-grid"></div>
            `;
            
            const grid = groupSection.querySelector('.notebook-mini-grid');
            
            films.forEach(movie => {
                const card = document.createElement('div');
                card.className = "notebook-mini-card";
                card.id = `notebook-film-${movie.mId}`;
                
                card.innerHTML = `
                    <div class="notebook-mini-card-info">
                        <div class="notebook-mini-card-title" title="${movie.title}">${movie.title}</div>
                        ${movie.year ? `<div class="notebook-mini-card-year">${movie.year}</div>` : ''}
                    </div>
                    <button class="notebook-mini-card-btn watched" data-film-id="${movie.mId}" title="Unmark as Watched">
                        <i class="ri-close-line"></i>
                    </button>
                `;
                
                const btn = card.querySelector('.notebook-mini-card-btn');'''

new_content = content.replace(target, replacement)

if new_content == content:
    print("Failed to replace content!")
else:
    with open("d:/Film Studies Website/js/app.js", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully patched app.js")
