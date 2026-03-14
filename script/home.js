

const tabActive = ["bg-[#4A00FF]", "text-white", "font-semibold"]
const tabInactive = ["bg-white", "border", "border-[#E4E4E7]", "text-[gray]", "font-medium",]

// let currentTab = "all";
//     currentTab = tab;

function switchTab(tab) {
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
        img: "./assets/Closed-Status.png"
    }
}



//  Displaying card
const loadIssue = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((r) => r.json())
        .then((json) => displayIssue(json.data));
}

const displayIssue = (issues) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""


    issues.forEach(issue => {

        const style = cardStyle[issue.status]

        const card = document.createElement("div")
        card.innerHTML = `

                <div id="card" class=" bg-white border-t-3 ${style.border} rounded shadow h-full">
                    <div class="p-4">
                        <div class="flex justify-between">
                            <img src="./assets/Open-Status.png" alt="">
                            <div class="w-20 bg-[#FEECEC] flex items-center justify-center rounded-[100px]">
                                <p class=" text-[#EF4444] text-xs font-medium">${issue.priority.toUpperCase()}</p>
                            </div>
                        </div>
                        <div class="pt-3 pb-3 space-y-2">
                            <p class="font-semibold text-sm text-[#1F2937]">${issue.title}</p>
                            <p class="text-xs text-[#64748B]">${issue.description}</p>
                        </div>
                        <div class="flex gap-1">
                            <div class="w-14 p-1 bg-[#FEECEC] border border-[#FECACA] rounded-[100px] flex justify-center items-center">
                                <img class="size-3" src="./assets/BugDroid.png" alt="">
                                <p class=" text-[#EF4444] text-xs font-medium">BUG</p>
                            </div>
                            <div class="w-28 p-1 bg-[#FFF8DB] border border-[#FDE68A] rounded-[100px] flex gap-0.3 justify-center items-center">
                                <img class="size-3" src="./assets/Lifebuoy.png" alt="">
                                <p class=" text-[#D97706] text-xs font-medium"> HELP WANTED</p>
                            </div>
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
    });

}


loadIssue();