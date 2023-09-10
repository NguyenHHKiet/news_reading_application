"use strict";

const apiCountry = (country, category) =>
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=bb11d664d8ea43bcaf3201b1d91d2c8c`;

// const apiTechcrunch =
//     "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=bb11d664d8ea43bcaf3201b1d91d2c8c";

const currentUser = JSON.parse(getFromStorage("currentUser")) || undefined;
const { pageSize: userPageSize = 5, category: userCategory = "business" } =
    currentUser || {};

let allArticles = null,
    totalPages = null,
    loading = false,
    atPrevious = false,
    atNext = false,
    atPagination = false,
    page = 1,
    pageSize = userPageSize;

const pageNumberContainer = document.querySelector(".pagination");
const btnNext = document.querySelector("#btn-next");
const parentBtnNext = btnNext.parentNode;
const btnPrev = document.querySelector("#btn-prev");
const parentBtnPrev = btnPrev.parentNode;

// new list of articles
const containerNews = document.getElementById("news-container");

renderNews();

// next button pagination
btnNext.addEventListener("click", () => {
    pageNumberContainer.children[page].classList.remove("disabled");
    if (page < totalPages) {
        page++;
        renderNews();
    }
    page === totalPages
        ? parentBtnNext.classList.add("disabled")
        : parentBtnPrev.classList.remove("disabled");
});

// prev button pagination
btnPrev.addEventListener("click", () => {
    pageNumberContainer.children[page].classList.remove("disabled");
    if (page > 1) {
        page--;
        renderNews();
    }
    page === 1
        ? parentBtnPrev.classList.add("disabled")
        : parentBtnNext.classList.remove("disabled");
});

async function getAPI() {
    try {
        const response = await fetch(apiCountry("us", userCategory));
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    } finally {
        loading = true;
    }
}

async function renderNews() {
    // only one call API method
    if (!allArticles) {
        // loading all articles
        containerNews.innerHTML = "loading...";

        const temp = await getAPI();
        allArticles = await temp.articles;

        // setup render number of page
        totalPages = Math.ceil(allArticles.length / pageSize);
    }
    // console.log(allArticles);
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const currentPage = page;

    // slice array limit 5 articles based on page size(startIndex, endIndex)
    const articles = allArticles.slice(startIndex, endIndex);

    // render only one when first articles render
    if (!atPagination) renderPageNumbers(currentPage, totalPages);
    // disable pagination current page
    pageNumberContainer.children[page].classList.add("disabled");

    // render once card from articles
    const items = articles.map((item) => renderCard(item));
    // concat string together
    if (loading) containerNews.innerHTML = items.join("");
}

function renderPageNumbers(currentPage, totalPages) {
    for (let i = totalPages; i >= 1; i--) {
        let newLi = document.createElement("li");
        newLi.classList.add("page-item");
        newLi.innerHTML = `<a class="page-link" id="page-${i}">${i}</a>`;
        // create tag li from li second
        pageNumberContainer.insertBefore(
            newLi,
            pageNumberContainer.children[1]
        );
    }
    atPagination = true;
}

function renderCard(item) {
    return `<div class="card flex-row flex-wrap">
                <div class="card mb-3" style="">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img
                                src="${item.urlToImage}"
                                class="card-img"
                                alt="Firefox and Chrome are squaring off over ad-blocker extensions - The Verge"
                            />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${item.title}
                                </h5>
                                <p class="card-text">
                                    ${item.content}
                                </p>
                                <a
                                    href="${item.url}"
                                    target="_blank"
                                    class="btn btn-primary"
                                    >View</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}
