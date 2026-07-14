from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import (
    Doctor,
    Paciente,
    Consulta,
    Cita,
    Personal,
    Receta
)

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

from .permissions import (
    EsAdmin,
    EsAdminORecepcion,
    EsDoctorDeLaConsulta,
    EsAdminORecepcionODoctor,
    EsDoctorDeLaReceta
)


class PacienteViewSet(viewsets.ModelViewSet):

    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    # Admin y recepción manejan pacientes
    permission_classes = [
        EsAdminORecepcion
    ]



class DoctorViewSet(viewsets.ModelViewSet):

    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    # Admin y recepción pueden consultar doctores
    permission_classes = [
        EsAdminORecepcion
    ]

class PersonalViewSet(viewsets.ModelViewSet):

    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer

    permission_classes = [
        EsAdminORecepcion
    ]

class RegistrarDoctorView(APIView):

    permission_classes = [
        EsAdmin
    ]

    def post(self, request):

        serializer = DoctorRegistroSerializer(
            data=request.data
        )

        if serializer.is_valid():

            doctor = serializer.save()

            return Response(
                {
                    "mensaje":
                    f"Doctor {doctor.nombres} creado correctamente"
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )



class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    permission_classes = [EsAdminORecepcionODoctor]



class RegistrarPersonalView(APIView):

    permission_classes = [
        EsAdmin
    ]

    def post(self, request):

        serializer = PersonalRegistroSerializer(
            data=request.data
        )

        if serializer.is_valid():

            personal = serializer.save()

            return Response(
                {
                    "mensaje":
                    "Personal creado correctamente"
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )



class CitaViewSet(viewsets.ModelViewSet):

    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    permission_classes = [EsAdminORecepcionODoctor]

    def get_queryset(self):

        user = self.request.user

        if hasattr(user, 'doctor'):
            return Cita.objects.filter(doctor=user.doctor)

        return Cita.objects.all()



class ConsultaViewSet(viewsets.ModelViewSet):

    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer

    permission_classes = [
        EsDoctorDeLaConsulta
    ]

    def get_queryset(self):

        usuario = self.request.user

        if (
            hasattr(usuario,'personal_perfil') and
            usuario.personal_perfil.rol == 'ADMIN'
        ):
            return Consulta.objects.all()

        if hasattr(usuario,'doctor'):
            return Consulta.objects.filter(
                cita__doctor=usuario.doctor
            )

        return Consulta.objects.none()


class RecetaViewSet(viewsets.ModelViewSet):

    queryset = Receta.objects.all()
    serializer_class = RecetaSerializer

    # Doctor trabaja recetas
    permission_classes = [
        EsDoctorDeLaReceta
    ]

class PerfilUsuarioView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        usuario = request.user


        if hasattr(usuario, 'doctor'):

            doctor = usuario.doctor

            return Response({
                "tipo": "doctor",
                "id": doctor.id,
                "usuarioId": usuario.id,
                "nombres": doctor.nombres,
                "apellidos": doctor.apellidos,
                "rol": "DOCTOR"
            })


        if hasattr(usuario, 'personal_perfil'):

            personal = usuario.personal_perfil

            return Response({
                "tipo": "personal",
                "id": personal.id,
                "usuarioId": usuario.id,
                "nombres": personal.nombres,
                "apellidos": personal.apellidos,
                "rol": personal.rol
            })


        return Response(
            {"error":"Sin perfil asociado"},
            status=400
        )