let currentTab = "all";

const tabActive = ["bg-[#4A00FF]", "text-white", "font-semibold"]
const tabInactive = ["bg-white", "border", "border-[#E4E4E7]", "text-[gray]", "font-medium",]



// button function
function switchTab(tab) {
    currentTab = tab;
    const tabs = ["all", "open", "closed"]

    for (const t of tabs) {
        const tabName = document.getElementById(t);
        if (t === tab) {
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        }
        else {
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tabInactive);
        }
    }
}


/*  "data": [
    {
      "id": 1,
      "title": "Fix navigation menu on mobile devices",
      "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
      "status": "open",
      "labels": [
        "bug",
        "help wanted"
      ],
      "priority": "high",
      "author": "john_doe",
      "assignee": "jane_smith",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
*/

// card style
const cardStyle = {
    open: {
        border: "border-[#00A96E]",
        img: "./assets/Open-Status.png"
    },
    closed: {
        border: "border-[#A855F7]",
        img: "./assets/Closed- Status .png"
    },
    high: {
        color: "text-[#EF4444]",
        bg: "bg-[#FEECEC]",
        modalBG: "bg-[#EF4444]"
    },
    medium: {
        color: "text-[#F59E0B]",
        bg: "bg-[#FFF6D1]",
        modalBG: "bg-[#F59E0B]"
    },
    low: {
        color: "text-[#9CA3AF]",
        bg: "bg-[#EEEFF2]",
        modalBG: "bg-[#9CA3AF]"
    },
    bug: `
        <div class="w-fit py-1 px-2 bg-[#FEECEC] border border-[#FECACA] rounded-[100px] flex justify-center items-center">
            <img class="size-3" src="./assets/BugDroid.png" alt="">
            <p class=" text-[#EF4444] text-xs font-medium">BUG</p>
        </div>
    `,
    "help wanted": `
        <div class="w-fit py-1 px-2 bg-[#FFF8DB] border border-[#FDE68A] rounded-[100px] flex gap-0.3 justify-center items-center">
            <img class="size-3" src="./assets/Lifebuoy.png" alt="">
            <p class=" text-[#D97706] text-xs font-medium"> HELP WANTED</p>
        </div>    
    `,
    "good first issue": `
        <div class="w-fit py-1 px-2 bg-[#e5cafc] border border-[#caa7eb] rounded-[100px] flex gap-0.3 justify-center items-center">
            <img class="size-[13px]" src="./assets/circle.png" alt="">
            <p class=" text-[#9a3cf1] text-xs font-medium">GOOD FIRST ISSUE</p>
        </div>    
    `,
    enhancement: `
        <div class="w-fit py-1 px-2 bg-[#DEFCE8] border border-[#BBF7D0] rounded-[100px] flex justify-center items-center">
            <img class="size-3" src="./assets/Sparkle.png" alt="">
            <p class=" text-[#00A96E] text-xs font-medium">ENHANCEMENT</p>
        </div>
    `,
    documentation: `
        <div class="w-fit py-1 px-2 bg-[#EEEFF2] border border-[#d8dce8] rounded-[100px] flex justify-center items-center">
            <img class="size-[13px]" src="./assets/file.png" alt="">
            <p class=" text-[#7a88a3] text-xs font-medium">DOCUMENTATION</p>
        </div>
    `
}

// load card details
const loadCardDetail = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayCardDetail(json.data));
}

// Displaying card deatails
const displayCardDetail = (cardDetails) => {
    // console.log(cardDetails);
    const priorityStyle = cardStyle[cardDetails.priority];
    const labelStyle = cardDetails.labels.map((label) => cardStyle[label]).join("");

    const detailsCard = document.getElementById("details_modal");
    detailsCard.innerHTML = `
                <div class="modal-box bg-white rounded-xl p-8 shadow">
                    <h3 class="text-2xl font-bold text-[#1F2937]">${cardDetails.title}</h3>
                    <div class="flex pt-2 pb-6 gap-2 items-center">
                        <div class="py-1.5 px-4 w-fit bg-[#00A96E] text-white font-medium text-xs rounded-[100px]">${cardDetails.status}</div>
                        <div class="size-1 bg-[#64748B] rounded-full"></div>
                        <p class="text-xs text-[#64748B]">Opened by ${cardDetails.author}</p>
                        <div class="size-1 bg-[#64748B] rounded-full"></div>
                        <p class="text-xs text-[#64748B]">${cardDetails.createdAt}</p>
                    </div>

                    <div id="labels" class="flex flex-wrap gap-1">
                        ${labelStyle}
                    </div>
                    <p class="py-6 text-[#64748B]">${cardDetails.description}</p>

                    <div class="grid grid-flow-col gap-2.5 p-4 bg-[#F8FAFC] rounded-lg">
                        <div>
                            <p class="text-[#64748B]">Assignee:</p>
                            <p class="font-semibold text-[#1F2937]">${cardDetails.assignee}</p>
                        </div>
                        <div>
                            <p class="text-[#64748B]">Priority:</p>
                            <div class="py-1 px-3.5 w-fit ${priorityStyle.modalBG} text-white font-medium text-xs rounded-[100px]">${cardDetails.priority.toUpperCase()}</div>
                        </div>
                    </div>

                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-primary">Close</button>
                        </form>
                    </div>
                </div>
    `;

    detailsCard.showModal();
    
}


// load cards
const loadIssue = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((r) => r.json())
        .then((json) => displayIssue(filterCards(json.data)));
}

const filterCards = (data) => {
    if (currentTab === "all") {
        return data;
    }
    else if (currentTab === "open") {
        const openData = data.filter(d => d.status === currentTab);
        return openData;
    }
    else if (currentTab === "closed") {
        const closedData = data.filter(d => d.status === currentTab);
        return closedData;
    }
}

//  Displaying cards
const displayIssue = (issues) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""

    issues.forEach(issue => {

        const statusStyle = cardStyle[issue.status];
        const priorityStyle = cardStyle[issue.priority];
        const labelStyle = issue.labels.map((label) => cardStyle[label]).join("");

        const card = document.createElement("div")
        card.innerHTML = `

                <div id="${issue.id}" data-status="${issue.status}" class=" card bg-white border-t-3 ${statusStyle.border} rounded shadow h-full">
                    <div class="p-4">
                        <div class="flex justify-between">
                            <img src="${statusStyle.img}" alt="">
                            <div class="w-20 ${priorityStyle.bg} flex items-center justify-center rounded-[100px]">
                                <p class=" ${priorityStyle.color} text-xs font-medium">${issue.priority.toUpperCase()}</p>
                            </div>
                        </div>
                        <div class="pt-3 pb-3 space-y-2">
                            <p class="font-semibold text-sm text-[#1F2937]">${issue.title}</p>
                            <p class="text-xs text-[#64748B]">${issue.description}</p>
                        </div>
                        <div id="labels" class="flex flex-wrap gap-1">
                            ${labelStyle}
                        </div>
                    </div>
                    <hr class="border border-[#E4E4E7]">
                    <div class="p-4 text-[#64748B] text-xs space-y-4">
                        <p>#${issue.id} by ${issue.author}</p>
                        <p>${issue.createdAt}</p>
                    </div>
                </div>

            `;

        cardContainer.append(card);


        // the code below when run shows the conditionsed card but shows empty space in other cards 
        // const cards = document.querySelectorAll(".card")
        // cards.forEach(card => {
        //     if (currentTab === "all") {
        //         card.classList.remove("hidden")
        //         // card.style.display = "none"
        //     }
        //     else if (card.getAttribute("data-status") === currentTab) {
        //         card.style.display = "block"
        //     }
        //     else {
        //         card.style.display = "none"
        //     }
        // });

    });
}
loadIssue();


// display card details
document.getElementById("card-container").addEventListener("click", function (event) {

    const clickedElement = event.target;
    const card = clickedElement.closest(".card");

    if (card.classList.contains("card")) {
        loadCardDetail(card.getAttribute("id"))
    }

})

