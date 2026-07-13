from django.contrib import admin
from .models import Doctor, Paciente, Cita,Consulta, Personal, Receta

# Register your models here.
admin.site.register(Paciente)
admin.site.register(Doctor)
admin.site.register(Cita)
admin.site.register(Consulta)
admin.site.register(Personal)
admin.site.register(Receta)