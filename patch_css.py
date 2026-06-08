import os

css_addition = """
/* Notebook Mini Grid */
.notebook-mini-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

@media (max-width: 1200px) {
    .notebook-mini-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 768px) {
    .notebook-mini-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 480px) {
    .notebook-mini-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.notebook-mini-card {
    background: #13151a;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 0.75rem 0.5rem 0.75rem 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease;
    height: 100%;
}

.notebook-mini-card:hover {
    border-color: var(--accent);
    background: rgba(212, 175, 55, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.notebook-mini-card-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-right: 0.5rem;
}

.notebook-mini-card-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
}

.notebook-mini-card-year {
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
}

.notebook-mini-card-btn {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
}

.notebook-mini-card-btn:hover {
    color: #e74c3c;
}
"""

with open("d:/Film Studies Website/css/style.css", "a", encoding="utf-8") as f:
    f.write(css_addition)
