from flask import Flask, render_template, request, redirect, url_for, session, flash
from functools import wraps
import data
import json
import os

app = Flask(__name__)
app.secret_key = 'hamsa-holdings-secret-key-2024'

# ─── Hard-coded admin credentials ───
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'hamsa2024'

# ─── Login required decorator ───
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            flash('Iltimos, avval tizimga kiring.', 'warning')
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function

# ─── Context processor: expose CARS to all templates ───
@app.context_processor
def inject_cars():
    return dict(CARS=data.CARS)

# ══════════════════════════════════════════════
#  PUBLIC ROUTES
# ══════════════════════════════════════════════

@app.route('/')
def home():
    featured_cars = data.CARS[:3]
    return render_template('home.html', featured_cars=featured_cars)

@app.route('/inventory')
def inventory():
    return render_template('inventory.html')

@app.route('/how-it-works')
def how_it_works():
    return render_template('how-it-works.html')

@app.route('/shipping')
def shipping():
    return render_template('shipping.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/car/<int:car_id>')
def car_detail(car_id):
    car = next((c for c in data.CARS if c['id'] == car_id), None)
    if not car:
        return "Car not found", 404
    return render_template('car_detail.html', car=car)

# ══════════════════════════════════════════════
#  ADMIN ROUTES
# ══════════════════════════════════════════════

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if session.get('logged_in'):
        return redirect(url_for('admin_dashboard'))
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['logged_in'] = True
            session['username'] = username
            flash('Tizimga muvaffaqiyatli kirdingiz!', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Login yoki parol noto\'g\'ri!', 'danger')
    return render_template('admin_login.html')

@app.route('/admin/logout')
def admin_logout():
    session.clear()
    flash('Tizimdan chiqdingiz.', 'info')
    return redirect(url_for('admin_login'))

@app.route('/admin')
@login_required
def admin_dashboard():
    return render_template('admin_list.html', cars=data.CARS)

@app.route('/admin/add', methods=['GET', 'POST'])
@login_required
def admin_add():
    if request.method == 'POST':
        new_id = max(c['id'] for c in data.CARS) + 1 if data.CARS else 1
        features_raw = request.form.get('features', '')
        features = [f.strip() for f in features_raw.split(',') if f.strip()]
        new_car = {
            'id': new_id,
            'brand': request.form.get('brand', '').strip(),
            'model': request.form.get('model', '').strip(),
            'year': int(request.form.get('year', 2024)),
            'mileage': int(request.form.get('mileage', 0)),
            'price': int(request.form.get('price', 0)),
            'condition': request.form.get('condition', 'New'),
            'fuel': request.form.get('fuel', 'Gasoline'),
            'transmission': request.form.get('transmission', 'Automatic'),
            'engine': request.form.get('engine', '').strip(),
            'color': request.form.get('color', '').strip(),
            'driveType': request.form.get('driveType', 'FWD'),
            'bodyType': request.form.get('bodyType', 'sedan'),
            'features': features,
            'image': request.form.get('image', 'images/genesis_g80.jpg'),
            'description': request.form.get('description', '').strip(),
        }
        data.CARS.append(new_car)
        save_cars_to_file()
        flash(f'"{new_car["brand"]} {new_car["model"]}" muvaffaqiyatli qo\'shildi!', 'success')
        return redirect(url_for('admin_dashboard'))
    return render_template('admin_form.html', car=None, action='add')

@app.route('/admin/edit/<int:car_id>', methods=['GET', 'POST'])
@login_required
def admin_edit(car_id):
    car = next((c for c in data.CARS if c['id'] == car_id), None)
    if not car:
        flash('Mashina topilmadi!', 'danger')
        return redirect(url_for('admin_dashboard'))
    if request.method == 'POST':
        features_raw = request.form.get('features', '')
        features = [f.strip() for f in features_raw.split(',') if f.strip()]
        car['brand'] = request.form.get('brand', '').strip()
        car['model'] = request.form.get('model', '').strip()
        car['year'] = int(request.form.get('year', 2024))
        car['mileage'] = int(request.form.get('mileage', 0))
        car['price'] = int(request.form.get('price', 0))
        car['condition'] = request.form.get('condition', 'New')
        car['fuel'] = request.form.get('fuel', 'Gasoline')
        car['transmission'] = request.form.get('transmission', 'Automatic')
        car['engine'] = request.form.get('engine', '').strip()
        car['color'] = request.form.get('color', '').strip()
        car['driveType'] = request.form.get('driveType', 'FWD')
        car['bodyType'] = request.form.get('bodyType', 'sedan')
        car['features'] = features
        car['image'] = request.form.get('image', 'images/genesis_g80.jpg')
        car['description'] = request.form.get('description', '').strip()
        save_cars_to_file()
        flash(f'"{car["brand"]} {car["model"]}" muvaffaqiyatli tahrirlandi!', 'success')
        return redirect(url_for('admin_dashboard'))
    return render_template('admin_form.html', car=car, action='edit')

@app.route('/admin/delete/<int:car_id>', methods=['POST'])
@login_required
def admin_delete(car_id):
    car = next((c for c in data.CARS if c['id'] == car_id), None)
    if car:
        data.CARS.remove(car)
        save_cars_to_file()
        flash(f'"{car["brand"]} {car["model"]}" o\'chirildi!', 'success')
    else:
        flash('Mashina topilmadi!', 'danger')
    return redirect(url_for('admin_dashboard'))

# ─── Helper: persist CARS back to data.py ───
def save_cars_to_file():
    """Write the current CARS list back to data.py so changes survive restarts."""
    filepath = os.path.join(os.path.dirname(__file__), 'data.py')
    lines = ['CARS = [\n']
    for car in data.CARS:
        lines.append('    {\n')
        for key, value in car.items():
            lines.append(f'        {json.dumps(key)}: {json.dumps(value)},\n')
        lines.append('    },\n')
    lines.append(']\n')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)

if __name__ == '__main__':
    app.run(debug=True, port=3000)
