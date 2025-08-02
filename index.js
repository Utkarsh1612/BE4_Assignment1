const initialiseDatabase = require("./db/db.connects");
const Book = require("./models/book.models");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

initialiseDatabase();

const createBook = async (book) => {
  try {
    return await book.save();
  } catch (error) {
    throw error;
  }
};

app.post("/books", async (req, res) => {
  try {
    const newBook = req.body;
    const book = new Book(newBook);
    const createdBook = await createBook(book);
    if (createdBook) {
      res
        .status(200)
        .json({ message: "Book created successfully", book: createdBook });
    } else {
      res.status(400).json({ error: "Book not created." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "some error occured in creating book!", error });
  }
});

const fetchAllBooks = async () => {
  try {
    const books = Book.find();
    return books;
  } catch (error) {
    console.log("error in fetching all books", error);
  }
};

app.get("/books", async (req, res) => {
  try {
    const allBooks = await fetchAllBooks();
    if (allBooks.length != 0) {
      res.status(200).json(allBooks);
    } else {
      res.status(404).json({ error: "No Book Found!" });
    }
  } catch (errro) {
    res.status(500).json({ error: "Failed to fetch books!" });
  }
});

const findBookByTitle = async (title) => {
  try {
    return await Book.findOne({ title: title });
  } catch (error) {
    throw error;
  }
};

app.get("/books/:title", async (req, res) => {
  try {
    const bookFound = await findBookByTitle(req.params.title);
    if (bookFound) {
      res
        .status(200)
        .json({ message: "Book found successfully", book: bookFound });
    } else {
      res.status(404).json({ error: "Book Not Found By Title" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book by title" });
  }
});

const findBooksByAuthor = async (author) => {
  try {
    return await Book.find({ author: author });
  } catch (error) {
    throw error;
  }
};

// ques 5
app.get("/books/author/:author", async (req, res) => {
  try {
    const books = await findBooksByAuthor(req.params.author);
    if (books.length != 0) {
      res
        .status(200)
        .json({ message: "Book(s) founded successfully", book: books });
    } else {
      res.status(404).json({ error: "Book(s) Not Found!", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book(s)" });
  }
});

// ques 6

const findBooksByGenre = async (genre) => {
  try {
    return await Book.find({ genre: genre });
  } catch (error) {
    throw error;
  }
};

app.get("/books/genre/:genre", async (req, res) => {
  try {
    const books = await findBooksByGenre(req.params.genre);
    if (books.length != 0) {
      res
        .status(200)
        .json({ error: "Books founded successfully", books: books });
    } else {
      res.status(404).json({ error: "No Books Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Find books by Genre!", error });
  }
});

// ques 7 get all boooks , released in the year 2012.

const findBooksByrealeaseYear = async (releasedYear) => {
  try {
    const books = await Book.find({ publishedYear: releasedYear });
    return books;
  } catch (error) {
    throw error;
  }
};

app.get("/books/releasedYear/:releasedYear", async (req, res) => {
  try {
    const books = await findBooksByrealeaseYear(req.params.releasedYear);
    if (books.length != 0) {
      res
        .status(200)
        .json({ message: "Books founded succesfully", books: books });
    } else {
      res.status(404).json({ message: "No Book Found By ReleaseYear" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to Fetch books by releaseYear!", error });
  }
});

//Ques 8 - update book's rating , find by Id , named = "Lean In" from 4.1 to 4.5

const findBookByIdAndUpdate = async (bookId, dataToUpdate) => {
  try {
    const book = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return book;
  } catch (error) {
    throw error;
  }
};

app.post("/books/id/:id", async (req, res) => {
  try {
    const updatedBook = await findBookByIdAndUpdate(req.params.id, req.body);
    if (updatedBook) {
      res
        .status(200)
        .json({ message: "Book updated successfully.", book: updatedBook });
    } else {
      res.status(404).json({ message: "Book Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Faliled to update book!", error });
  }
});

//Ques 09. - update book's rating by title "Shoe Dog".

const findBookByTitleAndUpdate = async (bookTitle, dataToUpdate) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate
    );
    return updatedBook;
  } catch (error) {
    throw error;
  }
};

app.post("/books/title/:title", async (req, res) => {
  try {
    const updatedbook = await findBookByTitleAndUpdate(
      req.params.title,
      req.body
    );
    if (updatedbook) {
      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedbook });
    } else {
      res.status(404).json({ error: "Book Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book by title", error });
  }
});

// Ques 10. delete book by book Id.

const deleteBookById = async (bookId) => {
  try {
    return await Book.findByIdAndDelete(bookId);
  } catch (error) {
    throw error;
  }
};

app.delete("/books/id/:id", async (req, res) => {
  try {
    const deltedBook = await deleteBookById(req.params.id);
    if (deltedBook) {
      res
        .status(200)
        .json({ message: "Book deleted successfully", book: deltedBook });
    } else {
      res.status(404).json({ error: "Book Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book!", error });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
