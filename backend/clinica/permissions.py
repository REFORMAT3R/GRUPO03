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



class EsRecepcion(permissions.BasePermission):
    """
    Solo usuarios de Recepción
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'personal_perfil') and
            request.user.personal_perfil.rol == 'RECEPCION'
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
    Solo el doctor que tiene asignada la consulta
    """

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated and
            hasattr(request.user, 'doctor')
        )


    def has_object_permission(self, request, view, obj):

        return (
            obj.cita.doctor.usuario == request.user
        )