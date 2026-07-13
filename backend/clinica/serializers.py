from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor, Paciente, Cita, Consulta, Personal, Receta


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'


# =========================
# DOCTOR REGISTRO
# =========================

class DoctorRegistroSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()

    nombres = serializers.CharField()
    apellidos = serializers.CharField()
    especialidad = serializers.ChoiceField(choices=Doctor.ESPEC_CHOICES)
    telefono = serializers.CharField()
    correo = serializers.EmailField()

    def create(self, validated_data):

        usuario = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )

        doctor = Doctor.objects.create(
            usuario=usuario,
            nombres=validated_data['nombres'],
            apellidos=validated_data['apellidos'],
            especialidad=validated_data['especialidad'],
            telefono=validated_data['telefono'],
            correo=validated_data['correo']
        )

        return doctor


# =========================
# DOCTOR CRUD
# =========================

class DoctorSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source='usuario.username',
        read_only=True
    )

    email = serializers.EmailField(
        source='usuario.email',
        read_only=True
    )

    class Meta:
        model = Doctor
        fields = [
            'id',
            'username',
            'email',
            'nombres',
            'apellidos',
            'especialidad',
            'telefono',
            'correo'
        ]



# =========================
# PERSONAL REGISTRO
# =========================

class PersonalRegistroSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()

    nombres = serializers.CharField()
    apellidos = serializers.CharField()
    rol = serializers.ChoiceField(
        choices=Personal.ROL_CHOICES
    )
    telefono = serializers.CharField()


    def create(self, validated_data):

        usuario = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )

        personal = Personal.objects.create(
            usuario=usuario,
            nombres=validated_data['nombres'],
            apellidos=validated_data['apellidos'],
            rol=validated_data['rol'],
            telefono=validated_data['telefono']
        )

        return personal



# =========================
# PERSONAL CRUD
# =========================

class PersonalSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source='usuario.username'
    )

    email = serializers.EmailField(
        source='usuario.email'
    )

    class Meta:
        model = Personal
        fields = [
            'id',
            'username',
            'email',
            'nombres',
            'apellidos',
            'rol',
            'telefono'
        ]

    def update(self, instance, validated_data):

        usuario_data = validated_data.pop('usuario', {})

        instance.nombres = validated_data.get(
            'nombres',
            instance.nombres
        )

        instance.apellidos = validated_data.get(
            'apellidos',
            instance.apellidos
        )

        instance.rol = validated_data.get(
            'rol',
            instance.rol
        )

        instance.telefono = validated_data.get(
            'telefono',
            instance.telefono
        )

        instance.save()

        usuario = instance.usuario

        usuario.username = usuario_data.get(
            'username',
            usuario.username
        )

        usuario.email = usuario_data.get(
            'email',
            usuario.email
        )

        usuario.save()

        return instance



# =========================
# CITAS
# =========================

class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = '__all__'



# =========================
# CONSULTAS
# =========================

class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'



# =========================
# RECETAS
# =========================

class RecetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receta
        fields = '__all__'