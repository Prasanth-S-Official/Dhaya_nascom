import { Book } from "./book.model";

describe('Book Model', () => {

  fit('Frontend_should_create_an_instance_Book_with_defined_properties', () => {
    // Create a sample Book object
    const book: Book = {
      bookId: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      description: 'A classic novel set in the 1920s.',
      rentalFee: 250,
      isAvailable: true,
      coverImage: 'base64imagestring'
    };

    expect(book).toBeTruthy();
    expect(book.bookId).toBeDefined();
    expect(book.title).toBeDefined();
    expect(book.author).toBeDefined();
    expect(book.genre).toBeDefined();
    expect(book.description).toBeDefined();
    expect(book.rentalFee).toBeDefined();
    expect(book.isAvailable).toBeDefined();
    expect(book.coverImage).toBeDefined();

    // Additional checks for values
    expect(book.bookId).toBe(1);
    expect(book.title).toBe('The Great Gatsby');
    expect(book.author).toBe('F. Scott Fitzgerald');
    expect(book.genre).toBe('Fiction');
    expect(book.description).toBe('A classic novel set in the 1920s.');
    expect(book.rentalFee).toBe(250);
    expect(book.isAvailable).toBe(true);
    expect(book.coverImage).toBe('base64imagestring');
  });

});
