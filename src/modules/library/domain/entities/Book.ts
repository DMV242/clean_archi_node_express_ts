export type BookProps = {
  title: string;
  author: string;
  genre: string;
  isAvailable?: boolean;
};

export class Book {
  constructor(
    private title: string,
    private author: string,
    private genre: string,
    private isAvailable = true
  ) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.isAvailable = isAvailable;
  }

  getIsAvailable(): boolean {
    return this.isAvailable;
  }

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }

  getGenre(): string {
    return this.genre;
  }

  toObject() {
    return {
      title: this.title,
      author: this.author,
      genre: this.genre,
      isAvailable: this.isAvailable,
    };
  }
}
