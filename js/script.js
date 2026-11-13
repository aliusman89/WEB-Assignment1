// Leafwork – script.js (vanilla JavaScript)
// 1. DATA: every opportunity is an object; the whole list is an array.
const opportunities = [
  { id: 1, title: "Teaching & Mentoring", organization: "Bright Future Foundation", category: "Education", location: "Islamabad",
    description: "Help school students improve their basic English, mathematics and science skills.",
    date: "15 November 2026", duration: "3 hours", totalVolunteers: 15, availableSlots: 8, deadline: "12 November 2026" },
  { id: 2, title: "Community Food Drive", organization: "Helping Hands Society", category: "Community Service", location: "Rawalpindi",
    description: "Assist with food packaging and distribution for families in underserved communities.",
    date: "18 November 2026", duration: "4 hours", totalVolunteers: 20, availableSlots: 12, deadline: "15 November 2026" },
  { id: 3, title: "Green Campus Initiative", organization: "Eco Warriors", category: "Environment", location: "NUST Campus, Islamabad",
    description: "Participate in a tree plantation campaign and promote environmental awareness.",
    date: "20 November 2026", duration: "2 hours", totalVolunteers: 25, availableSlots: 10, deadline: "18 November 2026" },
  { id: 4, title: "Blood Donation Awareness", organization: "NUST Blood Donor Society", category: "Healthcare", location: "Islamabad",
    description: "Help organize a blood donation awareness campaign and guide participants during registration.",
    date: "23 November 2026", duration: "3 hours", totalVolunteers: 12, availableSlots: 5, deadline: "20 November 2026" },
  { id: 5, title: "Animal Welfare Support", organization: "Paws & Care", category: "Animal Welfare", location: "Rawalpindi",
    description: "Assist with animal shelter activities, food preparation and basic care support.",
    date: "26 November 2026", duration: "3 hours", totalVolunteers: 10, availableSlots: 4, deadline: "23 November 2026" },
  { id: 6, title: "Community Clean-up Drive", organization: "Clean Pakistan Initiative", category: "Environment", location: "Islamabad",
    description: "Join a community clean-up campaign to improve neighbourhood cleanliness and environmental awareness.",
    date: "29 November 2026", duration: "2 hours", totalVolunteers: 18, availableSlots: 0, deadline: "27 November 2026" }
];

// 2. STATE: what is currently selected, and who has applied this session.
let selectedOpportunity = null;
const appliedThisSession = [];   // entries look like "studentId-opportunityId"

// 3. DOM references
const grid = document.getElementById("opportunityGrid");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const availabilityFilter = document.getElementById("availabilityFilter");
const modal = document.getElementById("modal");
const detailsView = document.getElementById("detailsView");
const applyForm = document.getElementById("applyForm");

// 4. SEARCH: true if the keyword appears in title, organization or description.
function searchOpportunities(opp, keyword) {
  if (keyword === "") return true;
  const text = (opp.title + " " + opp.organization + " " + opp.description).toLowerCase();
  return text.includes(keyword.toLowerCase());
}

// 5. FILTER: search AND category AND location AND availability must all pass,
// so the controls work together instead of overriding each other.
function filterOpportunities() {
  const keyword = searchInput.value.trim();
  return opportunities.filter(function (opp) {
    const matchesSearch = searchOpportunities(opp, keyword);
    const matchesCategory = categoryFilter.value === "all" || opp.category === categoryFilter.value;
    const matchesLocation = locationFilter.value === "all" || opp.location.includes(locationFilter.value);
    let matchesAvailability = true;
    if (availabilityFilter.value === "available") matchesAvailability = opp.availableSlots > 0;
    if (availabilityFilter.value === "full") matchesAvailability = opp.availableSlots === 0;
    return matchesSearch && matchesCategory && matchesLocation && matchesAvailability;
  });
}

// 6. RENDER: build one card per opportunity and put them in the grid.
function renderOpportunities() {
  const list = filterOpportunities();
  grid.innerHTML = "";
  list.forEach(function (opp) {
    const isFull = opp.availableSlots === 0;
    const card = document.createElement("article");
    card.className = "card" + (isFull ? " full" : "");
    card.id = "card-" + opp.id;
    const slotClass = isFull ? "slots-full" : (opp.availableSlots <= 5 ? "slots-low" : "");
    const slotText = isFull ? "Fully booked" : opp.availableSlots + " of " + opp.totalVolunteers + " left";
    card.innerHTML =
      '<span class="tag">' + opp.category + "</span>" +
      "<h3>" + opp.title + "</h3>" +
      '<p class="org">' + opp.organization + "</p>" +
      '<p class="desc">' + opp.description + "</p>" +
      '<dl class="meta">' +
      "<div><dt>Location</dt><dd>" + opp.location + "</dd></div>" +
      "<div><dt>Date</dt><dd>" + opp.date + "</dd></div>" +
      '<div><dt>Slots</dt><dd class="' + slotClass + '">' + slotText + "</dd></div></dl>" +
      '<button type="button" class="btn ' + (isFull ? "btn-secondary" : "btn-primary") + '" data-id="' + opp.id + '">View Details</button>';
    grid.appendChild(card);
  });
  emptyState.hidden = list.length > 0;
  resultCount.textContent = "Showing " + list.length + " of " + opportunities.length + " opportunities";
}

// 7. DETAILS MODAL
function showOpportunityDetails(id) {
  selectedOpportunity = opportunities.find(function (o) { return o.id === id; });
  fillDetails();
  detailsView.hidden = false;
  applyForm.hidden = true;
  if (!modal.open) modal.showModal();
}

// Fills the modal from the object, so it always shows the latest slot count.
function fillDetails() {
  const o = selectedOpportunity;
  const isFull = o.availableSlots === 0;
  document.getElementById("modalTitle").textContent = o.title;
  document.getElementById("mOrg").textContent = o.organization;
  document.getElementById("mDesc").textContent = o.description;
  const rows = [["Category", o.category], ["Location", o.location], ["Event date", o.date], ["Duration", o.duration],
    ["Volunteers required", o.totalVolunteers], ["Available slots", o.availableSlots], ["Application deadline", o.deadline]];
  document.getElementById("mDetails").innerHTML = rows.map(function (r) {
    return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>";
  }).join("");
  const status = document.getElementById("mStatus");
  status.textContent = isFull ? "Currently Fully Booked." : "Applications open";
  status.className = "status" + (isFull ? " full" : "");
  document.getElementById("applyBtn").disabled = isFull;
}

// 8. APPLICATION FORM
function openApplicationForm() {
  applyForm.reset();
  clearErrors();
  document.getElementById("fOpp").value = selectedOpportunity.title;
  detailsView.hidden = true;
  applyForm.hidden = false;
  document.getElementById("fName").focus();
}

function clearErrors() {
  applyForm.querySelectorAll(".error").forEach(function (e) { e.textContent = ""; });
  applyForm.querySelectorAll(".invalid").forEach(function (e) { e.classList.remove("invalid"); });
  document.getElementById("formMessage").textContent = "";
}

// Friendly error message for a field that failed the HTML attribute rules.
function errorFor(field) {
  const v = field.validity;
  if (v.valueMissing) return "This field is required.";
  if (v.typeMismatch) return "Enter a valid email address.";
  if (v.tooShort) return "Use at least " + field.minLength + " characters.";
  if (v.patternMismatch) {
    return field.name === "phone" ? "Use a Pakistani number like 0300-1234567." : "Student ID must be 5 to 10 digits.";
  }
  return "Please check this field.";
}

// Checks every field with the built-in validity API (uses the required/minlength/pattern attributes).
function validateForm(form, fieldNames, errorPrefix) {
  let allValid = true;
  fieldNames.forEach(function (id) {
    const field = document.getElementById(id);
    const errorBox = document.getElementById(id + "Err");
    if (field.checkValidity()) {
      errorBox.textContent = "";
      field.classList.remove("invalid");
    } else {
      errorBox.textContent = errorFor(field);
      field.classList.add("invalid");
      allValid = false;
    }
  });
  return allValid;
}

function validateApplication() {
  return validateForm(applyForm, ["fName", "fEmail", "fId", "fPhone", "fDept", "fWhy"]);
}

// Reduces the slot count by one and refreshes the card and the modal.
function updateAvailableSlots(opp) {
  if (opp.availableSlots > 0) opp.availableSlots = opp.availableSlots - 1;
  renderOpportunities();
  fillDetails();
}

function submitApplication(event) {
  event.preventDefault();                       // stop the page reloading
  const message = document.getElementById("formMessage");
  message.textContent = "";
  if (!validateApplication()) {
    message.textContent = "Please fix the highlighted fields.";
    return;
  }
  const key = document.getElementById("fId").value.trim() + "-" + selectedOpportunity.id;
  if (appliedThisSession.includes(key)) {       // duplicate check
    message.textContent = "This student ID has already applied for this opportunity in this session.";
    return;
  }
  if (selectedOpportunity.availableSlots === 0) { // slots may have run out
    message.textContent = "Sorry, this opportunity is now fully booked.";
    return;
  }
  appliedThisSession.push(key);
  updateAvailableSlots(selectedOpportunity);
  applyForm.hidden = true;
  detailsView.hidden = false;
  showNotification("Your application has been submitted successfully! Thank you for choosing to make a difference.");
}

// 9. TOAST MESSAGE
let toastTimer;
function showNotification(text) {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 5000);
}

// 10. EVENT LISTENERS
searchInput.addEventListener("input", renderOpportunities);
categoryFilter.addEventListener("change", renderOpportunities);
locationFilter.addEventListener("change", renderOpportunities);
availabilityFilter.addEventListener("change", renderOpportunities);
document.getElementById("filterForm").addEventListener("submit", function (e) { e.preventDefault(); });
document.getElementById("clearFilters").addEventListener("click", function () {
  searchInput.value = "";
  categoryFilter.value = "all"; locationFilter.value = "all"; availabilityFilter.value = "all";
  renderOpportunities();
});
// Event delegation: one listener on the grid handles every View Details button.
grid.addEventListener("click", function (e) {
  const button = e.target.closest("button[data-id]");
  if (button) showOpportunityDetails(Number(button.dataset.id));
});
document.getElementById("applyBtn").addEventListener("click", openApplicationForm);
document.getElementById("backBtn").addEventListener("click", function () { applyForm.hidden = true; detailsView.hidden = false; });
document.getElementById("closeModal").addEventListener("click", function () { modal.close(); });
modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); }); // click on backdrop
applyForm.addEventListener("submit", submitApplication);

// Contact form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateForm(this, ["cName", "cEmail", "cMessage"])) {
    this.reset();
    showNotification("Thanks! Your message was received (demo only, nothing is sent).");
  }
});

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", function () {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", function (e) {
  if (e.target.tagName === "A") { navLinks.classList.remove("open"); menuToggle.setAttribute("aria-expanded", false); }
});

// 11. START
document.getElementById("statOpps").textContent = opportunities.length;
renderOpportunities();
