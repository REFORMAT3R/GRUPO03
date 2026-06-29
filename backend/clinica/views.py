from rest_framework import viewsets
from .models import Doctor, Paciente, Consulta, Cita
from .serializers import (
    PacienteSerializer,
    DoctorSerializer,
    CitaSerializer,
    ConsultaSerializer
)

# Create your views here.

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer


class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer


class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer
