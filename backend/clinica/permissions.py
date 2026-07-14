from rest_framework import permissions


class EsAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'personal_perfil') and
            request.user.personal_perfil.rol == 'ADMIN'
        )


class EsAdminORecepcion(permissions.BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'personal_perfil') and
            request.user.personal_perfil.rol in [
                'ADMIN',
                'RECEPCION'
            ]
        )


class EsAdminORecepcionODoctor(permissions.BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        if hasattr(request.user, 'personal_perfil') and request.user.personal_perfil.rol in [
            'ADMIN',
            'RECEPCION'
        ]:
            return True

        return hasattr(request.user, 'doctor')


class EsDoctorDeLaConsulta(permissions.BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        if hasattr(request.user, 'personal_perfil') and request.user.personal_perfil.rol == 'ADMIN':
            return True

        return hasattr(request.user, 'doctor')


    def has_object_permission(self, request, view, obj):

        if hasattr(request.user, 'personal_perfil') and request.user.personal_perfil.rol == 'ADMIN':
            return True

        return obj.cita.doctor.usuario == request.user



class EsDoctorDeLaReceta(permissions.BasePermission):

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        if hasattr(request.user, 'personal_perfil') and request.user.personal_perfil.rol == 'ADMIN':
            return True

        return hasattr(request.user, 'doctor')


    def has_object_permission(self, request, view, obj):

        if hasattr(request.user, 'personal_perfil') and request.user.personal_perfil.rol == 'ADMIN':
            return True

        return obj.consulta.cita.doctor.usuario == request.user