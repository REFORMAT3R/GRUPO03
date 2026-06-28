from django.contrib import admin
from .models import Doctor, Paciente, Cita, Consulta

# Register your models here.
admin.site.register(Paciente)
admin.site.register(Doctor)
admin.site.register(Cita)
admin.site.register(Consulta)