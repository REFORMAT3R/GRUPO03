from rest_framework import permissions


class EsAdmin(permissions.BasePermission):
    """
    Solo usuarios Administradores
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'personal_perfil') and
            request.user.personal_perfil.rol == 'ADMIN'
        )

class EsAdminORecepcion(permissions.BasePermission):
    """
    Administrador o Recepción
    Usado para pacientes y doctores
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'personal_perfil') and
            request.user.personal_perfil.rol in [
                'ADMIN',
                'RECEPCION'
            ]
        )


class EsDoctorDeLaConsulta(permissions.BasePermission):
    """
    El administrador puede hacer todo.
    El doctor solo puede acceder a sus propias consultas.
    """

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        # Administrador
        if (
            hasattr(request.user, 'personal_perfil') and
            request.user.personal_perfil.rol == 'ADMIN'
        ):
            return True

        # Doctor
        return hasattr(request.user, 'doctor')


    def has_object_permission(self, request, view, obj):

        # Administrador
        if (
            hasattr(request.user, 'personal_perfil') and
            request.user.personal_perfil.rol == 'ADMIN'
        ):
            return True

        # Doctor dueño de la consulta
        return obj.cita.doctor.usuario == request.user