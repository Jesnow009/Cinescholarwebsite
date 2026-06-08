import os

css_addition = """
/* Notebook Poster Grid */
.notebook-poster-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

@media (max-width: 1200px) {
    .notebook-poster-grid {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
}

@media (max-width: 768px) {
    .notebook-poster-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
    }
}

.notebook-poster-card {
    background: #13151a;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
}

.notebook-poster-card:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.npc-poster-container {
    position: relative;
    width: 100%;
    aspect-ratio: 2/3;
    background: rgba(212, 175, 55, 0.05);
}

.npc-poster-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.npc-poster-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: rgba(255,255,255,0.1);
}

.npc-remove-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0;
}

.notebook-poster-card:hover .npc-remove-btn {
    opacity: 1;
}

.npc-remove-btn:hover {
    background: #e74c3c;
    border-color: #e74c3c;
    transform: scale(1.1);
}

.npc-info {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.npc-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
    line-height: 1.3;
}

.npc-year {
    font-size: 0.8rem;
    color: var(--text-secondary);
}
"""

with open("d:/Film Studies Website/css/style.css", "a", encoding="utf-8") as f:
    f.write(css_addition)
