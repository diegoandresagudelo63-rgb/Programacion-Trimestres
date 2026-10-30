

# Middleware de autenticación JWT.
# Revisa en cada petición si el usuario tiene un token en la sesión.
# Si no tiene token y no está en la página de login, lo redirige al login.

from django.shortcuts import redirect



# Rutas que NO requieren login (están exentas del middleware)   
RUTAS_PUBLICAS = ['/login/', '/api/token/', '/api/token/refresh/']


class LoginRequeridoMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Verificar si la ruta actual es pública
        ruta_actual = request.path_info

        es_publica = any(ruta_actual.startswith(r) for r in RUTAS_PUBLICAS)

        # Si no es pública y no hay token en sesión → redirigir al login
        if not es_publica and not request.session.get('access_token'):
            return redirect('login')

        response = self.get_response(request)
        return response
