function parseQuery(q) {
    return q.replace(" ", "+");
}

export async function getBooksFromQuery(
    query,
    filters = "None",
    limit = 10,
    offset = 0
) {
    let searchQuery = "";
    if (typeof query !== "string") {
        for (let i = 0; i < query.length; i++) {
            searchQuery += filters[ i ] + "=" + parseQuery(query[ i ]);
            searchQuery += i === query.length - 1 ? "" : "&";
        }
    } else {
        searchQuery = `q=${parseQuery(query)}`;
    }
    console.log(searchQuery);
    const fullData = await (
        await fetch(
            `http://openlibrary.org/search.json?${searchQuery}&fields=*,availability`
        )
    ).json();
    //   let fullData = JSON.parse(fs.readFileSync("output.json") as any as string);
    const books = fullData.docs.map(
        ({
            seed,
            key,
            title,
            edition_count,
            first_publish_year,
            edition_key,
            author_name,
            language,
            cover_i,
            availability,
        }) => {
            return {
                seed: seed[ 0 ],
                workId: key.split("/").pop(),
                title,
                editions: edition_count,
                firstPublishYear: first_publish_year ? first_publish_year : "-",
                olid: edition_key[ 0 ],
                author: author_name ? author_name[ 0 ] : "",
                langCount: language ? language.length : 0,
                cover: cover_i
                    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
                    : "None",
                availability: availability
                    ? {
                        borrowAvailable: availability.available_to_borrow,
                        browseAvailable: availability.available_to_browse,
                        waitlistAvailable: availability.available_to_waitlist,
                        preview: availability.is_previewable,
                    }
                    : false,
            };
        }
    );
    return books;
}
// getBooksFromQuery("the lord of the rings").then((data) => console.log(data));
// getBooksFromQuery(parseQuery("the last straw")).then((data) =>
//   console.log(data)
// );

export async function getBookDetails(bookId) {
    const queryString = `https://openlibrary.org/api/books?bibkeys=OLID:${bookId}&format=json&jscmd=details`;
    const bookDetails = await (await fetch(queryString)).json();
    const workDetails = await getWorkDetails(
        bookDetails[ `OLID:${bookId}` ].details.works[ 0 ].key.split("/").pop()
    );
    return workDetails;
}

export async function getWorkDetails(workId) {
    const data = await (
        await fetch(`http://openlibrary.org/works/${workId}.json`)
    ).json();
    const editions = await getEditions(workId);
    return {
        workId,
        description: data.description,
        title: data.title,
        cover: `https://covers.openlibrary.org/b/id/${data.covers[ 0 ]}-L.jpg`,
        firstPublishDate: data.first_publish_date ? data.first_publish_date : "-",
        ...editions,
    };
}

async function getEditions(workId, limit = 10, offset = 0) {
    const data = await (
        await fetch(
            `https://openlibrary.org/works/${workId}/editions.json`
        )
    ).json();
    return {
        editionsCount: data.size,
        editions: data.entries.map(
            ({
                publish_date,
                title,
                by_statement,
                publishers,
                covers,
                key,
                works,
            }) => {
                return {
                    title,
                    publishDate: publish_date,
                    author: by_statement,
                    publisher: publishers ? publishers[ 0 ] : "None",
                    cover: covers
                        ? `https://covers.openlibrary.org/b/id/${covers[ 0 ]}-S.jpg`
                        : "None",
                    olid: key.split("/").pop(),
                    workId: works[ 0 ].key.split("/").pop(),
                };
            }
        ),
    };
}

export async function getTrendingWorks(limit = 10, offset = 0) {
    const data = await (
        await fetch(
            `https://openlibrary.org/trending/now.json`
        )
    ).json();
    return data.works.map(
        ({
            key,
            title,
            edititon_count,
            first_publish_year,
            cover_i,
            language,
            availability,
            author_name
        }) => ({
            workId: key.split("/").pop(),
            title,
            editionCount: edititon_count ? edititon_count : 0,
            firstPublishYear: first_publish_year,
            cover: cover_i
                ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
                : "None",
            languages: language ? language.length : 0,
            borrowAvailable: availability?.available_to_borrow,
            browseAvailable: availability?.available_to_browse,
            waitlistAvailable: availability?.available_to_waitlist,
            preview: availability?.is_previewable,
            author: author_name ? author_name[ 0 ] : ""
        })
    );
}