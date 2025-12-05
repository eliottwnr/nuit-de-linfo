import { points } from "../../global.js";

function getSelectedValue(name) {
    const radios = document.getElementsByName(name);
    for (const radio of radios) {
        if (radio.checked) return radio.value;
    }
    return null;
}

document.querySelector('input[type="button"]').addEventListener("click", () => {
    const qcm1 = getSelectedValue("qcm1"); // Oui / Non
    const qcm2 = document.getElementById("qcm2").value; // Text input
    const qcm3 = getSelectedValue("qcm3"); // Oui / Non
    const qcm4 = getSelectedValue("qcm4"); // 0 / 1 / 2 / 3
    const qcm5 = getSelectedValue("qcm5"); // 1 / 2 / 3

    // Points calculation
    points.pointsQCM += (qcm1 === "Oui") ? 30 : 10;
    points.pointsQCM += (qcm3 === "Oui") ? 20 : 5;
    points.pointsQCM += parseInt(qcm4 || 0) * 10; // frequency: 0→0pts, 1→10pts, 2→20pts, 3→30pts
    points.pointsQCM += parseInt(qcm5 || 0) * 5;  // objective: 1→5pts, 2→10pts, 3→15pts
});
