let currentPage = 1;
const perPage = 5;

async function loadMasters() {
    const response = await fetch(`/masters/api/list?page=${currentPage}&perPage=${perPage}`);
    const result = await response.json();

    const mastersContainer = document.getElementById("masters");
    mastersContainer.innerHTML = "";

    result.data.forEach(master => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${master.name}</h3>
            <p>Спеціалізація: ${master.specialization}</p>
            <p>Місто: ${master.city}</p>
            <p>Досвід: ${master.experience} років</p>
            <p>Ціна: ${master.price} грн</p>
            <hr>
        `;

        mastersContainer.appendChild(div);
    });

    const totalPages = Math.ceil(result.totalCount / perPage);

    document.getElementById("pageInfo").textContent =
        `Сторінка ${currentPage} з ${totalPages}`;

    document.getElementById("prev").disabled = currentPage === 1;
    document.getElementById("next").disabled = currentPage === totalPages;
}

document.getElementById("prev").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadMasters();
    }
});

document.getElementById("next").addEventListener("click", () => {
    currentPage++;
    loadMasters();
});

loadMasters();