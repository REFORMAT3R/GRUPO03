from rest_framework import serializers
from .models import Paciente, Psiquiatra, Cita, Consulta


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'


class PsiquiatraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Psiquiatra
        fields = '__all__'


class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = '__all__'


class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'