from rest_framework import viewsets, status  
from rest_framework.views import APIView       
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  
from .models import Doctor, Paciente, Consulta, Cita,Personal, Receta
from .serializers import (
    PacienteSerializer,
    DoctorSerializer,
    DoctorRegistroSerializer,
    PersonalSerializer,
    PersonalRegistroSerializer,
    CitaSerializer,
    ConsultaSerializer,
    RecetaSerializer
)
from .permissions import EsAdmin, EsRecepcion, EsDoctorDeLaConsulta

# Create your views here.

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    permission_classes = [IsAuthenticated]


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]

class RegistrarDoctorView(APIView):
    permission_classes = [EsAdmin]
    def post(self, request):
        serializer = DoctorRegistroSerializer(data=request.data)
        if serializer.is_valid():
            doctor = serializer.save()
            return Response(
                {"mensaje": f"Doctor {doctor.nombres} {doctor.apellidos} creado con éxito"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PersonalViewSet(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer
    permission_classes = [IsAuthenticated]

class RegistrarPersonalView(APIView):
    permission_classes = [EsAdmin] 
    def post(self, request):
        serializer = PersonalRegistroSerializer(data=request.data)
        if serializer.is_valid():
            personal = serializer.save()
            return Response(
                {"mensaje": f"{personal.get_rol_display()} {personal.nombres} {personal.apellidos} creado con éxito"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    permission_classes = [EsRecepcion] 

class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer
    permission_classes = [EsDoctorDeLaConsulta] 

class RecetaViewSet(viewsets.ModelViewSet):
    queryset = Receta.objects.all()
    serializer_class = RecetaSerializer
    permission_classes = [IsAuthenticated]
