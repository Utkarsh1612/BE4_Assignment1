const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: [String],
      enum: [
        "Fantasy",
        "Science Fiction",
        "Thriller",
        "Mystery",
        "Romance",
        "Horror",
        "Historical",
        "Non-fiction",
        "Business",
        "Autobiography",
      ],
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    rating: {
      type: Number,
    },
    summary: {
      type: String,
    },
    coverImageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
