
# Vistas de la API REST protegidas con JWT.
# Para usar la API:
# 1. Obtener token:  POST /api/token/  con {"username": "...", "password": "..."}
# 2. Usar el token:  Header  Authorization: Bearer <access_token>

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Cliente, Producto, Pedido
from .serializers import ClienteSerializer, ProductoSerializer, PedidoSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    
    # API para Clientes.
    # Requiere token JWT.  Soporta GET, POST, PUT, PATCH, DELETE.

    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    authentication_classes = [JWTAuthentication]   # Valida el token JWT
    permission_classes = [IsAuthenticated]          # Solo usuarios autenticados


class ProductoViewSet(viewsets.ModelViewSet):
    # API para Productos. Requiere token JWT.
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class PedidoViewSet(viewsets.ModelViewSet):
    # API para Pedidos. Requiere token JWT. Incluye detalles anidados.
    queryset = Pedido.objects.select_related('cliente').prefetch_related('detalles').all()
    serializer_class = PedidoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
