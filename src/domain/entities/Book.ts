export interface BookProps {
    title: string;
    author: string;
    genre: string;
    isAvailable?: boolean;
}

export class Book {
    title: string;
    author: string;
    genre: string;
    isAvailable: boolean;

    constructor({ title, author, genre, isAvailable = true }: BookProps) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.isAvailable = isAvailable;
    }
}
