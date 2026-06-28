from django.db import models

# Create your models here.
class Paciente(models.Model):
    SEXO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]

    dni = models.CharField(max_length=8, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    telefono = models.CharField(max_length=15)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class Psiquiatra(models.Model):
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    correo = models.EmailField()

    def __str__(self):
        return f"Dr(a). {self.nombres} {self.apellidos}"


class Cita(models.Model):
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('CONFIRMADA', 'Confirmada'),
        ('ATENDIDA', 'Atendida'),
        ('CANCELADA', 'Cancelada'),
    ]

    paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        related_name='citas'
    )

    psiquiatra = models.ForeignKey(
        Psiquiatra,
        on_delete=models.CASCADE,
        related_name='citas'
    )

    fecha = models.DateField()
    hora = models.TimeField()
    motivo = models.TextField()
    estado = models.CharField(
        max_length=15,
        choices=ESTADO_CHOICES,
        default='PENDIENTE'
    )

    def __str__(self):
        return f"Cita #{self.id}"


class Consulta(models.Model):
    cita = models.OneToOneField(
        Cita,
        on_delete=models.CASCADE,
        related_name='consulta'
    )

    diagnostico = models.TextField()
    tratamiento = models.TextField()
    medicamentos = models.TextField()
    observaciones = models.TextField(blank=True)
    fecha_consulta = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Consulta #{self.id}"