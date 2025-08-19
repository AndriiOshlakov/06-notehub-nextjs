import axios from "axios";
import { NoteCreatePayload, Note } from "../app/types/note";

const myPostsKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface PostsHttpResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const headers = { Authorization: `Bearer ${myPostsKey}` };

// fetchNotes виконує запит на сервер для отримання колекції нотатків
export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string
): Promise<PostsHttpResponse> => {
  const response = await axios.get<PostsHttpResponse>(BASE_URL, {
    headers,
    params: {
      page,
      perPage,
      search,
    },
  });
  return response.data;
};

// createNote виконує запит для створення нової нотатки на сервері

export const createNote = async (note: NoteCreatePayload): Promise<Note> => {
  const res = await axios.post<Note>(BASE_URL, note, { headers });
  return res.data;
};

// deleteNote виконує запит для видалення нотатки за заданим ідентифікатором
export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/${id}`, {
    headers,
  });
  return res.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers,
  });
  return res.data;
};

// export type Note = {
//   id: string;
//   title: string;
//   content: string;
//   categoryId: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type NoteListResponse = {
//   notes: Note[];
//   total: number;
// };

// axios.defaults.baseURL = "https://next-docs-api.onrender.com";

// export const getNotes = async () => {
//   const res = await axios.get<NoteListResponse>("/notes");

//   return res.data;
// };

// export const getSingleNote = async (id: string) => {
//   const res = await axios.get<Note>(`/notes/${id}`);
//   return res.data;
// };
