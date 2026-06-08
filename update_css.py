import os

css_path = 'd:/Film Studies Website/css/style.css'

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find where the contact section CSS starts
start_idx = content.find('/* --- Contact Section --- */')

if start_idx != -1:
    content = content[:start_idx] # Keep everything before the contact section

new_css = '''/* --- Contact Section --- */
.contact-section {
    text-align: center;
    padding: 3rem 2rem;
    margin-bottom: 2rem;
}

.contact-card {
    background: linear-gradient(145deg, rgba(20, 20, 20, 0.6), rgba(10, 10, 10, 0.8));
    border: 1px solid rgba(212, 175, 55, 0.15);
    border-radius: 12px;
    padding: 2.5rem;
    max-width: 450px;
    margin: 0 auto;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.contact-card:hover {
    transform: translateY(-5px);
    border-color: rgba(212, 175, 55, 0.3);
}

.creator-name {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.creator-name strong {
    display: block;
    color: var(--accent-gold);
    font-family: var(--font-primary);
    font-size: 1.8rem;
    letter-spacing: 3px;
    margin-top: 0.5rem;
    text-shadow: 0 2px 10px rgba(212, 175, 55, 0.2);
}

.contact-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
}

.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: transparent;
    color: var(--accent-gold);
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid rgba(212, 175, 55, 0.4);
    position: relative;
    overflow: hidden;
}

.social-link::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: var(--accent-gold);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
}

.social-link i {
    font-size: 1.6rem;
    z-index: 1;
    transition: color 0.3s ease;
}

.social-link:hover {
    transform: translateY(-3px);
    border-color: var(--accent-gold);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.25);
}

.social-link:hover::before {
    opacity: 1;
}

.social-link:hover i {
    color: var(--bg-color);
}
'''

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content + new_css)

print("CSS updated successfully.")
