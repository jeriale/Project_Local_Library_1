function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) => {
    var nameA = account1.name.last.toLowerCase();
    var nameB = account2.name.last.toLowerCase();
    if (nameA > nameB) {
      return 1;
    } else if (nameA < nameB) {
      return -1;
    } else {
      return 0;
    }
  });
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let book in books) {
    for (let borrow in books[book].borrows) {
      const refined = books[book].borrows[borrow];
      if (refined.id === account.id) {
        total++;
      }
    }
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let possessedBooks = [];
  for (let book in books) {
    for (let borrow in books[book].borrows) {
      const refined = books[book].borrows[borrow];
      if (!refined.returned && refined.id === account.id) {
        const { id, title, genre, authorId } = books[book];
        for (let author in authors) {
          if (authors[author].id === books[book].authorId) {
            possessedBooks.push({ id, title, genre, authorId, author: { ...authors[author] }, ...books[book] });
          }
        }
      }
    }
  }
  return possessedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
