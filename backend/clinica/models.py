from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User

# Create your models here.
class Paciente(models.Model):
    SEXO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]

    dni_validator = RegexValidator(
        regex=r'^\d{8}$',
        message="El DNI debe tener exactamente 8 números."
    )

    dni = models.CharField(
        max_length=8,
        unique=True,
        validators=[dni_validator]
    )

    texto_validator = RegexValidator(
        regex=r'^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$',
        message="Solo se permiten letras y espacios."
    )

    nombres = models.CharField(
        max_length=100,
        validators=[texto_validator]
    )

    apellidos = models.CharField(
        max_length=100,
        validators=[texto_validator]
    )
    
    fecha_nacimiento = models.DateField()
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)

    telefono_validator = RegexValidator(
        regex=r'^9\d{8}$',
        message="El teléfono debe empezar con 9 y tener exactamente 9 dígitos."
    )

    telefono = models.CharField(
        max_length=9,
        validators=[telefono_validator]
    )

    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class Doctor(models.Model):
    ESPEC_CHOICES = [
        ('PSIQUIATRIA_AGUDOS', 'Psiquiatría de Agudos'),
        ('PSIQUIATRIA_CRONICOS', 'Psiquiatría de Larga Estancia'),
        ('PSIQUIATRIA_ENLACE', 'Psiquiatría de Enlace'),
        ('PSICOLOGIA_CLINICA', 'Psicología Clínica'),
        ('NEUROPSICOLOGIA', 'Neuropsicología'),
        ('TERAPIA_OCUPACIONAL', 'Terapia Ocupacional'),
        ('ENFERMERIA_PSIQUIATRICA', 'Enfermería Psiquiátrica'),
        ('TRABAJO_SOCIAL', 'Trabajo Social Psiquiátrico'),
        ('NEUROLOGIA', 'Neurología'),
        ('MEDICINA_INTERNA', 'Medicina Interna'),
    ]

    usuario = models.OneToOneField(
        User,
        on_delete= models.CASCADE,
        related_name='doctor',
        null=True,
        blank=True
    )

    texto_validator = RegexValidator(
        regex=r'^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$',
        message="Solo se permiten letras y espacios."
    )

    nombres = models.CharField(
        max_length=100,
        validators=[texto_validator]
    )
    apellidos = models.CharField(
        max_length=100,
        validators=[texto_validator]
    )
    especialidad = models.CharField(max_length=100, choices=ESPEC_CHOICES)
    telefono_validator = RegexValidator(
        regex=r'^9\d{8}$',
        message="El teléfono debe empezar con 9 y tener exactamente 9 dígitos."
    )

    telefono = models.CharField(
        max_length=9,
        validators=[telefono_validator]
    )

    correo = models.EmailField()

    def __str__(self):
        return f"Dr(a). {self.nombres} {self.apellidos}"
    
class Personal(models.Model):
    ROL_CHOICES = [
        ('RECEPCION', 'Recepción'),
        ('ADMIN', 'Administrador')
    ]

    usuario = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='personal_perfil'
    )

    texto_validator = RegexValidator(
        regex=r'^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$',
        message="Solo se permiten letras y espacios."
    )

    nombres = models.CharField(
        max_length=100,
        validators=[texto_validator]
    )
    apellidos = models.CharField(
        max_length=100,
        validators=[texto_validator]
    )
    rol = models.CharField(max_length=15, choices=ROL_CHOICES)

    telefono_validator = RegexValidator(
        regex=r'^9\d{8}$',
        message="El teléfono debe empezar con 9 y tener exactamente 9 dígitos."
    )
    telefono = models.CharField(
        max_length=9,
        validators=[telefono_validator]
    )

    def __str__(self):
        return f"{self.get_rol_display()}: {self.nombres} {self.apellidos}"


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

    doctor = models.ForeignKey(
        Doctor,
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
    observaciones = models.TextField(blank=True)
    fecha_consulta = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Consulta #{self.id}"

class Receta(models.Model):
    consulta = models.ForeignKey(
        Consulta,
        on_delete=models.CASCADE,
        related_name='recetas'
    )
    medicamento = models.CharField(max_length=200)
    dosis = models.CharField(max_length=100)
    frecuencia = models.CharField(max_length=100)
    duracion = models.CharField(max_length=100)
    indicaciones = models.TextField(blank=True)

    def __str__(self):
        return f"{self.medicamento} - {self.dosis}"