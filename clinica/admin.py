from django.contrib import admin
from .models import Paciente, Psiquiatra, Cita, Consulta

# Register your models here.
admin.site.register(Paciente)
admin.site.register(Psiquiatra)
admin.site.register(Cita)
admin.site.register(Consulta)