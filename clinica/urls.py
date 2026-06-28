from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PacienteViewSet,
    PsiquiatraViewSet,
    CitaViewSet,
    ConsultaViewSet
)

router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet)
router.register(r'psiquiatras', PsiquiatraViewSet)
router.register(r'citas', CitaViewSet)
router.register(r'consultas', ConsultaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]