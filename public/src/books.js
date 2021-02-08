function findAuthorById(authors, id) {
  for (let author in authors) {
    if (authors[author].id === id) {
      return authors[author];
    }
  }
}

function findBookById(books, id) {
  for (let book in books) {
    if (books[book].id === id) {
      return books[book];
    }
  }
}

function partitionBooksByBorrowedStatus(books) {
  let partition = [];
  const borrowed = books.filter((book) => !book.borrows[0].returned);
  const returned = books.filter((book) => book.borrows[0].returned);
  partition.push(borrowed, returned);
  return partition;
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];

  for (let borrow in book.borrows) {
    const borrower = book.borrows[borrow];
    for (let account in accounts) {
      const { picture, age, name, company, email, registered } = accounts[account];
      if (borrower.id === accounts[account].id) {
        const { id, returned } = borrower;
        borrowers.push({ id, returned, picture, age, name, company, email, registered });
      }
    }
  }

  borrowers.length = 10;
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
