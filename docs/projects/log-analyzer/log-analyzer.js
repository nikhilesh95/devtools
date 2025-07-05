let currentSearchTerm = "";

const logLines = [
    "2025-03-19 05:41:11,516 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.e.c.CommandController | Command request: DeviceId{protocol=HTTPS, clientAddress=/192.0.0.2, serialNumber='CAT2222L1QX', sudiSerialNumber='CAT2222L1QX', platformId='C9500-32QC', correlatorId='CiscoPnP-1.0-R35.201014-I10-P379-T226299-8', macAddress='', hostname='Switch', authRequired=false, authStatus=AUTHENTICATED, lastProcessedCmdId=null, requestId='fb81139d4a404f64a355416eeedcb08a', correlationId='043a38b0-0da0-445a-beec-f8a5876af43b'} | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, mac=",
    "2025-03-19 05:41:11,517 |   INFO | qtp1463022229-16          | onboarding-service | c.c.pnp.api.das.impl.AbstractDas | DOCS com.mongodb.client.internal.FindIterableImpl@567917ba | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, mac=",
    "2025-03-19 05:41:11,517 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.a.s.i.ConvergedPnpResourceDomainContextManagerImpl | Received Token with no RD Context from User system with Tenant system | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, mac=",
    "2025-03-19 05:41:11,518 |   INFO | qtp1463022229-16          | onboarding-service | c.c.pnp.workflow.engine.utils.Utils | Device contact after 00 min, 15 sec - State Unclaimed OnbState Connecting | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,518 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.e.a.impl.CommandServiceImpl | System workflow not created yet. Creating it. | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,518 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.engine.api.impl.ModelUtils | Onboarding state moving from Connecting to Initializing  | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,518 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.engine.api.impl.ModelUtils | Workflow state moving from Pending to InProgress  | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,518 |   INFO | qtp1463022229-16          | onboarding-service | c.c.pnp.workflow.engine.utils.Utils | Adding RunSummary: Executing System Workflow to Initialize Device | sn=CAT2222L1QX deviceId=67da58906c8c096f5412367f | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,518 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.e.a.impl.CommandServiceImpl | Executing system workflow for the first time | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,518 |   INFO | qtp1463022229-16          | onboarding-service | c.c.pnp.workflow.engine.utils.Utils | Adding RunSummary: Executing Task: System Task | sn=CAT2222L1QX deviceId=67da58906c8c096f5412367f | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,518 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.engine.api.impl.ModelUtils | Task System state moving from Pending to InProgress  | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,519 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.e.task.service.TaskService | Preparing DEVICE_INFO command for next request | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,519 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.e.task.service.TaskService | Workitem DEVICE_INFO state moving from Pending to InProgress  | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,519 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.e.task.service.TaskService | Sending DEVICE_INFO command to device | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,522 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.e.c.CommandController | Command requested: DeviceInfoCmd{deviceInfoType=ALL} Cmd{cmdId=0779cb7a-f6a6-4d1e-82d3-4f5870741d83, serialNumber='CAT2222L1QX', maxRetries=0} | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,522 |   INFO | qtp1463022229-16          | onboarding-service | c.c.p.w.e.c.CommandController | Processed CM work-request in 6ms | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=request, sn=CAT2222L1QX, request-id=fb81139d4a404f64a355416eeedcb08a, deviceId=67da58906c8c096f5412367f, mac=",
    "2025-03-19 05:41:11,618 |   INFO | qtp1463022229-18          | onboarding-service | c.c.p.o.filter.SecurityFilter | The token type for the request /onboarding/command-response is Maglev | request-id=8a490afb16104e459c6f84a8c5c5a29f",
    "2025-03-19 05:41:11,618 |   INFO | qtp1463022229-18          | onboarding-service | c.c.p.w.e.c.CommandController | Command Controller POST /command-response | request-id=b8d02aae6cfe428288f7075e7a08c021, correlationId=043a38b0-0da0-445a-beec-f8a5876af43b",
    "2025-03-19 05:41:11,619 |   INFO | qtp1463022229-18          | onboarding-service | c.c.pnp.api.das.impl.AbstractDas | DOCS com.mongodb.client.internal.FindIterableImpl@60268fee | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021",
    "2025-03-19 05:41:11,620 |   INFO | qtp1463022229-18          | onboarding-service | c.c.p.a.s.i.ConvergedPnpResourceDomainContextManagerImpl | Received Token with no RD Context from User system with Tenant system | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021",
    "2025-03-19 05:41:11,620 |   INFO | qtp1463022229-18          | onboarding-service | c.c.pnp.workflow.engine.utils.Utils | Device contact after 00 min, 00 sec - State Unclaimed OnbState Initializing | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021, deviceId=67da58906c8c096f5412367f",
    "2025-03-19 05:41:11,620 |   INFO | qtp1463022229-18          | onboarding-service | c.c.p.w.e.a.impl.CommandServiceImpl | Command response: DeviceInfoResponse{imageInfo=ImageInfo{versionString='17.17.1prd14', imageFile=bootflash:packages.conf, imageHash=, returnToRomReason='PnP reset CLI', bootVariable='bootflash:packages.conf;', bootLdrVariable='', configVariable='', configReg='0x102', configRegNext=''}, hardwareInfo=HardwareInfo{hostname='Switch', vendor='cisco', platformName='C9500-32QC', processorType='X86', hwRevision='', mainMemSize=-1612736212, ioMemSize=6295128, boardId=null, boardReworkId='', processorRev='', midplaneVersion='', location='', deviceType='', deviceModel='null'}, udiInfo=UdiInfo{primaryChassisUdi='PID:C9500-32QC,VID:V01,SN:CAT2222L1QX', memberUdiList=[], haDevice=null}, fileSystemList=[FileSystemInfo{name='bootflash', type='disk', readable=true, writable=true, freespace=5657841664, size=11250098176}, FileSystemInfo{name='crashinfo', type='disk', readable=true, writable=false, freespace=1499676672, size=1651314688}, FileSystemInfo{name='webui', type='disk', readable=true, writable=false, freespace=7922245632, size=8157093888}, FileSystemInfo{name='nvram', type='nvram', readable=true, writable=false, freespace=33547212, size=33554432}, FileSystemInfo{name='cloudfs', type='disk', readable=true, writable=true, freespace=5657841664, size=11250098176}], profileInfoList=[ProfileInfo{profileName='pnp-zero-touch', discoveryCreated=true, createdBy='DHCP', primaryEndpoint=PnpEndpoint{protocol=HTTPS, port=443, ipv4Address=/11.11.11.2, ipv6Address=null, fqdn='null', certificate='null', sourceInterface ='null'}, secondaryEndpoint=null}]} CmdResponse{cmdId=0779cb7a-f6a6-4d1e-82d3-4f5870741d83, serialNumber='CAT2222L1QX', platformId='C9500-32QC', status=true, authStatus=AUTHENTICATED, errorSeverity='null', errorCode='null', errorMessage='null', timestamp='1742362871616', encoding='NONE'} | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021, deviceId=67da58906c8c096f5412367f",
    "2025-03-19 05:41:11,620 |   INFO | qtp1463022229-18          | onboarding-service | c.c.p.w.engine.api.impl.ModelUtils | pnp profile: ProfileInfo [profileName=pnp-zero-touch, discoveryCreated=true, createdBy=DHCP, primaryEndpoint=PnpEndpoint [port=443, ipv4Address=/11.11.11.2, ipv6Address=null, fqdn=null, certificate=null], secondaryEndpoint=null] | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021, deviceId=67da58906c8c096f5412367f",
    "2025-03-19 05:41:11,620 |   INFO | qtp1463022229-18          | onboarding-service | c.c.p.w.e.task.service.TaskService | Workitem DEVICE_INFO state moving from InProgress to Success  | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021, deviceId=67da58906c8c096f5412367f",
    "2025-03-19 05:41:11,620 |   INFO | qtp1463022229-18          | onboarding-service | c.c.p.w.e.a.impl.CommandServiceImpl | System workflow state moved to InProgress  | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021, deviceId=67da58906c8c096f5412367f",
    "2025-03-19 05:41:11,623 |   INFO | qtp1463022229-18          | onboarding-service | c.c.pnp.api.das.impl.AbstractDas | DOCS com.mongodb.client.internal.FindIterableImpl@5bcb6750 | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021, deviceId=67da58906c8c096f5412367f",
    "2025-03-19 05:41:11,623 |   INFO | qtp1463022229-18          | onboarding-service | c.c.p.a.s.i.ConvergedPnpResourceDomainContextManagerImpl | Received Token with no RD Context from User system with Tenant system | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021, deviceId=67da58906c8c096f5412367f",
    "2025-03-19 05:41:11,624 |   INFO | qtp1463022229-18          | onboarding-service | c.c.pnp.workflow.engine.utils.Utils | Device contact after 00 min, 00 sec - State Unclaimed OnbState Initializing | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021, deviceId=67da58906c8c096f5412367f",
    "2025-03-19 05:41:11,624 |   INFO | qtp1463022229-18          | onboarding-service | c.c.p.w.e.a.impl.CommandServiceImpl | Preparing System Workflow for next request | correlationId=043a38b0-0da0-445a-beec-f8a5876af43b, pid=C9500-32QC, hs=response, sn=CAT2222L1QX, request-id=b8d02aae6cfe428288f7075e7a08c021, deviceId=67da58906c8c096f5412367f"
];


const annotations = {};
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
      <strong>Line ${parseInt(index) + 1}</strong> @ ${timestamp}<br />
      ${comment}
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

document.getElementById('logFileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const contents = event.target.result;
    logLines = contents.split(/\r?\n/);
    annotations = {};
    filteredIndexes = logLines.map((_, index) => index); // reset view
    renderLog();
  };
  reader.readAsText(file);
});
