# Deployment

```bash
https://mis-tareas-psi.vercel.app/
```
# Tarea Manager

Tarea Manager es una aplicación de gestión de tareas que permite a los usuarios crear, editar, eliminar y visualizar tareas. El proyecto utiliza React, React-Bootstrap para la interfaz de usuario, React-Router para la navegación y LocalStorage para la persistencia de datos en el navegador.

## Funcionalidades

- **Agregar Tarea**: Crea nuevas tareas con título, descripción, estados y fecha de vencimiento.
- **Editar Tarea**: Actualiza la información de una tarea existente.
- **Eliminar Tarea**: Elimina tareas que ya no son necesarias.
- **Gestionar Estados**: Añade y asocia estados personalizados a tus tareas.
- **Agregar Notas**: Añade notas a las tareas para mantener información adicional.
- **Persistencia de Datos**: Los datos se almacenan en LocalStorage para que las tareas se preserven entre sesiones.

## Tecnologías Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **React-Bootstrap**: Componentes Bootstrap para React.
- **React-Router**: Biblioteca para enrutamiento en React.
- **uuid**: Biblioteca para generar identificadores únicos universales.
- **React-Markdown**: Componente para renderizar markdown en React.
- **LocalStorage**: API del navegador para almacenamiento de datos localmente.

## Estructura del Proyecto

- **src**
  - **components**
    - **EditarTarea**: Componente para editar una tarea.
    - **NuevaTarea**: Componente para crear una nueva tarea.
    - **PostList**:  
      - **PostList**: Componente para listar publicaciones.
    - **TareaLayout**: Diseño para visualización de una tarea específica.
    - **TareaList**: 
      - **TareaList**: Lista de tareas.
    - **Tareas**
      - **Tarea**: Componente para mostrar una tarea individual.
  - **useLocalStorage.ts**: Hook personalizado para gestionar el LocalStorage.
  - **App.tsx**: Componente principal de la aplicación.
  - **main.tsx**: Archivo de entrada de la aplicación.

## Instalación y Ejecución

Sigue los pasos a continuación para configurar y ejecutar el proyecto localmente:

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/Gustavonuva/Mis-Tareas.git
   cd mis-tareas
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Ejecuta el proyecto**

   ```bash
   npm start
   ```


## Uso

1. **Visualizar Tareas**: En la página de inicio, verás una opcion para gerar tareas.
2. **Agregar Tarea**: Haz clic en el botón "Crear" para agregar una nueva tarea.
3. **Editar Tarea**: Haz clic en una tarea en la lista para visualizarla, y luego haz clic en el botón "Editar" para modificar su información.
4. **Eliminar Tarea**: Haz clic en el botón "Delete" para eliminar una tarea.
5. **Gestionar Estados**: Añade estados personalizados al crear o editar una tarea.
6. **Agregar Notas**: Añade notas a tus tareas para mantener información adicional.
