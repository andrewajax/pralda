from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Necesario para usar flash messages

# Lista de noticias de ejemplo
noticias_ejemplo = [
    {
        'id': 1,
        'titulo': 'Noticia 1',
        'resumen': 'Resumen de la noticia 1',
        'imagen': 'noticia1.jpg',
        'fecha': '2023-10-01'
    },
    {
        'id': 2,
        'titulo': 'Noticia 2',
        'resumen': 'Resumen de la noticia 2',
        'imagen': 'noticia2.jpg',
        'fecha': '2023-10-02'
    },
    {
        'id': 3,
        'titulo': 'Noticia 3',
        'resumen': 'Resumen de la noticia 3',
        'imagen': 'noticia3.jpg',
        'fecha': '2023-10-03'
    }
]

# Rutas existentes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/proyectos')
def proyectos():
    return render_template('proyectos.html')

@app.route('/galeria')
def galeria():
    return render_template('galeria.html')

@app.route('/noticias')
def noticias_lista():
    page = request.args.get('page', 1, type=int)
    # En un caso real, aquí implementarías la paginación
    return render_template('noticias.html', page=page, noticias=noticias_ejemplo)

@app.route('/noticias/<int:noticia_id>')
def noticia_detalle(noticia_id):
    # Lógica para obtener detalles de la noticia
    noticia = next((noticia for noticia in noticias_ejemplo if noticia['id'] == noticia_id), None)
    if noticia:
        return render_template('noticia_detalle.html', noticia=noticia)
    else:
        return "Noticia no encontrada", 404

# Nueva ruta para la página de contacto
@app.route('/contacto', methods=['GET', 'POST'])
def contacto():
    if request.method == 'POST':
        # Obtener datos del formulario
        nombre = request.form.get('nombre')
        correo = request.form.get('correo')
        telefono = request.form.get('telefono')
        mensaje = request.form.get('mensaje')
        acepta_politica = request.form.get('acepta_politica') == 'on'
        
        # Validar datos (ejemplo básico)
        if not all([nombre, correo, mensaje]):
            flash('Por favor completa todos los campos obligatorios.', 'error')
        elif not acepta_politica:
            flash('Debes aceptar la política de privacidad.', 'error')
        else:
            # Aquí iría el código para enviar el correo o guardar en base de datos
            # Por ahora solo mostramos un mensaje de éxito
            flash('¡Gracias por contactarnos! Te responderemos a la brevedad.', 'success')
            return redirect(url_for('contacto'))
            
    # Para solicitudes GET o si hay errores en POST
    return render_template('contacto.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Render usa una variable de entorno llamada PORT
    app.run(host='0.0.0.0', port=port)
