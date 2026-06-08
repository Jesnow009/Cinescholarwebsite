import os

css_path = 'd:/Film Studies Website/css/style.css'
css_content = '''

/* --- Contact Section --- */
.contact-section {
    text-align: center;
    padding: 4rem 2rem;
    margin-bottom: 2rem;
}

.contact-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 3rem;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    backdrop-filter: blur(10px);
}

.creator-name {
    font-size: 1.4rem;
    color: var(--text-color);
    margin-bottom: 2rem;
}

.creator-name strong {
    color: var(--accent-gold);
    font-family: var(--font-primary);
    letter-spacing: 1px;
}

.contact-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-color);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.social-link i {
    font-size: 1.5rem;
}

.social-link.instagram:hover {
    background: rgba(225, 48, 108, 0.1);
    border-color: #E1306C;
    color: #E1306C;
    transform: translateY(-3px);
}

.social-link.instagram i {
    color: #E1306C;
}

.social-link.whatsapp:hover {
    background: rgba(37, 211, 102, 0.1);
    border-color: #25D366;
    color: #25D366;
    transform: translateY(-3px);
}

.social-link.whatsapp i {
    color: #25D366;
}
'''

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(css_content)

print("CSS appended successfully.")
