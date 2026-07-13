from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    DoctorViewSet,
    PacienteViewSet,
    CitaViewSet,
    ConsultaViewSet,
    RecetaViewSet,
    PersonalViewSet,
    RegistrarDoctorView,
    RegistrarPersonalView
)


router = DefaultRouter()

router.register(r'pacientes', PacienteViewSet)
router.register(r'doctores', DoctorViewSet)
router.register(r'personal', PersonalViewSet)
router.register(r'citas', CitaViewSet)
router.register(r'consultas', ConsultaViewSet)
router.register(r'recetas', RecetaViewSet)


urlpatterns = [

    # Registro con creación de usuario Django
    path(
        'doctores/registrar/',
        RegistrarDoctorView.as_view(),
        name='registrar-doctor'
    ),

    path(
        'personal/registrar/',
        RegistrarPersonalView.as_view(),
        name='registrar-personal'
    ),

    # CRUD general
    path(
        '',
        include(router.urls)
    ),
]