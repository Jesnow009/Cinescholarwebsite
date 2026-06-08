import os

css_path = 'd:/Film Studies Website/css/style.css'

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('/* --- Contact Section --- */')

if start_idx != -1:
    content = content[:start_idx]

new_css = '''/* --- Contact Section Premium Redesign --- */
.contact-section {
    padding: 6rem 5%;
    background: linear-gradient(to bottom, transparent, rgba(10,10,10,0.8));
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    justify-content: center;
}

.contact-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    gap: 4rem;
}

@media (max-width: 768px) {
    .contact-container {
        flex-direction: column;
        text-align: center;
        gap: 3rem;
    }
}

.contact-content {
    flex: 1;
}

.contact-subtitle {
    color: var(--accent-gold);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 1rem;
    display: block;
}

.contact-title {
    font-size: 3.5rem;
    font-family: var(--font-secondary);
    color: var(--text-color);
    margin-bottom: 1rem;
    line-height: 1.1;
}

.contact-text {
    color: rgba(255,255,255,0.6);
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    max-width: 400px;
}

@media (max-width: 768px) {
    .contact-text {
        margin: 0 auto 2.5rem auto;
    }
}

.contact-socials {
    display: flex;
    gap: 1.5rem;
}

@media (max-width: 768px) {
    .contact-socials {
        justify-content: center;
    }
}

.social-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: var(--text-color);
    text-decoration: none;
    overflow: hidden;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.social-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: var(--accent-gold);
    transform: scale(0);
    border-radius: 50%;
    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 0;
}

.social-btn:hover {
    border-color: var(--accent-gold);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
}

.social-btn:hover::before {
    transform: scale(1);
}

.social-btn i {
    font-size: 1.8rem;
    z-index: 1;
    transition: color 0.4s ease;
}

.social-btn:hover i {
    color: var(--bg-color);
}

.contact-creator {
    flex: 1;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid rgba(255,255,255,0.1);
    padding-left: 4rem;
}

@media (max-width: 768px) {
    .contact-creator {
        text-align: center;
        border-left: none;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-left: 0;
        padding-top: 3rem;
    }
}

.creator-label {
    font-size: 1rem;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 0.5rem;
}

.creator-name-large {
    font-size: 4.5rem;
    font-family: var(--font-primary);
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.3);
    transition: all 0.5s ease;
    cursor: default;
    background-image: linear-gradient(to right, var(--accent-gold), #fff);
    background-clip: text;
    -webkit-background-clip: text;
}

.creator-name-large:hover {
    color: var(--accent-gold);
    -webkit-text-stroke: 0px transparent;
    text-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
}
'''

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content + new_css)

print("CSS updated successfully.")
