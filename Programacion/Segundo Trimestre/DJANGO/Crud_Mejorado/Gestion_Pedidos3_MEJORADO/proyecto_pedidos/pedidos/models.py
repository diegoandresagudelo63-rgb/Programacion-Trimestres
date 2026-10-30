from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator



# MODELO: Cliente
# Representa a la persona que hace un pedido.
# solo se permite un cliente por correo electrónico (correo único).
# solkosolo
class Cliente(models.Model):
    nombre    = models.CharField(max_length=100)
    correo    = models.EmailField(unique=True)          # No puede haber dos clientes con el mismo correo
    Placa = models.CharField(max_length=200)
    telefono  = models.CharField(max_length=10, validators=[RegexValidator(r'^\d{10}$', message="El teléfono solo debe tener 10 dígitos numéricos")])

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        ordering = ['nombre']



# MODELO: Producto
# Regla de negocio: stock no puede ser negativo
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock  = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.nombre} (stock: {self.stock})"

    # Validación que se ejecuta antes de guardar
    def clean(self):
        if self.stock < 0:
            raise ValidationError("El stock no puede ser negativo.")
        if self.precio < 0:
            raise ValidationError("El precio no puede ser negativo.")

    def save(self, *args, **kwargs):
        self.full_clean()   # Dispara clean() antes de guardar en BD
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ['nombre']



# MODELO: Pedido
# Un pedido pertenece a un Cliente (relación 1:N).
# Los productos se asocian a través de DetallePedido.

class Pedido(models.Model):
    ESTADOS_CHOICES = [
        ('pendiente',  'Pendiente'),
        ('enviado',    'Enviado'),
        ('entregado',  'Entregado'),
    ]

    # FK a Cliente — si se elimina el cliente, los pedidos también se eliminan
    cliente     = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='pedidos')
    fecha       = models.DateField(auto_now_add=True)   # Se pone automáticamente al crear
    estado      = models.CharField(max_length=20, choices=ESTADOS_CHOICES, default='pendiente')

    def __str__(self):  
        return f"Pedido #{self.id} - {self.cliente.nombre} ({self.estado})"

    class Meta:
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"
        ordering = ['-fecha']   # Los más recientes primero


# MODELO: DetallePedido 
# Un pedido puede tener varios productos (N:M via esta tabla).
# Regla de negocio: el subtotal se calcula automáticamente.
class DetallePedido(models.Model):
    pedido   = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='detalles')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, editable=False, default=0)

    def save(self, *args, **kwargs):
    # Validar cantidad
     if self.cantidad <= 0:
        raise ValidationError("La cantidad debe ser mayor a 0")

    # Si ya existe, calcular diferencia
     if self.pk:
        detalle_anterior = DetallePedido.objects.get(pk=self.pk)
        diferencia = self.cantidad - detalle_anterior.cantidad
     else:
        diferencia = self.cantidad

    # Validar stock suficiente
     if diferencia > self.producto.stock:
        raise ValidationError("No hay suficiente stock disponible")

    # Restar stock
     self.producto.stock -= diferencia
     self.producto.save()

    # Calcular subtotal
     self.subtotal = self.cantidad * self.producto.precio

     super().save(*args, **kwargs)