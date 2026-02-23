import { create } from 'zustand';

interface NoteState {
  text: string;
  setText: (text: string) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  text: '',
  setText: (text) => set({ text }),
}));
