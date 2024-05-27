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

export type Tarea = {
  id: string;
} & TareaData;

export type RawTarea = {
  id: string;
} & RawTareaData;

export type RawTareaData = {
  titulo: string;
  descripcion: string;
  estadoIds: string[];
  noteIds: string[];
  vencimiento: string;
}

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  descripcion: string;
}

export type TareaData = {
  titulo: string;
  descripcion: string;
  estados: Estado[];
  noteIds: string[];
  vencimiento: string;
  notas?: Nota[];
}

export type Estado = {
  id: string;
  label: string;
}

export type Nota = {
  id: string;
  descripcion: string;
}

function App() {
  const [tareas, setTareas] = useLocalStorage<RawTarea[]>("TAREAS", []);
  const [estados, setEstados] = useLocalStorage<Estado[]>("ESTADO", []);
  const [notas, setNotas] = useLocalStorage<RawNote[]>("NOTAS", []);

  const tareasWithEstados = useMemo(() => {
    return tareas.map(tarea => {
      return {
        ...tarea,
        estados: estados.filter(estado => tarea.estadoIds.includes(estado.id)),
        notas: notas.filter(nota => tarea.noteIds.includes(nota.id)),
      };
    });
  }, [tareas, estados, notas]);

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

  function onUpdateTarea(id: string, { estados, noteIds, notas, ...data }: TareaData) {
    setTareas(prevTareas => {
      return prevTareas.map(tarea => {
        if (tarea.id === id) {
          return {
            ...tarea,
            ...data,
            estadoIds: estados.map(estado => estado.id),
            noteIds: noteIds || [],
            notas: notas || [],  // Certifique-se de passar as notas atualizadas
          };
        } else {
          return tarea;
        }
      });
    });

    // Atualiza as notas no localStorage
    setNotas(prevNotas => {
      // Mantém apenas as notas que ainda estão presentes na nova lista de noteIds
      const updatedNotas = prevNotas.filter(nota => noteIds.includes(nota.id));

      // Filtra os IDs duplicados na nova lista de noteIds
      const uniqueNoteIds = Array.from(new Set(noteIds));

      // Cria novas notas para IDs únicos que não existem
      const newNotas = uniqueNoteIds
        .filter(noteId => !updatedNotas.some(nota => nota.id === noteId))
        .map(noteId => {
          const notaExistente = notas?.find(nota => nota.id === noteId);
          return notaExistente || { id: noteId, descripcion: "" };  // Preserva a descrição da nova nota
        });

      // Retorna a lista atualizada de notas
      return [...updatedNotas, ...newNotas];
    });
  }


  function onDeletarTarea(id: string) {
    setTareas(prevTareas => {
      return prevTareas.filter(tarea => tarea.id !== id);
    });
  }

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
