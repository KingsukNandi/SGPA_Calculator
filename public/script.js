let scheme;
let subjects;
function calculateGPA() {
  if (scheme === `tab1`) {
    subjects = [
      { id: 1, defaultCredits: 4, hasMidInternal: true },
      { id: 2, defaultCredits: 3, hasMidInternal: true },
      { id: 3, defaultCredits: 2, hasMidInternal: true },
      { id: 4, defaultCredits: 2, hasMidInternal: true },
      { id: 5, defaultCredits: 2, hasMidInternal: true },
      { id: 6, defaultCredits: 2, hasMidInternal: true },
      { id: 7, defaultCredits: 1, hasMidInternal: false },
      { id: 8, defaultCredits: 1, hasMidInternal: false },
      { id: 9, defaultCredits: 1, hasMidInternal: false },
      { id: 10, defaultCredits: 1, hasMidInternal: false },
      { id: 11, defaultCredits: 1, hasMidInternal: false },
    ];
  } else {
    subjects = [
      { id: 1, defaultCredits: 4, hasMidInternal: true },
      { id: 2, defaultCredits: 3, hasMidInternal: true },
      { id: 3, defaultCredits: 2, hasMidInternal: true },
      { id: 4, defaultCredits: 2, hasMidInternal: true },
      { id: 5, defaultCredits: 2, hasMidInternal: true },
      { id: 6, defaultCredits: 2, hasMidInternal: true },
      { id: 7, defaultCredits: 4, hasMidInternal: false },
      { id: 8, defaultCredits: 1, hasMidInternal: false },
      { id: 9, defaultCredits: 1, hasMidInternal: false },
    ];
  }

  let totalWeightedGrades = 0;
  let totalCredits = 0;

  subjects.forEach((subject) => {
    let marks =
      parseFloat(
        document
          .querySelector(`#${scheme}`)
          .getElementsByClassName(`subject`)
          [`${subject.id - 1}`].getElementsByTagName(`input`)[0].value
      ) || 0;
    let credits = subject.defaultCredits;

    let finalMarks;
    if (subject.hasMidInternal) {
      let midsem =
        parseFloat(
          document
            .querySelector(`#${scheme}`)
            .getElementsByClassName(`subject`)
            [`${subject.id - 1}`].getElementsByTagName(`input`)[1].value
        ) || 0;

      let internal =
        parseFloat(
          document
            .querySelector(`#${scheme}`)
            .getElementsByClassName(`subject`)
            [`${subject.id - 1}`].getElementsByTagName(`input`)[2].value
        ) || 0;
      finalMarks = marks + midsem + internal;
    } else {
      finalMarks = marks;
    }

    let grade = 2;
    if (0 <= finalMarks && finalMarks < 40) {
      grade = 2;
    } else if (40 <= finalMarks && finalMarks < 100) {
      grade = Math.floor(finalMarks / 10) + 1;
    } else if (finalMarks == 100) {
      grade = 10;
    } else {
      alert(
        `Please enter marks within range or miscalculations may occur.
The ranges are :
End-Sem Marks : 0 - 50
Mid-Sem Marks : 0 - 20
Internal Marks : 0 - 30`
      );
    }
    totalWeightedGrades += grade * credits;
    totalCredits += credits;
  });
  let gpa = totalWeightedGrades / totalCredits;
  document
    .querySelector(`#${scheme}`)
    .getElementsByClassName(`result`)[0].innerText =
    "Your SGPA is: " + gpa.toFixed(2);
}
let theme = "light";

function toggleTheme() {
  if (theme === "light") {
    theme = "dark";
    document.getElementById("theme-link").href = "darkTheme.css";
    document.getElementById("theme-icon").innerHTML = "🌙";
    document.getElementById("theme-text").innerText = "";
  } else {
    theme = "light";
    document.getElementById("theme-link").href = "lightTheme.css";
    document.getElementById("theme-icon").innerHTML = "☀️";
    document.getElementById("theme-text").innerText = "";
  }
}
function openTab(evt, tabName) {
  scheme = tabName;

  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();
