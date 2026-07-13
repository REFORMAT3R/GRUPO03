from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor, Paciente, Cita, Consulta, Personal, Receta


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'


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
    

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class PersonalRegistroSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField()
    nombres = serializers.CharField()
    apellidos = serializers.CharField()
    rol = serializers.ChoiceField(choices=Personal.ROL_CHOICES)
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


class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields = '__all__'

class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = '__all__'


class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'

class RecetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receta
        fields = '__all__'
    