
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Clave secreta del proyecto (¡no compartir en producción!)
SECRET_KEY = 'django-insecure-25xj2hq_xtgcbl4^2y(4u6_mo=&7wja+cc)g+tf0ftz$102#1%'

DEBUG = True

ALLOWED_HOSTS = ['*']

# Apps instaladas — se agregaron: rest_framework y rest_framework_simplejwt para la API JWT
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'pedidos',                      # app principal
    'rest_framework',               # Django REST Framework
    'rest_framework_simplejwt',     # JWT para autenticación de la API
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # Middleware propio: redirige al login si no hay token JWT en sesión
    'pedidos.middleware.LoginRequeridoMiddleware',
]

ROOT_URLCONF = 'proyecto_pedidos.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'proyecto_pedidos.wsgi.application'


# BASE DE DATOS — MySQL Workbench

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',   # Motor MySQL
        'NAME': 'gestion_pedidos',              
        'USER': 'root',                         
        'PASSWORD': 'root123',                  
        'HOST': 'localhost',                  
        'PORT': '3306',                       
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'es'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Configuración de Django REST Framework + JWT
# La API requiere un token JWT para acceder

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}
