import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { EditarTarea } from "./components/EditarTarea";
import { NuevaTarea } from "./components/NuevaTarea";
import { PostsList } from "./components/PostList/PostList";
import { TareaLayout } from "./components/TareaLayout";
import { TareaList } from "./components/TareaList/TareaList";
import { Tarea } from "./components/Tareas/Tarea";
import { useLocalStorage } from "./useLocalStorage";

// Tipo Tarea
export type Tarea = {
  id: string;
} & TareaData;

// Tipo RawTarea
export type RawTarea = {
  id: string;
} & RawTareaData;

// Tipo RawTareaData
export type RawTareaData = {
  titulo: string;
  descripcion: string;
  estadoIds: string[];
  noteIds: string[];
  vencimiento: string;
}

// Tipo RawNote
export type RawNote = {
  id: string;
} & RawNoteData;

// Tipo RawNoteData
export type RawNoteData = {
  descripcion: string;
}

// Tipo TareaData
export type TareaData = {
  titulo: string;
  descripcion: string;
  estados: Estado[];
  noteIds: string[];
  vencimiento: string;
  notas?: Nota[];
}

// Tipo Estado
export type Estado = {
  id: string;
  label: string;
}

// Tipo Nota
export type Nota = {
  id: string;
  descripcion: string;
}

function App() {
  // Estado para almacenar tareas, estados y notas usando almacenamiento local
  const [tareas, setTareas] = useLocalStorage<RawTarea[]>("TAREAS", []);
  const [estados, setEstados] = useLocalStorage<Estado[]>("ESTADO", []);
  const [notas, setNotas] = useLocalStorage<RawNote[]>("NOTAS", []);

  // Memoriza las tareas con sus estados y notas correspondientes
  const tareasWithEstados = useMemo(() => {
    return tareas.map(tarea => {
      return {
        ...tarea,
        estados: estados.filter(estado => tarea.estadoIds.includes(estado.id)),
        notas: notas.filter(nota => tarea.noteIds.includes(nota.id)),
      };
    });
  }, [tareas, estados, notas]);

  // Función para crear una nueva tarea
  function onCreateTarea({ estados, noteIds, ...data }: TareaData) {
    setTareas(prevTareas => {
      return [...prevTareas,
      {
        ...data,
        id: uuidV4(),
        estadoIds: estados.map(estado => estado.id),
        noteIds: noteIds || [],
      }];
    });
  }

  // Función para actualizar una tarea existente
  function onUpdateTarea(id: string, { estados, noteIds, notas, ...data }: TareaData) {
    setTareas(prevTareas => {
      return prevTareas.map(tarea => {
        if (tarea.id === id) {
          return {
            ...tarea,
            ...data,
            estadoIds: estados.map(estado => estado.id),
            noteIds: noteIds || [],
            notas: notas || [],
          };
        } else {
          return tarea;
        }
      });
    });

    // Actualiza las notas asociadas con la tarea
    setNotas(prevNotas => {
      const updatedNotas = prevNotas.filter(nota => noteIds.includes(nota.id));
      const uniqueNoteIds = Array.from(new Set(noteIds));
      const newNotas = uniqueNoteIds
        .filter(noteId => !updatedNotas.some(nota => nota.id === noteId))
        .map(noteId => {
          const notaExistente = notas?.find(nota => nota.id === noteId);
          return notaExistente || { id: noteId, descripcion: "" };
        });
      return [...updatedNotas, ...newNotas];
    });
  }

  // Función para eliminar una tarea
  function onDeletarTarea(id: string) {
    setTareas(prevTareas => {
      return prevTareas.filter(tarea => tarea.id !== id);
    });
  }

  // Función para añadir un nuevo estado
  function addEstado(estado: Estado) {
    setEstados(prev => [...prev, estado]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<TareaList
          tareas={tareasWithEstados}
          availableEstados={estados} />} />
        <Route path="/nuevo" element={
          <NuevaTarea
            onSubmit={onCreateTarea}
            onAddEstado={addEstado}
            availableEstados={estados}
          />
        }
        />
        <Route path="/:id" element={<TareaLayout tareas={tareasWithEstados} />}>
          <Route index element={<Tarea onDeletar={onDeletarTarea} onUpdateTarea={onUpdateTarea} notas={notas} />} />
          <Route path="edit" element={<EditarTarea
            onSubmit={onUpdateTarea}
            onAddEstado={addEstado}
            availableEstados={estados}
          />
          }
          />
        </Route>
        <Route path="/post" element={<PostsList />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </Container>
  );
}

export default App;
