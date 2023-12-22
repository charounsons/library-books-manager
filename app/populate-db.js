const fetch = require('node-fetch');

// Static array of famous or popular books
const topBooks = [
  { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { title: '1984', author: 'George Orwell' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez' },
  { title: 'Brave New World', author: 'Aldous Huxley' },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
  { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
  { title: 'To the Lighthouse', author: 'Virginia Woolf' },
  { title: 'The Sound and the Fury', author: 'William Faulkner' },
  { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },
  { title: 'Wuthering Heights', author: 'Emily Brontë' },
  { title: 'The Odyssey', author: 'Homer' },
  { title: 'The Count of Monte Cristo', author: 'Alexandre Dumas' },
  { title: 'Moby-Dick', author: 'Herman Melville' },
  { title: 'Anna Karenina', author: 'Leo Tolstoy' },
  { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky' },
  { title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne' },
  { title: 'War and Peace', author: 'Leo Tolstoy' },
  { title: 'The Great War and Modern Memory', author: 'Paul Fussell' },
  { title: 'The Grapes of Wrath', author: 'John Steinbeck' },
  { title: 'In Search of Lost Time', author: 'Marcel Proust' },
  { title: 'The Master and Margarita', author: 'Mikhail Bulgakov' },
  { title: 'A Farewell to Arms', author: 'Ernest Hemingway' },
  { title: 'The Magic Mountain', author: 'Thomas Mann' },
  { title: 'The Old Man and the Sea', author: 'Ernest Hemingway' },
  { title: 'The Stranger', author: 'Albert Camus' },
  { title: 'For Whom the Bell Tolls', author: 'Ernest Hemingway' },
  { title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut' },
  { title: 'The Road', author: 'Cormac McCarthy' },
  { title: 'Norwegian Wood', author: 'Haruki Murakami' },
  { title: 'The Shadow of the Wind', author: 'Carlos Ruiz Zafón' },
  { title: 'All Quiet on the Western Front', author: 'Erich Maria Remarque' },
  { title: 'The Wind-Up Bird Chronicle', author: 'Haruki Murakami' },
  { title: 'The Alchemist', author: 'Paulo Coelho' },
  { title: 'The Name of the Wind', author: 'Patrick Rothfuss' },
  { title: 'The God of Small Things', author: 'Arundhati Roy' },
  { title: 'The Brief Wondrous Life of Oscar Wao', author: 'Junot Díaz' },
  { title: 'Life of Pi', author: 'Yann Martel' },
  { title: 'Atonement', author: 'Ian McEwan' },
  { title: 'The Secret History', author: 'Donna Tartt' },
  { title: 'The Poisonwood Bible', author: 'Barbara Kingsolver' },
  { title: 'The Amazing Adventures of Kavalier & Clay', author: 'Michael Chabon' },
  { title: 'The Goldfinch', author: 'Donna Tartt' },
  { title: 'The Sympathizer', author: 'Viet Thanh Nguyen' },
  { title: 'The Underground Railroad', author: 'Colson Whitehead' },
  { title: 'The Overstory', author: 'Richard Powers' },
  { title: 'The Night Circus', author: 'Erin Morgenstern' },
  { title: 'The Silent Patient', author: 'Alex Michaelides' },
  { title: 'Where the Crawdads Sing', author: 'Delia Owens' },
  { title: 'Educated', author: 'Tara Westover' },
  { title: 'The Glass Castle', author: 'Jeannette Walls' },
  { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid' },
  { title: 'Eleanor Oliphant Is Completely Fine', author: 'Gail Honeyman' },
  { title: 'Becoming', author: 'Michelle Obama' },
  { title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot' },
  { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari' },
  { title: 'The Power of Habit', author: 'Charles Duhigg' },
  { title: 'The Da Vinci Code', author: 'Dan Brown' },
  { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson' },
  { title: 'The Hunger Games', author: 'Suzanne Collins' },
  { title: 'The Help', author: 'Kathryn Stockett' },
  { title: 'Gone Girl', author: 'Gillian Flynn' },
  { title: 'The Fault in Our Stars', author: 'John Green' },
  { title: 'The Girl on the Train', author: 'Paula Hawkins' },
  { title: 'The Martian', author: 'Andy Weir' },
  { title: 'The Shack', author: 'William P. Young' },
  { title: 'The Handmaid\'s Tale', author: 'Margaret Atwood' },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
  { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
  { title: 'The Picture of Dorian Gray', author: 'Oscar Wilde' },
  { title: 'Animal Farm', author: 'George Orwell' },
]

// Function to fetch existing books
async function fetchExistingBooks() {
  try {
    const response = await fetch('http://localhost:3000/books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const existingBooks = await response.json();
      return existingBooks;
    } else {
      console.error('Failed to fetch existing books. Status:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching existing books:', error.message);
    return [];
  }
}

// Function to check if a book is already present in the existing books
function isBookAlreadyPresent(existingBooks, newBook) {
  return existingBooks.some((book) => book.title === newBook.title);
}

// Function to upload a book by calling the /books endpoint
async function uploadBook(book) {
  try {
    const existingBooks = await fetchExistingBooks();

    if (!isBookAlreadyPresent(existingBooks, book)) {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        console.log(`Book "${book.title}" uploaded successfully!`);
      } else {
        console.error(`Failed to upload book "${book.title}". Status:`, response.status);
      }
    } else {
      console.log(`Book "${book.title}" already exists. Skipping upload.`);
    }
  } catch (error) {
    console.error(`Error uploading book "${book.title}":`, error.message);
  }
}

// Upload each book one at a time
async function uploadBooks() {
  for (const book of topBooks) {
    await uploadBook(book);
  }
}

uploadBooks();
