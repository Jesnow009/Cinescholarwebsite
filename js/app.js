// CineScholar - Multi-Page Application Engine

document.addEventListener("DOMContentLoaded", () => {
    // --- Page Target Identification ---
    const pageId = document.body.getAttribute("data-page") || "home";

    // --- Application State ---
    const state = {
        watchedFilms: JSON.parse(localStorage.getItem("cine_watched_films")) || [],
        watchedSources: JSON.parse(localStorage.getItem("cine_watched_sources")) || {},
    watchedDates: JSON.parse(localStorage.getItem("cine_watched_dates")) || {},
        filmNotes: JSON.parse(localStorage.getItem("cine_film_notes")) || {},

        activePage: pageId,
        activePath: null, // set dynamically for curriculum pages
        activeFilmId: null,
        activeRegion: "hollywood-na",
        activeSubRegion: "bengali",
        // Interactive search & filter query states
        searchQuery: "",
        filterUnscreenedOnly: false,
        activeRoom: localStorage.getItem("cine_active_room") || null,
        // Local storage data
        
        
        // Simulator values
        sim: {
            focalLength: 50,
            lightingAngle: 45,
            lightingIntensity: 90,
            colorTone: "cool",
            preset: "suspense"
        }
    };

    // --- DOM Elements ---
    const el = {
        headerNav: document.getElementById("headerNav"),
        mobileMenuBtn: document.getElementById("mobileMenuBtn"),
        navLinksContainer: document.querySelector(".nav-links"),
        

        // Explorer curriculum elements (Only on direction/cinematography/screenwriting/editing/sound)
        pathIntroContainer: document.getElementById("pathIntroContainer"),
        filmsListContainer: document.getElementById("filmsListContainer"),
        filmDetailContainer: document.getElementById("filmDetailContainer"),

        
        sliderAngle: document.getElementById("sliderAngle"),
        sliderIntensity: document.getElementById("sliderIntensity"),
        simValFocal: document.getElementById("simValFocal"),
        simValAngle: document.getElementById("simValAngle"),
        simValIntensity: document.getElementById("simValIntensity"),
        simColorBtns: document.querySelectorAll("#simColorGradingGroup .sim-preset-btn"),
        simScreen: document.getElementById("simScreen"),
        simCanvasOverlay: document.getElementById("simCanvasOverlay"),
        simLightingGlow: document.getElementById("simLightingGlow"),
        simActor: document.getElementById("simActor"),
        simExpTitle: document.getElementById("simExpTitle"),
        simExpText: document.getElementById("simExpText"),
        simHudLens: document.getElementById("simHudLens"),
        simHudAngle: document.getElementById("simHudAngle"),
        simDofLabel: document.getElementById("simDofLabel"),

        // Notebook / Journal Elements (Only on journal.html)
        statsWatched: document.getElementById("statsWatched"),
        statsNotes: document.getElementById("statsNotes"),
        statsProgress: document.getElementById("statsProgress"),
        notebookEntriesContainer: document.getElementById("notebookEntriesContainer"),
        btnExportJournal: document.getElementById("btnExportJournal"),

        // Glossary Elements (Only on glossary.html)
        glossarySearch: document.getElementById("glossarySearch"),
        glossaryGrid: document.getElementById("glossaryGrid")
    };

    // --- Helper: Save States ---
    function saveWatchedState() {
        localStorage.setItem("cine_watched_films", JSON.stringify(state.watchedFilms));
        localStorage.setItem("cine_watched_sources", JSON.stringify(state.watchedSources));
        localStorage.setItem("cine_watched_dates", JSON.stringify(state.watchedDates));
        updateHeaderStats();
        syncToCloud();
    }

    function saveNotesState() {
        localStorage.setItem("cine_film_notes", JSON.stringify(state.filmNotes));
        updateHeaderStats();
        syncToCloud();
    }

    // Global function for quick-tick
    window.toggleQuickWatch = function(filmId, btn, sourceTitle = null) {
        if (!state.watchedFilms) state.watchedFilms = [];
        if (!state.watchedSources) state.watchedSources = {};
        if (!state.watchedDates) state.watchedDates = {};
        
        // Try to figure out sourceTitle if not provided
        if (!sourceTitle) {
            if (document.title.includes("DIRECTION")) sourceTitle = "Direction Curriculum";
            else if (document.title.includes("EDITING")) sourceTitle = "Editing Curriculum";
            else if (document.title.includes("CINEMATOGRAPHY")) sourceTitle = "Cinematography Curriculum";
            else sourceTitle = "Direction Curriculum"; // fallback
        }

        const index = state.watchedFilms.indexOf(filmId);
        
        if (index > -1) {
            state.watchedFilms.splice(index, 1);
            delete state.watchedSources[filmId];
            delete state.watchedDates[filmId];
            btn.classList.remove('watched');
            btn.innerHTML = '<i class="ri-add-box-line" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Mark Watched</span>';
            btn.title = "Mark as Watched";
        } else {
            state.watchedFilms.push(filmId);
            state.watchedSources[filmId] = sourceTitle;
            const today = new Date();
            const d = String(today.getDate()).padStart(2, '0');
            const m = String(today.getMonth() + 1).padStart(2, '0');
            const y = today.getFullYear();
            state.watchedDates[filmId] = `${d}-${m}-${y}`;
            btn.classList.add('watched');
            btn.innerHTML = '<i class="ri-checkbox-circle-fill" style="font-size: 1.1rem; font-weight: bold;"></i><span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watched</span>';
            btn.title = "Watched";
        }
        
        saveWatchedState();
        
        // If we are currently showing lists, update stats/badges without heavy reload
        if (state.activePage === "explorer" && typeof renderListOnly === 'function') {
            renderListOnly();
        }
    };

    // --- Shared: Header scroll effect & watch counter ---
    function initSharedElements() {
        // Scroll effect
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                el.headerNav.classList.add("scrolled");
            } else {
                el.headerNav.classList.remove("scrolled");
            }
        });

        // Mobile menu toggle click
        if (el.mobileMenuBtn && el.navLinksContainer) {
            el.mobileMenuBtn.addEventListener("click", () => {
                const menuIcon = el.mobileMenuBtn.querySelector("i");
                const isOpen = el.navLinksContainer.classList.toggle("open");
                if (menuIcon) {
                    menuIcon.className = isOpen ? "ri-close-line" : "ri-menu-line";
                }
            });
        }

        updateHeaderStats();
    }

    function updateHeaderStats() {
        // Feature removed
    }

    // --- Module: Curriculum Page Renderer ---
    function syncRegionTabs() {
        const tabsContainer = document.getElementById("regionTabs");
        if (!tabsContainer) return;
        const tabs = tabsContainer.querySelectorAll(".region-tab");
        tabs.forEach(tab => {
            if (tab.getAttribute("data-region") === state.activeRegion) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });
    }

    function getDirectorHref(directorNameOrId) {
        if (!directorNameOrId) return "direction.html";
        
        // Normalize search ID
        const searchId = directorNameOrId.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        
        // Find director in data
        const directorsList = FILMS_DATA.director.directors;
        const director = directorsList.find(d => d.id === searchId || d.name.toLowerCase() === directorNameOrId.toLowerCase());
        
        if (director) {
            const indianSubregions = ["bengali", "malayalam", "tamil", "hindi", "telugu", "kannada", "marathi"];
            if (indianSubregions.includes(director.region)) {
                return `direction-indian.html?subregion=${director.region}&director=${director.id}`;
            }
            return `direction-${director.region}.html?director=${director.id}`;
        }
        
        return `direction.html`;
    }



    function initDirectorHubModule() {
        const grid = document.getElementById("regionHubGrid");
        if (!grid) return;
        
        // Define human-readable metadata for each region (flag, nice name, description)
        const regionMeta = {
            "hollywood-na": {
                name: "Hollywood & North American Filmmakers",
                desc: "Explore classical suspense, New Hollywood revolution, and contemporary blockbusters."
            },
            "indian": {
                name: "Indian Filmmakers",
                desc: "Discover humanistic neo-realism, parallel cinema, and the rich diversity of its regional film industries."
            },
            "british": {
                name: "British Filmmakers",
                desc: "Study grand British historical epics, kitchen-sink realism, and sharp dark comedies."
            },
            "irish": {
                name: "Irish Filmmakers",
                desc: "Explore rich Irish literary adaptations, poetic folklore, and powerful contemporary dramas."
            },
            "french": {
                name: "French Filmmakers",
                desc: "Discover jump-cut innovation, auteur theory, poetic realism, and stylistic freedom."
            },
            "italian": {
                name: "Italian Filmmakers",
                desc: "Experience raw location filming, humanistic themes, and operatic dreamscapes."
            },
            "german": {
                name: "German Filmmakers",
                desc: "Explore German Expressionism, New German Cinema, and contemporary masterpieces."
            },
            "eastern-european": {
                name: "Eastern European Filmmakers",
                desc: "Analyze Czech New Wave surrealism, Polish School moral anxieties, and poetic masterpieces."
            },
            "soviet": {
                name: "Soviet Filmmakers",
                desc: "Uncover pioneering montage theories, poetic pacing, and spiritual sci-fi masterpieces."
            },
            "russian": {
                name: "Russian Filmmakers",
                desc: "Explore post-Soviet visual poetry, intense character dramas, and modern formalist cinema."
            },
            "japanese": {
                name: "Japanese Filmmakers",
                desc: "Examine flawless scene composition, masterly pacing, and deep cultural philosophy."
            },
            "korean": {
                name: "Korean Filmmakers",
                desc: "Study genre-bending thrillers, biting social satire, and visceral tension building."
            },
            "chinese": {
                name: "Chinese Filmmakers",
                desc: "Immerse in lush color theory, sweeping historical epics, and modern urban dramas."
            },
            "hong-kong": {
                name: "Hong Kong Filmmakers",
                desc: "Experience kinetic hand-to-hand combat, operatic Heroic Bloodshed, and neon-drenched romantic longing."
            },
            "taiwanese": {
                name: "Taiwanese Filmmakers",
                desc: "Analyze static long takes, deep-focus family chronicles, urban alienation, and poetic Wuxia visuals."
            },
            "iranian": {
                name: "Iranian Filmmakers",
                desc: "Learn self-reflexive docufiction, minimalist poetry, and profound ethical allegories."
            },
            "middle-eastern": {
                name: "Middle Eastern Filmmakers",
                desc: "Explore the diverse voices, political allegories, and rich histories of Middle Eastern film."
            },
            "south-asian": {
                name: "South Asian Filmmakers",
                desc: "Follow intimate family portraits, cultural transitions, and lyrical human dramas."
            },
            "southeast-asian": {
                name: "Southeast Asian Filmmakers",
                desc: "Delve into slow-cinema magic realism, memory landscapes, and hypnotic imagery."
            },
            "nordic": {
                name: "Nordic & Scandinavian Filmmakers",
                desc: "Struggle with stark existential questions, psychological isolation, and Dogme 95 rules."
            },
            "spanish-portuguese": {
                name: "Spanish & Portuguese Filmmakers",
                desc: "Embrace melodrama, vivid pop aesthetics, surreal humor, and slow-cinema walks."
            },
            "latin-american": {
                name: "Latin American Filmmakers",
                desc: "Engage with magic realism, revolutionary cinema, and masterly long-take tracking shots."
            },
            "african": {
                name: "African Filmmakers",
                desc: "From the foundational Senegalese masters to anti-apartheid South African films and modern auteurs — the full breadth of African cinema."
            },
            "australian-oceanic": {
                name: "Australian & Oceanic Filmmakers",
                desc: "Confront harsh outback landscapes, dreamtime mysteries, and quirky cultural humor."
            }
        };

        grid.innerHTML = "";
        
        const isEditorHub = state.activePage === "editor-hub";
        const isCinematographerHub = state.activePage === "cinematographer-hub";
        const pathKey = isCinematographerHub ? "cinematographer" : (isEditorHub ? "editor" : "director");
        const listKey = isCinematographerHub ? "cinematographers" : (isEditorHub ? "editors" : "directors");
        const filePrefix = isCinematographerHub ? "cinematography" : (isEditorHub ? "editing" : "direction");
        
        const pathData = FILMS_DATA[pathKey];
        const list = (pathData && pathData[listKey]) || [];
        const counts = {};
        list.forEach(d => {
            if (d && d.region) {
                counts[d.region] = (counts[d.region] || 0) + 1;
            }
        });
        
        // Sum up the subregions to compute total Indian count
        const indianSubregions = ["bengali", "malayalam", "tamil", "hindi", "telugu", "kannada", "marathi"];
        counts["indian"] = indianSubregions.reduce((acc, sub) => acc + (counts[sub] || 0), 0);

        let cardsToRender = [];

        Object.keys(regionMeta).forEach(regionId => {
            const count = counts[regionId] || 0;
            if ((isEditorHub || isCinematographerHub) && count === 0) return; // skip empty regions on editor/cinematographer hub
            
            const meta = regionMeta[regionId];
            let cardTitle = meta.name;
            if (isEditorHub) {
                cardTitle = meta.name.replace(/Filmmakers/g, "Film Editors");
            } else if (isCinematographerHub) {
                cardTitle = meta.name.replace(/Filmmakers/g, "Cinematographers");
            }
            
            cardsToRender.push({
                id: regionId,
                name: cardTitle,
                desc: meta.desc,
                href: `${filePrefix}-${regionId}.html`,
                countKey: regionId
            });
        });

        cardsToRender.forEach(cardData => {
            const count = counts[cardData.countKey] || 0;
            
            const card = document.createElement("a");
            card.href = cardData.href;
            card.className = "region-hub-card";
            
            const countLabel = isEditorHub 
                ? `${count} Master Editor${count !== 1 ? "s" : ""}`
                : `${count} Master Director${count !== 1 ? "s" : ""}`;
                
            card.innerHTML = `
                <div>
                    <div class="region-hub-card-header">
                        <h4 class="region-hub-card-title">${cardData.name}</h4>
                    </div>
                    <p class="region-hub-card-desc" style="margin-top: 0.75rem;">${cardData.desc}</p>
                </div>
                <div class="region-hub-card-meta">
                    <span>${countLabel}</span>
                    <i class="ri-arrow-right-line" style="font-size: 1.1rem;"></i>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function updateURLQueryParams() {
        if (state.activePath !== "director" && state.activePath !== "editor" && state.activePath !== "cinematographer") return;
        const url = new URL(window.location);
        url.searchParams.delete("region"); // Not needed since we have separate HTML files for regions
        if (state.activeRegion === "indian" && state.activeSubRegion) {
            url.searchParams.set("subregion", state.activeSubRegion);
        } else {
            url.searchParams.delete("subregion");
        }
        const paramKey = state.activePath === "director" ? "director" : (state.activePath === "editor" ? "editor" : "cinematographer");
        if (state.activeFilmId) {
            url.searchParams.set(paramKey, state.activeFilmId);
        } else {
            url.searchParams.delete(paramKey);
        }
        window.history.pushState({}, "", url);
    }

    function initRegionSelector() {
        const tabsContainer = document.getElementById("regionTabs");
        if (!tabsContainer) return;
        
        // Sync active state class
        syncRegionTabs();
    }

    function initRegionDropdown() {
        const trigger = document.getElementById("regionSelectTrigger");
        const wrapper = document.querySelector(".region-select-wrapper");
        
        if (!trigger || !wrapper) return;
        
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            wrapper.classList.toggle("open");
        });
        
        document.addEventListener("click", (e) => {
            if (!wrapper.contains(e.target)) {
                wrapper.classList.remove("open");
            }
        });
    }

    function initCurriculumModule() {
        // Map body pageId to db keys
        const pathMapping = {
            director: "director",
            writer: "writer",
            editor: "editor",
            cinematographer: "cinematographer",
            sound: "sound"
        };

        const dbKey = pathMapping[state.activePage];
        if (!dbKey || !FILMS_DATA[dbKey]) return;

        state.activePath = dbKey;
        
        const isPersonPath = (dbKey === "director" || dbKey === "editor" || dbKey === "cinematographer");
        
        // Default active ID based on page type
        if (isPersonPath) {
            const listKey = dbKey === "director" ? "directors" : (dbKey === "editor" ? "editors" : "cinematographers");
            const paramKey = dbKey === "director" ? "director" : (dbKey === "editor" ? "editor" : "cinematographer");
            
            const list = (FILMS_DATA[dbKey] && FILMS_DATA[dbKey][listKey]) || [];
            
            // Set region from body data-region first
            const bodyRegion = document.body.getAttribute("data-region");
            if (bodyRegion) {
                state.activeRegion = bodyRegion;
            } else {
                // Parse query parameters on load as fallback
                const urlParams = new URLSearchParams(window.location.search);
                const regionParam = urlParams.get("region");
                if (regionParam) {
                    const isValidRegion = list.some(d => d.region === regionParam);
                    if (isValidRegion) {
                        state.activeRegion = regionParam;
                    }
                }
            }

            // Handle Indian subregion on load
            const urlParamsOnLoad = new URLSearchParams(window.location.search);
            if (state.activeRegion === "indian") {
                const subregionParam = urlParamsOnLoad.get("subregion");
                const validSub = ["bengali", "malayalam", "tamil", "hindi", "telugu", "kannada", "marathi"];
                if (subregionParam && validSub.includes(subregionParam)) {
                    state.activeSubRegion = subregionParam;
                } else {
                    state.activeSubRegion = "bengali";
                }
            }

            initRegionSelector();

            const personParam = urlParamsOnLoad.get(paramKey);

            if (personParam) {
                const personExists = list.some(d => d.id === personParam);
                if (personExists) {
                    state.activeFilmId = personParam;
                    
                    // Sync active region of this person
                    const targetPerson = list.find(d => d.id === personParam);
                    if (targetPerson) {
                        const indianSubregions = ["bengali", "malayalam", "tamil", "hindi", "telugu", "kannada", "marathi"];
                        if (indianSubregions.includes(targetPerson.region)) {
                            state.activeRegion = "indian";
                            state.activeSubRegion = targetPerson.region;
                        } else {
                            state.activeRegion = targetPerson.region;
                        }
                        syncRegionTabs();
                    }
                }
            }

            if (!state.activeFilmId) {
                const filtered = list.filter(d => {
                    if (state.activeRegion === "indian") return d.region === state.activeSubRegion;
                    return d.region === state.activeRegion;
                });
                if (filtered.length > 0) {
                    state.activeFilmId = filtered[0].id;
                } else {
                    state.activeFilmId = list.length > 0 ? list[0].id : null;
                }
            }

            // Sync URL parameters on initial load
            updateURLQueryParams();

            // Bind popstate to support browser back/forward buttons
            window.addEventListener("popstate", () => {
                const innerParams = new URLSearchParams(window.location.search);
                const innerPerson = innerParams.get(paramKey);
                const innerSubregion = innerParams.get("subregion");

                if (state.activeRegion === "indian" && innerSubregion) {
                    state.activeSubRegion = innerSubregion;
                    renderIndianSubTabs();
                }

                if (innerPerson) {
                    state.activeFilmId = innerPerson;
                } else {
                    const innerFiltered = list.filter(d => {
                        if (state.activeRegion === "indian") return d.region === state.activeSubRegion;
                        return d.region === state.activeRegion;
                    });
                    state.activeFilmId = innerFiltered.length > 0 ? innerFiltered[0].id : (list.length > 0 ? list[0].id : null);
                }
                renderPathDetails();
            });

        } else {
            const urlParamsOnLoad = new URLSearchParams(window.location.search);
            const filmParam = urlParamsOnLoad.get("film");

            if (filmParam) {
                const filmExists = FILMS_DATA[dbKey].films.some(f => f.id === filmParam);
                if (filmExists) {
                    state.activeFilmId = filmParam;
                }
            }

            if (!state.activeFilmId) {
                const firstFilm = FILMS_DATA[dbKey].films[0];
                if (firstFilm) {
                    state.activeFilmId = firstFilm.id;
                }
            }

            updateURLQueryParams();

            window.addEventListener("popstate", () => {
                const innerParams = new URLSearchParams(window.location.search);
                const innerFilm = innerParams.get("film");
                if (innerFilm) {
                    state.activeFilmId = innerFilm;
                } else {
                    const firstFilm = FILMS_DATA[dbKey].films[0];
                    state.activeFilmId = firstFilm ? firstFilm.id : null;
                }
                renderPathDetails();
            });
        }

        // Bind local sidebar search & filter if they exist
        const sidebarSearchInput = document.getElementById("sidebarSearchInput");
        const sidebarSearchClear = document.getElementById("sidebarSearchClear");
        const filterAllPill = document.getElementById("filterAllPill");
        const filterUnscreenedPill = document.getElementById("filterUnscreenedPill");

        if (sidebarSearchInput) {
            sidebarSearchInput.value = state.searchQuery;
            if (state.searchQuery) {
                if (sidebarSearchClear) sidebarSearchClear.style.display = "block";
            }

            sidebarSearchInput.addEventListener("input", (e) => {
                state.searchQuery = e.target.value;
                if (sidebarSearchClear) {
                    if (state.searchQuery) {
                        sidebarSearchClear.style.display = "block";
                    } else {
                        sidebarSearchClear.style.display = "none";
                    }
                }
                renderListOnly();
            });
        }

        if (sidebarSearchClear) {
            sidebarSearchClear.addEventListener("click", () => {
                if (sidebarSearchInput) sidebarSearchInput.value = "";
                state.searchQuery = "";
                sidebarSearchClear.style.display = "none";
                renderListOnly();
            });
        }

        if (filterAllPill && filterUnscreenedPill) {
            filterAllPill.addEventListener("click", () => {
                filterAllPill.classList.add("active");
                filterUnscreenedPill.classList.remove("active");
                state.filterUnscreenedOnly = false;
                renderListOnly();
            });

            filterUnscreenedPill.addEventListener("click", () => {
                filterUnscreenedPill.classList.add("active");
                filterAllPill.classList.remove("active");
                state.filterUnscreenedOnly = true;
                renderListOnly();
            });
            
            // Sync initial state classes
            if (state.filterUnscreenedOnly) {
                filterUnscreenedPill.classList.add("active");
                filterAllPill.classList.remove("active");
            } else {
                filterAllPill.classList.add("active");
                filterUnscreenedPill.classList.remove("active");
            }
        }

        renderPathDetails();
    }

    function renderIndianSubTabs() {
        const container = document.getElementById("indianSubTabs");
        if (!container) return;

        // Clear any inline styling that was previously applied
        container.removeAttribute("style");

        const subregions = [
            { key: "bengali", name: "Bengali" },
            { key: "malayalam", name: "Malayalam" },
            { key: "tamil", name: "Tamil" },
            { key: "hindi", name: "Hindi" },
            { key: "telugu", name: "Telugu" },
            { key: "kannada", name: "Kannada" },
            { key: "marathi", name: "Marathi" }
        ];

        // Support both director, editor and cinematographer
        const dbKey = state.activePath;
        const listKey = dbKey === "director" ? "directors" : (dbKey === "editor" ? "editors" : "cinematographers");
        const personLabel = dbKey === "director" ? "Director" : (dbKey === "editor" ? "Editor" : "Cinematographer");
        const list = FILMS_DATA[dbKey][listKey];

        // Calculate counts per subregion
        const subregionCounts = {};
        list.forEach(d => {
            subregionCounts[d.region] = (subregionCounts[d.region] || 0) + 1;
        });

        // For editors, we only want to render subtabs that actually have editors!
        const activeSubregions = subregions.filter(sub => {
            const count = subregionCounts[sub.key] || 0;
            return dbKey === "director" || count > 0;
        });

        container.innerHTML = "";

        activeSubregions.forEach(sub => {
            const card = document.createElement("button");
            card.className = "indian-subtab-card";
            if (state.activeSubRegion === sub.key) {
                card.classList.add("active");
            }
            
            const count = subregionCounts[sub.key] || 0;
            card.innerHTML = `
                <span class="subtab-title">${sub.name}</span>
                <span class="subtab-count">${count} Master ${personLabel}${count !== 1 ? "s" : ""}</span>
            `;

            // Mouse move spotlight effect
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--x", `${x}px`);
                card.style.setProperty("--y", `${y}px`);
            });

            card.addEventListener("click", () => {
                state.activeSubRegion = sub.key;
                
                const filtered = FILMS_DATA[dbKey][listKey].filter(d => d.region === state.activeSubRegion);
                if (filtered.length > 0) {
                    state.activeFilmId = filtered[0].id;
                }
                
                updateURLQueryParams();
                renderIndianSubTabs();
                renderPathDetails();
            });

            container.appendChild(card);
        });
    }

    function renderPathDetails() {
        const path = FILMS_DATA[state.activePath];
        if (!path) return;

        if (state.activeRegion === "indian") {
            renderIndianSubTabs();
        }

        if (el.pathIntroContainer) {
            let noticeTitle = "";
            let noticeText = "";
            
            switch (state.activePath) {
                case "director":
                    noticeTitle = "Film Studies Curation";
                    noticeText = "These master directors are selected because their works pioneered foundational visual styles and narrative techniques taught in cinema studies worldwide. They represent the definitive checklist of film history's essential directors.";
                    break;
                case "writer":
                    noticeTitle = "Screenwriting Curation";
                    noticeText = "These scripts are curated as masterclass examples of narrative structure, character development, subtext, and thematic dialogue writing.";
                    break;
                case "editor":
                    noticeTitle = "Editing Curation";
                    noticeText = "These films are curated because they represent the evolution of film editing, showcasing rhythmic pacing, spatial continuity, and stylistic jump cuts.";
                    break;
                case "sound":
                    noticeTitle = "Sound Design Curation";
                    noticeText = "These films are selected for pioneering audio design, demonstrating how diegetic sound, music scores, and silence shape cinematic space.";
                    break;
            }
            
            if (noticeTitle && noticeText) {
                el.pathIntroContainer.innerHTML = `
                    <div class="sidebar-curation-notice" style="background: rgba(212, 175, 55, 0.04); border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 6px; padding: 0.85rem 1rem; margin-bottom: 1.25rem; font-size: 0.8rem; line-height: 1.45; color: var(--text-secondary);">
                        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem; color: var(--accent-gold); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.75rem;">
                            <i class="ri-award-line"></i>
                            <span>${noticeTitle}</span>
                        </div>
                        ${noticeText}
                    </div>
                `;
            } else {
                el.pathIntroContainer.innerHTML = "";
            }
        }

        renderListOnly();
    }

    function renderListOnly() {
        const path = FILMS_DATA[state.activePath];
        if (!path) return;

        // 2. Render Left Column List (Directors, Editors, or Films)
        if (el.filmsListContainer) {
            el.filmsListContainer.innerHTML = "";
            
            const isPersonPath = (state.activePath === "director" || state.activePath === "editor" || state.activePath === "cinematographer");
            if (isPersonPath) {
                const listKey = state.activePath === "director" ? "directors" : (state.activePath === "editor" ? "editors" : "cinematographers");
                const personLabel = state.activePath === "director" ? "Director" : (state.activePath === "editor" ? "Editor" : "Cinematographer");
                
                let filteredList = path[listKey].filter(d => {
                    if (state.activeRegion === "all") return true;
                    if (state.activeRegion === "indian") return d.region === state.activeSubRegion;
                    return d.region === state.activeRegion;
                });

                if (state.searchQuery) {
                    const query = state.searchQuery.toLowerCase();
                    filteredList = filteredList.filter(d => 
                        d.name.toLowerCase().includes(query) || 
                        d.mustWatch.some(m => m.title.toLowerCase().includes(query))
                    );
                }

                if (state.filterUnscreenedOnly) {
                    filteredList = filteredList.filter(d => {
                        let watchedCount = 0;
                        d.mustWatch.forEach(movie => {
                            const mId = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                            if (state.watchedFilms.includes(mId)) {
                                watchedCount++;
                            }
                        });
                        return watchedCount < d.mustWatch.length;
                    });
                }

                const renderPersonItem = (person) => {
                    const item = document.createElement("div");
                    item.className = "film-item";
                    if (state.activeFilmId === person.id) {
                        item.classList.add("active");
                    }

                    // Count watched must-watch movies
                    let watchedCount = 0;
                    person.mustWatch.forEach(movie => {
                        const mId = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        if (state.watchedFilms.includes(mId)) {
                            watchedCount++;
                        }
                    });
                    
                    const badgeText = watchedCount === person.mustWatch.length ? "Mastered" : `${watchedCount}/${person.mustWatch.length}`;
                    
                    item.innerHTML = `
                        <div class="film-item-left" style="flex-direction: row; align-items: center; gap: 0.75rem; text-align: left;">
                            ${person.image ? `
                                <img class="director-sidebar-avatar" referrerpolicy="no-referrer" src="${person.image}" alt="${person.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; margin-bottom: 0;" />
                            ` : `
                                <div class="director-sidebar-avatar-placeholder" style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(212,175,55,0.1); margin-bottom: 0;"><i class="ri-user-line" style="font-size: 1.2rem; color: var(--accent-gold);"></i></div>
                            `}
                            <div class="film-item-content" style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.15rem;">
                                <span class="film-item-title director-item-name" style="margin-bottom: 0; font-size: 0.95rem; font-weight: 600;">
                                    ${person.name}
                                </span>
                                <span class="film-item-meta" style="font-size: 0.75rem; color: var(--text-muted);">${person.years}</span>
                            </div>
                        </div>
                    `;

                    item.addEventListener("click", () => {
                        selectFilm(person.id);
                    });

                    el.filmsListContainer.appendChild(item);
                };

                filteredList.forEach(person => {
                    renderPersonItem(person);
                });

            } else {
                // Render flat list of films for cinematographer, writer, sound
                let filteredFilms = path.films;
                if (state.searchQuery) {
                    const query = state.searchQuery.toLowerCase();
                    filteredFilms = filteredFilms.filter(f => 
                        f.title.toLowerCase().includes(query) ||
                        f.director.toLowerCase().includes(query) ||
                        (f.writer && f.writer.toLowerCase().includes(query)) ||
                        (f.cinematographer && f.cinematographer.toLowerCase().includes(query)) ||
                        (f.editor && f.editor.toLowerCase().includes(query))
                    );
                }
                if (state.filterUnscreenedOnly) {
                    filteredFilms = filteredFilms.filter(f => !state.watchedFilms.includes(f.id));
                }

                filteredFilms.forEach(film => {
                    const item = document.createElement("div");
                    item.className = "film-item";
                    if (state.activeFilmId === film.id) {
                        item.classList.add("active");
                    }
                    
                    const isWatched = state.watchedFilms.includes(film.id);
                    const badgeText = isWatched ? "Screened" : "Unscreened";

                    item.innerHTML = `
                        <div class="film-item-left" style="text-align: left;">
                            <span class="film-item-title" style="font-size:0.95rem; font-weight:600;">${film.title}</span>
                            <span class="film-item-meta" style="font-size:0.75rem;">${film.year} &bull; ${film.director}</span>
                        </div>
                    `;

                    item.addEventListener("click", () => {
                        selectFilm(film.id);
                    });

                    el.filmsListContainer.appendChild(item);
                });
            }
        }

        // 3. Render Right Column Active Film or Director Detailed Studies Window
        if (state.activePath === "director" || state.activePath === "editor" || state.activePath === "cinematographer") {
            renderActiveDirectorDetails();
        } else {
            renderActiveFilmDetails();
        }
    }

    function selectFilm(filmOrDirectorId) {
        state.activeFilmId = filmOrDirectorId;
        if (state.activePath === "director" || state.activePath === "editor" || state.activePath === "cinematographer") {
            updateURLQueryParams();
        }
        renderPathDetails();

        // Smooth scroll to top of workspace when switching items
        const detailContainer = document.getElementById("filmDetailContainer");
        if (detailContainer) {
            if (window.innerWidth > 992) {
                // For desktop, scroll the page back to the top of the explorer view
                const topBar = document.querySelector(".explorer-top-bar");
                if (topBar) {
                    const rect = topBar.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = rect.top + scrollTop - 100; // offset for nav header
                    // Removed window.scrollTo to prevent jarring page jumps
                }
            } else {
                // For mobile, scroll directly to details stacked below
                detailContainer.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }

    function renderActiveDirectorDetails() {
        if (!state.activePath || !state.activeFilmId || !el.filmDetailContainer) return;

        const path = FILMS_DATA[state.activePath];
        const listKey = state.activePath === "director" ? "directors" : (state.activePath === "editor" ? "editors" : "cinematographers");
        const person = path[listKey].find(d => d.id === state.activeFilmId);
        if (!person) return;

        el.filmDetailContainer.innerHTML = `
            <!-- Premium Director Header with Profile Image -->
            <div class="director-profile-header">
                ${person.image ? `
                    <div class="director-detail-portrait-wrapper">
                        <img class="director-detail-portrait" referrerpolicy="no-referrer" src="${person.image}" alt="${person.name}" onerror="this.outerHTML='<div style=\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(212,175,55,0.05);\'><i class=\'ri-user-3-line\' style=\'font-size:4.5rem;color:rgba(212,175,55,0.35);\'></i></div>'" />
                    </div>
                ` : `
                    <div class="director-detail-portrait-wrapper" style="background: rgba(212,175,55,0.05); display: flex; align-items: center; justify-content: center; border-color: rgba(212,175,55,0.3);">
                        <i class="ri-user-3-line" style="font-size: 4.5rem; color: rgba(212,175,55,0.35);"></i>
                    </div>
                `}
                <div class="film-title-block" style="flex-grow: 1; min-width: 250px;">
                    <span class="screening-year" style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-gold); font-weight: 600;">${state.activePath === 'director' ? 'Director Dossier' : (state.activePath === 'editor' ? 'Editor Dossier' : 'Cinematographer Dossier')}</span>
                    <h3 style="font-size: 2.5rem; text-transform: uppercase; margin: 0.25rem 0 0.5rem 0; letter-spacing: 0.02em; color: var(--text-primary); font-weight: 700; line-height: 1.1;">${person.name}</h3>
                    <div class="film-meta-block" style="margin-top: 0.5rem;">
                        <span class="film-director" style="font-size: 0.95rem; color: var(--text-secondary); font-weight: 500;">
                            <i class="ri-calendar-line" style="color: var(--accent-gold); margin-right: 0.25rem;"></i> Active Years: &nbsp;${person.years}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Priority 1: Required Screenings (Must-Watch Films) Grid -->
            <div style="border-top: 1px solid var(--border-color); padding-top: 2.5rem; margin: 3rem 0 2rem 0;">
                <h4 class="study-section-title" style="margin-bottom: 1rem;"><i class="ri-film-line"></i> Required Screenings (Priority study)</h4>
                <div class="required-screenings-grid">
                               ${person.mustWatch.map(movie => {
                        const mId = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        
                        return `
                            <div class="screening-card" id="film-${mId}">
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
                                            ${movie.year}
                                        </div>
                                        
                                        <div class="screening-card-focus-box">
                                            <div class="screening-card-focus-label">Study Focus</div>
                                            <div class="screening-card-focus-text">${movie.focus}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- MIDDLE: Details -->
                                <div class="screening-card-details">
                                    <div class="screening-card-details-grid">
                                        ${[
                                            { icon: 'ri-calendar-line', label: 'Released', value: movie.releaseDate },
                                            { icon: 'ri-clapperboard-line', label: 'Director', value: movie.director },
                                            { icon: 'ri-edit-line', label: 'Screenplay', value: movie.writer },
                                            { icon: 'ri-camera-lens-line', label: 'Cinematography', value: movie.cinematographer },
                                            { icon: 'ri-scissors-cut-line', label: 'Editing', value: movie.editor },
                                            { icon: 'ri-music-2-line', label: 'Music', value: movie.composer },
                                            { icon: 'ri-building-line', label: 'Studio', value: movie.studio }
                                        ].filter(item => item.value && !['none', 'n/a', 'na'].includes(String(item.value).trim().toLowerCase()) && String(item.value).trim() !== '').map(item => `
                                            <div class="screening-card-detail-item">
                                                <i class="${item.icon}"></i>
                                                <div>
                                                    <span class="screening-card-detail-label">${item.label}</span><br/>
                                                    <span class="screening-card-detail-value">${item.value}</span>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                                
                                <!-- BOTTOM: Watch & Plot -->
                                <div class="screening-card-bottom">
                                    
                                    <div style="display: flex; gap: 0.5rem; width: 100%;">
                                      <button class="quick-tick-btn ${state.watchedFilms.includes(mId) ? 'watched' : ''}" data-film-id="${mId}" onclick="event.stopPropagation(); window.toggleQuickWatch('${mId}', this);" title="${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark as Watched'}" style="flex: 1;">
                                          <i class="${state.watchedFilms.includes(mId) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(mId) ? 'Watched' : 'Mark Watched'}</span>
                                      </button>
                                      ${movie.telegram ? `
                                      <button class="quick-tick-btn watch-now-btn" onclick="event.stopPropagation(); window.open('${movie.telegram}', '_blank');" style="flex: 1; background: rgba(212,175,55,0.15); border: 1px solid var(--accent-gold); color: var(--accent-gold);" title="Watch Full Movie">
                                          <i class="ri-play-circle-fill" style="font-size: 1.2rem;"></i>
                                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watch</span>
                                      </button>
                                      ` : ''}
                                    </div>

                                    <div class="movie-plot-section" style="width: 100%;">
                                        <button class="plot-toggle-btn" onclick="const content = this.nextElementSibling; const icon = this.querySelector('.toggle-icon'); if(content.style.display==='block'){content.style.display='none'; icon.style.transform='rotate(0deg)';}else{content.style.display='block'; icon.style.transform='rotate(180deg)';}" style="background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.35); color: var(--accent-gold); font-family: var(--font-ui); font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; padding: 0.85rem 2rem; border-radius: 6px; display: flex; width: 100%; justify-content: center; align-items: center; gap: 0.6rem; transition: all 0.2s ease;">
                                            <i class="ri-book-open-line"></i>
                                            Read Synopsis
                                            <i class="toggle-icon ri-arrow-down-s-line" style="transition: transform 0.2s ease;"></i>
                                        </button>
                                        <div class="plot-content" style="display: none; text-align: left; font-size: 0.95rem; line-height: 1.75; color: #c8c8c8; margin-top: 1rem; padding: 1.25rem; background: rgba(212,175,55,0.04); border-radius: 8px; border: 1px solid rgba(212,175,55,0.15);">
                                            ${movie.synopsis || movie.plot || "Plot synopsis from TMDB will be available here soon."}
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>
        `;
    }

    function renderActiveFilmDetails() {
        if (!state.activePath || !state.activeFilmId || !el.filmDetailContainer) return;

        const path = FILMS_DATA[state.activePath];
        const film = path.films.find(f => f.id === state.activeFilmId);
        if (!film) return;

        // Get existing note
        const noteText = state.filmNotes[film.id] || "";

        el.filmDetailContainer.innerHTML = `
            <div class="film-detail-header screening-card">
                <!-- TOP: Poster + Title Block -->
                <div class="screening-card-top">
                    <!-- Poster -->
                    <div class="screening-card-poster-wrapper">
                        <div class="screening-card-poster-inner">
                            ${film.poster ? `
                                <img referrerpolicy="no-referrer" src="${film.poster}" alt="${film.title}" loading="lazy" onerror="this.outerHTML='<div class=&quot;poster-placeholder&quot; style=&quot;aspect-ratio: 2/3;&quot;><i class=&quot;ri-clapperboard-line&quot;></i></div>'" />
                            ` : `
                                <div class="poster-placeholder" style="aspect-ratio: 2/3;">
                                    <i class="ri-clapperboard-line"></i>
                                </div>
                            `}
                        </div>
                    </div>
                    
                    <!-- Title & Info -->
                    <div class="screening-card-title-focus">
                        <h3 class="screening-card-title">
                            ${film.title}
                        </h3>
                        <div class="screening-card-year">
                            ${film.year}
                        </div>
                        
                        <div class="screening-card-focus-box">
                            <div class="screening-card-focus-label">Director & Info</div>
                            <div class="screening-card-focus-text">Dir: <a class="director-link" href="${getDirectorHref(film.director)}" title="View director profile" style="color: #ffffff; text-decoration: underline;">${film.director}</a><br/>${film.country} &bull; ${film.duration}</div>
                        </div>
                    </div>
                </div>
                
                <!-- MIDDLE: Details -->
                <div class="screening-card-details">
                    <div class="screening-card-details-grid">
                        ${[
                            { icon: 'ri-calendar-line', label: 'Released', value: film.releaseDate },
                            { icon: 'ri-clapperboard-line', label: 'Director', value: film.director },
                            { icon: 'ri-edit-line', label: 'Screenplay', value: film.writer },
                            { icon: 'ri-camera-lens-line', label: 'Cinematography', value: film.cinematographer },
                            { icon: 'ri-scissors-cut-line', label: 'Editing', value: film.editor },
                            { icon: 'ri-music-2-line', label: 'Music', value: film.composer },
                            { icon: 'ri-building-line', label: 'Studio', value: film.studio }
                        ].filter(item => item.value && !['none', 'n/a', 'na'].includes(String(item.value).trim().toLowerCase()) && String(item.value).trim() !== '').map(item => `
                            <div class="screening-card-detail-item">
                                <i class="${item.icon}"></i>
                                <div>
                                    <span class="screening-card-detail-label">${item.label}</span><br/>
                                    <span class="screening-card-detail-value">${item.value}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- BOTTOM: Watch & Plot -->
                <div class="screening-card-bottom">
                    
                    <div style="display: flex; gap: 0.5rem; width: 100%;">
                      <button class="quick-tick-btn ${state.watchedFilms.includes(film.id) ? 'watched' : ''}" data-film-id="${film.id}" onclick="event.stopPropagation(); window.toggleQuickWatch('${film.id}', this);" title="${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark as Watched'}" style="flex: 1;">
                          <i class="${state.watchedFilms.includes(film.id) ? 'ri-checkbox-circle-fill' : 'ri-add-box-line'}" style="font-size: 1.1rem; font-weight: bold;"></i>
                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">${state.watchedFilms.includes(film.id) ? 'Watched' : 'Mark Watched'}</span>
                      </button>
                      ${film.telegram ? `
                      <button class="quick-tick-btn watch-now-btn" onclick="event.stopPropagation(); window.open('${film.telegram}', '_blank');" style="flex: 1; background: rgba(212,175,55,0.15); border: 1px solid var(--accent-gold); color: var(--accent-gold);" title="Watch Full Movie">
                          <i class="ri-play-circle-fill" style="font-size: 1.2rem;"></i>
                          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Watch</span>
                      </button>
                      ` : ''}
                    </div>

                    <div class="movie-plot-section" style="width: 100%;">
                        <button class="plot-toggle-btn" onclick="const content = this.nextElementSibling; const icon = this.querySelector('.toggle-icon'); if(content.style.display==='block'){content.style.display='none'; icon.style.transform='rotate(0deg)';}else{content.style.display='block'; icon.style.transform='rotate(180deg)';}" style="background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.35); color: var(--accent-gold); font-family: var(--font-ui); font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; padding: 0.85rem 2rem; border-radius: 6px; display: flex; width: 100%; justify-content: center; align-items: center; gap: 0.6rem; transition: all 0.2s ease;">
                            <i class="ri-book-open-line"></i>
                            Read Synopsis
                            <i class="toggle-icon ri-arrow-down-s-line" style="transition: transform 0.2s ease;"></i>
                        </button>
                        <div class="plot-content" style="display: none; text-align: left; font-size: 0.95rem; line-height: 1.75; color: #c8c8c8; margin-top: 1rem; padding: 1.25rem; background: rgba(212,175,55,0.04); border-radius: 8px; border: 1px solid rgba(212,175,55,0.15);">
                            ${film.synopsis || film.plot || "Plot synopsis from TMDB will be available here soon."}
                        </div>
                    </div>
                    
                </div>
                
            </div>

            <div class="study-pane-grid">
                <!-- Main details column -->
                <div class="study-pane-main">
                    <div>
                        <h4 class="study-section-title"><i class="ri-git-repository-line"></i> Learning Focus</h4>
                        <div class="study-takeaway-box">
                            <p>"${film.lesson}"</p>
                        </div>
                    </div>

                    <div>
                        <h4 class="study-section-title"><i class="ri-question-answer-line"></i> Why Watch It</h4>
                        <p style="font-size: 0.95rem;">${film.why}</p>
                    </div>

                    <div>
                        <h4 class="study-section-title"><i class="ri-focus-2-line"></i> Key Takeaway</h4>
                        <p style="font-size: 0.95rem; color: var(--text-secondary);">${film.takeaway}</p>
                    </div>

                    <div>
                        <h4 class="study-section-title"><i class="ri-clapperboard-line"></i> Scenes to Analyze</h4>
                        <div class="scenes-accordion">
                            ${film.scenes.map((scene, idx) => `
                                <div class="scene-card ${idx === 0 ? 'open' : ''}" data-scene-idx="${idx}">
                                    <div class="scene-header">
                                        <span class="scene-header-title">${scene.title}</span>
                                        <span class="scene-header-time">${scene.time}</span>
                                    </div>
                                    <div class="scene-body">
                                        <p class="scene-analysis-text">${scene.description}</p>
                                        <ul class="scene-bullets">
                                            <li><i class="ri-eye-line"></i> <span><strong>Technique:</strong> ${scene.analysis}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>

                <!-- Journaling column -->
                <div class="study-pane-sidebar">
                    <div class="study-pane-journal">
                        <h4 class="study-section-title" style="margin-bottom:0.25rem;">
                            <i class="ri-quill-pen-line"></i> Notes Journal
                        </h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">Record your observations on blocking, camera movements, and pacing.</p>
                        <textarea class="journal-textarea" id="filmNotesTextarea" placeholder="Start typing your study notes here...">${noteText}</textarea>
                        
                        <div class="journal-actions">
                            <span class="journal-status-indicator" id="notesSaveStatus">
                                <i class="ri-checkbox-circle-line" style="display:none;" id="notesSavedCheck"></i>
                                <span id="notesStatusText">Ready</span>
                            </span>
                            <button class="btn-save-note" id="btnSaveFilmNotes">Save Notes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Bind Watch status toggle button
        const btnWatch = document.getElementById("watchToggleBtn");
        btnWatch.addEventListener("click", () => {
            const index = state.watchedFilms.indexOf(film.id);
            if (index > -1) {
                state.watchedFilms.splice(index, 1);
            } else {
                state.watchedFilms.push(film.id);
            }
            saveWatchedState();
            renderPathDetails();
        });

        // Bind Scenes Accordion click toggle
        const accordionCards = document.querySelectorAll(".scene-card");
        accordionCards.forEach(card => {
            const header = card.querySelector(".scene-header");
            header.addEventListener("click", () => {
                const isOpen = card.classList.contains("open");
                accordionCards.forEach(c => c.classList.remove("open"));
                if (!isOpen) {
                    card.classList.add("open");
                }
            });
        });

        // Bind Notes Textarea autosave and save button
        const notesArea = document.getElementById("filmNotesTextarea");
        const statusText = document.getElementById("notesStatusText");
        const savedCheck = document.getElementById("notesSavedCheck");
        const btnSave = document.getElementById("btnSaveFilmNotes");

        let autosaveTimeout = null;

        function triggerSave(isAuto = false) {
            statusText.textContent = "Saving...";
            savedCheck.style.display = "none";

            setTimeout(() => {
                state.filmNotes[film.id] = notesArea.value;
                saveNotesState();
                
                statusText.textContent = "Saved";
                savedCheck.style.display = "inline";
                
                setTimeout(() => {
                    if (statusText.textContent === "Saved") {
                        statusText.textContent = "Synced";
                    }
                }, 2000);
            }, 300);
        }

        notesArea.addEventListener("input", () => {
            statusText.textContent = "Unsaved changes";
            savedCheck.style.display = "none";

            clearTimeout(autosaveTimeout);
            autosaveTimeout = setTimeout(() => {
                triggerSave(true);
            }, 1500);
        });

        btnSave.addEventListener("click", () => {
            clearTimeout(autosaveTimeout);
            triggerSave(false);
        });
    }

    // --- Module: Simulator Page Renderer ---
    function initSimulatorModule() {
        if (state.activePage !== "simulator") return;

        renderSimulatorPresets();
        updateSimulatorUI();

        // Bind Sliders
        el.sliderFocal.addEventListener("input", (e) => {
            state.sim.focalLength = parseInt(e.target.value);
            state.sim.preset = null;
            updateSimulatorUI();
        });

        el.sliderAngle.addEventListener("input", (e) => {
            state.sim.lightingAngle = parseInt(e.target.value);
            state.sim.preset = null;
            updateSimulatorUI();
        });

        el.sliderIntensity.addEventListener("input", (e) => {
            state.sim.lightingIntensity = parseInt(e.target.value);
            state.sim.preset = null;
            updateSimulatorUI();
        });

        // Bind Color grade clicks
        el.simColorBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                state.sim.colorTone = btn.getAttribute("data-color");
                state.sim.preset = null;
                updateSimulatorUI();
            });
        });
    }

    function renderSimulatorPresets() {
        if (!el.simPresetsGrid) return;
        el.simPresetsGrid.innerHTML = "";
        
        Object.keys(SIMULATOR_PRESETS).forEach(key => {
            const preset = SIMULATOR_PRESETS[key];
            const btn = document.createElement("button");
            btn.className = "sim-preset-btn";
            if (state.sim.preset === key) btn.classList.add("active");
            btn.textContent = preset.name;
            btn.setAttribute("data-preset", key);

            btn.addEventListener("click", () => {
                loadSimulatorPreset(key);
            });
            el.simPresetsGrid.appendChild(btn);
        });
    }

    function loadSimulatorPreset(presetKey) {
        const preset = SIMULATOR_PRESETS[presetKey];
        state.sim.preset = presetKey;
        
        state.sim.focalLength = preset.focalLength;
        state.sim.lightingAngle = preset.lightingAngle;
        state.sim.lightingIntensity = preset.lightingIntensity;
        state.sim.colorTone = preset.colorTone;

        // Sync slider positions
        el.sliderFocal.value = preset.focalLength;
        el.sliderAngle.value = preset.lightingAngle;
        el.sliderIntensity.value = preset.lightingIntensity;

        updateSimulatorUI();
    }

    function updateSimulatorUI() {
        if (state.activePage !== "simulator" || !el.sliderFocal) return;

        // Update indicators
        el.simValFocal.textContent = `${state.sim.focalLength}mm`;
        el.simValAngle.textContent = `${state.sim.lightingAngle}°`;
        el.simValIntensity.textContent = `${state.sim.lightingIntensity}%`;
        el.simHudLens.textContent = `${state.sim.focalLength}mm`;
        el.simHudAngle.textContent = `${state.sim.lightingAngle}° LIGHT`;

        // Style preset buttons
        document.querySelectorAll("#simPresetsGrid .sim-preset-btn").forEach(btn => {
            if (btn.getAttribute("data-preset") === state.sim.preset) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Style color grade buttons
        el.simColorBtns.forEach(btn => {
            if (btn.getAttribute("data-color") === state.sim.colorTone) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        const focal = state.sim.focalLength;
        const angle = state.sim.lightingAngle;
        const intensity = state.sim.lightingIntensity;
        const tone = state.sim.colorTone;

        // 1. Lens calculations
        const scale = 0.65 + ((focal - 18) / (85 - 18)) * 0.65;
        const blur = ((focal - 18) / (85 - 18)) * 12;
        el.simActor.style.transform = `scale(${scale})`;
        
        if (focal < 35) {
            el.simDofLabel.textContent = "WIDE DOF (DEEP FOCUS)";
            el.simDofLabel.style.color = "var(--text-secondary)";
        } else if (focal <= 50) {
            el.simDofLabel.textContent = "STANDARD DOF";
            el.simDofLabel.style.color = "var(--text-secondary)";
        } else {
            el.simDofLabel.textContent = "SHALLOW DOF (BOKEH)";
            el.simDofLabel.style.color = "var(--accent-gold)";
        }

        // 2. Lighting angle and shadow casting
        const rad = (angle - 90) * Math.PI / 180;
        const radius = 120;
        const lx = Math.cos(rad) * radius;
        const ly = Math.sin(rad) * radius;
        el.simLightingGlow.style.transform = `translate(${lx}px, ${ly}px)`;
        
        const sdx = -Math.cos(rad) * 12;
        const sdy = -Math.sin(rad) * 12;
        const shadowOpacity = (intensity / 100) * 0.7;
        const actorBlur = 8 + (100 - intensity) * 0.1;
        el.simActor.style.boxShadow = `${sdx}px ${sdy}px ${actorBlur}px rgba(0, 0, 0, ${shadowOpacity}), inset 0 0 20px rgba(0,0,0,0.8)`;

        el.simLightingGlow.style.opacity = (intensity / 100) * 0.8;
        const glowSize = 100 + (intensity / 100) * 150;
        el.simLightingGlow.style.width = `${glowSize}px`;
        el.simLightingGlow.style.height = `${glowSize}px`;

        // 3. Color Filters
        el.simCanvasOverlay.className = "sim-canvas-overlay";
        let filters = `blur(${blur}px)`;
        const brightness = 0.45 + (intensity / 100) * 0.55;
        const contrast = 0.8 + (intensity / 100) * 0.5;
        filters += ` brightness(${brightness}) contrast(${contrast})`;
        el.simCanvasOverlay.style.filter = filters;

        if (tone === "cool") {
            el.simCanvasOverlay.style.background = "linear-gradient(rgba(0,50,150,0.15), rgba(0,20,80,0.3))";
            el.simLightingGlow.style.background = "radial-gradient(circle, rgba(200,230,255,1) 0%, rgba(50,100,255,0) 70%)";
            el.simActor.style.borderColor = "rgba(100, 200, 255, 0.4)";
        } else if (tone === "warm") {
            el.simCanvasOverlay.style.background = "linear-gradient(rgba(180,120,20,0.12), rgba(120,60,10,0.2))";
            el.simLightingGlow.style.background = "radial-gradient(circle, rgba(255,220,150,1) 0%, rgba(212,175,55,0) 70%)";
            el.simActor.style.borderColor = "rgba(212, 175, 55, 0.5)";
        } else if (tone === "desaturated") {
            el.simCanvasOverlay.style.background = "linear-gradient(rgba(50,50,50,0.08), rgba(0,0,0,0.2))";
            el.simCanvasOverlay.style.filter += " saturate(0.2)";
            el.simLightingGlow.style.background = "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)";
            el.simActor.style.borderColor = "rgba(255,255,255,0.3)";
        } else if (tone === "greenish") {
            el.simCanvasOverlay.style.background = "linear-gradient(rgba(20,120,40,0.12), rgba(5,40,10,0.25))";
            el.simLightingGlow.style.background = "radial-gradient(circle, rgba(200,255,180,1) 0%, rgba(50,150,50,0) 70%)";
            el.simActor.style.borderColor = "rgba(150, 255, 150, 0.4)";
        }

        // 4. Analysis text box
        let titleText = "Custom Composition";
        let descText = "You have customized the parameters. Adjust focal length to compress perspective, or orbit the lighting angle to study shadow shapes.";
        
        if (state.sim.preset && SIMULATOR_PRESETS[state.sim.preset]) {
            const p = SIMULATOR_PRESETS[state.sim.preset];
            if (focal === p.focalLength && angle === p.lightingAngle && intensity === p.lightingIntensity && tone === p.colorTone) {
                titleText = p.name;
                descText = p.explanation;
            }
        }
        
        el.simExpTitle.textContent = titleText;
        el.simExpText.textContent = descText;
    }

    // --- Module: Journal Page Renderer ---
    function initJournalModule() {
        const notebookContainer = document.getElementById("notebookContent");
        if (!notebookContainer) return;
        
        notebookContainer.innerHTML = "";
        
        if (!state.activeRoom) {
            notebookContainer.innerHTML = `
                <div style="text-align:center; padding: 4rem 1rem; color: var(--text-muted); background: var(--bg-secondary); border-radius: 8px; border: 1px dashed rgba(212,175,55,0.25);">
                    <i class="ri-door-lock-line" style="font-size: 4rem; color: rgba(212,175,55,0.2); display: block; margin-bottom: 1rem;"></i>
                    <h2 style="margin-top:1rem; color: var(--text-primary); font-size: 1.8rem; font-family: var(--font-ui); font-weight: 700; letter-spacing: 1px;">Access Restricted</h2>
                    <p style="margin-top:0.75rem; max-width: 550px; margin-left: auto; margin-right: auto; line-height: 1.6; font-size: 0.95rem; color: var(--text-secondary);">
                        Please enter a room code or username in the panel above to access your watchlist. 
                        Only by entering the correct name or room number can you access the stored list.
                    </p>
                    <div style="margin-top: 2rem; background: rgba(212,175,55,0.03); border: 1px solid rgba(212,175,55,0.15); padding: 1.25rem; border-radius: 6px; display: inline-block; text-align: left; max-width: 500px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                        <span style="color: var(--accent-gold); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.35rem;"><i class="ri-user-add-line"></i> Creating a new Room?</span>
                        Simply type any unique room name or code of your choice (e.g., <code>jesnow-list</code>) and click <strong>Connect</strong>. A new sync room will be created for you automatically!
                    </div>
                </div>
            `;
            const countElement = document.getElementById("notebookTotalCount");
            if (countElement) {
                countElement.textContent = "Locked";
            }
            
            // --- Room Sync Binding ---
            initRoomSyncUI();
            return;
        }
        
        let watchedFilmsCount = 0;
        
        const countElement = document.getElementById("notebookTotalCount");
        if (countElement) {
            countElement.textContent = `${state.watchedFilms.length} / 1760`;
        }
        
        if (state.watchedFilms.length === 0) {
            notebookContainer.innerHTML = `
                <div style="text-align:center; padding: 4rem 1rem; color: var(--text-muted); background: var(--bg-secondary); border-radius: 8px; border: 1px dashed var(--border-color);">
                    <i class="ri-movie-2-line" style="font-size: 4rem; color: rgba(212,175,55,0.2);"></i>
                    <h2 style="margin-top:1rem; color: var(--text-primary);">Your Watch Log is Empty</h2>
                    <p style="margin-top:0.5rem;">Start exploring the curriculum and mark films as watched to see them here.</p>
                    <a class="btn-primary" style="margin-top:1.5rem; display:inline-block;" href="direction.html">Explore Curriculum</a>
                </div>
            `;
            return;
        }

        // Group watched films by pathTitle
        const groups = {};

        const addFilmToGroup = (groupName, film, personName, pathKey, personId, personRegion) => {
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push({ ...film, personName, pathKey, personId, personRegion });
        };

        const legacyAdded = new Set();

        Object.keys(FILMS_DATA).forEach(pathKey => {
            const path = FILMS_DATA[pathKey];
            if (pathKey === "director" || pathKey === "editor" || pathKey === "cinematographer") {
                const listKey = pathKey === "director" ? "directors" : (pathKey === "editor" ? "editors" : "cinematographers");
                path[listKey].forEach(person => {
                    if (person.mustWatch) {
                        person.mustWatch.forEach(movie => {
                            const mId = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                            if (state.watchedFilms.includes(mId)) {
                                let targetSource = state.watchedSources[mId];
                                if (targetSource === "Direction Curriculum") targetSource = "DIRECTION";
                                if (targetSource === "Editing Curriculum") targetSource = "EDITING";
                                if (targetSource === "Cinematography Curriculum") targetSource = "CINEMATOGRAPHY";

                                if (targetSource === path.title || (!targetSource && !legacyAdded.has(mId))) {
                                    addFilmToGroup(path.title, { ...movie, mId: mId }, person.name, pathKey, person.id, person.region);
                                    legacyAdded.add(mId);
                                }
                            }
                        });
                    }
                });
            }
            if (path.films) {
                path.films.forEach(film => {
                    if (state.watchedFilms.includes(film.id)) {
                        let targetSource = state.watchedSources[film.id];
                        if (targetSource === "Direction Curriculum") targetSource = "DIRECTION";
                        if (targetSource === "Editing Curriculum") targetSource = "EDITING";
                        if (targetSource === "Cinematography Curriculum") targetSource = "CINEMATOGRAPHY";

                        if (targetSource === path.title || (!targetSource && !legacyAdded.has(film.id))) {
                            addFilmToGroup(path.title, { ...film, mId: film.id }, null, pathKey, null, null);
                            legacyAdded.add(film.id);
                        }
                    }
                });
            }
        });

        // Render groups
        Object.keys(groups).forEach(groupTitle => {
            const films = groups[groupTitle];
            if (films.length === 0) return;

            const groupSection = document.createElement('div');
            groupSection.style.marginBottom = '4rem';

            groupSection.innerHTML = `
                <h2 style="font-size: 1.5rem; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between;">
                    ${groupTitle}
                    <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: normal; background: rgba(212,175,55,0.1); padding: 0.25rem 0.75rem; border-radius: 4px; border: 1px solid rgba(212,175,55,0.2);">${films.length} Screened</span>
                </h2>
            `;

            // Group films by person
            const personGroups = {};
            films.forEach(movie => {
                const pName = movie.personName || "Other Selected Films";
                if (!personGroups[pName]) personGroups[pName] = [];
                personGroups[pName].push(movie);
            });

            Object.keys(personGroups).forEach(pName => {
                const subSection = document.createElement('div');
                subSection.style.marginBottom = '2.5rem';
                
                let iconHtml = '<i class="ri-user-star-line"></i>';
                if (pName === "Other Selected Films") iconHtml = '<i class="ri-film-line"></i>';

                subSection.innerHTML = `
                    <h3 style="font-size: 1.15rem; color: var(--accent-gold); margin-bottom: 1.25rem; font-family: var(--font-ui); display: flex; align-items: center; gap: 0.5rem; padding-left: 0.5rem; border-left: 3px solid var(--accent-gold);">
                        ${iconHtml} ${pName}
                    </h3>
                    <div class="notebook-poster-grid"></div>
                `;

                const grid = subSection.querySelector('.notebook-poster-grid');

                personGroups[pName].forEach(movie => {
                    const card = document.createElement('div');
                    card.className = "notebook-poster-card";
                    card.id = `notebook-film-${movie.mId}`;

                    let targetUrl = "#";
                    if (movie.pathKey === "director" || movie.pathKey === "editor" || movie.pathKey === "cinematographer") {
                        const prefix = movie.pathKey === "director" ? "direction" : (movie.pathKey === "editor" ? "editing" : "cinematography");
                        const paramKey = movie.pathKey === "director" ? "director" : (movie.pathKey === "editor" ? "editor" : "cinematographer");
                        const indianSubregions = ["bengali", "malayalam", "tamil", "hindi", "telugu", "kannada", "marathi"];

                        if (indianSubregions.includes(movie.personRegion)) {
                            targetUrl = `${prefix}-indian.html?subregion=${movie.personRegion}&${paramKey}=${movie.personId}&film=${movie.mId}`;
                        } else {
                            targetUrl = `${prefix}-${movie.personRegion}.html?${paramKey}=${movie.personId}&film=${movie.mId}`;
                        }
                    } else if (movie.pathKey) {
                        targetUrl = `${movie.pathKey}.html?film=${movie.mId}`;
                    }

                    card.innerHTML = `
                        <div class="npc-poster-container" style="cursor: pointer;" onclick="window.location.href='${targetUrl}'">
                            ${movie.poster ? `
                                <img src="${movie.poster}" alt="${movie.title}" loading="lazy" onerror="this.outerHTML='<div class=&quot;npc-poster-placeholder&quot;><i class=&quot;ri-clapperboard-line&quot;></i></div>'" />
                            ` : `
                                <div class="npc-poster-placeholder">
                                    <i class="ri-clapperboard-line"></i>
                                </div>
                            `}
                            <button class="npc-remove-btn" data-film-id="${movie.mId}" title="Unmark as Watched">
                                <i class="ri-close-line"></i>
                            </button>
                        </div>
                        <div class="npc-info" style="cursor: pointer;" onclick="window.location.href='${targetUrl}'">
                            <h4 class="npc-title" title="${movie.title}">${movie.title}</h4>
                            <div class="npc-year">${movie.year || ''}</div>
                            <div class="npc-watched-date" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid rgba(255,255,255,0.1);"><i class="ri-calendar-line"></i> ${state.watchedDates && state.watchedDates[movie.mId] ? state.watchedDates[movie.mId] : "Unknown Date"}</div>
                        </div>
                    `;

                    const btn = card.querySelector('.npc-remove-btn');
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const index = state.watchedFilms.indexOf(movie.mId);
                        if (index > -1) {
                            state.watchedFilms.splice(index, 1);
                            delete state.watchedDates[movie.mId];
                            saveWatchedState();
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                card.remove();
                                const cEl = document.getElementById("notebookTotalCount");
                                if (cEl) {
                                    cEl.textContent = state.watchedFilms.length + " / 1760";
                                }
                                if (grid.children.length === 0) {
                                    subSection.remove();
                                }
                                if (groupSection.querySelectorAll('.notebook-poster-card').length === 0) {
                                    groupSection.remove();
                                }
                                if (state.watchedFilms.length === 0) {
                                    initJournalModule();
                                }
                            }, 200);
                        }
                    });

                    grid.appendChild(card);
                });
                
                groupSection.appendChild(subSection);
            });

            notebookContainer.appendChild(groupSection);
        });

        // --- Room Sync Binding ---
        initRoomSyncUI();
    }

    function updateJournalStatsPanel(watched, totalFilms) {
        const notesCount = Object.keys(state.filmNotes).filter(key => state.filmNotes[key].trim() !== "").length;
        const progressPercent = totalFilms > 0 ? Math.round((watched / totalFilms) * 100) : 0;

        if (el.statsWatched) el.statsWatched.textContent = watched;
        if (el.statsNotes) el.statsNotes.textContent = notesCount;
        if (el.statsProgress) el.statsProgress.textContent = `${progressPercent}%`;
    }

    function exportJournalToMarkdown() {
        let md = "# CineScholar Film Studies Watch Log\n\n";
        md += `* **Generated:** ${new Date().toLocaleDateString()}\n`;
        
        let totalFilms = 0;
        let watched = 0;
        
        Object.keys(FILMS_DATA).forEach(pathKey => {
            const path = FILMS_DATA[pathKey];
            if (pathKey === "director" || pathKey === "editor" || pathKey === "cinematographer") {
                const listKey = pathKey === "director" ? "directors" : (pathKey === "editor" ? "editors" : "cinematographers");
                path[listKey].forEach(person => {
                    totalFilms += person.mustWatch.length;
                    person.mustWatch.forEach(movie => {
                        const mId = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        if (state.watchedFilms.includes(mId)) {
                            watched++;
                        }
                    });
                });
            } else {
                totalFilms += path.films.length;
                path.films.forEach(film => {
                    if (state.watchedFilms.includes(film.id)) {
                        watched++;
                    }
                });
            }
        });
        
        md += `* **Screenings Completed:** ${watched} of ${totalFilms} films\n`;
        md += `* **Note Entries Created:** ${Object.keys(state.filmNotes).filter(k => state.filmNotes[k].trim() !== "").length} items analyzed\n\n`;
        md += `---\n\n`;

        Object.keys(FILMS_DATA).forEach(pathKey => {
            const path = FILMS_DATA[pathKey];
            md += `## Pathway: ${path.title}\n\n`;
            
            if (pathKey === "director" || pathKey === "editor" || pathKey === "cinematographer") {
                const listKey = pathKey === "director" ? "directors" : (pathKey === "editor" ? "editors" : "cinematographers");
                const label = pathKey === "director" ? "Master Director" : (pathKey === "editor" ? "Master Editor" : "Master Cinematographer");
                
                path[listKey].forEach(person => {
                    const note = state.filmNotes[person.id] || "";
                    let watchedCount = 0;
                    const filmStatuses = person.mustWatch.map(movie => {
                        const mId = movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        const isW = state.watchedFilms.includes(mId);
                        if (isW) watchedCount++;
                        return `  * ${isW ? "✅" : "❌"} ${movie.title} (${movie.year}) - Focus: ${movie.focus}`;
                    });
                    
                    if (note.trim() !== "" || watchedCount > 0) {
                        md += `### ${label}: ${person.name} (${person.years})\n`;
                        md += `* **Status:** Screened ${watchedCount} of ${person.mustWatch.length} must-watch viewings\n`;
                        md += `* **Must-Watch Checklist:**\n${filmStatuses.join("\n")}\n\n`;
                        
                        if (note.trim() !== "") {
                            md += `#### Student Critique & Observations:\n\`\`\`text\n${note}\n\`\`\`\n\n`;
                        } else {
                            md += `_No critique logged for this ${label.toLowerCase()} yet._\n\n`;
                        }
                    }
                });
            } else {
                path.films.forEach(film => {
                    const isWatched = state.watchedFilms.includes(film.id);
                    const note = state.filmNotes[film.id] || "";
                    
                    if (isWatched || note.trim() !== "") {
                        md += `### ${film.title} (${film.year})\n`;
                        md += `* **Director:** ${film.director}\n`;
                        md += `* **Status:** ${isWatched ? "✅ Completed Screening" : "❌ Uncompleted Screening"}\n`;
                        md += `* **Study Focus:** _${film.lesson}_\n\n`;
                        
                        if (note.trim() !== "") {
                            md += `#### Student Critique & Observations:\n\`\`\`text\n${note}\n\`\`\`\n\n`;
                        } else {
                            md += `_No critique logged for this screening yet._\n\n`;
                        }
                    }
                });
            }
            md += `\n`;
        });

        // Trigger browser download
        const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "cinescholar-notes.md");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // --- Module: Glossary Page Renderer ---
    function initGlossaryModule() {
        if (state.activePage !== "glossary") return;

        renderGlossaryTerms();

        // Bind Search
        el.glossarySearch.addEventListener("input", (e) => {
            renderGlossaryTerms(e.target.value);
        });
    }

    function renderGlossaryTerms(filterText = "") {
        if (!el.glossaryGrid) return;
        el.glossaryGrid.innerHTML = "";
        
        const query = filterText.toLowerCase().trim();
        const filtered = GLOSSARY_DATA.filter(item => {
            return item.term.toLowerCase().includes(query) || 
                   item.definition.toLowerCase().includes(query) ||
                   item.example.toLowerCase().includes(query);
        });

        if (filtered.length === 0) {
            el.glossaryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 2rem; color:var(--text-muted);">
                    <i class="ri-search-eye-line" style="font-size: 2.5rem; display:block; margin-bottom:1rem;"></i>
                    <h3>No glossary terms match your search</h3>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = "glossary-card";

            // Highlight matches
            let termHtml = item.term;
            if (query && item.term.toLowerCase().includes(query)) {
                const reg = new RegExp(`(${query})`, "gi");
                termHtml = item.term.replace(reg, `<mark style="background-color: rgba(212,175,55,0.3); color: white; border-radius:2px; padding:0 2px;">$1</mark>`);
            }

            card.innerHTML = `
                <h4 class="glossary-term">${termHtml}</h4>
                <p class="glossary-definition">${item.definition}</p>
                <p class="glossary-example"><strong>Example:</strong> ${item.example}</p>
            `;
            el.glossaryGrid.appendChild(card);
        });
    }


    // --- Module: Global Search Engine (Direction Page) ---
    function initGlobalSearch() {
        const searchInput  = document.getElementById("globalSearchInput");
        const searchResults = document.getElementById("globalSearchResults");
        const searchResultsInner = document.getElementById("globalSearchResultsInner");
        const searchClear  = document.getElementById("globalSearchClear");

        if (!searchInput || !searchResults) return;

        // ---- Build flat search index from all directors & editors data ----
        const searchIndex = [];

        const handleSearchItemClick = (person, film, pathType = "direction") => {
            const indianSubregions = ["bengali", "malayalam", "tamil", "hindi", "telugu", "kannada", "marathi"];
            const prefix = pathType;
            let url;
            let paramKey = "director";
            if (pathType === "editing") paramKey = "editor";
            if (pathType === "cinematography") paramKey = "cinematographer";
            
            
            if (indianSubregions.includes(person.region)) {
                url = `${prefix}-indian.html?subregion=${person.region}&${paramKey}=${person.id}`;
            } else {
                url = `${prefix}-${person.region}.html?${paramKey}=${person.id}`;
            }
            if (film) {
                const filmId = film.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                url += `&film=${filmId}`;
            }
            window.location.href = url;
        };

        // Index directors
        const dirData = FILMS_DATA["director"];
        if (dirData && dirData.directors) {
            dirData.directors.forEach(director => {
                // Index: Director
                searchIndex.push({
                    type: "director",
                    icon: "ri-user-star-line",
                    label: "Director",
                    title: director.name,
                    meta: director.years + " · " + director.region.replace(/-/g, " "),
                    action: () => handleSearchItemClick(director, null, "direction")
                });

                // Index: Films under this director
                director.mustWatch.forEach(film => {
                    searchIndex.push({
                        type: "film",
                        icon: "ri-film-line",
                        label: "Film",
                        title: film.title,
                        meta: `${film.year} · Dir: ${director.name}`,
                        extraTags: [
                            film.writer && !['none', 'n/a', 'na'].includes(String(film.writer).trim().toLowerCase()) ? `Writer: ${film.writer}` : null,
                            film.cinematographer && !['none', 'n/a', 'na'].includes(String(film.cinematographer).trim().toLowerCase()) ? `DP: ${film.cinematographer}` : null,
                            film.editor && !['none', 'n/a', 'na'].includes(String(film.editor).trim().toLowerCase()) ? `Editor: ${film.editor}` : null,
                            film.composer && !['none', 'n/a', 'na'].includes(String(film.composer).trim().toLowerCase()) ? `Music: ${film.composer}` : null,
                            film.studio && !['none', 'n/a', 'na'].includes(String(film.studio).trim().toLowerCase()) ? film.studio : null,
                        ].filter(Boolean).join(" · "),
                        matchExtra: [
                            film.writer, film.cinematographer, film.editor, film.composer, film.studio
                        ].filter(Boolean).join(" ").toLowerCase(),
                        action: () => handleSearchItemClick(director, film, "direction")
                    });
                });
            });
        }

        // Index editors
        const editData = FILMS_DATA["editor"];
        if (editData && editData.editors) {
            editData.editors.forEach(editor => {
                // Index: Editor
                searchIndex.push({
                    type: "director", // treated similarly for formatting
                    icon: "ri-scissors-cut-line",
                    label: "Editor",
                    title: editor.name,
                    meta: editor.years + " · " + editor.region.replace(/-/g, " "),
                    action: () => handleSearchItemClick(editor, null, "editing")
                });

                // Index: Films under this editor
                editor.mustWatch.forEach(film => {
                    searchIndex.push({
                        type: "film",
                        icon: "ri-film-line",
                        label: "Film",
                        title: film.title,
                        meta: `${film.year} · Editor: ${editor.name}`,
                        extraTags: [
                            film.writer && !['none', 'n/a', 'na'].includes(String(film.writer).trim().toLowerCase()) ? `Writer: ${film.writer}` : null,
                            film.cinematographer && !['none', 'n/a', 'na'].includes(String(film.cinematographer).trim().toLowerCase()) ? `DP: ${film.cinematographer}` : null,
                            film.editor && !['none', 'n/a', 'na'].includes(String(film.editor).trim().toLowerCase()) ? `Editor: ${film.editor}` : null,
                            film.composer && !['none', 'n/a', 'na'].includes(String(film.composer).trim().toLowerCase()) ? `Music: ${film.composer}` : null,
                            film.studio && !['none', 'n/a', 'na'].includes(String(film.studio).trim().toLowerCase()) ? film.studio : null,
                        ].filter(Boolean).join(" · "),
                        matchExtra: [
                            film.writer, film.cinematographer, film.editor, film.composer, film.studio
                        ].filter(Boolean).join(" ").toLowerCase(),
                        action: () => handleSearchItemClick(editor, film, "editing")
                    });
                });
            });
        }

        // Index cinematographers
        const cinemaData = FILMS_DATA["cinematographer"];
        if (cinemaData && cinemaData.cinematographers) {
            cinemaData.cinematographers.forEach(dp => {
                // Index: Cinematographer
                searchIndex.push({
                    type: "director", // treated similarly for formatting
                    icon: "ri-camera-lens-line",
                    label: "Cinematographer",
                    title: dp.name,
                    meta: dp.years + " · " + dp.region.replace(/-/g, " "),
                    action: () => handleSearchItemClick(dp, null, "cinematography")
                });

                // Index: Films under this cinematographer
                dp.mustWatch.forEach(film => {
                    searchIndex.push({
                        type: "film",
                        icon: "ri-film-line",
                        label: "Film",
                        title: film.title,
                        meta: `${film.year} · DP: ${dp.name}`,
                        extraTags: [
                            film.writer && !['none', 'n/a', 'na'].includes(String(film.writer).trim().toLowerCase()) ? `Writer: ${film.writer}` : null,
                            film.cinematographer && !['none', 'n/a', 'na'].includes(String(film.cinematographer).trim().toLowerCase()) ? `DP: ${film.cinematographer}` : null,
                            film.editor && !['none', 'n/a', 'na'].includes(String(film.editor).trim().toLowerCase()) ? `Editor: ${film.editor}` : null,
                            film.composer && !['none', 'n/a', 'na'].includes(String(film.composer).trim().toLowerCase()) ? `Music: ${film.composer}` : null,
                            film.studio && !['none', 'n/a', 'na'].includes(String(film.studio).trim().toLowerCase()) ? film.studio : null,
                        ].filter(Boolean).join(" · "),
                        matchExtra: [
                            film.writer, film.cinematographer, film.editor, film.composer, film.studio
                        ].filter(Boolean).join(" ").toLowerCase(),
                        action: () => handleSearchItemClick(dp, film, "cinematography")
                    });
                });
            });
        }

        // ---- Index other craft pathways (excluding editor now) ----
        const craftPaths = [
            { key: "writer", name: "Writer", icon: "ri-quill-pen-line" },
            { key: "sound", name: "Sound Design", icon: "ri-volume-up-line" }
        ];

        craftPaths.forEach(craft => {
            const pathData = FILMS_DATA[craft.key];
            if (pathData && pathData.films) {
                pathData.films.forEach(film => {
                    const filmId = film.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    
                    searchIndex.push({
                        type: "craft",
                        craftKey: craft.key,
                        icon: craft.icon,
                        label: `Study: ${craft.name}`,
                        title: film.title,
                        meta: `${film.year} · ${craft.name} Study`,
                        extraTags: film.takeaway ? `Lesson: ${film.takeaway.substring(0, 50)}...` : null,
                        matchExtra: [film.director, film.takeaway, film.lesson, film.cinematographer, film.writer, film.editor, film.composer].filter(Boolean).join(" ").toLowerCase(),
                        action: () => {
                            window.location.href = `${craft.key}.html?film=${filmId}`;
                        }
                    });
                });
            }
        });

        // ---- Highlight helper ----
        function highlight(text, query) {
            if (!query) return text;
            const index = text.toLowerCase().indexOf(query.toLowerCase());
            if (index >= 0) {
                return text.substring(0, index) + 
                    '<span class="search-highlight">' + text.substring(index, index + query.length) + '</span>' + 
                    text.substring(index + query.length);
            }
            return text;
        }

        // Keyboard search state
        let focusIndex = -1;
        let visibleItems = [];

        function getFocusedItems() {
            return Array.from(searchResultsInner.querySelectorAll(".gsr-item"));
        }

        document.addEventListener('click', (e) => {
            if (e.target.closest('.toggle-quick-watch')) {
                const btn = e.target.closest('.toggle-quick-watch');
                const filmId = btn.dataset.filmId;
                const source = btn.dataset.source || null;
                toggleQuickWatch(filmId, btn, source);
            }
        });

        function moveFocus(delta) {
            const items = getFocusedItems();
            if (items.length === 0) return;

            if (focusIndex >= 0 && focusIndex < items.length) {
                items[focusIndex].classList.remove("focused");
            }

            focusIndex += delta;
            if (focusIndex < 0) focusIndex = items.length - 1;
            if (focusIndex >= items.length) focusIndex = 0;

            items[focusIndex].classList.add("focused");
            items[focusIndex].scrollIntoView({ block: "nearest" });
        }

        function runSearch(query) {
            visibleItems = [];
            focusIndex = -1;

            if (!query.trim()) {
                searchResultsInner.innerHTML = "";
                searchResults.style.display = "none";
                searchClear.style.display = "none";
                return;
            }

            searchClear.style.display = "block";

            const q = query.toLowerCase().trim();
            const words = q.split(/\s+/);

            // Filter
            const results = searchIndex.filter(item => {
                const titleMatch = item.title.toLowerCase().includes(q);
                const metaMatch = item.meta.toLowerCase().includes(q);
                const extraMatch = item.extraTags ? item.extraTags.toLowerCase().includes(q) : false;
                const matchTags = item.matchExtra ? item.matchExtra.includes(q) : false;
                
                // Also check if all search query words match the tags or titles
                const allWordsMatch = words.every(w => 
                    item.title.toLowerCase().includes(w) || 
                    item.meta.toLowerCase().includes(w) || 
                    (item.extraTags && item.extraTags.toLowerCase().includes(w))
                );

                return titleMatch || metaMatch || extraMatch || matchTags || allWordsMatch;
            });

            // Sort results by relevance
            results.sort((a, b) => {
                const aExact = a.title.toLowerCase().startsWith(q) ? 2 : (a.title.toLowerCase().includes(q) ? 1 : 0);
                const bExact = b.title.toLowerCase().startsWith(q) ? 2 : (b.title.toLowerCase().includes(q) ? 1 : 0);
                if (aExact !== bExact) return bExact - aExact;
                return a.title.localeCompare(b.title);
            });

            // Render
            searchResultsInner.innerHTML = "";
            
            if (results.length === 0) {
                searchResultsInner.innerHTML = `
                    <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
                        <i class="ri-search-line" style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
                        No results found for "${query}"
                    </div>
                `;
                searchResults.style.display = "block";
                return;
            }

            results.forEach(res => {
                const item = document.createElement("div");
                item.className = "gsr-item";
                item.innerHTML = `
                    <div class="gsr-item-left">
                        <i class="${res.icon} gsr-item-icon"></i>
                        <div>
                            <div class="gsr-item-title">${highlight(res.title, q)}</div>
                            <div class="gsr-item-meta">&nbsp;${res.meta}</div>
                            ${res.extraTags ? `<div class="gsr-item-extra">${highlight(res.extraTags, q)}</div>` : ""}
                        </div>
                    </div>
                    <span class="gsr-item-type">${res.label}</span>
                `;
                
                item.addEventListener("click", () => {
                    res.action();
                    closeSearch();
                });
                
                searchResultsInner.appendChild(item);
            });

            searchResults.style.display = "block";
        }

        function closeSearch() {
            searchInput.value = "";
            searchResultsInner.innerHTML = "";
            searchResults.style.display = "none";
            searchClear.style.display = "none";
            focusIndex = -1;
        }

        // Bind events
        searchInput.addEventListener("input", (e) => runSearch(e.target.value));

        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                moveFocus(1);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                moveFocus(-1);
            } else if (e.key === "Enter") {
                e.preventDefault();
                const items = getFocusedItems();
                if (focusIndex >= 0 && focusIndex < items.length) {
                    items[focusIndex].click();
                } else if (items.length > 0) {
                    items[0].click();
                }
            } else if (e.key === "Escape") {
                closeSearch();
            }
        });

        searchClear.addEventListener("click", closeSearch);

        document.addEventListener("click", (e) => {
            const wrap = document.getElementById("globalSearchWrapper");
            if (wrap && !wrap.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = "none";
            }
        });

        searchInput.addEventListener("focus", () => {
            if (searchInput.value.trim()) {
                searchResults.style.display = "block";
            }
        });
    }

    // --- Module: 3D Tilt Cards ---
    function init3DTiltCards() {
        const tiltCards = document.querySelectorAll('[data-tilt]');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.zIndex = "10";
                
                const glare = card.querySelector('.glare');
                if (glare) {
                    const percentageX = (x / rect.width) * 100;
                    const percentageY = (y / rect.height) * 100;
                    glare.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(212, 175, 55, 0.25) 0%, rgba(255, 255, 255, 0) 70%)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.zIndex = "1";
                const glare = card.querySelector('.glare');
                if (glare) {
                    glare.style.background = `none`;
                }
            });
        });
    }

    // --- Initializer Orchestration ---
    function init() {
        initSharedElements();

        // Initialize modules based on page identifiers
        if (state.activePage === "director-hub" || state.activePage === "editor-hub" || state.activePage === "cinematographer-hub") {
            initDirectorHubModule();
        } else if (["director", "writer", "editor", "cinematographer", "sound"].includes(state.activePage)) {
            initCurriculumModule();
            if (state.activePage === "director" || state.activePage === "editor" || state.activePage === "cinematographer") {
                initRegionDropdown();
            }
        } else if (state.activePage === "simulator") {
            initSimulatorModule();
        } else if (state.activePage === "watch-log") {
            initJournalModule();
        } else if (state.activePage === "glossary") {
            initGlossaryModule();
        }

        // Init global search on direction/editing/cinematography explorer or hub page
        if (["director", "director-hub", "editor", "editor-hub", "cinematographer", "cinematographer-hub"].includes(state.activePage)) {
            initGlobalSearch();
        }

        init3DTiltCards();
    }

    // --- Supabase watch-log integration helpers ---
    const supabaseUrl = "https://vqitxshhlmzdgwzbfgbn.supabase.co";
    let supabaseKey = "sb_publishable_BS3bEGCedxuBZBok52B-Yg_UahuFdRN";
    let supabaseClient = null;

    function mergeWatchlists(remote) {
        const localFilms = state.watchedFilms || [];
        const remoteFilms = remote.watched_films || [];
        state.watchedFilms = Array.from(new Set([...localFilms, ...remoteFilms]));
        
        const localSources = state.watchedSources || {};
        const remoteSources = remote.watched_sources || {};
        state.watchedSources = { ...remoteSources, ...localSources };
        
        const localDates = state.watchedDates || {};
        const remoteDates = remote.watched_dates || {};
        state.watchedDates = { ...remoteDates, ...localDates };
        
        const localNotes = state.filmNotes || {};
        const remoteNotes = remote.film_notes || {};
        state.filmNotes = { ...remoteNotes, ...localNotes };
    }

    async function syncToCloud() {
        if (!supabaseClient || !state.activeRoom) return;
        try {
            await supabaseClient
                .from('watchlists')
                .upsert({
                    room_key: state.activeRoom,
                    watched_films: state.watchedFilms,
                    watched_sources: state.watchedSources,
                    watched_dates: state.watchedDates,
                    film_notes: state.filmNotes,
                    updated_at: new Date().toISOString()
                });
        } catch (e) {
            console.error("Cloud sync failed:", e);
        }
    }

    async function backgroundSyncRoom(roomKey) {
        if (!supabaseClient) return;
        try {
            const { data, error } = await supabaseClient
                .from('watchlists')
                .select('*')
                .eq('room_key', roomKey)
                .maybeSingle();
                
            if (error) {
                console.error("Background sync error:", error);
                return;
            }
            
            if (data) {
                mergeWatchlists(data);
                localStorage.setItem("cine_watched_films", JSON.stringify(state.watchedFilms));
                localStorage.setItem("cine_watched_sources", JSON.stringify(state.watchedSources));
                localStorage.setItem("cine_watched_dates", JSON.stringify(state.watchedDates));
                localStorage.setItem("cine_film_notes", JSON.stringify(state.filmNotes));
                
                updateHeaderStats();
                if (state.activePage === "watch-log") {
                    initJournalModule();
                } else if (state.activePage === "explorer" || ["director", "writer", "editor", "cinematographer", "sound"].includes(state.activePage)) {
                    renderPathDetails();
                }
            }
        } catch (e) {
            console.error("Background sync failed:", e);
        }
    }

    function initSupabase(callback) {
        if (supabaseUrl && supabaseKey && supabaseKey !== "YOUR_SUPABASE_ANON_KEY") {
            if (window.supabase) {
                try {
                    supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
                } catch(e) {
                    console.error("Supabase init error:", e);
                }
                if (callback) callback();
            } else {
                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
                script.onload = () => {
                    if (window.supabase) {
                        try {
                            supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
                        } catch(e) {
                            console.error("Supabase init error:", e);
                        }
                    }
                    if (callback) callback();
                };
                script.onerror = () => {
                    console.error("Failed to load Supabase SDK from CDN");
                    if (callback) callback();
                };
                document.head.appendChild(script);
            }
        } else {
            if (callback) callback();
        }
    }

    function initRoomSyncUI() {
        const roomInput = document.getElementById("syncRoomInput");
        const btnConnect = document.getElementById("btnConnectRoom");
        const btnDisconnect = document.getElementById("btnDisconnectRoom");
        const syncTitle = document.getElementById("syncTitle");
        const syncDesc = document.getElementById("syncDesc");
        const syncIcon = document.getElementById("syncIcon");
        const roomPanel = document.querySelector(".room-sync-panel");

        function updateRoomSyncUI() {
            if (!roomInput || !btnConnect || !btnDisconnect) return;
            
            let helpText = document.getElementById("syncHelpText");
            if (!helpText && roomPanel) {
                helpText = document.createElement("div");
                helpText.id = "syncHelpText";
                helpText.style.width = "100%";
                helpText.style.fontSize = "0.8rem";
                helpText.style.color = "var(--text-muted)";
                helpText.style.marginTop = "0.75rem";
                helpText.style.borderTop = "1px solid rgba(212,175,55,0.1)";
                helpText.style.paddingTop = "0.75rem";
                helpText.style.textAlign = "left";
                roomPanel.appendChild(helpText);
            }
            
            if (state.activeRoom) {
                roomInput.style.display = "none";
                btnConnect.style.display = "none";
                btnDisconnect.style.display = "none";
                
                if (syncTitle && syncDesc && syncIcon && roomPanel) {
                    syncTitle.innerHTML = `Connected to Room: <span style="color: var(--accent-gold); font-family: var(--font-ui); font-weight: 700;">${state.activeRoom}</span>`;
                    syncDesc.textContent = "Your watchlist and notes are syncing in real-time.";
                    syncIcon.className = "ri-cloud-line";
                    syncIcon.style.color = "var(--accent-gold)";
                    roomPanel.style.borderColor = "rgba(212, 175, 55, 0.4)";
                    roomPanel.style.background = "rgba(212, 175, 55, 0.04)";
                }
                if (helpText) {
                    helpText.innerHTML = `<i class="ri-checkbox-circle-line" style="color: #4caf50; vertical-align: middle;"></i> Real-time cloud sync is active. Any movies you mark as watched on any page will be saved immediately to room <strong>${state.activeRoom}</strong>.`;
                }
            } else {
                roomInput.style.display = "";
                roomInput.value = "";
                roomInput.disabled = false;
                btnConnect.style.display = "flex";
                btnConnect.innerHTML = `<i class="ri-login-box-line"></i> Connect`;
                btnDisconnect.style.display = "none";
                
                if (syncTitle && syncDesc && syncIcon && roomPanel) {
                    syncTitle.textContent = "Watchlist Cloud Sync";
                    syncDesc.textContent = "Sync your watchlist across devices using a room code or username.";
                    syncIcon.className = "ri-cloud-windy-line";
                    syncIcon.style.color = "var(--accent-gold)";
                    roomPanel.style.borderColor = "rgba(212, 175, 55, 0.15)";
                    roomPanel.style.background = "rgba(212, 175, 55, 0.02)";
                }
                if (helpText) {
                    helpText.innerHTML = `<i class="ri-information-line" style="color: var(--accent-gold); vertical-align: middle;"></i> You can only access a room if you provide the exact username or room number. <strong style="color: var(--text-primary);">New Room?</strong> Just type a new code and click Connect to create it automatically.`;
                }
            }
        }

        async function connectToRoomProcess(roomKey) {
            try {
                const { data, error } = await supabaseClient
                    .from('watchlists')
                    .select('*')
                    .eq('room_key', roomKey)
                    .maybeSingle();
                
                if (error) {
                    alert("Database connection error: " + error.message);
                    updateRoomSyncUI();
                    return;
                }
                
                state.activeRoom = roomKey;
                localStorage.setItem("cine_active_room", roomKey);
                
                if (data) {
                    mergeWatchlists(data);
                }
                
                await syncToCloud();
                
                localStorage.setItem("cine_watched_films", JSON.stringify(state.watchedFilms));
                localStorage.setItem("cine_watched_sources", JSON.stringify(state.watchedSources));
                localStorage.setItem("cine_watched_dates", JSON.stringify(state.watchedDates));
                localStorage.setItem("cine_film_notes", JSON.stringify(state.filmNotes));
                
                alert(`Successfully connected to room "${roomKey}". Watchlist synchronized!`);
                
                updateHeaderStats();
                initJournalModule();
            } catch (err) {
                console.error("Connection process failed:", err);
                alert("Connection failed. Check console for details.");
            }
            updateRoomSyncUI();
        }

        if (btnConnect && !btnConnect.dataset.listenerBound) {
            btnConnect.dataset.listenerBound = "true";
            btnConnect.addEventListener("click", async () => {
                const roomKey = roomInput.value.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "");
                if (!roomKey) {
                    alert("Please enter a valid username or room code (alphanumeric, underscores, hyphens).");
                    return;
                }
                
                if (!supabaseClient) {
                    const keyPrompt = prompt("To connect, please enter your Supabase Anon Public Key (you can find this in your Supabase Dashboard -> Project Settings -> API):");
                    if (!keyPrompt) return;
                    supabaseKey = keyPrompt.trim();
                    localStorage.setItem("cine_supabase_anon_key", supabaseKey);
                    
                    btnConnect.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Initializing...`;
                    initSupabase(async () => {
                        if (!supabaseClient) {
                            alert("Failed to initialize Supabase. Please check your credentials and try again.");
                            btnConnect.innerHTML = `<i class="ri-login-box-line"></i> Connect`;
                            return;
                        }
                        await connectToRoomProcess(roomKey);
                    });
                } else {
                    btnConnect.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Connecting...`;
                    await connectToRoomProcess(roomKey);
                }
            });
        }

        if (btnDisconnect && !btnDisconnect.dataset.listenerBound) {
            btnDisconnect.dataset.listenerBound = "true";
            btnDisconnect.addEventListener("click", () => {
                if (confirm("Are you sure you want to disconnect from this room? Your local browser watchlist will remain, but edits will no longer sync to the cloud.")) {
                    state.activeRoom = null;
                    localStorage.removeItem("cine_active_room");
                    updateRoomSyncUI();
                }
            });
        }

        updateRoomSyncUI();
    }

    initSupabase(() => {
        init();
        if (state.activeRoom && supabaseClient) {
            backgroundSyncRoom(state.activeRoom);
        }
    });
});

