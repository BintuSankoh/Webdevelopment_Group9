// 1. Initialize Supabase (Replace with your actual credentials)
const _supabase = supabase.createClient('https://ilgplyxdcgehzypcyrbf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZ3BseXhkY2dlaHp5cGN5cmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MTExOTAsImV4cCI6MjA5MDI4NzE5MH0.0OxwwUEk3k7DQah90WyN85omu2uq3LRBCY8P5yjuovI');

// 2. Elements
const loginForm = document.querySelector('form');
const idInput = document.getElementById('student-id');
const passInput = document.getElementById('password');
const loginBtn = document.querySelector('.btn-primary');

// --- LOGIN LOGIC ---
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    loginBtn.innerText = "Verifying...";
    loginBtn.disabled = true;

    const studentID = idInput.value;
    const password = passInput.value;

    try {
      // JOIN QUERY: Links student_login_details -> students -> courses
      const { data, error } = await _supabase
        .from('student_login_details')
        .select(`
          student_id,
          password,
          students (
            full_name,
            mobile,
            email,
            courses (
              course,
              course_level
            )
          )
        `)
        .eq('student_id', studentID)
        .eq('password', password)
        .single();

      if (error || !data) {
        alert("Invalid Student ID or Password.");
        loginBtn.innerText = "Sign In";
        loginBtn.disabled = false;
      } else {
        // Navigate the nested data from your ERD structure
        const studentInfo = data.students;
        const courseInfo = studentInfo.courses;

        // Save to localStorage for use on the Profile page
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('studentID', data.student_id);
        localStorage.setItem('studentName', studentInfo.full_name);
        localStorage.setItem('studentMobile', studentInfo.mobile);
        localStorage.setItem('studentEmail', studentInfo.email);
        localStorage.setItem('studentCourse', courseInfo.course);
        localStorage.setItem('studentCourseLevel', courseInfo.course_level);

        window.location.href = 'profile.html';
      }
    } catch (err) {
      console.error("Connection Error:", err);
      loginBtn.disabled = false;
    }
  });
}

// --- PROFILE DISPLAY LOGIC ---
// This runs when the profile page loads
if (window.location.pathname.includes('profile.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'login.html';
      return;
    }

    // Mapping data to HTML IDs
    const profileData = {
      'display-name': "Name: " + localStorage.getItem('studentName'),
      'display-id': "Student ID: " + localStorage.getItem('studentID'),
      'display-course': "Course of Study: " + localStorage.getItem('studentCourse'),
      'display-year': "Course Level:  " + localStorage.getItem('studentCourseLevel'),
      'display-email': localStorage.getItem('studentEmail'),
      'display-mobile': localStorage.getItem('studentMobile')
    };

    for (const [id, value] of Object.entries(profileData)) {
      const element = document.getElementById(id);
      if (element) element.innerText = value;
    }
  });
}

// --- LOGOUT LOGIC ---
const logoutBtn = document.querySelector('.btn-logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear(); // Clears all student data
    window.location.href = 'login.html';
  });
}