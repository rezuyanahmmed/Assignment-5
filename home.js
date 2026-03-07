let allIssues = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchIssues();
});

function fetchIssues() {
  const container = document.getElementById('issue-container');
  
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json()) 
    .then(result => {
      if (result.status === "success" && Array.isArray(result.data)) {
        allIssues = result.data;
        renderIssues(allIssues);
      } else {
        container.innerHTML = "<p class='text-center col-span-4'>No data found!</p>";
      }
    })
    .catch(err => {
      console.log("Error:", err);
    });
}

function renderIssues(issues) {
  const container = document.getElementById('issue-container');
  const countText = document.getElementById('issue-count');

  container.innerHTML = "";
  countText.innerText = `${issues.length} Issues`;

  issues.forEach(issue => {
    const isOpen = issue.status === 'open';
    const topBorder = isOpen ? 'border-t-green-500' : 'border-t-purple-500';

    const card = document.createElement('div');
    card.className = `bg-white p-5 rounded-lg border-t-[6px] ${topBorder} shadow-sm hover:shadow-md transition-all cursor-pointer`;

    const labelsHTML = issue.labels.map(label => `
            <span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">${label}</span>
        `).join('');

    // কার্ডে ক্লিক করলে DaisyUI মোডাল ওপেন হবে (আইডি চেক করে নিন)
    card.onclick = () => {
       document.getElementById('modal').showModal();
    };

    card.innerHTML = `
            <div class="flex justify-between items-center mb-3">
                <div class="w-3 h-3 rounded-full ${isOpen ? 'bg-green-500' : 'bg-purple-500'}"></div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-500 border border-orange-200 uppercase">${issue.priority}</span>
            </div>
            <h3 class="font-bold text-sm text-slate-800 mb-1 leading-tight">${issue.title}</h3>
            <p class="text-xs text-slate-500 mb-4 line-clamp-2">${issue.description}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${labelsHTML}
            </div>

            <div class="text-[10px] text-gray-400 mt-auto border-t pt-3 flex justify-between">
                <span>#${issue.id} by ${issue.author}</span>
                <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        `;
    container.appendChild(card);
  });
}

function filterIssues(status) {
  if (status === 'all') {
    renderIssues(allIssues);
  } else {
    const filtered = allIssues.filter(item => item.status === status);
    renderIssues(filtered);
  }
}