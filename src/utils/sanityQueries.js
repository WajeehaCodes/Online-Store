// can pass parameter for datetime and match -> dateFeatured < $today
function getlatestBooksQuery() {
  return `
                            *[_type == "book"] | order(dateFeatured desc)
                            {
                                _id,
                                Name,
                                Image ,
                                description,
                                ISBN,
                                Publisher,
                                Authors,
                                Category,
                                weight,
                                price,
                                quantity,
                                dateFeatured,
                                reviews,
                                reviewsCount                    
                            }
                            [0...9]
                            `;
}
function getAllBooksQuery() {
  return `
                        *[_type == "book"] | order(dateFeatured desc)
                        {
                            _id,
                            Name,
                            Image,
                            description,
                            ISBN,
                            Publisher,
                            Authors,
                            Category,
                            weight,
                            price,
                            quantity,
                            dateFeatured,
                            reviews,
                            reviewsCount                    
                        }
                        `;
}

const getAllCategories = `
                        *[_type == "book"] | order(dateFeatured desc) {
                            Category,
                        }
                        `;

const getBookSpec = (id) => {
  return `
    *[_type=="book"  && _id=="${id}"] | order(dateFeatured desc){
        _id,
        Name,
        Image,
        description,
        descriptiveImages,
        ISBN,
        Publisher,
        Authors,
        Category,
        weight,
        price,
        quantity,
        dateFeatured,
        reviews,
        reviewsCount
    }
    `;
};

const categoryBooks = (category, id=null) => {
  if(id===null) {
    return `
    *[_type == "book" &&
        "${category}" in Category[]] | order(dateFeatured desc)
        {
            _id,
            Name,
            Image,
            description,
            ISBN,
            Publisher,
            Authors,
            Category,
            weight,
            price,
            quantity,
            dateFeatured,
            reviews,
            reviewsCount                    
        }
    `;
  }
  else {
    return `
    *[_type == "book" &&
        "${category}" in Category[] && _id != '${id}' ] | order(dateFeatured desc)
        {
            _id,
            Name,
            Image,
            description,
            ISBN,
            Publisher,
            Authors,
            Category,
            weight,
            price,
            quantity,
            dateFeatured,
            reviews,
            reviewsCount                    
        }
    `;
  }
};

const searchQuey = (query) => {
  return `
    *[_type=="book" &&
    ("${query}" in Category[] ||
    "${query}" in Authors[] ||
    Name match "${query}" ||
    ISBN match "${query}")]  | order(dateFeatured desc)
    {
        _id,
        Name,
        Image,
        description,
        ISBN,
        Publisher,
        Authors,
        Category,
        weight,
        price,
        quantity,
        dateFeatured,
        reviews,
        reviewsCount
    }
    `;
};

const getBannerCount = () => {
  return `
    *[_type=="assets" && title=="BannerCount"] {
        extra
      }[0]
    `;
};

const getBannersQ = (query) => {
  return `
    *[_type=="assets" && title=="Banner"] {
        Picture,
        description,
        title,
        extra
      }
    [0...${query}]
    `;
};

const getCategoryBlock = () => {
  return `
    *[_type=="assets" && title=="Category"] {
        Picture,
        description,
        title,
        extra
      }
    `;
};

export {
  getlatestBooksQuery,
  getAllBooksQuery,
  getAllCategories,
  getBookSpec,
  categoryBooks,
  searchQuey,
  getBannerCount,
  getBannersQ,
  getCategoryBlock,
};
