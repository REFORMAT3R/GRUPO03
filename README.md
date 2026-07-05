# Sistema de Gestión de citas en un centro Psiquiatrico

Proyecto desarrollado para el curso **Desarrollo de Aplicaciones Web**  
Docente: **Carlo José Luis Corrales Delgado**

## Descripción

Sistema web para la gestión integral de una clínica, que permite administrar pacientes, 
doctores, consultas, citas médicas y exámenes clínicos, con control de acceso diferenciado
según el rol del usuario (Administrativo, Doctor, Paciente).

## Integrantes del grupo

| Nombres | Rol | Aporte |
|---|---|---|
| Denny Joaquin Mamani Huayhua | Backend  | 100% |
| Jazmin Roxana Gonzales Ramirez | Backend | 100% |
| Omar Andree Guevara Aliaga | Frontend | 100% |
| Mario Miguel Choquecota Pandia | Frontend | 100% |

## Tecnologías utilizadas

**Backend**
- Python 3.x
- Django
- Django REST Framework
- Simple JWT (autenticación)
- SQLite (desarrollo)

**Frontend**
- Angular
- TypeScript

##  Estructura del proyecto
backend/
├── clinica/
│   ├── migrations/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── config/
├── db.sqlite3
├── manage.py
└── requirements.txt
frontend/
├── src/
├── node_modules/
└── package.json
