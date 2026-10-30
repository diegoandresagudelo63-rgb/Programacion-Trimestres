from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path('',      lambda request: redirect('listar_pedidos')),  # Redirige al inicio
    path('admin/', admin.site.urls),
    path('',       include('pedidos.urls')),     # Todas las rutas de la app pedidos
]
