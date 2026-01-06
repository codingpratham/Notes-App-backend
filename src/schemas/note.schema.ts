import { object, string, nativeEnum } from "zod";

enum NoteStatus {
    done,
    pending
}

export const noteSchema = object({
    title: string(),
    content: string(),
})