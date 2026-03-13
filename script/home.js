

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