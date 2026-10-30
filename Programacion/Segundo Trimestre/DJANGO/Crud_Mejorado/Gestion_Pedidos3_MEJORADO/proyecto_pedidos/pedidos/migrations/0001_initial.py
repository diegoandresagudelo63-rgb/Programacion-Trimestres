from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        # Tabla Cliente
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id',        models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre',    models.CharField(max_length=100)),
                ('correo',    models.EmailField(unique=True)),
                ('direccion', models.CharField(max_length=200)),
                ('telefono',  models.CharField(max_length=20)),
            ],
            options={'verbose_name': 'Cliente', 'verbose_name_plural': 'Clientes', 'ordering': ['nombre']},
        ),
        # Tabla Producto
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id',     models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('stock',  models.IntegerField(default=0)),
            ],
            options={'verbose_name': 'Producto', 'verbose_name_plural': 'Productos', 'ordering': ['nombre']},
        ),
        # Tabla Pedido (FK a Cliente)
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id',     models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha',  models.DateField(auto_now_add=True)),
                ('estado', models.CharField(choices=[('pendiente','Pendiente'),('enviado','Enviado'),('entregado','Entregado')], default='pendiente', max_length=20)),
                ('cliente',models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pedidos', to='pedidos.cliente')),
            ],
            options={'verbose_name': 'Pedido', 'verbose_name_plural': 'Pedidos', 'ordering': ['-fecha']},
        ),
        # Tabla DetallePedido (FK a Pedido y Producto)
        migrations.CreateModel(
            name='DetallePedido',
            fields=[
                ('id',       models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField()),
                ('subtotal', models.DecimalField(decimal_places=2, default=0, editable=False, max_digits=10)),
                ('pedido',   models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detalles', to='pedidos.pedido')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pedidos.producto')),
            ],
            options={'verbose_name': 'Detalle de Pedido', 'verbose_name_plural': 'Detalles de Pedido'},
        ),
    ]
