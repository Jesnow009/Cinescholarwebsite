import re

updates = {
    "Anantha Rathriya": {
        "plot": "A man reflects on his past actions during the 1971 JVP insurrection, specifically a traumatic incident involving a young woman he once loved.",
        "focus": "Vithanage employs a fragmented narrative structure and introspective pacing to explore guilt, memory, and the lasting psychological scars of political violence."
    },
    "Between Two Worlds": {
        "plot": "A mysterious young man falls from the sky and navigates a surreal, dreamlike landscape torn by conflict, encountering various displaced individuals.",
        "focus": "A highly allegorical and visually arresting exploration of dislocation, utilizing stark, beautiful imagery and sparse dialogue to reflect the disorientation of post-war Sri Lanka."
    },
    "Ontoryatra": {
        "plot": "A divorced mother and her son return to Bangladesh from London for a funeral, forcing them to confront their complex cultural identities and strained family dynamics.",
        "focus": "Masud delicately captures the nuances of diaspora and the emotional pull of the homeland, using intimate, naturalistic cinematography to explore the tension between modernity and tradition."
    },
    "Doob: No Bed of Roses": {
        "plot": "A successful filmmaker's life is thrown into turmoil when an illicit affair causes a deeply painful and highly publicized rift within his family.",
        "focus": "Farooki crafts a melancholic, visually poetic meditation on love, betrayal, and mortality, characterized by its deliberate pacing and emotionally raw performances."
    },
    "Manto": {
        "plot": "A biographical drama chronicling the tumultuous life of the controversial Urdu writer Saadat Hasan Manto as he struggles with censorship, alcoholism, and the trauma of the partition.",
        "focus": "A gritty, uncompromising portrait of a tortured artist, featuring a deeply immersive performance by Khoosat and a stark, unromanticized depiction of post-partition Lahore."
    },
    "Kamli": {
        "plot": "A young woman awaits the return of her husband in a remote, idyllic village, where she becomes entangled in a passionate, mysterious relationship.",
        "focus": "Khoosat blends psychological thriller elements with lyrical romance, utilizing lush, vibrant cinematography and atmospheric tension to explore female desire and societal constraints."
    },
    "Shambhala": {
        "plot": "In a polyandrous Himalayan village, a pregnant woman embarks on a perilous journey across the mountains to find her missing husband and prove her innocence.",
        "focus": "A visually majestic and spiritually profound film that captures the harsh beauty of the Himalayas, emphasizing ethnographic authenticity and a deeply empathetic portrayal of female resilience."
    },
    "Highway": {
        "plot": "The lives of several distinct passengers intersect on a fraught bus journey to Kathmandu, delayed by constant roadblocks and bandhs (political strikes).",
        "focus": "Rauniyar employs a kinetic, multi-strand narrative to capture the chaotic, transitional state of modern Nepal, blending realism with sharp social commentary."
    }
}

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

for title, data in updates.items():
    # We will regex replace the empty strings for plot and focus for each movie
    # Find the block for the title
    pattern = r'("title": "' + re.escape(title) + r'",.*?)"focus": "",\s*"plot": ""'
    replacement = r'\1"focus": "' + data["focus"] + r'",\n                        "plot": "' + data["plot"] + r'"'
    
    # Check if they are empty strings
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    if new_content == content:
        # Maybe they are "NA"?
        pattern_na = r'("title": "' + re.escape(title) + r'",.*?)"focus": "NA",\s*"plot": "NA"'
        new_content = re.sub(pattern_na, replacement, content, flags=re.DOTALL)
        if new_content == content:
            print(f"Could not find or replace empty plot/focus for {title}")
        else:
            content = new_content
            print(f"Updated {title} (from NA)")
    else:
        content = new_content
        print(f"Updated {title} (from empty string)")

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
