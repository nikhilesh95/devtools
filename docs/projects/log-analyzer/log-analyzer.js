let currentSearchTerm = "";

let logLines = [];


let annotations = {};
let currentPopup = null;


function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderLog(searchTerm = "") {
  currentSearchTerm = searchTerm;
  const viewer = document.getElementById("log-viewer");
  viewer.innerHTML = "";

  const rpn = parseExpression(searchTerm);
    const hasValidQuery = rpn.length > 0;

    logLines.forEach((line, index) => {
    let shouldShow = true;

    if (hasValidQuery) {
      shouldShow = evaluateRPN(rpn, line);
    }

    if (!shouldShow) return;

    const lineDiv = document.createElement("div");
    lineDiv.className = "line";
    lineDiv.dataset.index = index;
    lineDiv.id = `log-line-${index}`;

    let lineHTML = line;

    if (hasValidQuery) {
    const terms = extractSearchTerms(rpn);
    for (const term of terms) {
        const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
        lineHTML = lineHTML.replace(regex, `<mark>$1</mark>`);
    }
    }

    lineDiv.innerHTML = `${index + 1}: ${lineHTML}`;


    if (annotations[index]?.highlightNext) {
      lineDiv.classList.add("highlighted");
      setTimeout(() => lineDiv.classList.remove("highlighted"), 1500);
      annotations[index].highlightNext = false;
    }

    lineDiv.addEventListener("click", (e) => {
      e.stopPropagation();
      showAnnotationInput(lineDiv, index);
    });

    viewer.appendChild(lineDiv);
  });

  renderAnnotationList();
}



function showAnnotationInput(lineEl, index) {
  if (currentPopup) currentPopup.remove();

  const popup = document.createElement("div");
  popup.className = "annotation-popup";
  popup.style.position = "static"; // inline under the line
  popup.style.marginTop = "6px";

  const input = document.createElement("input");
  input.placeholder = "Add a note…";
  input.value = annotations[index]?.comment || "";

  let shouldSave = false;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      shouldSave = true;
      input.blur(); // triggers blur after setting shouldSave
    } else if (e.key === "Escape") {
      e.preventDefault();
      popup.remove();
      currentPopup = null;
    }
  });

  input.addEventListener("blur", () => {
    if (shouldSave) {
      applyAnnotation(index, input.value);
    }
    popup.remove();
    currentPopup = null;
  });

  popup.appendChild(input);
  lineEl.insertAdjacentElement("afterend", popup);
  input.focus();
  currentPopup = popup;
}

function applyAnnotation(index, value) {
  const trimmed = value.trim();
  if (!trimmed) {
    delete annotations[index];
    renderLog();
    return;
  }

  const logLine = logLines[index];
  const timestampMatch = logLine.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3}/);
  const timestamp = timestampMatch ? timestampMatch[0] : "Unknown time";

  annotations[index] = {
    comment: trimmed,
    timestamp: timestamp
  };

  renderLog(currentSearchTerm);
}


function renderAnnotationList() {
  const list = document.getElementById("annotations-list");
  list.innerHTML = "";

  Object.entries(annotations).forEach(([index, { comment, timestamp }]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="annotation-entry">
        <div class="annotation-text">
          <strong>Line ${parseInt(index) + 1}</strong> @ ${timestamp}<br />
          ${comment}
        </div>
        <button class="delete-annotation-btn" data-index="${index}">🗑️</button>
      </div>
    `;

    li.addEventListener("click", () => {
    annotations[index].highlightNext = true;

    // Clear search input and reset filter
    searchInput.value = "";
    currentSearchTerm = "";

    // Show full log and scroll
    renderLog();
    const target = document.getElementById(`log-line-${index}`);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    });

    list.appendChild(li);

    const deleteBtn = li.querySelector(".delete-annotation-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent jumping to line
      delete annotations[index];
      renderLog(currentSearchTerm);
    });

  });
}


renderLog();
const searchBar = document.getElementById("log-search-bar");
const searchInput = document.getElementById("log-search-input");
const clearBtn = document.getElementById("log-search-clear");
const toggleBtn = document.getElementById("log-search-toggle");

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  currentSearchTerm = "";
  renderLog();
  searchInput.focus(); // Optional: focus again for convenience
});


searchInput.addEventListener("input", () => {
  currentSearchTerm = searchInput.value.trim().toLowerCase();
  if (currentSearchTerm === "") {
    renderLog(); // show all lines
  } else {
    renderLog(currentSearchTerm);
  }
});


function parseExpression(expr) {
  expr = expr.trim();
  if (!expr) return [];

  const rawTokens = expr.match(/\(|\)|AND|OR|[^()\s]+/g);
  const tokens = [];

  for (let i = 0; i < rawTokens.length; i++) {
    const token = rawTokens[i];
    const prev = rawTokens[i - 1];

    tokens.push(token);

    // Insert implicit AND if: [word][word] or [)][word] or [word][(]
    if (
      i > 0 &&
      !["AND", "OR", "(", ")"].includes(prev.toUpperCase()) &&
      !["AND", "OR", ")", "("].includes(token.toUpperCase())
    ) {
      tokens.splice(tokens.length - 1, 0, "AND");
    }
  }

  const output = [];
  const stack = [];

  for (let token of tokens) {
    token = token.toUpperCase();
    if (token === "AND" || token === "OR") {
      while (
        stack.length &&
        precedence(stack[stack.length - 1]) >= precedence(token)
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop(); // remove '('
    } else {
      output.push(token);
    }
  }

  while (stack.length) {
    output.push(stack.pop());
  }

  return output;
}




function precedence(op) {
  if (op === "OR") return 1;
  if (op === "AND") return 2;
  return 0;
}

function evaluateRPN(rpnTokens, line) {
  const stack = [];

  for (const token of rpnTokens) {
    if (token === "AND") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a && b);
    } else if (token === "OR") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a || b);
    } else {
      stack.push(line.toLowerCase().includes(token.toLowerCase()));
    }
  }

  return stack.pop();
}

function extractSearchTerms(rpnTokens) {
  return rpnTokens.filter(
    (token) => token !== "AND" && token !== "OR" && token !== "(" && token !== ")"
  );
}

const fileInput = document.getElementById("logFileInput");
const fileNameDisplay = document.getElementById("fileNameDisplay");
const fileSummary = document.getElementById("fileSummary");

fileInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const allowedTypes = [".log", ".txt", ".rtf"];
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

  if (!allowedTypes.includes(ext)) {
    alert("Only .log, .txt, or .rtf files are supported.");
    return;
  }

  const fileSizeKB = (file.size / 1024).toFixed(1); // in KB
  fileNameDisplay.textContent = ` ${file.name}`;

  const reader = new FileReader();
  reader.onload = function (event) {
    const contents = event.target.result;
    logLines = contents.split(/\r?\n/);
    annotations = {};
    console.log("Loaded lines:", logLines.length);
    renderLog();

    const lineCount = logLines.length;
    fileSummary.textContent = ` | ${lineCount.toLocaleString()} lines | ${fileSizeKB} KB`;
  };
  reader.readAsText(file);
});


const shareBtn = document.getElementById("shareAnnotationsBtn");
shareBtn.addEventListener("click", () => {
  const output = Object.entries(annotations)
    .map(([index, { comment, timestamp }]) => `Line ${parseInt(index) + 1}: ${comment}\n${logLines[index]}`)
    .join("\n\n");

  const overlay = document.createElement("div");
  overlay.className = "share-overlay";

  const modal = document.createElement("div");
  modal.className = "share-modal";

  const textarea = document.createElement("textarea");
  textarea.className = "share-textarea";
  textarea.value = output;
  textarea.readOnly = true;
  textarea.rows = Math.min(Object.keys(annotations).length * 3, 30);

  const copyBtn = document.createElement("button");
  copyBtn.className = "share-copy";
  copyBtn.textContent = "Copy to Clipboard";
  copyBtn.addEventListener("click", () => {
    textarea.select();
    document.execCommand("copy");
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy to Clipboard"), 2000);
  });

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.className = "share-close";
  closeBtn.addEventListener("click", () => overlay.remove());

  modal.appendChild(textarea);
  modal.appendChild(copyBtn);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
});
