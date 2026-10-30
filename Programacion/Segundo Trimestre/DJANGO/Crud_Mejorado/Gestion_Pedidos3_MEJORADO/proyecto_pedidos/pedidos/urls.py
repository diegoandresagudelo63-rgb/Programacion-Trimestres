from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views
from . import api_views

# Router para la API — genera automáticamente /api/clientes/, /api/productos/, /api/pedidos/
router = DefaultRouter()
router.register(r'clientes',  api_views.ClienteViewSet)
router.register(r'productos', api_views.ProductoViewSet)
router.register(r'pedidos',   api_views.PedidoViewSet)

urlpatterns = [
    #  Login / Logout 
    path('login/',  views.login_view,  name='login'),
    path('logout/', views.logout_view, name='logout'),

    # Inicio
    path('', views.listar_pedidos, name='listar_pedidos'),

    # Clientes 
    path('clientes/',                  views.listar_clientes, name='listar_clientes'),
    path('clientes/crear/',            views.crear_cliente,   name='crear_cliente'),
    path('clientes/editar/<int:pk>/',  views.editar_cliente,  name='editar_cliente'),
    path('clientes/eliminar/<int:pk>/',views.eliminar_cliente,name='eliminar_cliente'),

    # Productos 
    path('productos/',                   views.listar_productos, name='listar_productos'),
    path('productos/crear/',             views.crear_producto,   name='crear_producto'),
    path('productos/editar/<int:pk>/',   views.editar_producto,  name='editar_producto'),
    path('productos/eliminar/<int:pk>/', views.eliminar_producto,name='eliminar_producto'),

    # Pedidos 
    path('pedidos/',                   views.listar_pedidos,  name='listar_pedidos'),
    path('pedidos/crear/',             views.crear_pedido,    name='crear_pedido'),
    path('pedidos/<int:pk>/',          views.ver_pedido,      name='ver_pedido'), 
    path('pedidos/editar/<int:pk>/',   views.editar_pedido,   name='editar_pedido'),
    path('pedidos/eliminar/<int:pk>/', views.eliminar_pedido, name='eliminar_pedido'),

    # Detalles de pedido 
    path('pedidos/<int:pedido_pk>/agregar/', views.agregar_detalle,  name='agregar_detalle'),
    path('detalle/eliminar/<int:pk>/',       views.eliminar_detalle, name='eliminar_detalle'),

    # Exportaciones
    path('pedidos/exportar/pdf/',   views.exportar_pedidos_pdf,   name='exportar_pdf'),
    path('pedidos/exportar/excel/', views.exportar_pedidos_excel, name='exportar_excel'),

    # API REST con JWT 
    # POST /api/token/         obtener access + refresh token con usuario y contraseña
    # POST /api/token/refresh/  renovar el access token usando el refresh token
    path('api/', include(router.urls)),
    path('api/token/',         TokenObtainPairView.as_view(),  name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(),     name='token_refresh'),
]
