from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from django.http import HttpResponse
from django.contrib import messages

# Librerías para exportación
import openpyxl
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

from .models import Cliente, Producto, Pedido, DetallePedido
from .forms import ClienteForm, ProductoForm, PedidoForm, DetallePedidoForm



# VISTAS: CLIENTE

def listar_clientes(request):
    # Lista todos los clientes con paginación de 5 por página.
    lista = Cliente.objects.all()
    paginator = Paginator(lista, 5)                     # 5 registros por página
    page = request.GET.get('page')
    clientes = paginator.get_page(page)
    return render(request, 'pedidos/clientes/listar.html', {'clientes': clientes})

def crear_cliente(request):
    if request.method == 'POST':
        form = ClienteForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Cliente creado correctamente.')
            return redirect('listar_clientes')
    else:
        form = ClienteForm()
    return render(request, 'pedidos/clientes/form.html', {'form': form, 'titulo': 'Crear Cliente'})

def editar_cliente(request, pk):
    cliente = get_object_or_404(Cliente, pk=pk)
    if request.method == 'POST':
        form = ClienteForm(request.POST, instance=cliente)
        if form.is_valid():
            form.save()
            messages.success(request, 'Cliente actualizado.')
            return redirect('listar_clientes')
    else:
        form = ClienteForm(instance=cliente)
    return render(request, 'pedidos/clientes/form.html', {'form': form, 'titulo': 'Editar Cliente'})

def eliminar_cliente(request, pk):
    cliente = get_object_or_404(Cliente, pk=pk)
    if request.method == 'POST':
        cliente.delete()
        messages.success(request, 'Cliente eliminado.')
        return redirect('listar_clientes')
    return render(request, 'pedidos/confirmar_eliminar.html', {'objeto': cliente, 'nombre': 'cliente'})



# VISTAS: PRODUCTO


def listar_productos(request):
    lista = Producto.objects.all()
    paginator = Paginator(lista, 5)
    page = request.GET.get('page')
    productos = paginator.get_page(page)
    return render(request, 'pedidos/productos/listar.html', {'productos': productos})

def crear_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                messages.success(request, 'Producto creado correctamente.')
                return redirect('listar_productos')
            except Exception as e:
                # Captura errores de validación del modelo (ej: stock negativo)
                messages.error(request, f'Error al guardar: {e}')
    else:
        form = ProductoForm()
    return render(request, 'pedidos/productos/form.html', {'form': form, 'titulo': 'Crear Producto'})

def editar_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == 'POST':
        form = ProductoForm(request.POST, instance=producto)
        if form.is_valid():
            try:
                form.save()
                messages.success(request, 'Producto actualizado.')
                return redirect('listar_productos')
            except Exception as e:
                messages.error(request, f'Error: {e}')
    else:
        form = ProductoForm(instance=producto)
    return render(request, 'pedidos/productos/form.html', {'form': form, 'titulo': 'Editar Producto'})

def eliminar_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == 'POST':
        producto.delete()
        messages.success(request, 'Producto eliminado.')
        return redirect('listar_productos')
    return render(request, 'pedidos/confirmar_eliminar.html', {'objeto': producto, 'nombre': 'producto'})



# VISTAS: PEDIDO


def listar_pedidos(request):
    lista = Pedido.objects.select_related('cliente').all()  # select_related evita N+1 queries
    paginator = Paginator(lista, 10)
    page = request.GET.get('page')
    pedidos = paginator.get_page(page)
    return render(request, 'pedidos/pedidos/listar.html', {'pedidos': pedidos})

def crear_pedido(request):
    if request.method == 'POST':
        form = PedidoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Pedido creado.')
            return redirect('listar_pedidos')
    else:
        form = PedidoForm()
    return render(request, 'pedidos/pedidos/form.html', {'form': form, 'titulo': 'Crear Pedido'})

def ver_pedido(request, pk):
    """Muestra el pedido con sus detalles (productos incluidos)."""
    pedido = get_object_or_404(Pedido, pk=pk)
    detalles = pedido.detalles.select_related('producto').all()
    total = sum(d.subtotal for d in detalles)   # Total del pedido
    return render(request, 'pedidos/pedidos/ver.html', {
        'pedido': pedido,
        'detalles': detalles,
        'total': total,
    })

def editar_pedido(request, pk):
    pedido = get_object_or_404(Pedido, pk=pk)
    if request.method == 'POST':
        form = PedidoForm(request.POST, instance=pedido)
        if form.is_valid():
            form.save()
            messages.success(request, 'Pedido actualizado.')
            return redirect('listar_pedidos')
    else:
        form = PedidoForm(instance=pedido)
    return render(request, 'pedidos/pedidos/form.html', {'form': form, 'titulo': 'Editar Pedido'})

def eliminar_pedido(request, pk):
    pedido = get_object_or_404(Pedido, pk=pk)
    if request.method == 'POST':
        # Regla de negocio: no eliminar si tiene detalles asociados
        if pedido.detalles.exists():
            messages.error(request, 'No se puede eliminar un pedido que tiene productos. Elimina primero los detalles.')
            return redirect('ver_pedido', pk=pk)
        pedido.delete()
        messages.success(request, 'Pedido eliminado.')
        return redirect('listar_pedidos')
    return render(request, 'pedidos/confirmar_eliminar.html', {'objeto': pedido, 'nombre': 'pedido'})



# VISTAS: DETALLE DE PEDIDO (agregar producto a un pedido)

def agregar_detalle(request, pedido_pk):
    pedido = get_object_or_404(Pedido, pk=pedido_pk)
    if request.method == 'POST':
        form = DetallePedidoForm(request.POST)
        if form.is_valid():
            detalle = form.save(commit=False)
            detalle.pedido = pedido
            detalle.save()      # El save() del modelo calcula el subtotal automáticamente
            messages.success(request, 'Producto agregado al pedido.')
            return redirect('ver_pedido', pk=pedido_pk)
    else:
        form = DetallePedidoForm()
    return render(request, 'pedidos/pedidos/agregar_detalle.html', {'form': form, 'pedido': pedido})

def eliminar_detalle(request, pk):
    detalle = get_object_or_404(DetallePedido, pk=pk)
    pedido_pk = detalle.pedido.id
    detalle.delete()
    messages.success(request, 'Detalle eliminado.')
    return redirect('ver_pedido', pk=pedido_pk)



# EXPORTACIÓN: PDF de pedidos
# Usa ReportLab para generar el PDF en memoria


def exportar_pedidos_pdf(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="pedidos.pdf"'

    # Creamos el PDF usando ReportLab
    p = canvas.Canvas(response, pagesize=letter)
    ancho, alto = letter

    p.setFont("Helvetica-Bold", 16)
    p.drawString(200, alto - 50, "Reporte de Pedidos")

    p.setFont("Helvetica", 10)
    y = alto - 90   # Posición vertical inicial

    # Encabezados de la tabla
    p.drawString(30,  y, "ID")
    p.drawString(60,  y, "Cliente")
    p.drawString(200, y, "Fecha")
    p.drawString(280, y, "Estado")
    y -= 20

    # Filas con los datos
    for pedido in Pedido.objects.select_related('cliente').all():
        p.drawString(30,  y, str(pedido.id))
        p.drawString(60,  y, pedido.cliente.nombre[:25])
        p.drawString(200, y, str(pedido.fecha))
        p.drawString(280, y, pedido.get_estado_display())
        y -= 15
        if y < 50:          # Nueva página si se acaba el espacio
            p.showPage()
            y = alto - 50
            p.setFont("Helvetica", 10)

    p.showPage()
    p.save()
    return response



# EXPORTACIÓN: Excel de pedidos
# Usa openpyxl para generar el archivo .xlsx


def exportar_pedidos_excel(request):
    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response['Content-Disposition'] = 'attachment; filename="pedidos.xlsx"'

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Pedidos"

    # Encabezados
    ws.append(['ID', 'Cliente', 'Fecha', 'Estado'])

    # Filas de datos
    for pedido in Pedido.objects.select_related('cliente').all():
        ws.append([
            pedido.id,
            pedido.cliente.nombre,
            str(pedido.fecha),
            pedido.get_estado_display(),
        ])

    wb.save(response)
    return response



# LOGIN CON JWT
# El usuario ingresa usuario y contraseña en el formulario.
# Se llama a la API /api/token/ internamente para obtener el token.
# Si es válido, se guarda en la sesión y se redirige al inicio.


# Usamos authenticate de Django (no necesita la librería requests)
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

def login_view(request):
    
    # Vista de login con JWT.
    # Valida usuario y contraseña con authenticate() de Django.
    # Si son correctos, genera el token JWT con SimpleJWT y lo guarda en sesión.
    # No necesita la librería externa 'requests'. 

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # authenticate() busca el usuario en la BD y verifica la contraseña
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Credenciales correctas — generamos el token JWT directamente
            refresh = RefreshToken.for_user(user)
            request.session['access_token']  = str(refresh.access_token)  # Token de acceso
            request.session['refresh_token'] = str(refresh)               # Token de refresco
            request.session['username']      = username
            return redirect('listar_pedidos')
        else:
            # Credenciales incorrectas
            return render(request, 'pedidos/login.html', {'error': 'Usuario o contraseña incorrectos.'})

    return render(request, 'pedidos/login.html')


def logout_view(request):
    # Cierra sesión eliminando los tokens de la sesión.
    request.session.flush()     # Borra todos los datos de sesión
    return redirect('login')
