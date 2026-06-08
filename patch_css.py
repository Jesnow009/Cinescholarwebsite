import os

css_path = 'd:/Film Studies Website/css/style.css'

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_css = '''

/* Premium Watch Log Styles */
.premium-log-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 2.5rem 1.5rem;
    padding: 1rem 0;
}

.notebook-poster-card.premium-card {
    position: relative;
    border-radius: 8px;
    background: linear-gradient(145deg, rgba(30, 30, 30, 0.6), rgba(15, 15, 15, 0.8));
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 0.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
}

.notebook-poster-card.premium-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.15);
    border-color: rgba(212, 175, 55, 0.3);
}

.npc-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(212, 175, 55, 0.4);
    color: var(--accent-gold);
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.3rem 0.6rem;
    border-radius: 20px;
    z-index: 10;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.npc-log-number {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-family: monospace;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    z-index: 10;
    border-left: 2px solid var(--accent-gold);
}

.premium-card .npc-poster-container {
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.75rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}

.premium-card .npc-info {
    text-align: center;
    padding-bottom: 0.25rem;
}

.premium-card .npc-title {
    font-family: 'Cinzel', serif;
    font-weight: 600;
    color: #f0f0f0;
    margin-bottom: 0.25rem;
}

.premium-card .npc-year {
    color: var(--accent-gold);
    opacity: 0.8;
}

'''

if '.premium-log-grid' not in content:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write(new_css)
    print("Appended premium CSS to style.css")
else:
    print("Premium CSS already exists")
