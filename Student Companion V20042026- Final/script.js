const SUPABASE_URL = "https://tqrngdjuuhsxvploruwd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcm5nZGp1dWhzeHZwbG9ydXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTYzNTksImV4cCI6MjA5MTQ3MjM1OX0.W8LZRV71_cSny4mwOS12--iPRv3wfARBV1lNU_Ts45Y";

// ===============================
// STUDENT LOGIN 
// ===============================

async function loginStudent(studentNumber, password) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/student_login_details?select=*&student_number=ilike.${studentNumber}&password=eq.${password}`,
    { headers: buildHeaders() }
  );

  const data = await response.json();
  return data.length ? data[0] : null;
}


document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentNumber = document.getElementById("student-id").value.trim();
    const password = document.getElementById("password").value.trim();

    const student = await loginStudent(studentNumber, password);

    if (!student) {
      document.getElementById("student-id-error").textContent = "Invalid student number or password.";
      return;
    }

    // Save student info for later use
    localStorage.setItem("studentName", student.student_name);
    localStorage.setItem("studentNumber", student.student_number);
    localStorage.setItem("studentLoginID", student.id);

    // Redirect to homepage
    window.location.href = "index.html";
  });
});

async function loginAdmin(username, password) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/admin_login_details?username=ilike.${username}&password=eq.${password}&select=*`,
    { headers: buildHeaders() }
  );

  const data = await response.json();
  return data.length ? data[0] : null;
}



// ===============================
// SHOW / HIDE PASSWORD - STUDENT LOGIN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-password");
  const password = document.getElementById("password");

  if (toggle && password) {
    toggle.addEventListener("click", () => {
      const isHidden = password.type === "password";
      password.type = isHidden ? "text" : "password";
      toggle.textContent = isHidden ? "👁‍🗨" : "👁";
    });
  }
});
// ===============================
// NOTIFICATION PANEL - STUDENT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const notifBtn = document.getElementById("notif-btn");
  const notifPanel = document.getElementById("notif-panel");
  const notifCount = document.getElementById("notif-count");

  // ⭐ NEW: Hide badge if already opened before
  if (localStorage.getItem("notificationsOpened") === "true") {
    if (notifCount) notifCount.style.display = "none";
  }

  if (notifBtn) {
    notifBtn.addEventListener("click", () => {
      const isHidden = notifPanel.hasAttribute("hidden");

      if (isHidden) {
        notifPanel.removeAttribute("hidden");
        notifPanel.classList.add("show");

        // ⭐ NEW: Mark notifications as opened
        localStorage.setItem("notificationsOpened", "true");

        // Hide the badge
        if (notifCount) notifCount.style.display = "none";

      } else {
        notifPanel.classList.remove("show");
        setTimeout(() => notifPanel.setAttribute("hidden", ""), 200);
      }
    });
  }

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      notifPanel &&
      !notifPanel.contains(e.target) &&
      !notifBtn.contains(e.target)
    ) {
      notifPanel.classList.remove("show");
      setTimeout(() => notifPanel.setAttribute("hidden", ""), 200);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const welcomeText = document.getElementById("welcome-text");
    const studentName = localStorage.getItem("studentName");

    if (welcomeText) {
      if (studentName) {
        welcomeText.textContent = `Welcome back, ${studentName}!`;
      } else {
        welcomeText.textContent = "Welcome back!";
      }
    }
  }, 50);
});

// ===============================
// LOAD ANNOUNCEMENTS INTO NOTIFICATION PANEL - STUDENT
// ===============================

async function loadNotificationAnnouncements() {
  const notifList = document.getElementById("notifications-list");
  if (!notifList) return;

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/announcements?select=name`,
      { headers: buildHeaders() }
    );

    if (!response.ok) throw new Error("Failed to load notifications");

    const data = await response.json();

    // If no announcements
    if (!data.length) {
      notifList.innerHTML = "<li>No notifications available.</li>";
      return;
    }

    // Clear existing items
    notifList.innerHTML = "";

    // Add each announcement name as a notification
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      notifList.appendChild(li);
    });

    // Update notification count bubble
    const notifCount = document.getElementById("notif-count");
    if (notifCount) {
      // Only show badge if user has NOT opened notifications before
      if (localStorage.getItem("notificationsOpened") !== "true") {
        notifCount.textContent = data.length;
        notifCount.style.display = data.length > 0 ? "flex" : "none";
      } else {
        notifCount.style.display = "none";
      }

    }

  } catch (err) {
    console.error(err);
    notifList.innerHTML = "<li>Unable to load notifications.</li>";
  }
}

// Load notifications when page loads
document.addEventListener("DOMContentLoaded", loadNotificationAnnouncements);


// ===============================
// ANNOUNCEMENTS FROM SUPABASE
// ===============================

// Old Database, not in use
//const SUPABASE_URL = "https://tqrngdjuuhsxvploruwd.supabase.co";
//const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcm5nZGp1dWhzeHZwbG9ydXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTYzNTksImV4cCI6MjA5MTQ3MjM1OX0.W8LZRV71_cSny4mwOS12--iPRv3wfARBV1lNU_Ts45Y";
const ANNOUNCEMENTS_TABLE = "announcements";

function buildHeaders() {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
}

async function fetchAnnouncements() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${ANNOUNCEMENTS_TABLE}?select=*`,
    { headers: buildHeaders() }
  );

  if (!response.ok) {
    throw new Error("Failed to load announcements");
  }

  return response.json();
}

function renderAnnouncements(list) {
  const container = document.getElementById("announcements-list");
  if (!container) return;

  if (!list.length) {
    container.innerHTML = "<p>No announcements available.</p>";
    return;
  }

  container.innerHTML = "";

  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.details}</p>
    `;

    container.appendChild(card);
  });
}

async function loadAnnouncements() {
  try {
    const data = await fetchAnnouncements();
    renderAnnouncements(data);
  } catch (err) {
    console.error(err);
    const container = document.getElementById("announcements-list");
    if (container) {
      container.innerHTML = "<p>Unable to load announcements.</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", loadAnnouncements);

// ===============================
// SHOW STUDENT NAME ON HOMEPAGE
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcome-text");
  if (!welcomeText) return;

  const studentName = localStorage.getItem("studentName");

  if (studentName) {
    welcomeText.textContent = `Welcome back, ${studentName}!`;
  } else {
    welcomeText.textContent = "Welcome back!";
  }
});

// ===============================
// LOAD STUDENT PROFILE (using student_number)
// ===============================

async function loadStudentProfile() {
  const studentNumber = localStorage.getItem("studentNumber");
  if (!studentNumber) {
    console.error("No studentNumber found in localStorage.");
    return;
  }

  try {
    // 1. Fetch student details using student_number
    const studentRes = await fetch(
      `${SUPABASE_URL}/rest/v1/student_details?student_number=eq.${studentNumber}&select=*`,
      { headers: buildHeaders() }
    );

    const studentData = await studentRes.json();
    const student = studentData[0];

    if (!student) {
      console.error("No matching student_details row found for:", studentNumber);
      return;
    }

    // Fill Student Info
    document.getElementById("p-name").textContent = student.student_name;
    document.getElementById("p-number").textContent = student.student_number;
    document.getElementById("p-dob").textContent = student.dob;
    document.getElementById("p-year").textContent = student.year;

    // Fill Contact Details
    document.getElementById("p-email").textContent = student.student_email;
    document.getElementById("p-phone").textContent = student.phone_number;
    document.getElementById("p-address").textContent = student.address;

    // 2. Fetch course details using course_code
    const courseRes = await fetch(
      `${SUPABASE_URL}/rest/v1/student_courses?course_code=eq.${student.course_code}&select=*`,
      { headers: buildHeaders() }
    );

    const courseData = await courseRes.json();
    const course = courseData[0];

    if (course) {
      document.getElementById("p-course-name").textContent = course.course_name;
      document.getElementById("p-department").textContent = course.department;
      document.getElementById("p-duration").textContent = course.duration_years + " Year/s";
      document.getElementById("p-course-code").textContent = course.course_code;
    } else {
      console.error("No matching course found for:", student.course_code);
    }

  } catch (err) {
    console.error("Error loading profile:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadStudentProfile);

// ===============================
// UPDATE CONTACT DETAILS - STUDENT
// ===============================

async function updateContactDetails() {
  const studentNumber = localStorage.getItem("studentNumber");
  if (!studentNumber) return;

  const newPhone = document.getElementById("edit-phone").value.trim();
  const newAddress = document.getElementById("edit-address").value.trim();
  const status = document.getElementById("update-status");

  if (!newPhone && !newAddress) {
    status.style.color = "red";
    status.textContent = "Please enter at least one field to update.";
    return;
  }

  // Build update object
  const updateData = {};
  if (newPhone) updateData.phone_number = newPhone;
  if (newAddress) updateData.address = newAddress;

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/student_details?student_number=eq.${studentNumber}`,
      {
        method: "PATCH",
        headers: buildHeaders(),
        body: JSON.stringify(updateData)
      }
    );

    if (!response.ok) throw new Error("Update failed");

    status.style.color = "green";
    status.textContent = "Contact details updated successfully.";

    // Refresh the profile display
    loadStudentProfile();

  } catch (err) {
    console.error(err);
    status.style.color = "red";
    status.textContent = "Error updating details. Please try again.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("save-contact-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", updateContactDetails);
  }
});




// ===============================
// ADMIN LOGIN CHECKER
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admin-login-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("admin-id").value.trim();
      const password = document.getElementById("admin-password").value.trim();

      if (!username || !password) {
        document.getElementById("admin-password-error").textContent =
          "Please enter both username and password.";
        return;
      }

      const admin = await loginAdmin(username, password);

      if (!admin) {
        document.getElementById("admin-password-error").textContent =
          "Incorrect username or password.";
        return;
      }

      // Save admin session
      localStorage.setItem("adminUsername", admin.username);
      localStorage.setItem("adminID", admin.id);

      window.location.href = "admin-dashboard.html";
    });
  }
});



// ===============================
// ADMIN LOGIN — SHOW / HIDE PASSWORD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-admin-password");
  const passwordField = document.getElementById("admin-password");

  if (toggle && passwordField) {
    toggle.addEventListener("click", () => {
      const isHidden = passwordField.type === "password";
      passwordField.type = isHidden ? "text" : "password";

      // Optional: change icon
      toggle.textContent = isHidden ? "👁‍🗨" : "👁";
    });
  }
});

