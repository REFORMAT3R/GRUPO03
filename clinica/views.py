from rest_framework import viewsets
from .models import Paciente, Psiquiatra, Consulta, Cita
from .serializers import (
    PacienteSerializer,
    PsiquiatraSerializer,
    CitaSerializer,
    ConsultaSerializer
)

# Create your views here.

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer


class PsiquiatraViewSet(viewsets.ModelViewSet):
    queryset = Psiquiatra.objects.all()
    serializer_class = PsiquiatraSerializer


class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer


class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer