from django import forms
from .models import Cliente, Producto, Pedido, DetallePedido


# Formulario para Cliente
class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['nombre', 'correo', 'Placa', 'telefono']
        widgets = {
            'nombre':    forms.TextInput(attrs={'class': 'form-control'}),
            'correo':    forms.EmailInput(attrs={'class': 'form-control'}),
            'Placa':     forms.TextInput(attrs={'class': 'form-control'}),
            'telefono':  forms.TextInput(attrs={'class': 'form-control'}),
        }


# Formulario para Producto
class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['nombre', 'precio', 'stock']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'precio': forms.TextInput(attrs={'class': 'form-control', 'step': '0.01', 'min': '0.01', 'placeholder': '0.00'}), # Agregado step, min y placeholder para mejorar la experiencia del usuario
            'stock':  forms.NumberInput(attrs={'class': 'form-control'}),
        }


# Formulario para Pedido
class PedidoForm(forms.ModelForm):
    class Meta:
        model = Pedido
        fields = ['cliente', 'estado']
        widgets = {
            'cliente': forms.Select(attrs={'class': 'form-control'}),
            'estado':  forms.Select(attrs={'class': 'form-control'}),
        }


# Formulario para DetallePedido
class DetallePedidoForm(forms.ModelForm):
    class Meta:
        model = DetallePedido
        fields = ['producto', 'cantidad']
        widgets = {
            'producto': forms.Select(attrs={'class': 'form-control'}),
            'cantidad': forms.NumberInput(attrs={'class': 'form-control', 'min': 1}),
        }
