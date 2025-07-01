import AsyncStorage from '@react-native-async-storage/async-storage'
import { Note } from '../types/note'

const NOTES_KEY = 'notes'

export const NoteService = {
  async getNotes(): Promise<Note[]> {
    const notesJson = await AsyncStorage.getItem(NOTES_KEY)
    return notesJson ? JSON.parse(notesJson) : []
  },

  async getNote(id: string): Promise<Note | null> {
    const notes = await this.getNotes()
    return notes.find(note => note.id === id) || null
  },

  async createNote(
    note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Note> {
    const notes = await this.getNotes()
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const updatedNotes = [...notes, newNote]
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes))
    return newNote
  },

  async updateNote(id: string, note: Partial<Note>): Promise<Note | null> {
    const notes = await this.getNotes()
    const noteIndex = notes.findIndex(n => n.id === id)
    if (noteIndex === -1) return null

    const updatedNote = {
      ...notes[noteIndex],
      ...note,
      updatedAt: new Date().toISOString()
    }
    notes[noteIndex] = updatedNote
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes))
    return updatedNote
  },

  async deleteNote(id: string): Promise<void> {
    const notes = await this.getNotes()
    const updatedNotes = notes.filter(note => note.id !== id)
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes))
  }
}
