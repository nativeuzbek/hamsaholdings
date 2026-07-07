"""
Build script: Generate a multi-page static site from templates and data.
Converts Flask/Jinja2 templates into plain HTML files ready for Netlify.

Usage: python build_site.py
Output: Creates a 'dist/' folder with the complete static site.
"""

import os
import sys
import shutil
import json
import re

# --- Configuration ---
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(PROJECT_DIR, 'templates')
STATIC_DIR = os.path.join(PROJECT_DIR, 'static')
DIST_DIR = os.path.join(PROJECT_DIR, 'dist')

# Import car data
sys.path.insert(0, PROJECT_DIR)
import data

def clean_dist():
    """Remove old dist folder and recreate."""
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR)
    print("[OK] Cleaned dist/ folder")

def copy_static_assets():
    """Copy CSS, JS, and images directly into dist/ (no /static/ prefix)."""
    # Copy CSS files
    for css_file in ['style.css', 'admin.css']:
        src = os.path.join(STATIC_DIR, css_file)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(DIST_DIR, css_file))

    # Copy JS files
    for js_file in ['app.js', 'cars-data.js']:
        src = os.path.join(STATIC_DIR, js_file)
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(DIST_DIR, js_file))

    # Copy images folder
    src_images = os.path.join(STATIC_DIR, 'images')
    dst_images = os.path.join(DIST_DIR, 'images')
    if os.path.exists(src_images):
        shutil.copytree(src_images, dst_images)

    print("[OK] Copied static assets (CSS, JS, images)")

def fix_asset_paths(html_content):
    """Remove /static/ prefix from all asset paths."""
    # Replace /static/ with / for absolute paths
    html_content = html_content.replace('/static/', '/')
    return html_content

def read_template(name):
    """Read a template file and return its contents."""
    filepath = os.path.join(TEMPLATES_DIR, name)
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def build_page(template_name, output_path):
    """Read a template, fix paths, and write to output."""
    html = read_template(template_name)
    html = fix_asset_paths(html)
    
    # Ensure output directory exists
    output_dir = os.path.dirname(output_path)
    os.makedirs(output_dir, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)

def format_price(price):
    """Format price with commas."""
    return '{:,}'.format(price)

def format_mileage(mileage):
    """Format mileage with commas."""
    return '{:,}'.format(mileage)

def generate_car_detail_page(car):
    """Generate a complete HTML page for a single car."""
    
    # Build features HTML
    features_html = ''
    for feature in car.get('features', []):
        features_html += f'                        <span class="feature-tag">{feature}</span>\n'
    
    # Build the WhatsApp message
    wa_message = f"Hello, I am interested in the {car['year']} {car['brand']} {car['model']} (ID: {car['id']}) listed at ${car['price']}."
    wa_url = f"https://wa.me/+8210-6771-9498?text={wa_message.replace(' ', '%20').replace(',', '%2C')}"
    
    body_type_cap = car.get('bodyType', 'sedan').capitalize()
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Hamsa Holdings - {car['year']} {car['brand']} {car['model']} for export from South Korea.">
    <title>{car['year']} {car['brand']} {car['model']} | Hamsa Holdings</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/style.css">

    <style>
        .car-detail-section {{ padding-top: 120px; padding-bottom: 60px; min-height: 80vh; }}
        .detail-header {{ text-align: center; margin-bottom: 40px; }}
        .detail-title {{ font-family: var(--font-heading); font-size: 2.5rem; color: var(--text-white); margin-bottom: 10px; }}
        .detail-price {{ font-family: var(--font-heading); font-size: 2rem; color: var(--primary-gold); font-weight: 700; margin-bottom: 20px;}}
        
        .detail-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; max-width: 1100px; margin: 0 auto; background: var(--bg-card); padding: 30px; border-radius: var(--border-radius-lg); border: 1px solid var(--border-color); }}
        .detail-image img {{ width: 100%; border-radius: var(--border-radius-md); object-fit: cover; }}
        
        .detail-info {{ display: flex; flex-direction: column; gap: 20px; }}
        .detail-desc {{ color: var(--text-gray); line-height: 1.6; font-size: 1.05rem; }}
        
        .specs-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }}
        .spec-item {{ background: var(--bg-input); padding: 12px 16px; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 10px; }}
        .spec-item i {{ color: var(--primary-gold); width: 20px; text-align: center; }}
        .spec-item span {{ color: var(--text-silver); font-weight: 500; font-size: 0.95rem; }}
        
        .features-list {{ display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }}
        .feature-tag {{ background: rgba(229,184,66,0.1); color: var(--primary-gold); padding: 6px 12px; border-radius: 30px; font-size: 0.85rem; font-weight: 500; }}
        
        .detail-actions {{ margin-top: 30px; display: flex; gap: 15px; }}
        .btn-large {{ padding: 15px 30px; font-size: 1.1rem; }}
        
        @media (max-width: 768px) {{
            .detail-grid {{ grid-template-columns: 1fr; }}
        }}
    </style>
</head>
<body>

    <header class="header">
        <div class="container header-container">
            <a href="/" class="logo-area">
                <img src="/images/hamsa_logo.jpg" alt="Hamsa Holdings Logo" class="nav-logo">
                <span class="logo-text">HAMSA <span class="accent-text">HOLDINGS</span></span>
            </a>
            
            <nav class="nav-menu" id="navMenu">
                <a href="/" class="nav-link">Home</a>
                <a href="/inventory" class="nav-link">Inventory</a>
                <a href="/how-it-works" class="nav-link">How It Works</a>
                <a href="/shipping" class="nav-link">Shipping</a>
                <a href="/about" class="nav-link" target="_blank">About Us</a>
                <a href="/contact" class="nav-link">Contact</a>
            </nav>

            <div class="header-actions">
                <div class="lang-selector">
                    <span class="active-lang">EN</span>
                    <i class="fa-solid fa-chevron-down lang-chevron"></i>
                </div>
                <a href="https://wa.me/+8210-6771-9498" target="_blank" class="btn btn-primary btn-nav">
                    <i class="fa-brands fa-whatsapp"></i> Inquiry
                </a>
                <button class="hamburger-menu" id="hamburgerBtn" aria-label="Toggle Navigation Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>

    <section class="car-detail-section">
        <div class="container">
            
            <div class="detail-header">
                <div style="margin-bottom: 15px;">
                    <a href="/inventory" style="color: var(--primary-gold); text-decoration: none; font-weight: 500;"><i class="fa-solid fa-arrow-left"></i> Back to Inventory</a>
                </div>
                <h1 class="detail-title">{car['year']} {car['brand']} {car['model']}</h1>
                <div class="detail-price">${format_price(car['price'])} <span style="font-size: 1rem; color: var(--text-gray); font-weight: normal;">(FOB Korea)</span></div>
                <span class="feature-tag" style="background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-white);"><i class="fa-solid fa-certificate" style="color: var(--primary-gold); margin-right: 5px;"></i> Condition: {car['condition']}</span>
            </div>

            <div class="detail-grid">
                <div class="detail-image">
                    <img src="/{car['image']}" alt="{car['brand']} {car['model']}">
                </div>
                
                <div class="detail-info">
                    <p class="detail-desc">{car['description']}</p>
                    
                    <h3 style="color: var(--text-white); font-family: var(--font-heading); margin-top: 10px;">Specifications</h3>
                    <div class="specs-grid">
                        <div class="spec-item"><i class="fa-solid fa-road"></i> <span>{format_mileage(car['mileage'])} km</span></div>
                        <div class="spec-item"><i class="fa-solid fa-gas-pump"></i> <span>{car['fuel']}</span></div>
                        <div class="spec-item"><i class="fa-solid fa-gears"></i> <span>{car['transmission']}</span></div>
                        <div class="spec-item"><i class="fa-solid fa-gauge-high"></i> <span>{car['engine']}</span></div>
                        <div class="spec-item"><i class="fa-solid fa-car-side"></i> <span>{body_type_cap}</span></div>
                        <div class="spec-item"><i class="fa-solid fa-truck-monster"></i> <span>{car['driveType']}</span></div>
                        <div class="spec-item"><i class="fa-solid fa-palette"></i> <span>{car['color']}</span></div>
                    </div>

                    <h3 style="color: var(--text-white); font-family: var(--font-heading); margin-top: 10px;">Key Features</h3>
                    <div class="features-list">
{features_html}                    </div>

                    <div class="detail-actions">
                        <a href="{wa_url}" target="_blank" class="btn btn-primary btn-large" style="flex: 1; text-align: center;">
                            <i class="fa-brands fa-whatsapp"></i> Inquire Now
                        </a>
                        <button class="btn btn-secondary btn-large" style="flex: 1;"><i class="fa-solid fa-file-invoice"></i> Request Quote</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container footer-container">
            <div class="footer-col-brand">
                <div class="logo-area">
                    <img src="/images/hamsa_logo.jpg" alt="Hamsa Holdings Logo" class="footer-logo">
                    <span class="logo-text">HAMSA <span class="accent-text">HOLDINGS</span></span>
                </div>
                <p class="footer-copyright">&copy; 2026 Hamsa Holdings Co., Ltd.</p>
            </div>
            <div class="footer-col-links">
                <h4>Quick Navigation</h4>
                <ul class="footer-links-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/inventory">Vehicle Inventory</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </footer>

    <!-- Sticky WhatsApp -->
    <a href="https://wa.me/+8210-6771-9498" target="_blank" class="whatsapp-bubble" aria-label="Chat on WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
        <span class="whatsapp-tooltip">Chat with us!</span>
    </a>

    <script src="/app.js"></script>
</body>
</html>'''
    
    return html


def build_static_site():
    """Main build process."""
    print("=" * 50)
    print("  HAMSA HOLDINGS - Static Site Builder")
    print("=" * 50)
    
    # Step 1: Clean
    clean_dist()
    
    # Step 2: Copy static assets
    copy_static_assets()
    
    # Step 3: Build main pages (fix /static/ paths)
    pages = {
        'home.html': os.path.join(DIST_DIR, 'index.html'),
        'inventory.html': os.path.join(DIST_DIR, 'inventory', 'index.html'),
        'about.html': os.path.join(DIST_DIR, 'about', 'index.html'),
        'contact.html': os.path.join(DIST_DIR, 'contact', 'index.html'),
        'shipping.html': os.path.join(DIST_DIR, 'shipping', 'index.html'),
        'how-it-works.html': os.path.join(DIST_DIR, 'how-it-works', 'index.html'),
    }
    
    for template_name, output_path in pages.items():
        try:
            build_page(template_name, output_path)
            page_name = template_name.replace('.html', '')
            print(f"[OK] Built /{page_name}")
        except Exception as e:
            print(f"[ERROR] Failed to build {template_name}: {e}")
    
    # Step 4: Generate car detail pages
    print(f"\n--- Generating {len(data.CARS)} car detail pages ---")
    for car in data.CARS:
        car_dir = os.path.join(DIST_DIR, 'car', str(car['id']))
        os.makedirs(car_dir, exist_ok=True)
        
        html = generate_car_detail_page(car)
        output_path = os.path.join(car_dir, 'index.html')
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html)
        
        print(f"[OK] Built /car/{car['id']}  - {car['brand']} {car['model']}")
    
    # Step 5: Fix the app.js "View Details" button to use /car/ID instead of openModal
    app_js_path = os.path.join(DIST_DIR, 'app.js')
    if os.path.exists(app_js_path):
        with open(app_js_path, 'r', encoding='utf-8') as f:
            js_content = f.read()
        # Already updated to window.location.href in previous step, just verify
        if "window.location.href = '/car/' + carId" not in js_content:
            js_content = js_content.replace(
                "openModal(carId);",
                "window.location.href = '/car/' + carId;"
            )
            with open(app_js_path, 'w', encoding='utf-8') as f:
                f.write(js_content)
            print("[OK] Updated app.js View Details routing")
    
    # Step 6: Create netlify.toml
    netlify_toml = '''# Netlify Configuration for Hamsa Holdings
[build]
  publish = "dist"

# Pretty URLs (trailing slash)
[[redirects]]
  from = "/inventory"
  to = "/inventory/"
  status = 301

[[redirects]]
  from = "/about"
  to = "/about/"
  status = 301

[[redirects]]
  from = "/contact"
  to = "/contact/"
  status = 301

[[redirects]]
  from = "/shipping"
  to = "/shipping/"
  status = 301

[[redirects]]
  from = "/how-it-works"
  to = "/how-it-works/"
  status = 301

# Custom 404
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 404
'''
    
    with open(os.path.join(PROJECT_DIR, 'netlify.toml'), 'w', encoding='utf-8') as f:
        f.write(netlify_toml)
    print("[OK] Created netlify.toml")
    
    # Summary
    car_count = len(data.CARS)
    page_count = len(pages) + car_count
    print(f"\n{'=' * 50}")
    print(f"  BUILD COMPLETE!")
    print(f"  Total pages: {page_count} ({len(pages)} main + {car_count} car details)")
    print(f"  Output: {DIST_DIR}")
    print(f"{'=' * 50}")
    print(f"\nNext: Push to GitHub and Netlify will auto-deploy!")


if __name__ == '__main__':
    build_static_site()
