function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;

  for (let book in books) {
    for (let borrow in books[book].borrows) {
      const borrowed = books[book].borrows[borrow];
      if (!borrowed.returned) {
        total++;
      }
    }
  }

  return total;
}

function getMostCommonGenres(books) {
  let genres = [];

  for (let book in books) {
    genres.push({ name: books[book].genre, count: 1 });
  }

  sortByName(genres);

  const accumulator = { name: genres[0].name, count: 0 };

  let results = genres.reduce((acc, genre) => {
    if (acc[acc.length - 1].name === genre.name) {
      acc[acc.length - 1].count++;
      return acc;
    } else {
      acc.push(genre);
      return acc;
    }
  }, [accumulator]);

  sortByCount(results);

  results.length = 5;
  return results;
}

function getMostPopularBooks(books) {
  let popularBooks = [];

  for (let book in books) {
    popularBooks.push({ name: books[book].title, count: books[book].borrows.length });  
  }

  sortByCount(popularBooks);

  popularBooks.length = 5;
  return popularBooks;
}

function getMostPopularAuthors(books, authors) {
  let result = [];

  for (let book in books) {
    result.push({ name: books[book].authorId, count: books[book].borrows.length });
  }

  const accumulator = { name: result[0].name, count: 0 };

  let actual = result.reduce((acc, author) => {
    if (acc[acc.length - 1].name === author.name) {
      acc[acc.length - 1].count += author.count;
      return acc;
    } else {
      acc.push(author);
      return acc;
    }
  }, [accumulator]);

  actual.map((change) => {
    for (let author in authors) {
      if (authors[author].id === change.name) {
        change.name = `${authors[author].name.first} ${authors[author].name.last}`;
      }
    }
  })

  sortByCount(actual);

  actual.length = 5;
  return actual;
}

function sortByName(array) {
  array.sort(function (propA, propB) {
    let sortA = propA.name;
    let sortB = propB.name;
    if (sortA < sortB) {
      return 1;
    } else if (sortA > sortB) {
      return -1;
    } else {
      return 0;
    }
  });

  return array;
}

function sortByCount(array) {
  array.sort(function (propA, propB) {
    let sortA = propA.count;
    let sortB = propB.count;
    if (sortA < sortB) {
      return 1;
    } else if (sortA > sortB) {
      return -1;
    } else {
      return 0;
    }
  });

  return array;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
