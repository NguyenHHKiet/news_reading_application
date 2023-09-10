"use strict";

const searchAPI = (keyword) =>
    `https://newsapi.org/v2/everything?q=${keyword}&apiKey=bb11d664d8ea43bcaf3201b1d91d2c8c`;

let totalPages = null,
    loading = false,
    searchArr = null,
    page = 1,
    pageSize = 5;

const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
const pageNumberContainer = document.querySelector(".pagination");
const btnNext = document.querySelector("#btn-next");
const parentBtnNext = btnNext.parentNode;
const btnPrev = document.querySelector("#btn-prev");
const parentBtnPrev = btnPrev.parentNode;

// new list of articles
const containerNews = document.getElementById("news-container");

renderSearch();

// search button for articles
btnSubmit.addEventListener("click", () => {
    if (searchArr) searchArr = null;
    inputQuery.value === ""
        ? alert("Please input a query filled with!!")
        : renderSearch(inputQuery.value);
});

// next button pagination
btnNext.addEventListener("click", () => {
    if (page < totalPages) {
        page++;
        renderSearch();
    }
    page === totalPages
        ? parentBtnNext.classList.add("disabled")
        : parentBtnPrev.classList.remove("disabled");
});

// prev button pagination
btnPrev.addEventListener("click", () => {
    if (page > 1) {
        page--;
        renderSearch();
    }
    page === 1
        ? parentBtnPrev.classList.add("disabled")
        : parentBtnNext.classList.remove("disabled");
});

async function getAPI(keyword) {
    try {
        const response = await fetch(searchAPI(keyword));
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    } finally {
        loading = true;
    }
}
async function renderSearch(keyword = "bitcoin") {
    // only one call API method
    if (!searchArr) {
        // loading first
        containerNews.innerHTML = "loading...";

        const temp = await getAPI(keyword);
        searchArr = temp.articles;
        totalPages = Math.ceil(searchArr.length / pageSize);
        if (!searchArr) containerNews.innerHTML = "no information";
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const currentPage = page;

    // slice array limit 5 articles based on page size(startIndex, endIndex)
    const articles = searchArr.slice(startIndex, endIndex);

    // render only one when first articles render
    renderPageNumbers(currentPage);

    // render once card from articles
    const items = articles.map((item) => renderCard(item));
    if (loading) containerNews.innerHTML = items.join("");
}
function renderPageNumbers(currentPage) {
    const pageNum = document.getElementById("page-num");
    pageNum.textContent = `${currentPage}`;
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
